"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {
  LockClosedIcon
} from "@radix-ui/react-icons";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";

type UserDropdownProps = {
  user: Session["user"];
};

export function UserDropdown({ user }: UserDropdownProps) {
  if (!user) return;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="link"
          className="relative h-8 flex items-center justify-between w-full space-x-2 !px-0"
        >
          <Avatar className="h-8 w-8">
            <AvatarImage src={user.image as string} alt={user.name as string} />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>

          <div className="flex flex-col flex-1 space-y-1 text-left">
            {user.name && (
              <p className="text-sm font-medium leading-none">
                {user.name.length > 20
                  ? `${user.name.substring(0, 20)}...`
                  : user.name}
              </p>
            )}
            {user.email && (
              <p className="text-xs leading-none text-muted-foreground">
                {user.email.length > 20
                  ? `${user.email.substring(0, 20)}...`
                  : user.email}
              </p>
            )}
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
          {user.name && (
              <p className="text-sm font-medium leading-none">
                {user.name.length > 25
                  ? `${user.name.substring(0, 25)}...`
                  : user.name}
              </p>
            )}
            {user.email && (
              <p className="text-xs leading-none text-muted-foreground">
                {user.email.length > 25
                  ? `${user.email.substring(0, 25)}...`
                  : user.email}
              </p>
            )}
          </div>
        </DropdownMenuLabel>
        <DropdownMenuItem onClick={() => signOut()}>
          <LockClosedIcon className="w-3 h-3 mr-3" />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
