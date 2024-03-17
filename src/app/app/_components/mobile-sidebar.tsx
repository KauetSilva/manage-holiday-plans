"use client";

import {
  DashboardSidebar,
  DashboardSidebarMain,
  DashboardSidebarNav,
  DashboardSidebarNavMain,
  DashboardSidebarNavLink,
} from "@/components/dashboard/sidebar";
import { usePathname } from "next/navigation";
import { HomeIcon, MixerVerticalIcon, TableIcon } from "@radix-ui/react-icons";
import { Session } from "next-auth";
import { getServerSession } from "next-auth";


export async function MobileSidebar() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <DashboardSidebar className="bg-white w-full absolute inset-0 z-10 mt-24">
      <DashboardSidebarMain className="flex flex-col flex-grow">
        <DashboardSidebarNav>
          <DashboardSidebarNavMain>
            <DashboardSidebarNavLink href="/app" active={isActive("/app")}>
              <HomeIcon className="w-3 h-3 mr-3" />
              Holiday
            </DashboardSidebarNavLink>
            <DashboardSidebarNavLink
              href="/app/table"
              active={isActive("/app/table")}
            >
              <TableIcon className="w-3 h-3 mr-3" />
              Table
            </DashboardSidebarNavLink>
            <DashboardSidebarNavLink
              href="/app/about"
              active={isActive("/app/about")}
            >
              <MixerVerticalIcon className="w-3 h-3 mr-3" />
              About
            </DashboardSidebarNavLink>
          </DashboardSidebarNavMain>
        </DashboardSidebarNav>
      </DashboardSidebarMain>
    </DashboardSidebar>
  );
}
