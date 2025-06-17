"use client";

import cuid from "cuid";
import { Button } from "@/components/ui/button";
import { inngest } from "@/inngest/client";
import { authClient } from "@/lib/auth-client";
import { FileText, UploadIcon, X } from "lucide-react";
import React, { useCallback, useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { getResumeStatus } from "@/lib/actions/resume";

const UploadResumeForm = () => {
  const router = useRouter();
  const resumeResultId = cuid();
  const { data: session } = authClient.useSession();
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);

    const files = Array.from(e.dataTransfer.files);
    const file = files[0];

    if (
      file &&
      (file.type === "application/pdf" || file.name.endsWith(".docx"))
    ) {
      setUploadedFile(file);
    }
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFile(file);
    }
  };

  const handleAnalyze = async () => {
    if (!uploadedFile) return;

    setIsAnalyzing(true);

    try {
      const userId = session?.user.id as string;
      const response = await fetch("/api/parse-resume", {
        method: "POST",
        headers: {
          "Content-Type": "application/pdf",
        },
        body: uploadedFile,
      });

      const { text } = await response.json();
      if (!text) {
        toast.error("Failed to parse resume. Please try a different file.");
        setIsAnalyzing(false);
        return;
      } else {
        const resumeScan = await inngest.send({
          name: "resume/scan",
          data: {
            resumeResultId,
            userId,
            resumeText: text,
          },
        });
        if (resumeScan.ids) {
          toast.success("Resume scan started...");

          const maxAttempts = 20;
          for (let i = 0; i < maxAttempts; i++) {
            const status = await getResumeStatus(resumeResultId);
            if (status === "done") {
              toast.success("Resume analysis complete!");
              router.push(`/resume/${resumeResultId}`);
              setIsAnalyzing(false);
              return;
            }
            await new Promise((res) => setTimeout(res, 2000));
          }

          toast.error("Scan timed out.");
        } else {
          toast.error("Failed to start resume analysis.");
          return;
        }
      }
    } catch (error) {
      console.error("Analysis failed:", error);
      setIsAnalyzing(false);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const removeFile = () => {
    setUploadedFile(null);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };
  return (
    <>
      {!uploadedFile ? (
        <div
          className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
            isDragOver
              ? "border-blue-400 bg-blue-50"
              : "border-gray-300 hover:border-gray-400"
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <UploadIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Drop your resume here
          </h3>
          <p className="text-gray-600 mb-4">or click to browse your files</p>
          <input
            type="file"
            accept=".pdf,.docx"
            onChange={handleFileSelect}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          <Button variant="outline">Choose File</Button>
          <p className="text-sm text-gray-500 mt-2">
            Supports PDF and DOCX files up to 10MB
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <FileText className="w-8 h-8 text-blue-600" />
              <div>
                <p className="font-medium text-gray-900">{uploadedFile.name}</p>
                <p className="text-sm text-gray-600">
                  {formatFileSize(uploadedFile.size)}
                </p>
              </div>
            </div>
            {!isAnalyzing && (
              <Button
                variant="ghost"
                size="sm"
                onClick={removeFile}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-4 h-4" />
              </Button>
            )}
          </div>

          <Button
            onClick={handleAnalyze}
            disabled={isAnalyzing}
            className="w-full bg-blue-600 hover:bg-blue-700"
            size="lg"
          >
            {isAnalyzing ? "Analyzing..." : "Analyze Resume"}
          </Button>
        </div>
      )}
    </>
  );
};

export default UploadResumeForm;
