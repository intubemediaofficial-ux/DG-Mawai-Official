export const SITE_URL = (process.env.SITE_URL || "https://dgmawai.com").replace(/\/$/, "");

export const PUBLIC_PATHS = ["/", "/music", "/performance", "/about", "/contact"] as const;
