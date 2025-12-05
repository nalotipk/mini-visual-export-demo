# Mini Visual Builder + React/Tailwind Export  
### Next.js (App Router) + NestJS Full-Stack Demo

This project demonstrates a fully working visual web builder that exports clean React + Tailwind code as a downloadable ZIP file. The frontend allows users to adjust a layout visually, and the backend generates a complete React project on the fly.

This is similar in architecture to early-stage versions of v0.dev, Builder.io, or Lovable — with a simplified export engine.

---

## 🚀 Features

### **Frontend (Next.js + Tailwind)**
- Visual canvas that mimics a mobile screen
- Editable components (box + text)
- Controls for X/Y position, width, height, and text content
- Export button that sends layout → backend
- TypeScript + App Router + clean state management

### **Backend (NestJS)**
- `/export/zip` POST endpoint
- Generates a complete **Vite + React + Tailwind** project
- Writes all files (package.json, tailwind config, App.tsx, etc.)
- Converts layout JSON → JSX components
- Streams a ZIP file back to the browser
- Uses:
  - `archiver` for ZIP creation
  - `fs-extra` for file operations
  - OS temp directory for sandboxed builds

---

## 🧱 Tech Stack

**Frontend**
- Next.js 14+ (App Router)
- React 18
- Tailwind CSS
- TypeScript

**Backend**
- NestJS
- TypeScript
- Archiver
- fs-extra

---

## 🗂 Project Structure
mini-visual-export-demo/
backend/
src/
main.ts
app.module.ts
app.controller.ts
app.service.ts
export/
export.module.ts
export.controller.ts
export.service.ts
frontend/
app/
page.tsx

---

## 🏃‍♀️ Running the Project

### 1. Start Backend (NestJS)

```bash
cd backend
npm install
npm install archiver fs-extra
npm run start:dev

Backend runs at:
http://localhost:3001

Start Frontend (Next.js)

In another terminal:
cd frontend
npm install
npm run dev

Front end runs at:
http://localhost:3000

How the Export Engine Works

User designs a layout in the browser.

Clicking “Export React + Tailwind project (ZIP)” sends JSON like:

{
  "components": [
    { "id": "box-1", "type": "box", "x": 40, "y": 80, "width": 180, "height": 120 },
    { "id": "text-1", "type": "text", "x": 60, "y": 110, "width": 140, "height": 60, "text": "Hello" }
  ]
}
NestJS creates a temp folder under the OS temp directory.

Writes:

React/Vite entrypoint

Tailwind setup

An App.tsx dynamically generated from the JSON

Zips the project using archiver.

Streams the ZIP to the browser.

User downloads:
react-tailwind-project.zip

npm install
npm run dev

Example Generated App.tsx

<div className="relative w-[360px] h-[640px] bg-slate-800 rounded-xl">
  <div
    className="absolute bg-blue-500 rounded-md shadow"
    style={{ left: 40, top: 80, width: 180, height: 120 }}
  />
  <div
    className="absolute text-white flex items-center justify-center"
    style={{ left: 60, top: 110, width: 140, height: 60 }}
  >
    Hello
  </div>
</div>

Future Improvements

Drag-and-drop positioning

Resize handles

Component layers panel

GitHub OAuth + Sync to Repo

AI-assisted layout generation

Multi-component templates (Hero, Pricing, Cards, etc.)

License

MIT — free to use and modify.


---

# 📌 OPTIONAL BUT STRONGLY RECOMMENDED

### After you paste this README:

1. Go to your repo root  
2. Replace `README.md` with the above content  
3. Commit:

```bash
git add README.md
git commit -m "Replace default Nest README with project documentation"
git push
