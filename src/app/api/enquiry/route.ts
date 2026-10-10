import { addEnquiry } from "@/lib/store";

const clean = (v: unknown, max = 200) => (typeof v === "string" ? v.trim().slice(0, max) : "");

export async function POST(request: Request) {
  const body = (await request.json().catch(() => ({}))) as Record<string, unknown>;
  if (clean(body.website)) return Response.json({ ok: true });
  const type = body.type === "ticket" || body.type === "contact" ? body.type : "booking";
  const name = clean(body.name, 120);
  const phone = clean(body.phone, 30);
  if (!name || !phone) return Response.json({ error: "Name and phone are required" }, { status: 400 });
  const enquiry = await addEnquiry({
    type,
    name,
    phone,
    email: clean(body.email, 160),
    city: clean(body.city, 120),
    eventType: clean(body.eventType, 120),
    eventDate: clean(body.eventDate, 40),
    eventTitle: clean(body.eventTitle, 200),
    tickets: Math.max(0, Math.min(50, Number(body.tickets) || 0)),
    message: clean(body.message, 2000),
  });
  return Response.json({ ok: true, id: enquiry.id });
}
