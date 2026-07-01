# ENG7101 Practice — hosted app

This folder is the website. It contains everything students need:

| File | Purpose |
|---|---|
| `index.html` | The whole app (all content + logic) |
| `manifest.webmanifest` | Lets students "Install" it as an app |
| `sw.js` | Offline support + always serves your newest version |
| `icon-192.png`, `icon-512.png` | App icons |
| `.nojekyll` | Tells GitHub Pages to serve the files as-is |

## To publish (GitHub Pages)

**Easiest — no command line:**
1. Go to <https://github.com> and sign in (create a free account if needed).
2. Click **New repository** → name it e.g. `eng7101-practice` → **Public** → **Create**.
3. On the new repo page click **"uploading an existing file"**, then drag in **all files
   from this `site` folder** (including the icons). Click **Commit changes**.
4. Go to **Settings → Pages**. Under *Source* choose **Deploy from a branch**,
   pick **main** / **/(root)**, click **Save**.
5. Wait ~1 minute, then reload that Pages page — it shows your live link:
   `https://YOUR-USERNAME.github.io/eng7101-practice/`
6. Share that link with students.

**With git (for future updates from your PC):**
```
git remote add origin https://github.com/YOUR-USERNAME/eng7101-practice.git
git push -u origin main
```

## To add chapters or set the results URL later
1. Edit `index.html`.
2. Re-upload it (drag it in again) **or** `git commit -am "new chapters" && git push`.
3. Students get the update automatically next time they open the link.
