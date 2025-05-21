import type React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { IconKeys } from "@/components/icons";
import { Icon } from "@/components/icons";

interface SectionCardProps {
  title: string;
  description?: string;
  iconName?: IconKeys;
  children: React.ReactNode;
  className?: string;
}

export function SectionCard({ title, description, iconName, children, className }: SectionCardProps) {
  return (
    <Card className={`shadow-md ${className}`}>
      <CardHeader className="flex flex-row items-start space-x-4 pb-4">
        {iconName && <Icon name={iconName} className="h-8 w-8 text-primary mt-1" />}
        <div>
          <CardTitle className="text-2xl font-semibold">{title}</CardTitle>
          {description && <CardDescription className="text-sm">{description}</CardDescription>}
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {children}
      </CardContent>
    </Card>
  );
}
