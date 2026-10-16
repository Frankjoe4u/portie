import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth/requireAdmin";
import cloudinary from "@/lib/cloudinary";

export async function POST(request: NextRequest) {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const ALLOWED = ["image/jpeg", "image/png", "image/webp", "image/gif", "image/avif"];
    if (!ALLOWED.includes(file.type)) {
      return NextResponse.json(
        { error: "Only JPEG, PNG, WebP, GIF or AVIF images are allowed" },
        { status: 415 },
      );
    }
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json({ error: "Image must be 5 MB or smaller" }, { status: 413 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const base64 = `data:${file.type};base64,${buffer.toString("base64")}`;

    const result = await cloudinary.uploader.upload(base64, {
      folder: "portfolio",
      resource_type: "image",
    });

    return NextResponse.json({
      url: result.secure_url,
      publicId: result.public_id,
    });
  } catch (err) {
    console.error("Cloudinary upload error:", err);
    return NextResponse.json(
      { error: "Upload failed" },
      { status: 500 }
    );
  }
}
