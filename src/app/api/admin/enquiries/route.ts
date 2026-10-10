import { getSession, unauthorized } from "@/lib/auth";
import { listEnquiries, updateEnquiry, type EnquiryStatus } from "@/lib/store";

const STATUSES: EnquiryStatus[] = ["new", "contacted", "confirmed", "closed"];

export async function GET() {
  if (!(await getSession())) return unauthorized();
  return Response.json(await listEnquiries());
}

export async function PATCH(request: Request) {
  if (!(await getSession())) return unauthorized();
  const { id, status, note } = (await request.json().catch(() => ({}))) as { id?: string; status?: EnquiryStatus; note?: string };
  if (!id) return Response.json({ error: "Missing id" }, { status: 400 });
  const patch: { status?: EnquiryStatus; note?: string } = {};
  if (status && STATUSES.includes(status)) patch.status = status;
  if (typeof note === "string") patch.note = note.slice(0, 2000);
  const updated = await updateEnquiry(id, patch);
  if (!updated) return Response.json({ error: "Not found" }, { status: 404 });
  return Response.json(updated);
}
