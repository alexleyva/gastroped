
import type { NavItem } from "@/components/layout/sidebar-nav";
import type { IconKeys } from "@/components/icons";

export type SiteConfig = {
  name: string;
  description: string;
  mainNav: NavItem[];
};

export const siteConfig: SiteConfig = {
  name: "GastroKid Eval",
  description: "Una aplicación web integral para gestionar evaluaciones médicas en gastroenterología pediátrica.",
  mainNav: [
    {
      title: "Tablero",
      href: "/",
      icon: "LayoutDashboard" as IconKeys,
    },
    {
      title: "Nueva Evaluación",
      href: "/evaluations/new",
      icon: "FilePlus2" as IconKeys,
    },
    {
      title: "Registros de Pacientes",
      href: "/patients",
      icon: "Users2" as IconKeys,
    },
    {
      title: "Exámenes de Laboratorio",
      href: "/lab-exams",
      icon: "Beaker" as IconKeys,
    },
    {
      title: "Administración",
      href: "/administration",
      icon: "ShieldCheck" as IconKeys,
    },
    // { // This was removed in a previous step as per user request to avoid redundancy
    //   title: "Gestión de Usuarios",
    //   href: "/administration/user-management",
    //   icon: "UserCog" as IconKeys, 
    // },
    {
      title: "Gestión Documental",
      href: "/document-management/medical-certificate",
      icon: "NotebookText" as IconKeys,
    },
  ],
};

