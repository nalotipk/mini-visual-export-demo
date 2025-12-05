'use client';

import React, { useState } from 'react';

type ComponentConfig = {
  id: string;
  type: 'box' | 'text';
  x: number;
  y: number;
  width: number;
  height: number;
  text?: string;
};

export default function HomePage() {
  const [components, setComponents] = useState<ComponentConfig[]>([
    {
      id: 'box-1',
      type: 'box',
      x: 40,
      y: 80,
      width: 180,
      height: 120,
    },
    {
      id: 'text-1',
      type: 'text',
      x: 60,
      y: 110,
      width: 140,
      height: 60,
      text: 'Hello from the visual builder',
    },
  ]);

  const updateComponent = (id: string, patch: Partial<ComponentConfig>) => {
    setComponents((prev) =>
      prev.map((c) => (c.id === id ? { ...c, ...patch } : c)),
    );
  };

  const handleExport = async () => {
    try {
      const res = await fetch('http://localhost:3001/export/zip', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ components }),
      });

      if (!res.ok) {
        console.error('Export failed');
        return;
      }

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'react-tailwind-project.zip';
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err);
    }
  };

  const box = components.find((c) => c.id === 'box-1');
  const text = components.find((c) => c.id === 'text-1');

  return (
    <main className="min-h-screen bg-slate-950 text-slate-50 flex flex-col items-center justify-center p-6">
      <h1 className="text-2xl font-semibold mb-4">
        Mini Visual Builder + Export Demo
      </h1>

      <div className="flex flex-col md:flex-row gap-8 w-full max-w-5xl">
        {/* Canvas */}
        <div className="flex-1 flex justify-center">
          <div className="relative w-[360px] h-[640px] bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
            {box && (
              <div
                className="absolute bg-blue-500 rounded-md shadow"
                style={{
                  left: box.x,
                  top: box.y,
                  width: box.width,
                  height: box.height,
                }}
              />
            )}
            {text && (
              <div
                className="absolute text-white font-medium flex items-center justify-center text-center px-2"
                style={{
                  left: text.x,
                  top: text.y,
                  width: text.width,
                  height: text.height,
                }}
              >
                {text.text}
              </div>
            )}
          </div>
        </div>

        {/* Controls */}
        <div className="flex-1 space-y-6">
          <section className="bg-slate-900 border border-slate-700 rounded-xl p-4 space-y-4">
            <h2 className="font-semibold">Box settings</h2>
            {box && (
              <div className="grid grid-cols-2 gap-3 text-sm">
                <label className="flex flex-col gap-1">
                  X
                  <input
                    type="number"
                    value={box.x}
                    onChange={(e) =>
                      updateComponent(box.id, { x: Number(e.target.value) })
                    }
                    className="bg-slate-800 border border-slate-700 rounded px-2 py-1"
                  />
                </label>
                <label className="flex flex-col gap-1">
                  Y
                  <input
                    type="number"
                    value={box.y}
                    onChange={(e) =>
                      updateComponent(box.id, { y: Number(e.target.value) })
                    }
                    className="bg-slate-800 border border-slate-700 rounded px-2 py-1"
                  />
                </label>
                <label className="flex flex-col gap-1">
                  Width
                  <input
                    type="number"
                    value={box.width}
                    onChange={(e) =>
                      updateComponent(box.id, {
                        width: Number(e.target.value),
                      })
                    }
                    className="bg-slate-800 border border-slate-700 rounded px-2 py-1"
                  />
                </label>
                <label className="flex flex-col gap-1">
                  Height
                  <input
                    type="number"
                    value={box.height}
                    onChange={(e) =>
                      updateComponent(box.id, {
                        height: Number(e.target.value),
                      })
                    }
                    className="bg-slate-800 border border-slate-700 rounded px-2 py-1"
                  />
                </label>
              </div>
            )}
          </section>

          <section className="bg-slate-900 border border-slate-700 rounded-xl p-4 space-y-4">
            <h2 className="font-semibold">Text settings</h2>
            {text && (
              <div className="grid grid-cols-2 gap-3 text-sm">
                <label className="flex flex-col gap-1 col-span-2">
                  Text
                  <input
                    type="text"
                    value={text.text ?? ''}
                    onChange={(e) =>
                      updateComponent(text.id, { text: e.target.value })
                    }
                    className="bg-slate-800 border border-slate-700 rounded px-2 py-1"
                  />
                </label>
                <label className="flex flex-col gap-1">
                  X
                  <input
                    type="number"
                    value={text.x}
                    onChange={(e) =>
                      updateComponent(text.id, { x: Number(e.target.value) })
                    }
                    className="bg-slate-800 border border-slate-700 rounded px-2 py-1"
                  />
                </label>
                <label className="flex flex-col gap-1">
                  Y
                  <input
                    type="number"
                    value={text.y}
                    onChange={(e) =>
                      updateComponent(text.id, { y: Number(e.target.value) })
                    }
                    className="bg-slate-800 border border-slate-700 rounded px-2 py-1"
                  />
                </label>
                <label className="flex flex-col gap-1">
                  Width
                  <input
                    type="number"
                    value={text.width}
                    onChange={(e) =>
                      updateComponent(text.id, {
                        width: Number(e.target.value),
                      })
                    }
                    className="bg-slate-800 border border-slate-700 rounded px-2 py-1"
                  />
                </label>
                <label className="flex flex-col gap-1">
                  Height
                  <input
                    type="number"
                    value={text.height}
                    onChange={(e) =>
                      updateComponent(text.id, {
                        height: Number(e.target.value),
                      })
                    }
                    className="bg-slate-800 border border-slate-700 rounded px-2 py-1"
                  />
                </label>
              </div>
            )}
          </section>

          <button
            onClick={handleExport}
            className="w-full bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-semibold py-2 rounded-lg mt-2"
          >
            Export React + Tailwind project (ZIP)
          </button>
        </div>
      </div>
    </main>
  );
}
