/* eslint-disable @typescript-eslint/no-explicit-any */
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { getResumeById } from "@/lib/actions/resume";
import { auth } from "@/lib/auth";
import { getScoreBgColor, getScoreColor } from "@/lib/utils";
import { AlertCircle, Briefcase, CheckCircle, MapPin } from "lucide-react";
import { headers } from "next/headers";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function ResumePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) notFound();

  const { id } = await params;

  const resume: any = await getResumeById(id);
  if (!resume) notFound();

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Resume Analysis
            </h1>
            <p className="text-gray-600">
              Complete analysis of your resume with actionable feedback
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Briefcase className="w-5 h-5 mr-2 text-blue-600" />
                  Resume Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">
                      {resume.result.resumeData?.name}
                    </h3>
                    <p className="text-lg text-gray-600 mb-2">
                      {resume.result.resumeData?.title}
                    </p>
                    <div className="flex items-center text-gray-500 text-sm space-x-4">
                      <span className="flex items-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        {resume.result.resumeData?.location}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div
                      className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getScoreBgColor(
                        resume.result.scores?.overall
                      )}`}
                    >
                      <span
                        className={`${getScoreColor(
                          resume.result.scores?.overall
                        )}`}
                      >
                        Overall Score: {resume.result.scores?.overall}%
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle>Skills Breakdown</CardTitle>
                <CardDescription>
                  Analysis of technical and professional skills mentioned in
                  your resume
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid sm:grid-cols-2 gap-4">
                  {resume.result.skills?.map((skill: any, index: number) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="font-medium text-gray-900">
                          {skill.name}
                        </span>
                        <span className="text-gray-600">{skill.level}%</span>
                      </div>
                      <Progress value={skill.level} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle>Suggestions for Improvement</CardTitle>
                <CardDescription>
                  Actionable recommendations to enhance your resume
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {resume.result.suggestions?.map(
                  (suggestion: any, index: number) => (
                    <div
                      key={index}
                      className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg"
                    >
                      <div className="flex-shrink-0 mt-1">
                        {suggestion.type === "improvement" ? (
                          <CheckCircle className="w-5 h-5 text-blue-600" />
                        ) : (
                          <AlertCircle className="w-5 h-5 text-yellow-600" />
                        )}
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 mb-1">
                          {suggestion.title}
                        </h4>
                        <p className="text-gray-600 text-sm">
                          {suggestion.description}
                        </p>
                      </div>
                    </div>
                  )
                )}
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle>Score Breakdown</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-900">
                      Work Experience
                    </span>
                    <span
                      className={`text-sm font-semibold ${getScoreColor(
                        resume.result.scores?.workExperience
                      )}`}
                    >
                      {resume.result.scores?.workExperience}%
                    </span>
                  </div>
                  <Progress
                    value={resume.result.scores?.workExperience}
                    className="h-2"
                  />
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-900">
                      Education
                    </span>
                    <span
                      className={`text-sm font-semibold ${getScoreColor(
                        resume.result.scores?.education
                      )}`}
                    >
                      {resume.result.scores?.education}%
                    </span>
                  </div>
                  <Progress
                    value={resume.result.scores?.education}
                    className="h-2"
                  />
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-900">
                      Skills
                    </span>
                    <span
                      className={`text-sm font-semibold ${getScoreColor(
                        resume.result.scores?.skills
                      )}`}
                    >
                      {resume.result.scores?.skills}%
                    </span>
                  </div>
                  <Progress
                    value={resume.result.scores?.skills}
                    className="h-2"
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle>Quick Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-sm text-gray-600">
                    Total Experience
                  </span>
                  <Badge variant="secondary">8 years</Badge>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-sm text-gray-600">Education Level</span>
                  <Badge variant="secondary">{"Master's"}</Badge>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-sm text-gray-600">Key Skills</span>
                  <Badge variant="secondary">12 identified</Badge>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-sm text-gray-600">
                    ATS Compatibility
                  </span>
                  <Badge className="bg-green-100 text-green-800">Good</Badge>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-3">
              <Link href="/upload" className="block">
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  Analyze Another Resume
                </Button>
              </Link>
              <Link href="/dashboard" className="block">
                <Button variant="outline" className="w-full">
                  View All Analyses
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
