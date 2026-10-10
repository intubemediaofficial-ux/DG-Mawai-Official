export type SitePhoto = {
  src: string;
  label: string;
  category: string;
  hero?: boolean;
  large?: boolean;
  focus?: string;
};

export type SiteSong = {
  title: string;
  plays: string;
  year: string;
  duration: string;
  trending: boolean;
  youtube?: string;
  spotify?: string;
  apple?: string;
};

export type TicketTier = {
  name: string;
  price: string;
  soldOut?: boolean;
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
  image?: string;
  description?: string;
  tickets?: TicketTier[];
};

export type SiteRelease = {
  title: string;
  status: string;
  year: string;
  youtube?: string;
  spotify?: string;
  apple?: string;
};

export type SiteTexts = {
  navHome: string;
  navMusic: string;
  navPerformance: string;
  navMore: string;
  navBook: string;
  footer: string;
  homeVideosTitle: string;
  homeNextShow: string;
  homeAllShows: string;
  bookCta: string;
  musicSongsTab: string;
  musicReleasesTab: string;
  showsUpcomingTab: string;
  showsArchivesTab: string;
  noShows: string;
  performedLabel: string;
  getTickets: string;
  requestTickets: string;
  soldOut: string;
  aboutMilestones: string;
  aboutMoments: string;
  aboutUpcoming: string;
  aboutCta: string;
  bookEyebrow: string;
  bookTitle: string;
  bookButton: string;
  eventTypes: string[];
};

