"use client";

import type React from "react";
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarTrigger,
  SidebarInset,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { SidebarNav } from "./sidebar-nav";
import { AppHeader } from "./app-header";
import { siteConfig } from "@/config/site";
import { Icon } from "@/components/icons";

export function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider defaultOpen >
      <Sidebar variant="sidebar" collapsible="icon" className="border-r">
        <SidebarHeader className="p-4 flex items-center gap-2">
          <Icon name="ActivitySquare" className="w-8 h-8 text-primary" />
          <h1 className="font-semibold text-xl text-primary group-data-[collapsible=icon]:hidden">
            {siteConfig.name}
          </h1>
        </SidebarHeader>
        <SidebarContent className="p-2">
          <SidebarNav items={siteConfig.mainNav} />
        </SidebarContent>
        <SidebarFooter className="p-2">
          {/* Example Footer Item */}
          {/* <SidebarMenuButton tooltip="User Profile" className="mt-auto">
            <Icon name="User" />
            User Name
          </SidebarMenuButton> */}
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <AppHeader />
        <main className="flex-1 p-4 md:p-6 lg:p-8">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
