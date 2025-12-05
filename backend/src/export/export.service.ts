import { Injectable, InternalServerErrorException } from '@nestjs/common';
import * as fs from 'fs-extra';
import * as os from 'os';
import * as path from 'path';
import * as Archiver from 'archiver';

interface ComponentConfig {
  id: string;
  type: 'box' | 'text';
  x: number;
  y: number;
  width: number;
  height: number;
  text?: string;
}

@Injectable()
export class ExportService {
  async generateProjectZip(components: ComponentConfig[], res: any) {
    const tmpRoot = await fs.mkdtemp(path.join(os.tmpdir(), 'export-demo-'));
    const projectRoot = path.join(tmpRoot, 'react-project');

    try {
      await this.writeProjectFiles(projectRoot, components);

      // Set headers for zip download
      res.setHeader('Content-Type', 'application/zip');
      res.setHeader(
        'Content-Disposition',
        'attachment; filename="react-tailwind-project.zip"',
      );

      // IMPORTANT CHANGE: use Archiver.create(...) instead of archiver(...)
      const archive = Archiver.create('zip', { zlib: { level: 9 } });

      archive.on('error', (err) => {
        throw err;
      });

      archive.directory(projectRoot, false);
      archive.pipe(res);
      await archive.finalize();
    } catch (err) {
      console.error(err);
      throw new InternalServerErrorException('Failed to generate ZIP');
    } finally {
      fs.remove(tmpRoot).catch(() => undefined);
    }
  }

  private async writeProjectFiles(root: string, components: ComponentConfig[]): Promise<void> {
    await fs.ensureDir(root);

    const packageJson = {
      name: 'exported-react-tailwind-project',
      version: '1.0.0',
      private: true,
      scripts: {
        dev: 'vite',
        build: 'vite build',
        preview: 'vite preview',
      },
      dependencies: {
        react: '^18.0.0',
        'react-dom': '^18.0.0',
      },
      devDependencies: {
        vite: '^5.0.0',
        typescript: '^5.0.0',
        tailwindcss: '^3.4.0',
        autoprefixer: '^10.0.0',
        postcss: '^8.0.0',
      },
    };

    const indexHtml = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Exported Layout</title>
  </head>
  <body class="bg-slate-100">
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
`;

    const mainTsx = `import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { App } from './App';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
`;

    const tailwindConfig = `export default {
  content: ['./index.html', './src/**/*.{ts,tsx,js,jsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
};
`;

    const postcssConfig = `export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
`;

    const indexCss = `@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  margin: 0;
}
`;

    const appTsx = this.generateAppTsx(components);

    await fs.writeJson(path.join(root, 'package.json'), packageJson, { spaces: 2 });
    await fs.writeFile(path.join(root, 'index.html'), indexHtml);

    await fs.ensureDir(path.join(root, 'src'));
    await fs.writeFile(path.join(root, 'src', 'main.tsx'), mainTsx);
    await fs.writeFile(path.join(root, 'tailwind.config.js'), tailwindConfig);
    await fs.writeFile(path.join(root, 'postcss.config.js'), postcssConfig);
    await fs.writeFile(path.join(root, 'src', 'index.css'), indexCss);
    await fs.writeFile(path.join(root, 'src', 'App.tsx'), appTsx);
  }

  private generateAppTsx(components: ComponentConfig[]): string {
    const jsxChildren = components
      .map((c) => {
        if (c.type === 'box') {
          return `<div key="${c.id}" className="absolute bg-blue-500 rounded-md shadow" style={{ left: ${c.x}, top: ${c.y}, width: ${c.width}, height: ${c.height} }} />`;
        }
        if (c.type === 'text') {
          return `<div key="${c.id}" className="absolute text-white font-medium flex items-center justify-center text-center" style={{ left: ${c.x}, top: ${c.y}, width: ${c.width}, height: ${c.height} }}>
  ${c.text ?? 'Text'}
</div>`;
        }
        return '';
      })
      .join('\n        ');

    return `import React from 'react';

export const App: React.FC = () => {
  return (
    <div className="w-screen h-screen bg-slate-900 flex items-center justify-center">
      <div className="relative w-[360px] h-[640px] bg-slate-800 rounded-xl overflow-hidden border border-slate-700">
        ${jsxChildren || '// No components yet'}
      </div>
    </div>
  );
};
`;
  }
}
