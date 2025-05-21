
import type { LucideProps } from 'lucide-react';
import {
  LayoutDashboard,
  FilePlus2,
  Users2,
  Beaker,
  Settings2,
  ChevronDown,
  ChevronRight,
  Moon,
  Sun,
  LogOut,
  User,
  HeartPulse,
  Menu,
  X,
  CalendarDays,
  ClipboardList,
  Ruler,
  FileText,
  ShieldCheck, 
  UserCog, 
  History,
  Stethoscope,
  TestTube2,
  NotebookText, 
  UploadCloud,
  DownloadCloud,
  Eye,
  EyeOff,
  Search,
  FileEdit,
  Trash2,
  MoreHorizontal,
  ActivitySquare,
  Github,
  Linkedin,
  Facebook,
  Twitter,
  KeyRound,
  Mail,
  PlusCircle,
  Printer, 
  Save,
} from 'lucide-react';

export const Icons = {
  LayoutDashboard,
  FilePlus2,
  Users2,
  Beaker,
  Settings2,
  ChevronDown,
  ChevronRight,
  Moon,
  Sun,
  LogOut,
  User,
  HeartPulse,
  Menu,
  X,
  CalendarDays,
  ClipboardList,
  Ruler,
  FileText,
  ShieldCheck, 
  UserCog, 
  History,
  Stethoscope,
  TestTube2,
  NotebookText,
  UploadCloud,
  DownloadCloud,
  Eye,
  EyeOff,
  Search,
  FileEdit,
  Trash2,
  MoreHorizontal,
  ActivitySquare,
  Github,
  Linkedin,
  Facebook,
  Twitter,
  KeyRound,
  Mail,
  PlusCircle,
  Printer,
  Save,
};

export type IconKeys = keyof typeof Icons;

interface IconProps extends LucideProps {
  name: IconKeys;
}

export const Icon = ({ name, ...props }: IconProps) => {
  const LucideIcon = Icons[name];
  if (!LucideIcon) {
    // Fallback icon or handle error
    return <HeartPulse {...props} />;
  }
  return <LucideIcon {...props} />;
};
