/* eslint-disable @typescript-eslint/no-explicit-any */
import DeleteResume from "@/components/shared/delete-resume";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getAllResumesByUserId } from "@/lib/actions/resume";
import { auth } from "@/lib/auth";
import { formatDate, getScoreColor } from "@/lib/utils";
import { Calendar, Eye, FileText, Plus } from "lucide-react";
import { headers } from "next/headers";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function DashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) notFound();

  const resumes: any = await getAllResumesByUserId(session.user.id);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
            <p className="text-gray-600">
              Manage your resume analyses and track your progress
            </p>
          </div>
          <Link href="/upload">
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              New Analysis
            </Button>
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="border-0 shadow-sm">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-gray-900">
                    {resumes?.length}
                  </p>
                  <p className="text-sm text-gray-600">Total Analyses</p>
                </div>
                <FileText className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle>Recent Analyses</CardTitle>
            <CardDescription>
              View and manage your resume analysis history
            </CardDescription>
          </CardHeader>
          <CardContent>
            {resumes.length === 0 ? (
              <div className="text-center py-12">
                <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No analyses yet
                </h3>
                <p className="text-gray-600 mb-6">
                  Upload your first resume to get started with AI-powered
                  feedback.
                </p>
                <Link href="/upload">
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    Upload Resume
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {resumes.map((analysis: any) => (
                  <div
                    key={analysis.id}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <FileText className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">
                          {analysis.result.resumeData.name}
                        </h4>
                        <div className="flex items-center space-x-4 mt-1">
                          <span className="flex items-center text-sm text-gray-600">
                            <Calendar className="w-3 h-3 mr-1" />
                            {formatDate(analysis.createdAt)}
                          </span>
                          <Badge
                            className={getScoreColor(
                              analysis.result.scores.overall
                            )}
                          >
                            Score: {analysis.result.scores.overall}%
                          </Badge>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Link href={`/resume/${analysis.id}`}>
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4 mr-1" />
                          View
                        </Button>
                      </Link>
                      <DeleteResume resumeId={analysis.id} />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
