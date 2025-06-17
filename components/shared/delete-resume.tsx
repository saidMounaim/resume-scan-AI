"use client";

import React from "react";
import { Button } from "../ui/button";
import { deleteResumeById } from "@/lib/actions/resume";
import { Trash2 } from "lucide-react";

const DeleteResume = ({ resumeId }: { resumeId: string }) => {
  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={async () => {
        if (
          confirm(
            "Are you sure you want to delete this resume? This action cannot be undone."
          )
        ) {
          const response = await deleteResumeById(resumeId);
          if (response.success) {
            window.location.reload();
          }
        }
      }}
      className="text-red-600 hover:text-red-700 hover:bg-red-50"
    >
      <Trash2 className="w-4 h-4" />
    </Button>
  );
};

export default DeleteResume;
