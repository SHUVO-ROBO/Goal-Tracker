# 🚀 Hosting Guide — Shuvo's Life Tracker

This is a **fully static React app** (no server, no database — everything runs in your browser's localStorage).  
You can host it for free on GitHub Pages, Netlify, Vercel, or run it directly on your PC.

---

## 1. Build the Standalone Version

First, build a self-contained version that doesn't need the Replit environment:

```bash
# Inside the project root (where pnpm-workspace.yaml is)
pnpm --filter @workspace/life-tracker build:standalone
```

This creates `artifacts/life-tracker/dist-standalone/` — a folder of static HTML/CSS/JS files.  
**No Node.js or server needed to run these files once built.**

---

## 2. Host on GitHub Pages (Free, Permanent URL)

### Step 1 — Push your code to a GitHub repo

```bash
git init
git add .
git commit -m "life tracker"
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

### Step 2 — Build with the correct base path

GitHub Pages serves from `https://username.github.io/repo-name/`  
so you must tell Vite your repo name:

```bash
VITE_BASE=/YOUR_REPO_NAME/ pnpm --filter @workspace/life-tracker build:standalone
```

Example (if your repo is `life-tracker`):
```bash
VITE_BASE=/life-tracker/ pnpm --filter @workspace/life-tracker build:standalone
```

### Step 3 — Deploy the built files

**Option A — GitHub Actions (fully automatic on every push):**

Create `.github/workflows/deploy.yml` in your repo root:

```yaml
name: Deploy to GitHub Pages
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    permissions:
      contents: write
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v3
        with: { version: 9 }
      - uses: actions/setup-node@v4
        with: { node-version: 20, cache: pnpm }
      - run: pnpm install
      - run: VITE_BASE=/YOUR_REPO_NAME/ pnpm --filter @workspace/life-tracker build:standalone
      - uses: JamesIves/github-pages-deploy-action@v4
        with:
          folder: artifacts/life-tracker/dist-standalone
```

Then in GitHub → Settings → Pages → Source → **GitHub Actions**.

**Option B — Manual (gh-pages branch):**

```bash
npm install -g gh-pages
cd artifacts/life-tracker
gh-pages -d dist-standalone
```

Your app will be live at: `https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/`

---

## 3. Host on Netlify (Easiest — Drag & Drop)

1. Build: `pnpm --filter @workspace/life-tracker build:standalone`
2. Go to [netlify.com](https://netlify.com) → New site → **Drag and drop**
3. Drag the entire `artifacts/life-tracker/dist-standalone/` folder into the browser
4. Done. You get a free URL like `https://random-name.netlify.app`

**For auto-deploy from GitHub:**
- Connect repo → Build command: `VITE_BASE=/ pnpm --filter @workspace/life-tracker build:standalone`
- Publish directory: `artifacts/life-tracker/dist-standalone`

---

## 4. Host on Vercel (Free, Fast CDN)

```bash
npm install -g vercel
cd artifacts/life-tracker
vercel --prod
```

When prompted:
- Build command: `pnpm build:standalone`  
- Output directory: `dist-standalone`

Or connect your GitHub repo at [vercel.com](https://vercel.com) and set the same settings in the UI.

---

## 5. Run Locally on Your PC (Windows/Mac/Linux)

### Option A — Preview the build (recommended)

```bash
# Build once
pnpm --filter @workspace/life-tracker build:standalone

# Serve locally on http://localhost:4173
pnpm --filter @workspace/life-tracker serve:standalone
```

Open your browser to `http://localhost:4173`

### Option B — Live dev server (with hot reload)

```bash
# Requires PORT and BASE_PATH to be set
PORT=5173 BASE_PATH=/ pnpm --filter @workspace/life-tracker dev
```

Open `http://localhost:5173`

### Option C — Serve the built files with any static server

```bash
# Install once
npm install -g serve

# Run from project root
serve artifacts/life-tracker/dist-standalone -p 3000
```

Open `http://localhost:3000`

---

## 6. Important Notes

### ⚠️ Your data stays on YOUR device
All data (CGPA, scholarships, IELTS progress, etc.) is stored in **browser localStorage**.  
It does NOT sync across devices. To move data:
1. Open browser DevTools → Application → Local Storage
2. Copy all `life_tracker_*` keys
3. Paste into DevTools on the new device/browser

### ⚠️ GitHub Pages base path
If your app shows blank pages on GitHub Pages, the `VITE_BASE` was set wrong.  
Make sure `VITE_BASE=/your-repo-name/` (with trailing slash) matches your GitHub repo name exactly.

### ⚠️ Netlify/Vercel — no trailing slash issues
For Netlify and Vercel, use `VITE_BASE=/` (root). Add a `_redirects` file in `dist-standalone/`:
```
/* /index.html 200
```
This handles page refreshes correctly.

---

## Quick Reference

| Platform | Build Command | Live in |
|---|---|---|
| GitHub Pages | `VITE_BASE=/repo-name/ pnpm --filter @workspace/life-tracker build:standalone` | 2-5 min after push |
| Netlify drag | `pnpm --filter @workspace/life-tracker build:standalone` | 30 seconds |
| Vercel | `pnpm build:standalone` (in artifact dir) | 1 min |
| Local PC | `pnpm --filter @workspace/life-tracker serve:standalone` | Instant |
