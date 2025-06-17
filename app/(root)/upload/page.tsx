import UploadResumeForm from "@/components/shared/forms/upload-resume-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function UploadPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) redirect("/sign-in");
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Upload Your Resume
          </h1>
          <p className="text-lg text-gray-600">
            Get AI-powered feedback in seconds. Supports PDF and DOCX files.
          </p>
        </div>

        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle>Resume Upload</CardTitle>
            <CardDescription>
              Upload your resume to get personalized feedback and suggestions
              for improvement.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <UploadResumeForm />
          </CardContent>
        </Card>

        {/* Instructions */}
        <Card className="mt-8 border-0 shadow-sm">
          <CardContent className="pt-6">
            <h3 className="font-medium text-gray-900 mb-3">
              Tips for best results:
            </h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-start">
                <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                Upload a well-formatted PDF or DOCX file
              </li>
              <li className="flex items-start">
                <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                Ensure all text is readable and not in image format
              </li>
              <li className="flex items-start">
                <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                Include complete work experience and education sections
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
