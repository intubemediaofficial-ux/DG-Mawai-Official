# DG Mawai — Official Website

Official artist website for Rajasthani Rasiya singer **DG Mawai** — songs, videos, events with ticket requests, gallery, show booking and a full admin panel.

## Stack
Next.js 16 (App Router, server mode), React 19, Tailwind CSS 4. Content, enquiries, admin login and uploaded photos are stored as JSON/files in `DATA_DIR` (default `./data`, git-ignored).

## Setup
```bash
cp .env.example .env.local   # set AUTH_SECRET, ADMIN_EMAIL, ADMIN_PASSWORD, DATA_DIR
npm install
npm run dev                  # http://localhost:3000, admin at /admin
npm run build && npm start   # production
```
`ADMIN_PASSWORD` is only used on first start to create `DATA_DIR/admin.json`; change it later from Admin → Settings. Every content save keeps a copy in `DATA_DIR/backups/`.
