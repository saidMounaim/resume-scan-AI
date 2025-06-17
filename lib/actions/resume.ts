"use server";

import { prisma } from "../prisma";

export async function getResumeById(id: string) {
  try {
    const resume = await prisma.resumeResult.findUnique({
      where: { id },
    });

    if (!resume) {
      return { success: false, error: "Failed to fetch resume" };
    }
    return resume;
  } catch (error) {
    console.log(error);
    return { success: false, error: "Failed to fetch resume" };
  }
}

export async function getResumeStatus(resumeResultId: string) {
  try {
    const resume = await prisma.resumeResult.findUnique({
      where: { id: resumeResultId },
      select: { status: true },
    });
    if (!resume) {
      return { success: false, error: "Resume not found" };
    }
    return resume.status;
  } catch (error) {
    console.log(error);
    return { success: false, error: "Failed to fetch resume status" };
  }
}
