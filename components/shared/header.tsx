import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Link from "next/link";
import UserDropdown from "./user-dropdown";

const Header = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">RS</span>
            </div>
            <span className="text-xl font-semibold text-gray-900">
              Resume Scan AI
            </span>
          </Link>

          <div className="flex items-center space-x-4">
            {session ? (
              <>
                <UserDropdown />
                <Link href="/upload">
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    Upload Resume
                  </Button>
                </Link>
              </>
            ) : (
              <>
                <Link href="/sign-in">
                  <Button variant="outline" className="mr-2">
                    Sign In
                  </Button>
                </Link>
                <Link href="/sign-up">
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
