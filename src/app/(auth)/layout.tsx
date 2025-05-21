import type React from "react";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-blue-100 via-indigo-50 to-purple-100 p-4">
      {children}
    </div>
  );
}
