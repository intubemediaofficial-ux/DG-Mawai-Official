export default function PageHeader({ eyebrow, title }: { eyebrow?: string; title?: string }) {
  if (!eyebrow && !title) return <div className="h-28 sm:h-36" />;
  return (
    <div className="px-5 pb-10 pt-32 text-center sm:pt-40">
      {eyebrow && <p className="nav-link fade-up text-[10px] uppercase text-gold sm:text-xs">{eyebrow}</p>}
      {title && <h1 className="fade-up mt-4 text-4xl font-extralight text-white sm:text-6xl">{title}</h1>}
    </div>
  );
}
