export type SitePhoto = {
  src: string;
  label: string;
  category: string;
  hero?: boolean;
  large?: boolean;
};

export type SiteSong = {
  title: string;
  plays: string;
  year: string;
  duration: string;
  trending: boolean;
};

export type SiteEvent = {
  title: string;
  date: string;
  time: string;
  venue: string;
  city: string;
  status: string;
  price: string;
  ticketUrl?: string;
};

export type SiteSocials = {
  instagram: string;
  facebook: string;
  youtube: string;
  spotify: string;
  appleMusic: string;
  jiosaavn: string;
};

export type SiteVideo = {
  title: string;
  image: string;
  url: string;
  views: string;
  duration: string;
};

export type SiteContent = {
  hero: {
    badge: string;
    title: string;
    highlight: string;
    tagline: string;
    stats: { value: string; label: string }[];
  };
  about: {
    eyebrow: string;
    title: string;
    highlight: string;
    intro: string;
    heading: string;
    paragraphs: string[];
    image: string;
  };
  photos: SitePhoto[];
  songs: SiteSong[];
  releases: { title: string; status: string; year: string }[];
  videos: SiteVideo[];
  events: SiteEvent[];
  pastEvents: { city: string; event: string }[];
  achievements: { value: string; label: string }[];
  bookingInfo: string[];
  socials: SiteSocials;
  contact: {
    email: string;
    whatsapp: string;
    phone: string;
    location: string;
  };
};

