import { redirect } from "next/navigation";

import { isAdminPageSession } from "@/lib/admin-auth";
import { AdminLogin } from "@/components/admin/AdminLogin";

export const dynamic = "force-dynamic";

export default async function AdminLoginPage() {
  if (await isAdminPageSession()) redirect("/schedule");
  return <AdminLogin />;
}
