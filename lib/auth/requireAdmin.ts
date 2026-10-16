import { timingSafeEqual } from "node:crypto";
import { auth } from "@/auth";
import { NextResponse } from "next/server";
import { headers } from "next/headers";

function safeEqual(a: string, b: string) {
  const x = Buffer.from(a);
  const y = Buffer.from(b);
  return x.length === y.length && timingSafeEqual(x, y);
}

export async function requireAdmin(): Promise<NextResponse | null> {
  // Optional machine access for seeding scripts. It only works when a strong
  // SEED_SECRET (16+ characters) is set in the environment; remove the
  // variable from Vercel to disable this path completely.
  const expected = process.env.SEED_SECRET;
  if (expected && expected.length >= 16) {
    const provided = (await headers()).get("x-seed-secret");
    if (provided && safeEqual(provided, expected)) return null;
  }

  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return null;
}
