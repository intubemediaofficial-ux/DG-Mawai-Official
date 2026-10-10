"use client";

export default function Tabs<T extends string>({ tabs, value, onChange }: { tabs: { id: T; label: string }[]; value: T; onChange: (v: T) => void }) {
  return (
    <div className="border-b border-white/10">
      <div className="mx-auto flex max-w-md justify-center">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => onChange(t.id)}
            className={`relative px-6 pb-4 text-lg font-light transition sm:px-10 sm:text-xl ${value === t.id ? "text-white" : "text-white/55 hover:text-white"}`}
          >
            {t.label}
            <span className={`absolute inset-x-0 -bottom-px h-[2px] bg-accent transition-transform duration-300 ${value === t.id ? "scale-x-100" : "scale-x-0"}`} />
          </button>
        ))}
      </div>
    </div>
  );
}
