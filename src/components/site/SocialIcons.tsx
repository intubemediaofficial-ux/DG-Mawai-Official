"use client";

import { useSiteContent } from "@/lib/useSiteContent";
import { AppleMusicIcon, FacebookIcon, InstagramIcon, SpotifyIcon, YoutubeIcon } from "./icons";

export default function SocialIcons({ size = 24, className = "" }: { size?: number; className?: string }) {
  const { socials } = useSiteContent().content;
  const items = [
    { href: socials.spotify, label: "Spotify", Icon: SpotifyIcon },
    { href: socials.youtube, label: "YouTube", Icon: YoutubeIcon },
    { href: socials.appleMusic, label: "Apple Music", Icon: AppleMusicIcon },
    { href: socials.facebook, label: "Facebook", Icon: FacebookIcon },
    { href: socials.instagram, label: "Instagram", Icon: InstagramIcon },
  ].filter((i) => i.href);
  return (
    <div className={`flex items-center gap-4 sm:gap-6 ${className}`}>
      {items.map(({ href, label, Icon }) => (
        <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="text-white transition hover:scale-110 hover:text-white/70">
          <Icon size={size} />
        </a>
      ))}
    </div>
  );
}
