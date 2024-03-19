"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { HomeIcon, LockClosedIcon, TableIcon } from "@radix-ui/react-icons";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import NextLink from "next/link";

type UserDropdownProps = {
  user: Session["user"];
};

export function UserDropdownMobile({ user }: UserDropdownProps) {
  if (!user) return;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="absolute right-[40%] h-[10rem]">
          <Button
            variant="link"
            className="absolute h-8 flex items-center justify-between space-x-2 ml-auto mt-[1rem]"
          >
            <div className="flex flex-col flex-1 space-y-1 text-right">
              {user.name && (
                <p className="text-sm font-medium leading-none">
                  {user.name.length > 10
                    ? `${user.name.substring(0, 10)}...`
                    : user.name}
                </p>
              )}
            </div>
            <Avatar className="h-8 w-8 ">
              <AvatarImage
                src={user.image as string}
                alt={user.name as string}
              />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
          </Button>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-56 mt-[-7rem] mr-10"
        align="start"
        forceMount
      >
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
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <NextLink href="/app" passHref>
            <DropdownMenuItem>
              <HomeIcon className="w-4 h-4 mr-3" />
              Holiday
            </DropdownMenuItem>
          </NextLink>
          <NextLink href="/app/table" passHref>
            <DropdownMenuItem>
              <TableIcon className="w-4 h-4 mr-3" />
              Table
            </DropdownMenuItem>
          </NextLink>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => signOut()}>
          <LockClosedIcon className="w-3 h-3 mr-3" />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
