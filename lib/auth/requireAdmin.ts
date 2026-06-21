import { auth } from "@/auth";
import { NextResponse } from "next/server";

/**
 * Call this at the top of every mutating API route (POST/PUT/DELETE).
 * Returns null if the request is from an authenticated admin, or a
 * NextResponse (401) to return immediately if not.
 *
 * This is the REAL security boundary - proxy.ts only handles UX redirects
 * for page navigation and can be bypassed at the network level, so every
 * route must independently verify the session here.
 */
export async function requireAdmin(): Promise<NextResponse | null> {
  const session = await auth();

  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return null;
}
