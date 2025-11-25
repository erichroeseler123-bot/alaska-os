import { NextResponse } from "next/server";
import fs from "fs-extra";
import path from "path";

type Context = {
  params: Promise<{ slug: string }>;
};

export async function GET(request: Request, context: Context) {
  const { slug } = await context.params;

  try {
    const file = path.join("/tmp/alaska-os/ports", `${slug}.json`);

    if (!fs.existsSync(file)) {
      return NextResponse.json(
        { ok: false, error: `No data for port: ${slug}` },
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
    return NextResponse.json({ ok: false, error: String(err) }, { status: 500 });
  }
}
