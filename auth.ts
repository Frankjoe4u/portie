import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { dbConnect } from "@/lib/db/mongoose";
import { Admin } from "@/models/Admin";

// Best-effort brute-force guard: 5 failed attempts per email locks that email
// for 15 minutes on this server instance.
const attempts = new Map<string, { count: number; until: number }>();
const MAX_ATTEMPTS = 5;
const LOCK_MS = 15 * 60 * 1000;

export const { handlers, auth, signIn, signOut } = NextAuth({
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/admin/login",
  },
  providers: [
    Credentials({
      name: "Admin Login",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const email = credentials?.email as string | undefined;
        const password = credentials?.password as string | undefined;

        if (!email || !password) return null;

        const key = email.toLowerCase();
        const state = attempts.get(key);
        if (state && state.count >= MAX_ATTEMPTS && Date.now() < state.until) return null;

        const fail = () => {
          const cur = attempts.get(key);
          const fresh = !cur || Date.now() > cur.until;
          attempts.set(key, {
            count: fresh ? 1 : cur.count + 1,
            until: Date.now() + LOCK_MS,
          });
          return null;
        };

        await dbConnect();

        const admin = await Admin.findOne({ email: key });
        if (!admin) return fail();

        const isValid = await bcrypt.compare(password, admin.passwordHash);
        if (!isValid) return fail();

        attempts.delete(key);

        return {
          id: admin._id.toString(),
          email: admin.email,
          name: "Admin",
          role: "admin",
        };
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.role = (user as { role?: string }).role ?? "admin";
      }
      return token;
    },
    session: async ({ session, token }) => {
      if (session.user) {
        (session.user as typeof session.user & { role?: string }).role =
          token.role as string | undefined;
      }
      return session;
    },
  },
});
