import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import BookingForm from "@/components/site/BookingForm";
import PageHeader from "@/components/site/PageHeader";
import { getContent } from "@/lib/store";

export const dynamic = "force-dynamic";
export function generateMetadata(): Promise<Metadata> {
  return pageMetadata("contact", "/contact");
}

export default async function ContactPage() {
  const { contact, bookingInfo, texts } = await getContent();
  const rows = [
    { label: "Email", value: contact.email, href: `mailto:${contact.email}` },
    { label: "WhatsApp", value: `+${contact.whatsapp}`, href: `https://wa.me/${contact.whatsapp}` },
    contact.phone ? { label: "Phone", value: contact.phone, href: `tel:${contact.phone}` } : null,
    { label: "Based in", value: contact.location },
  ].filter(Boolean) as { label: string; value: string; href?: string }[];

  return (
    <>
      <PageHeader eyebrow={texts.bookEyebrow} title={texts.bookTitle} />
      <div className="mx-auto grid max-w-6xl gap-16 px-5 pb-40 pt-10 sm:px-10 lg:grid-cols-[1fr_1.6fr] lg:gap-24">
        <aside className="fade-up space-y-10">
          {rows.map((r) => (
            <div key={r.label}>
              <p className="nav-link text-[10px] uppercase text-muted">{r.label}</p>
              {r.href ? (
                <a href={r.href} target="_blank" rel="noopener noreferrer" className="mt-2 block break-all text-xl font-light text-white hover:text-white/70">{r.value}</a>
              ) : (
                <p className="mt-2 text-xl font-light text-white">{r.value}</p>
              )}
            </div>
          ))}
          <ul className="space-y-3 border-t border-white/10 pt-8">
            {bookingInfo.map((b, i) => (
              <li key={i} className="font-light leading-relaxed text-white/65">— {b}</li>
            ))}
          </ul>
        </aside>
        <div className="fade-up">
          <BookingForm />
        </div>
      </div>
    </>
  );
}