export type PageSeo = { title: string; description: string };
export type SeoPage = "home" | "music" | "performance" | "about" | "contact";

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
  releases: SiteRelease[];
  videos: SiteVideo[];
  events: SiteEvent[];
  pastEvents: { city: string; event: string; venue?: string; date?: string }[];
  achievements: { value: string; label: string }[];
  bookingInfo: string[];
  socials: SiteSocials;
  contact: {
    email: string;
    whatsapp: string;
    phone: string;
    location: string;
  };
  texts: SiteTexts;
  seo: Record<SeoPage, PageSeo>;
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
    { src: "/images/dg-mawai/photo-02.jpg", label: "Riverside Portrait", category: "Photoshoot", hero: true, large: true, focus: "50% 30%" },
    { src: "/images/dg-mawai/photo-04.jpg", label: "Live on Stage", category: "Stage", hero: true, focus: "50% 25%" },
    { src: "/images/dg-mawai/photo-10.jpg", label: "Garlanded on Stage", category: "Live", hero: true, focus: "50% 22%" },
    { src: "/images/dg-mawai/photo-08.jpg", label: "Rajasthani Safa", category: "Portrait", hero: true, focus: "50% 22%" },
    { src: "/images/dg-mawai/photo-06.jpg", label: "Music Community Event", category: "Live", hero: true, focus: "50% 40%" },
    { src: "/images/dg-mawai/photo-11.jpg", label: "Outdoor Photoshoot", category: "Artist", hero: true, focus: "50% 25%" },
    { src: "/images/dg-mawai/photo-12.jpg", label: "Celebration Moment", category: "Event", hero: true, large: true, focus: "50% 20%" },
    { src: "/images/dg-mawai/photo-01.jpg", label: "Artist Style", category: "Portrait", focus: "50% 20%" },
    { src: "/images/dg-mawai/photo-03.jpg", label: "With Family", category: "Culture", focus: "50% 25%" },
    { src: "/images/dg-mawai/photo-05.jpg", label: "Studio Look", category: "Portrait", focus: "50% 20%" },
    { src: "/images/dg-mawai/photo-07.jpg", label: "Roadside Portrait", category: "Artist", focus: "50% 35%" },
  ],
  songs: [
    { title: "Chhori Teri Chal Morni Ki Dhal", plays: "583K+", year: "2024", duration: "5:22", trending: true, youtube: "https://www.youtube.com/watch?v=xLvumUGgmC0" },
    { title: "Tum Badal Gaye Raja Aa Gayi Kami Tere Pyar Me", plays: "799K+", year: "2024", duration: "4:49", trending: true, youtube: "https://www.youtube.com/@DGMawaiofficial" },
    { title: "Camper Mein Baithe Gunde", plays: "364K+", year: "2024", duration: "4:31", trending: true, youtube: "https://www.youtube.com/@DGMawaiofficial" },
    { title: "Tu Hi Mero Chanda Tu Hi Mero Taro", plays: "11K+", year: "2024", duration: "3:59", trending: false, youtube: "https://www.youtube.com/watch?v=VfRe2vlL5VM" },
    { title: "Daru Mat Peeve Dhola Beer Mat Peeve", plays: "9K+", year: "2024", duration: "3:59", trending: false, youtube: "https://www.youtube.com/watch?v=j6GXbOTqGI8" },
    { title: "Kabutar Bole Gutar Gu", plays: "150K+", year: "2024", duration: "6:11", trending: false, youtube: "https://www.youtube.com/watch?v=SSjFsFXgzMU" },
    { title: "Haveli Tome Sunder Lag Rahe Kanch", plays: "New", year: "2025", duration: "5:27", trending: false, youtube: "https://www.youtube.com/watch?v=91EGia0WXx4" },
    { title: "Babu Pyar Ko Form Bhar Le Tu", plays: "New", year: "2025", duration: "5:41", trending: false, youtube: "https://www.youtube.com/watch?v=gRRbkEbGSWU" },
    { title: "Gurjar Ke Te Yari He", plays: "120K+", year: "2024", duration: "5:20", trending: false, youtube: "https://www.youtube.com/watch?v=7vUMCBDieP0" },
    { title: "Surme Paida Hote H Yha Chambal Ke Pani Me", plays: "160K+", year: "2025", duration: "3:23", trending: false, youtube: "https://www.youtube.com/@DGMawaiofficial" },
  ],
  releases: [
    { title: "Mhari Tod De N Maal (EP)", status: "Latest Release", year: "2026" },
    { title: "New Rasiya 2026", status: "Coming Soon", year: "2026" },
    { title: "Jo Pike Redbull Ghume", status: "Released", year: "2025" },
  ],
  videos: [
    { title: "Chhori Teri Chal Morni Ki Dhal", image: "/images/dg-mawai/yt-xLvumUGgmC0.jpg", url: "https://www.youtube.com/watch?v=xLvumUGgmC0", views: "Viral", duration: "5:22" },
    { title: "Kuch Jyada Hi Shor Macha Rahe Hain Market Mein Chilua", image: "/images/dg-mawai/yt-LUFsl-9nL3U.jpg", url: "https://www.youtube.com/watch?v=LUFsl-9nL3U", views: "New", duration: "5:14" },
    { title: "Gurjar Ke Te Yari He", image: "/images/dg-mawai/yt-7vUMCBDieP0.jpg", url: "https://www.youtube.com/watch?v=7vUMCBDieP0", views: "Trending", duration: "5:20" },
    { title: "Haveli Tome Sunder Lag Rahe Kanch", image: "/images/dg-mawai/yt-91EGia0WXx4.jpg", url: "https://www.youtube.com/watch?v=91EGia0WXx4", views: "New", duration: "5:27" },
    { title: "Tu Hi Mero Chanda Tu Hi Mero Taro", image: "/images/dg-mawai/yt-VfRe2vlL5VM.jpg", url: "https://www.youtube.com/watch?v=VfRe2vlL5VM", views: "11K+ Views", duration: "3:59" },
    { title: "Teri Meri Diwali", image: "/images/dg-mawai/yt-XAtFpfjhSdU.jpg", url: "https://www.youtube.com/watch?v=XAtFpfjhSdU", views: "Festive", duration: "4:03" },
    { title: "Kabutar Bole Gutar Gu", image: "/images/dg-mawai/yt-SSjFsFXgzMU.jpg", url: "https://www.youtube.com/watch?v=SSjFsFXgzMU", views: "Viral Dance", duration: "6:11" },
  ],
  events: [
    { title: "Live Rasiya Night", date: "15 July 2026", time: "8:00 PM", venue: "Rajasthan Cultural Center", city: "Jaipur, Rajasthan", status: "Tickets Available", price: "From ₹499", tickets: [{ name: "Silver", price: "₹499" }, { name: "Gold", price: "₹999" }, { name: "VIP", price: "₹1999" }] },
    { title: "Gurjar Mahotsav 2026", date: "22 July 2026", time: "7:00 PM", venue: "Community Ground", city: "Bharatpur, Rajasthan", status: "Tickets Available", price: "From ₹299", tickets: [{ name: "General", price: "₹299" }, { name: "VIP", price: "₹799" }] },
    { title: "Independence Day Special Show", date: "15 August 2026", time: "6:00 PM", venue: "Stadium Ground", city: "Agra, UP", status: "Coming Soon", price: "TBA" },
    { title: "Navratri Rasiya Utsav", date: "October 2026", time: "7:30 PM", venue: "Main Stage", city: "Mathura, UP", status: "Coming Soon", price: "TBA" },
  ],
  pastEvents: [
    { city: "Jaipur, Rajasthan", event: "Rajasthan Folk Festival", venue: "Main Stage", date: "2025" },
    { city: "Delhi", event: "Gurjar Sammelan", venue: "Community Ground", date: "2025" },
    { city: "Agra, UP", event: "New Year Celebration", venue: "Open Ground", date: "Jan 2025" },
    { city: "Bharatpur, Rajasthan", event: "Republic Day Show", venue: "Stadium", date: "Jan 2025" },
    { city: "Mathura, UP", event: "Holi Special", venue: "Main Stage", date: "Mar 2025" },
    { city: "Gwalior, MP", event: "Chambal Mahotsav", venue: "Mela Ground", date: "2024" },
  ],
  achievements: [
    { value: "120K+", label: "Monthly listeners on Spotify" },
    { value: "50+", label: "Songs released across all platforms" },
    { value: "10M+", label: "Total streams & views" },
    { value: "500+", label: "Live shows across Rajasthan, UP & MP" },
    { value: "800K+", label: "Views on Tum Badal Gaye Raja" },
    { value: "Viral", label: "Chhori Teri Chal Morni Ki Dhal" },
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
  texts: {
    navHome: "Home",
    navMusic: "Music",
    navPerformance: "Performance",
    navMore: "More",
    navBook: "Book",
    footer: "DG Mawai. All rights reserved",
    homeVideosTitle: "Latest Videos",
    homeNextShow: "Next performance",
    homeAllShows: "All shows",
    bookCta: "Book a show",
    musicSongsTab: "Songs",
    musicReleasesTab: "Releases",
    showsUpcomingTab: "Upcoming",
    showsArchivesTab: "Archives",
    noShows: "New shows will be announced soon.",
    performedLabel: "Performed",
    getTickets: "Get Tickets",
    requestTickets: "Request Tickets",
    soldOut: "Sold Out",
    aboutMilestones: "Milestones",
    aboutMoments: "Moments",
    aboutUpcoming: "Upcoming",
    aboutCta: "Bring DG Mawai to your stage.",
    bookEyebrow: "Bookings & Enquiries",
    bookTitle: "Book a Show",
    bookButton: "Send booking request",
    eventTypes: ["Wedding", "Live Concert", "Festival / Mela", "Corporate Event", "Private Party", "Religious / Cultural", "Other"],
  },
  seo: {
    home: {
      title: "DG Mawai | Official Website – Rajasthani Rasiya Singer",
      description: "Official website of DG Mawai, Rajasthani Gurjar Rasiya singer. Listen to viral songs like Chhori Teri Chal Morni Ki Dhal, see upcoming live shows, get tickets and book DG Mawai for your event.",
    },
    music: {
      title: "Music",
      description: "Listen to DG Mawai songs and new releases — viral Rasiya hits on YouTube, Spotify, Apple Music and JioSaavn.",
    },
    performance: {
      title: "Live Shows & Tickets",
      description: "Upcoming DG Mawai live shows and Rasiya nights — dates, venues, ticket prices and ticket requests. Past performances archive.",
    },
    about: {
      title: "About & Biography",
      description: "Biography of DG Mawai, Rajasthani Gurjar Rasiya singer — journey, milestones, photos and upcoming releases.",
    },
    contact: {
      title: "Book a Show",
      description: "Book DG Mawai for weddings, festivals, corporate and live events. Send a booking enquiry or WhatsApp.",
    },
  },
};
