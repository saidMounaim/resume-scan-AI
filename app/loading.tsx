import { Loader2 } from "lucide-react";

export default function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <Loader2 className="w-12 h-12 text-blue-500 animate-spin" />
      <span className="sr-only">Loading...</span>
    </div>
  );
}
