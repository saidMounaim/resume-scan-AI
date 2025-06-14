import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const CTA = () => {
  return (
    <section className="py-20 bg-blue-500">
      <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-white mb-4">
          Ready to Optimize Your Resume?
        </h2>
        <p className="text-xl text-blue-100 mb-8">
          Join thousands of professionals {"who've"} improved their resumes with
          our AI
        </p>
        <Link href="/upload">
          <Button
            size="lg"
            className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 text-lg"
          >
            Get Started for Free
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default CTA;
