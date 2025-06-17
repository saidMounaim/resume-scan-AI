"use server";

import { prisma } from "../prisma";

export async function getAllResumesByUserId(userId: string) {
  try {
    const resumes = await prisma.resumeResult.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        result: true,
        status: true,
        createdAt: true,
      },
    });
    return resumes;
  } catch (error) {
    console.log(error);
    return { success: false, error: "Failed to fetch resumes" };
  }
}

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

export async function deleteResumeById(id: string) {
  try {
    await prisma.resumeResult.delete({
      where: { id },
    });
    return { success: true };
  } catch (error) {
    console.log(error);
    return { success: false, error: "Failed to delete resume" };
  }
}
