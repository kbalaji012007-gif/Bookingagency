import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'serve-logo-frames',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (req.url && req.url.startsWith('/wanderlux-logo-frames/')) {
            const fileName = req.url.replace('/wanderlux-logo-frames/', '').split('?')[0];
            const filePath = path.resolve(__dirname, 'wanderlux-logo-frames', fileName);
            if (fs.existsSync(filePath)) {
              res.setHeader('Content-Type', 'image/png');
              res.setHeader('Cache-Control', 'no-cache, must-revalidate');
              return fs.createReadStream(filePath).pipe(res);
            }
          }
          next();
        });
      }
    }
  ],
  server: {
    port: 5173,
    host: true
  }
});

