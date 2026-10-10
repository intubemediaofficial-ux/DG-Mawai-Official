"use client";

import { useSiteContent } from "@/lib/useSiteContent";
import { Mail, Heart } from "lucide-react";

export default function Footer() {
  const { content } = useSiteContent();
  return (
    <footer className="bg-[#0a0a0a] border-t border-[#2a2a2a] pt-12 pb-6 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-bold gradient-gold mb-3">DG Mawai</h3>
            <p className="text-gray-400 text-sm max-w-sm mb-4">
              Rajasthani Rasiya Singer | The Voice of Chambal | Available for
              live shows, weddings, and events across India.
            </p>
            {/* Social Links */}
            <div className="flex items-center gap-4">
              <a
                href={content.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[#141414] border border-[#2a2a2a] flex items-center justify-center text-gray-400 hover:text-pink-400 hover:border-pink-400/50 transition-colors"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
              </a>
              <a
                href={content.socials.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[#141414] border border-[#2a2a2a] flex items-center justify-center text-gray-400 hover:text-blue-400 hover:border-blue-400/50 transition-colors"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              <a
                href={content.socials.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[#141414] border border-[#2a2a2a] flex items-center justify-center text-gray-400 hover:text-red-400 hover:border-red-400/50 transition-colors"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
              <a
                href={content.socials.spotify}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[#141414] border border-[#2a2a2a] flex items-center justify-center text-gray-400 hover:text-green-400 hover:border-green-400/50 transition-colors"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
                </svg>
              </a>
              <a
                href={`mailto:${content.contact.email}`}
                className="w-10 h-10 rounded-full bg-[#141414] border border-[#2a2a2a] flex items-center justify-center text-gray-400 hover:text-[#d4af37] hover:border-[#d4af37]/50 transition-colors"
              >
                <Mail size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="#about"
                  className="text-gray-400 hover:text-[#d4af37] transition-colors"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#music"
                  className="text-gray-400 hover:text-[#d4af37] transition-colors"
                >
                  Music
                </a>
              </li>
              <li>
                <a
                  href="#videos"
                  className="text-gray-400 hover:text-[#d4af37] transition-colors"
                >
                  Videos
                </a>
              </li>
              <li>
                <a
                  href="#events"
                  className="text-gray-400 hover:text-[#d4af37] transition-colors"
                >
                  Events
                </a>
              </li>
              <li>
                <a
                  href="#gallery"
                  className="text-gray-400 hover:text-[#d4af37] transition-colors"
                >
                  Gallery
                </a>
              </li>
              <li>
                <a
                  href="#booking"
                  className="text-gray-400 hover:text-[#d4af37] transition-colors"
                >
                  Book Show
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-white mb-4">Contact</h4>
            <ul className="space-y-2 text-sm">
              <li className="text-gray-400">
                <span className="text-[#d4af37]">Email:</span>{" "}
                {content.contact.email}
              </li>
              <li className="text-gray-400">
                <span className="text-[#d4af37]">For Bookings:</span> Contact
                via WhatsApp
              </li>
              <li className="text-gray-400">
                <span className="text-[#d4af37]">Location:</span> Rajasthan,
                India
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-[#2a2a2a] pt-6 text-center">
          <p className="text-sm text-gray-500 flex items-center justify-center gap-1">
            &copy; {new Date().getFullYear()} DG Mawai. All Rights Reserved.
            Made with <Heart size={12} className="text-red-500" /> in India
          </p>
        </div>
      </div>
    </footer>
  );
}
