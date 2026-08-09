---
name: Cross-device data sync
description: The life tracker currently stores data locally in each browser.
---

GitHub Pages can host the static frontend, but browser localStorage is isolated by device and browser. Same-email cross-device sync requires a real authentication provider and cloud database; do not claim email-only access works without that backend.

**Why:** A static GitHub Pages site has no trusted server that can verify the owner or persist shared user data.

**How to apply:** If the user later wants shared data, get explicit approval to connect a hosted auth/database integration before implementing owner-only edits.