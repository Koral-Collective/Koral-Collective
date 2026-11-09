import { redirect } from "next/navigation";

import { ScheduleDashboard } from "@/components/admin/ScheduleDashboard";
import { isAdminPageSession } from "@/lib/admin-auth";

export const dynamic = "force-dynamic";

export default async function SchedulePage() {
  if (!(await isAdminPageSession())) redirect("/admin");
  return <ScheduleDashboard />;
}
