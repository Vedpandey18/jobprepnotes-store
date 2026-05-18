import type { ReactNode } from "react";
import { AdminSidebar } from "@/components/admin/AdminSidebar";

export default function AdminPanelLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-[calc(100vh-5rem)] flex-col bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(124,58,237,0.12),transparent)] dark:bg-[radial-gradient(ellipse_80%_40%_at_50%_-10%,rgba(124,58,237,0.15),transparent)] lg:flex-row">
      <AdminSidebar />
      <div className="min-w-0 flex-1 px-4 py-8 pb-16 dark:bg-slate-950/30 lg:px-10 lg:py-10">
        {children}
      </div>
    </div>
  );
}
