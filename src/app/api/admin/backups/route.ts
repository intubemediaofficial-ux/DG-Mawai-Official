import { revalidatePath } from "next/cache";
import { getSession, unauthorized } from "@/lib/auth";
import { listBackups, restoreBackup } from "@/lib/store";

export async function GET() {
  if (!(await getSession())) return unauthorized();
  return Response.json(await listBackups());
}

export async function POST(request: Request) {
  if (!(await getSession())) return unauthorized();
  const { name } = (await request.json().catch(() => ({}))) as { name?: string };
  if (!name || !(await restoreBackup(name))) return Response.json({ error: "Backup not found" }, { status: 404 });
  revalidatePath("/", "layout");
  return Response.json({ ok: true });
}
