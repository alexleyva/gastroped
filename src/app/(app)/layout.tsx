
"use client";

import type React from "react";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { MainLayout } from "@/components/layout/main-layout";
import { Skeleton } from "@/components/ui/skeleton"; // For loading state

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null); // null for loading state

  useEffect(() => {
    // Mock authentication check
    const authStatus = localStorage.getItem("isAuthenticated");
    if (authStatus === "true") {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
      // Allow access to /login even if trying to access an app route initially
      // This check might be more robust with a dedicated auth context/hook
      if (pathname !== "/login") { // Check current path to avoid redirect loop if already on login
         router.push("/login");
      }
    }
  }, [router, pathname]);

  if (isAuthenticated === null) {
    // Loading state: show a simple skeleton or loading message
    return (
      <div className="flex min-h-screen items-center justify-center bg-background p-4">
        <div className="w-full max-w-md space-y-6">
          <Skeleton className="h-10 w-1/3 mx-auto" />
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-6 w-2/3 mx-auto" />
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    // This case should ideally be handled by the redirect,
    // but as a fallback or if directly navigating to an (app) route without being auth'd.
    // Returning null or a minimal component can prevent rendering MainLayout for unauth users if redirect is pending.
    return null; 
  }

  return <MainLayout>{children}</MainLayout>;
}
