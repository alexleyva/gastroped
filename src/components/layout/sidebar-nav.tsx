
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import type { IconKeys } from "@/components/icons";
import { Icon } from "@/components/icons";

export interface NavItem {
  title: string;
  href: string;
  disabled?: boolean;
  external?: boolean;
  icon?: IconKeys;
  label?: string;
  description?: string;
}

interface SidebarNavProps {
  items: NavItem[];
}

export function SidebarNav({ items }: SidebarNavProps) {
  const pathname = usePathname();

  if (!items?.length) {
    return null;
  }

  return (
    <SidebarMenu>
      {items.map((item, index) => {
        const IconComponent = item.icon ? Icon : null;
        const isActive = pathname === item.href;

        return item.href ? (
          <SidebarMenuItem key={index}>
            <Link href={item.href} passHref legacyBehavior>
              <SidebarMenuButton
                asChild
                isActive={isActive}
                tooltip={item.title} // Tooltip will use the translated title from siteConfig
                className={cn(
                  "w-full justify-start",
                  isActive && "bg-sidebar-accent text-sidebar-accent-foreground",
                  item.disabled && "cursor-not-allowed opacity-80"
                )}
                disabled={item.disabled}
              >
                <a>
                  {IconComponent && item.icon && <IconComponent name={item.icon} className="mr-2 h-4 w-4 flex-shrink-0" />}
                  <span className="truncate group-data-[collapsible=icon]:hidden">{item.title}</span>
                </a>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
        ) : (
          <span
            key={index}
            className={cn(
              "flex w-full cursor-not-allowed items-center rounded-md p-2 opacity-60 group-data-[collapsible=icon]:justify-center",
              "hover:no-underline"
            )}
          >
            {IconComponent && item.icon && <IconComponent name={item.icon} className="mr-2 h-4 w-4" />}
            <span className="group-data-[collapsible=icon]:hidden">{item.title}</span>
          </span>
        );
      })}
    </SidebarMenu>
  );
}

