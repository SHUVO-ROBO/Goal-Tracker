# GitHub-এ Push করার Step-by-Step Guide

## একবারই করতে হবে (First Time Setup)

### ধাপ ১ — GitHub-এ নতুন repo বানাও
1. https://github.com/new যাও
2. Repository name: `Goal-Tracker`
3. **Public** রাখো (GitHub Pages ফ্রি শুধু public-এ)
4. README বা .gitignore যোগ করো **না** (already আছে)
5. **Create repository** ক্লিক করো

---

### ধাপ ২ — GitHub Pages চালু করো
1. Repo → **Settings** → বাম দিকে **Pages**
2. **Source** → **GitHub Actions** সিলেক্ট করো
3. Save

---

### ধাপ ৩ — Code Push করো

Replit-এর Shell-এ এই commands গুলো একে একে run করো:

```bash
git init
git add .
git commit -m "Initial commit — Shuvo's Life Tracker"
git branch -M main
git remote add origin https://github.com/SHUVO-ROBO/Goal-Tracker.git
git push -u origin main
```

Push হওয়ার সাথে সাথে GitHub Actions automatically build + deploy শুরু করবে।

---

### ধাপ ৪ — Deploy হচ্ছে কিনা দেখো
- Repo → **Actions** tab
- "Deploy Life Tracker to GitHub Pages" workflow টা চলছে দেখবে (~2 মিনিট)
- সবুজ টিক আসলে done!

---

### ধাপ ৫ — তোমার App চেক করো
🔗 **https://SHUVO-ROBO.github.io/Goal-Tracker/**

---

## পরের বার Update করতে হলে (Every Time)

```bash
git add .
git commit -m "update"
git push
```

শুধু এটুকু — GitHub বাকি সব করবে automatically।

---

## 💾 Data কোথায় থাকে?

তোমার সব data (courses, scholarships, IELTS scores, etc.) **তোমার PC-র browser-এ** থাকে।

- তুমি `https://SHUVO-ROBO.github.io/Goal-Tracker/` Chrome-এ open করলে
- data Chrome-এর localStorage-এ save হয়
- PC বন্ধ করে আবার খুললেও data থাকবে ✅
- Same PC, same browser → data সবসময় আছে ✅

⚠️ শুধু মনে রাখো:
- অন্য browser (Firefox, Edge) এ গেলে data আলাদা
- Browser "Clear All Data" দিলে data যাবে
- নতুন PC তে নিতে চাইলে Console থেকে localStorage export করতে হবে

---

## 🖥️ PC-তে Offline চালাতে চাইলে

```bash
# Build করো
VITE_BASE=/ pnpm --filter @workspace/life-tracker build:standalone

# চালাও
pnpm --filter @workspace/life-tracker serve:standalone
```

তারপর browser-এ: `http://localhost:4173`
