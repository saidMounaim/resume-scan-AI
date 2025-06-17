import { prisma } from "@/lib/prisma";
import { inngest } from "./client";
import { OpenAI } from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export const resumeScan = inngest.createFunction(
  { id: "resume-scan-ai" },
  { event: "resume/scan" },
  async ({ event, step }) => {
    const { resumeResultId, userId, resumeText } = event.data;

    if (!resumeText || !userId) {
      throw new Error("Missing resumeText or userId in event data.");
    }

    const prompt = `
You are a resume analysis expert.

Given the resume text below, extract the following structured data:

1. resumeData:
- name
- title
- location
- email
- phone

2. scores (estimate from 0–100):
- overall
- workExperience
- education
- skills

3. skills: list of skill objects with name and level (0–100)

4. suggestions: list of suggestions with:
- type ("improvement" | "missing" | "optimization")
- title
- description

Respond ONLY with JSON in this format:

{
  "resumeData": {
    "name": "...",
    "title": "...",
    "location": "...",
    "email": "...",
    "phone": "..."
  },
  "scores": {
    "overall": ...,
    "workExperience": ...,
    "education": ...,
    "skills": ...
  },
  "skills": [
    { "name": "...", "level": ... },
    ...
  ],
  "suggestions": [
    {
      "type": "improvement" | "missing" | "optimization",
      "title": "...",
      "description": "..."
    },
    ...
  ]
}

Resume text:
"""${resumeText}"""
`;

    const completion = await step.run("openai-analysis", async () => {
      const response = await openai.chat.completions.create({
        model: "gpt-4-turbo",
        messages: [
          {
            role: "system",
            content: "You are a helpful resume analysis assistant.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.3,
      });
      const raw = response.choices[0]?.message?.content ?? "{}";
      const cleanedRaw = raw.replace(/```(?:json)?\n?([\s\S]*?)\n?```/, "$1");

      try {
        const parsed = JSON.parse(cleanedRaw);

        const saved = await prisma.resumeResult.create({
          data: {
            id: resumeResultId,
            userId,
            result: parsed,
            status: "done",
          },
        });
        return {
          id: saved.id,
          userId,
          ...parsed,
        };
      } catch (err) {
        throw new Error(
          err instanceof Error ? err.message : "Failed to parse AI response"
        );
      }
    });

    return completion;
  }
);
