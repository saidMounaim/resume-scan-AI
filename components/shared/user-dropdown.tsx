"use client";

import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { authClient } from "@/lib/auth-client";
import { Button } from "../ui/button";
import Link from "next/link";
import { FileText, LogOut } from "lucide-react";
import { getUserInitials } from "@/lib/utils";
import { useRouter } from "next/navigation";

const UserDropdown = () => {
  const router = useRouter();

  const { data: session } = authClient.useSession();

  if (!session) return null;

  const userInitials = getUserInitials(session?.user?.name);
  const avatarUrl = `https://avatar.vercel.sh/${userInitials}.svg?text=${userInitials}`;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full">
          <Avatar className="h-10 w-10">
            <AvatarImage src={avatarUrl} alt={`User`} />
            <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white font-semibold">
              {userInitials}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-56 bg-white border border-gray-200 shadow-lg"
        align="end"
        forceMount
      >
        <div className="flex items-center justify-start gap-2 p-2">
          <div className="flex flex-col space-y-1 leading-none">
            <p className="font-medium text-gray-900">{`${session?.user.name}`}</p>
            <p className="w-[200px] truncate text-sm text-gray-600">
              {session?.user.email}
            </p>
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link
            href="/dashboard"
            className="flex items-center text-blue-600 hover:text-blue-600! hover:bg-transparent!"
          >
            <FileText className="mr-2 h-4 w-4 text-blue-600" />
            Dashboard
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="flex items-center text-red-600 focus:text-red-600 hover:bg-transparent!"
          onClick={async () => {
            await authClient.signOut({
              fetchOptions: {
                onSuccess: () => {
                  router.push("/sign-in");
                },
              },
            });
          }}
        >
          <LogOut className="mr-2 h-4 w-4 text-blue" />
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserDropdown;
