import { defineConfig } from 'vite';
import react, { reactCompilerPreset } from '@vitejs/plugin-react';
import babel from '@rolldown/plugin-babel';
import tailwindcss from '@tailwindcss/vite'
import path from 'path';


export default defineConfig({
    server: {
        watch: {
            ignored: ["**/db.json"]
        }
    },
    plugins: [
        tailwindcss(),
        babel({ presets: [reactCompilerPreset()] }),
        react(),
    ],
    resolve: {
        alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }],
    },
});
