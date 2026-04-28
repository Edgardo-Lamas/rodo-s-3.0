import { auth } from "@/auth";
import { redirect } from "next/navigation";
import AdminDashboard from "./AdminDashboard";

export default async function AdminPage() {
  const session = await auth();
  if ((session?.user as { rol?: string })?.rol !== "admin") redirect("/admin/login");
  return <AdminDashboard />;
}