export const defaultContent: SiteContent = {
  hero: {
    badge: "Rajasthani Rasiya Singer",
    title: "DG",
    highlight: "Mawai",
    tagline:
      "The Voice of Rajasthan. Viral Rasiya hits, energetic live shows, traditional folk style, and professional event bookings across India.",
    stats: [
      { value: "120K+", label: "Monthly Listeners" },
      { value: "50+", label: "Songs Released" },
      { value: "10M+", label: "Total Streams" },
      { value: "500+", label: "Live Shows" },
    ],
  },
  about: {
    eyebrow: "Biography",
    title: "About",
    highlight: "DG Mawai",
    intro:
      "From folk roots to viral Rasiya songs, DG Mawai brings the sound of Rajasthan to fans and live stages across India.",
    heading: "The Voice of Chambal & Rajasthan",
    image: "/images/dg-mawai/photo-08.jpg",
    paragraphs: [
      "DG Mawai is a Rajasthani Rasiya singer known for his powerful voice, energetic stage presence, and folk-inspired music style. His songs connect deeply with audiences who love Gurjar, Rajasthani, and Chambal-region folk culture.",
      "With viral songs such as Tum Badal Gaye Raja, Chhori Teri Chal Morni Ki Dhal, and Camper Mein Baithe Gunde, DG Mawai has built a strong identity among Rasiya music fans.",
      "From village celebrations and cultural programs to large public stages, DG Mawai brings a complete professional performance experience for weddings, festivals, concerts, and private shows.",
    ],
  },
  photos: [
    { src: "/images/dg-mawai/photo-02.jpg", label: "Riverside Portrait", category: "Photoshoot", hero: true, large: true },
    { src: "/images/dg-mawai/photo-04.jpg", label: "Live Performance", category: "Stage", hero: true },
    { src: "/images/dg-mawai/photo-06.jpg", label: "Music Community Event", category: "Live", hero: true },
    { src: "/images/dg-mawai/photo-08.jpg", label: "Rajasthani Look", category: "Portrait", hero: true },
    { src: "/images/dg-mawai/photo-10.jpg", label: "Outdoor Photoshoot", category: "Artist", hero: true },
    { src: "/images/dg-mawai/photo-12.jpg", label: "Celebration Moment", category: "Event", large: true },
    { src: "/images/dg-mawai/photo-01.jpg", label: "Artist Style", category: "Portrait" },
    { src: "/images/dg-mawai/photo-03.jpg", label: "Traditional Shoot", category: "Culture" },
    { src: "/images/dg-mawai/photo-05.jpg", label: "Studio Look", category: "Portrait" },
    { src: "/images/dg-mawai/photo-07.jpg", label: "Roadside Portrait", category: "Artist" },
    { src: "/images/dg-mawai/photo-09.jpg", label: "Folk Look", category: "Culture" },
    { src: "/images/dg-mawai/photo-11.jpg", label: "Royal Style", category: "Portrait" },
  ],
  songs: [
    { title: "Tum Badal Gaye Raja Aa Gayi Kami Tere Pyar Me", plays: "799K+", year: "2024", duration: "4:49", trending: true },
    { title: "Chhori Teri Chal Morni Ki Dhal", plays: "583K+", year: "2024", duration: "5:22", trending: true },
    { title: "Camper Mein Baithe Gunde", plays: "364K+", year: "2024", duration: "4:31", trending: true },
    { title: "Surme Paida Hote H Yha Chambal Ke Pani Me", plays: "160K+", year: "2025", duration: "3:23", trending: false },
    { title: "Kabutar Bole Gutar Gu", plays: "150K+", year: "2024", duration: "4:15", trending: false },
    { title: "Gurjar Ke Pyar Tero Nas Nas Me", plays: "120K+", year: "2024", duration: "4:02", trending: false },
  ],
  releases: [
    { title: "Mhari Tod De N Maal (EP)", status: "Latest Release", year: "2026" },
    { title: "New Rasiya 2026", status: "Coming Soon", year: "2026" },
    { title: "Jo Pike Redbull Ghume", status: "Released", year: "2025" },
  ],
  videos: [
    { title: "DG Mawai Nonstop Rasiya Jukebox", image: "/images/dg-mawai/photo-04.jpg", url: "https://www.youtube.com/watch?v=-aI_8bTTJBE", views: "Trending", duration: "26:39" },
    { title: "Chhori Teri Chal Morni Ki Dhal - DG Mawai", image: "/images/dg-mawai/photo-06.jpg", url: "https://www.youtube.com/@DGMawaiofficial", views: "500K+ Views", duration: "5:22" },
    { title: "Kabutar Bole Gutar Gu - New DJ Dance", image: "/images/dg-mawai/photo-12.jpg", url: "https://www.youtube.com/@DGMawaiofficial", views: "300K+ Views", duration: "4:15" },
    { title: "Camper Mein Baithe Gunde - DG Mawai", image: "/images/dg-mawai/photo-08.jpg", url: "https://www.youtube.com/@DGMawaiofficial", views: "360K+ Views", duration: "4:31" },
    { title: "Surme Paida Hote H Yha Chambal Ke Pani Me", image: "/images/dg-mawai/photo-02.jpg", url: "https://www.youtube.com/@DGMawaiofficial", views: "160K+ Views", duration: "3:23" },
    { title: "Tum Badal Gaye Raja - Latest Rasiya 2025", image: "/images/dg-mawai/photo-10.jpg", url: "https://www.youtube.com/@DGMawaiofficial", views: "800K+ Views", duration: "4:49" },
  ],
  events: [
    { title: "Live Rasiya Night", date: "15 July 2026", time: "8:00 PM", venue: "Rajasthan Cultural Center", city: "Jaipur, Rajasthan", status: "Tickets Available", price: "From ₹499" },
    { title: "Gurjar Mahotsav 2026", date: "22 July 2026", time: "7:00 PM", venue: "Community Ground", city: "Bharatpur, Rajasthan", status: "Tickets Available", price: "From ₹299" },
    { title: "Independence Day Special Show", date: "15 August 2026", time: "6:00 PM", venue: "Stadium Ground", city: "Agra, UP", status: "Coming Soon", price: "TBA" },
    { title: "Navratri Rasiya Utsav", date: "October 2026", time: "7:30 PM", venue: "Main Stage", city: "Mathura, UP", status: "Coming Soon", price: "TBA" },
  ],
  pastEvents: [
    { city: "Jaipur", event: "Rajasthan Folk Festival 2025" },
    { city: "Delhi", event: "Gurjar Sammelan 2025" },
    { city: "Agra", event: "New Year Celebration 2025" },
    { city: "Bharatpur", event: "Republic Day Show 2025" },
    { city: "Mathura", event: "Holi Special 2025" },
    { city: "Gwalior", event: "Chambal Mahotsav 2024" },
  ],
  achievements: [
    { value: "120K+", label: "Spotify Listeners" },
    { value: "50+", label: "Songs Released" },
    { value: "Viral", label: "Trending Hits" },
    { value: "500+", label: "Live Shows" },
  ],
  bookingInfo: [
    "Available for weddings, corporate events, and concerts",
    "Advance booking recommended (2-4 weeks)",
    "Pan-India availability for shows",
  ],
  socials: {
    instagram: "https://www.instagram.com/dg_mavi_gurjar",
    facebook: "https://www.facebook.com/share/1JTfAQTZBb/",
    youtube: "https://www.youtube.com/@DGMawaiofficial",
    spotify: "https://open.spotify.com/artist/4uLGJavHBsutDtDOzNG18s",
    appleMusic: "https://music.apple.com/us/artist/dg-mawai/1576320122",
    jiosaavn: "https://www.jiosaavn.com/artist/singer-dg-mawai-songs/EvakEmixp8U_",
  },
  contact: {
    email: "Dgmawaiofficial@gmail.com",
    whatsapp: "919999999999",
    phone: "",
    location: "Rajasthan, India",
  },
};
