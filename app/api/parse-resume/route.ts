import { NextResponse } from "next/server";
import PdfParse from "pdf-parse";

export async function POST(request: Request) {
  try {
    // Read the raw file buffer from the request body
    const buffer = Buffer.from(await request.arrayBuffer());

    if (!buffer || buffer.length === 0) {
      return NextResponse.json({ error: "No file uploaded." }, { status: 400 });
    }

    const data = await PdfParse(buffer);

    return NextResponse.json({ text: data.text });
  } catch (error) {
    console.error("Error parsing PDF:", error);
    return NextResponse.json(
      { error: "Failed to parse PDF." },
      { status: 500 }
    );
  }
}
