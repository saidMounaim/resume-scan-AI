import { inngest } from "@/inngest/client";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  const { resumeResultId, userId, resumeText } = body;

  const event = await inngest.send({
    name: "resume/scan",
    data: {
      resumeResultId,
      userId,
      resumeText,
    },
  });

  return NextResponse.json({ ok: true, event });
}
