 Features Overview

### **Frontend — Next.js (App Router) + Tailwind**
- Mobile-style preview canvas  
- Draggable layout elements (box + text)  
- UI controls for:
  - position (x/y)
  - width/height  
  - text content
- State → JSON serialization  
- POST request to backend export endpoint  
- Downloads generated ZIP file  
- Fully typed with TypeScript  

---

### **Backend — NestJS Code Generator**
The backend exposes a single core endpoint:

```

POST /export/zip

```

It receives layout JSON and:

1. Creates a **temporary folder** under the OS temp directory  
2. Generates a full **Vite + React + Tailwind** project  
3. Writes:
   - `package.json`  
   - Tailwind + PostCSS configs  
   - React entrypoint files  
   - `App.tsx` (dynamically created from your layout JSON)  
4. Uses **archiver** to bundle the entire project  
5. Streams the ZIP back to the frontend  

Libraries used:
- `archiver` (ZIP generation)
- `fs-extra` (file operations)
- `os.tmpdir()` (safe temp directories)

---

## Tech Stack

### **Frontend**
- Next.js 14+ (App Router)
- React 18
- Tailwind CSS
- TypeScript

### **Backend**
- NestJS
- TypeScript
- Archiver
- fs-extra

Fully ESM-compatible. Works locally on Windows, macOS, and Linux.

---

## Project Structure

```

mini-visual-export-demo/
README.md                 ← Root project documentation
backend/                  ← NestJS export service
src/
export/
export.service.ts   ← ZIP generator
export.controller.ts
export.module.ts
app.module.ts
main.ts
frontend/                 ← Next.js visual builder
app/
page.tsx              ← Editor UI + Export button

````

---

##  Running the Project

### **Start the backend**
```bash
cd backend
npm install
npm install archiver fs-extra
npm run start:dev
````

Backend starts at:
 `http://localhost:3001`

---

### **Start the frontend**

```bash
cd frontend
npm install
npm run dev
```

Frontend starts at:
 `http://localhost:3000`

---

##  Export Flow Summary

### 1. User designs layout

The frontend holds a JSON representation like:

```json
{
  "components": [
    { "id": "box-1", "type": "box", "x": 40, "y": 80, "width": 180, "height": 120 },
    { "id": "text-1", "type": "text", "x": 60, "y": 110, "width": 140, "height": 60, "text": "Hello" }
  ]
}
```

### 2. Frontend POSTs layout → backend

The editor sends JSON payload to `/export/zip`.

### 3. Backend generates project

Writes the full React/Tailwind scaffold and auto-builds `App.tsx`:

```tsx
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
```

### 4. Backend zips the folder

`archiver` creates:

```
react-tailwind-project.zip
```

### 5. User downloads and runs

```bash
npm install
npm run dev
```

---

##  Potential Next Features

These would mirror real-world AI web builder tools:

* Drag-and-drop positioning
* Resize handles
* Component layers panel
* GitHub OAuth → Sync to repo
* AI-assisted layout generation
* Component templates (hero sections, pricing, cards, etc.)

---

##  License

MIT — free to use and modify.

---

If you have questions about running or extending this project, feel free to reach out.
