"use client";

import { useState } from "react";
import { ChevronRight, Flame } from "lucide-react";
import { useSiteContent } from "@/lib/useSiteContent";
import { AppleMusicIcon, SpotifyIcon, YoutubeIcon } from "./icons";
import Tabs from "./Tabs";

function Platforms({ youtube, spotify, apple }: { youtube: string; spotify: string; apple: string }) {
  const items = [
    { href: spotify, Icon: SpotifyIcon, label: "Spotify" },
    { href: youtube, Icon: YoutubeIcon, label: "YouTube" },
    { href: apple, Icon: AppleMusicIcon, label: "Apple Music" },
  ].filter((i) => i.href);
  return (
    <div className="flex items-center gap-4 sm:gap-6">
      {items.map(({ href, Icon, label }) => (
        <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="text-white/45 transition hover:text-white">
          <Icon size={26} />
        </a>
      ))}
      <a href={youtube || spotify} target="_blank" rel="noopener noreferrer" aria-label="Open" className="text-white/45 transition hover:text-white">
        <ChevronRight size={20} />
      </a>
    </div>
  );
}

export default function MusicList() {
  const { content } = useSiteContent();
  const [tab, setTab] = useState<"songs" | "releases">("songs");
  const s = content.socials;

  return (
    <>
      <Tabs tabs={[{ id: "songs", label: "Songs" }, { id: "releases", label: "Releases" }]} value={tab} onChange={setTab} />
      <div className="mx-auto max-w-6xl px-5 pb-40 sm:px-10">
        {tab === "songs" &&
          content.songs.map((song, i) => (
            <div key={i} className="reveal flex flex-col gap-5 border-b border-white/[0.06] py-10 sm:flex-row sm:items-center sm:justify-between sm:py-14">
              <div className="min-w-0">
                <p className="text-3xl font-extralight leading-tight text-white sm:text-[2.6rem]">{song.title}</p>
                <p className="mt-2 flex flex-wrap items-center gap-x-3 text-sm font-light text-muted">
                  {song.trending && <span className="inline-flex items-center gap-1 text-accent"><Flame size={14} /> Trending</span>}
                  <span>{[song.plays && `${song.plays} plays`, song.year, song.duration].filter(Boolean).join(" · ")}</span>
                </p>
              </div>
              <Platforms youtube={song.youtube || s.youtube} spotify={song.spotify || s.spotify} apple={song.apple || s.appleMusic} />
            </div>
          ))}
        {tab === "releases" &&
          content.releases.map((r, i) => (
            <div key={i} className="reveal flex flex-col gap-5 border-b border-white/[0.06] py-10 sm:flex-row sm:items-center sm:justify-between sm:py-14">
              <div>
                <p className="text-3xl font-extralight text-white sm:text-[2.6rem]">{r.title}</p>
                <p className="mt-2 text-sm font-light text-muted">
                  <span className={/soon|upcoming/i.test(r.status) ? "text-gold" : ""}>{r.status}</span> · {r.year}
                </p>
              </div>
              <Platforms youtube={s.youtube} spotify={s.spotify} apple={s.appleMusic} />
            </div>
          ))}
      </div>
    </>
  );
}
