import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const Hero = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 mb-6">
          Get Smart Feedback on Your Resume in{" "}
          <span className="text-blue-600">Seconds</span>
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Upload your resume and get AI-powered analysis with actionable
          feedback to help you land your dream job.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/upload">
            <Button
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 px-8 py-3 text-lg"
            >
              Upload Resume
            </Button>
          </Link>
          <Button variant="outline" size="lg" className="px-8 py-3 text-lg">
            View Sample Analysis
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
