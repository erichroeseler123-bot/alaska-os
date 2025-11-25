import { NextResponse } from "next/server";
import fs from "fs-extra";
import path from "path";

export async function GET() {
  try {
    const file = path.join("/tmp/alaska-os", "homepage.json");

    if (!fs.existsSync(file)) {
      return NextResponse.json(
        { ok: false, error: "Homepage not generated yet." },
        { status: 404 }
      );
    }

    const data = await fs.readJSON(file);
    return NextResponse.json(data, {
      status: 200,
      headers: {
        "Cache-Control": "s-maxage=300, stale-while-revalidate=600",
      },
    });
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: String(err) },
      { status: 500 }
    );
  }
}
