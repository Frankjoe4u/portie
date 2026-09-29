import { auth } from "@/auth";
import { NextResponse } from "next/server";
import { headers } from "next/headers";

export async function requireAdmin(): Promise<NextResponse | null> {
  const headersList = await headers();
  const seedSecret = headersList.get("x-seed-secret");
  if (seedSecret && seedSecret === process.env.SEED_SECRET) {
    return null;
  }

  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return null;
}
