import "server-only";
import { promises as fs } from "fs";
import path from "path";
import crypto from "crypto";
import { defaultContent, type SiteContent } from "./siteContent";

export const DATA_DIR = process.env.DATA_DIR || path.join(process.cwd(), "data");
export const UPLOAD_DIR = path.join(DATA_DIR, "uploads");
const CONTENT_FILE = path.join(DATA_DIR, "content.json");
const ENQUIRY_FILE = path.join(DATA_DIR, "enquiries.json");
const ADMIN_FILE = path.join(DATA_DIR, "admin.json");

async function readJson<T>(file: string, fallback: T): Promise<T> {
  try {
    return JSON.parse(await fs.readFile(file, "utf8")) as T;
  } catch {
    return fallback;
  }
}

async function writeJson(file: string, value: unknown) {
  await fs.mkdir(path.dirname(file), { recursive: true });
  const tmp = `${file}.${process.pid}.${Date.now()}.tmp`;
  await fs.writeFile(tmp, JSON.stringify(value, null, 2));
  await fs.rename(tmp, file);
}

export async function getContent(): Promise<SiteContent> {
  const saved = await readJson<Partial<SiteContent>>(CONTENT_FILE, {});
  return {
    ...defaultContent,
    ...saved,
    hero: { ...defaultContent.hero, ...saved.hero },
    about: { ...defaultContent.about, ...saved.about },
    socials: { ...defaultContent.socials, ...saved.socials },
    contact: { ...defaultContent.contact, ...saved.contact },
    texts: { ...defaultContent.texts, ...saved.texts },
    sections: { ...defaultContent.sections, ...saved.sections },
    seo: {
      home: { ...defaultContent.seo.home, ...saved.seo?.home },
      music: { ...defaultContent.seo.music, ...saved.seo?.music },
      performance: { ...defaultContent.seo.performance, ...saved.seo?.performance },
      about: { ...defaultContent.seo.about, ...saved.seo?.about },
      contact: { ...defaultContent.seo.contact, ...saved.seo?.contact },
    },
  };
}

export async function saveContent(content: SiteContent) {
  await fs.mkdir(BACKUP_DIR, { recursive: true });
  try {
    await fs.copyFile(CONTENT_FILE, path.join(BACKUP_DIR, `content-${Date.now()}.json`));
  } catch {}
  await writeJson(CONTENT_FILE, content);
}

const BACKUP_DIR = path.join(DATA_DIR, "backups");
const BACKUP_NAME = /^content-\d+\.json$/;

export async function listBackups() {
  const files = await fs.readdir(BACKUP_DIR).catch(() => [] as string[]);
  return files
    .filter((f) => BACKUP_NAME.test(f))
    .map((f) => ({ name: f, savedAt: new Date(Number(f.slice(8, -5))).toISOString() }))
    .sort((a, b) => b.name.localeCompare(a.name, undefined, { numeric: true }))
    .slice(0, 30);
}

export async function restoreBackup(name: string) {
  if (!BACKUP_NAME.test(name)) return false;
  const data = await readJson<SiteContent | null>(path.join(BACKUP_DIR, name), null);
  if (!data) return false;
  await saveContent(data);
  return true;
}

export type EnquiryStatus = "new" | "contacted" | "confirmed" | "closed";

export type Enquiry = {
  id: string;
  type: "booking" | "ticket" | "contact";
  name: string;
  phone: string;
  email: string;
  city: string;
  eventType: string;
  eventDate: string;
  eventTitle: string;
  ticketType?: string;
  tickets: number;
  message: string;
  status: EnquiryStatus;
  note: string;
  createdAt: string;
};

export async function listEnquiries(): Promise<Enquiry[]> {
  return readJson<Enquiry[]>(ENQUIRY_FILE, []);
}

let enquiryQueue: Promise<unknown> = Promise.resolve();
function serial<T>(fn: () => Promise<T>): Promise<T> {
  const next = enquiryQueue.then(fn, fn);
  enquiryQueue = next.catch(() => undefined);
  return next;
}

export function addEnquiry(input: Omit<Enquiry, "id" | "status" | "note" | "createdAt">) {
  return serial(async () => {
    const all = await listEnquiries();
    const enquiry: Enquiry = {
      ...input,
      id: crypto.randomUUID(),
      status: "new",
      note: "",
      createdAt: new Date().toISOString(),
    };
    all.unshift(enquiry);
    await writeJson(ENQUIRY_FILE, all);
    return enquiry;
  });
}

export function updateEnquiry(id: string, patch: Partial<Pick<Enquiry, "status" | "note">>) {
  return serial(async () => {
    const all = await listEnquiries();
    const item = all.find((e) => e.id === id);
    if (!item) return null;
    Object.assign(item, patch);
    await writeJson(ENQUIRY_FILE, all);
    return item;
  });
}

type AdminRecord = { email: string; salt: string; hash: string };

function hashPassword(password: string, salt: string) {
  return crypto.scryptSync(password, salt, 64).toString("hex");
}

async function getAdminRecord(): Promise<AdminRecord> {
  const saved = await readJson<AdminRecord | null>(ADMIN_FILE, null);
  if (saved) return saved;
  const salt = crypto.randomBytes(16).toString("hex");
  const record = {
    email: (process.env.ADMIN_EMAIL || "intubemediaofficial@gmail.com").toLowerCase(),
    salt,
    hash: hashPassword(process.env.ADMIN_PASSWORD || crypto.randomBytes(12).toString("hex"), salt),
  };
  await writeJson(ADMIN_FILE, record);
  return record;
}

export async function checkAdmin(email: string, password: string) {
  const rec = await getAdminRecord();
  const candidate = Buffer.from(hashPassword(password, rec.salt), "hex");
  const ok = crypto.timingSafeEqual(candidate, Buffer.from(rec.hash, "hex"));
  return ok && email.trim().toLowerCase() === rec.email;
}

export async function getAdminEmail() {
  return (await getAdminRecord()).email;
}

export async function setAdminPassword(password: string) {
  const rec = await getAdminRecord();
  const salt = crypto.randomBytes(16).toString("hex");
  await writeJson(ADMIN_FILE, { ...rec, salt, hash: hashPassword(password, salt) });
}
