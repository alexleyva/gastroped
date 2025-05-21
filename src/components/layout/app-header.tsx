"use client";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/icons";
// import { UserNav } from "./user-nav"; // Placeholder for user navigation/menu

export function AppHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center">
          <SidebarTrigger className="md:hidden" />
          {/* Optionally, add a breadcrumb component or page title here */}
        </div>
        <div className="flex items-center gap-x-2">
          {/* Placeholder for theme toggle or other actions */}
          {/* <Button variant="ghost" size="icon">
            <Icon name="Sun" className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Icon name="Moon" className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button> */}
          {/* <UserNav /> */}
        </div>
      </div>
    </header>
  );
}
