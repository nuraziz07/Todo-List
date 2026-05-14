import {defineConfig} from 'vite'
import react, {reactCompilerPreset} from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
    server: {
        watch: {
            ignored: ["**/db.json"]
        }
    },
    plugins: [
        tailwindcss(),
        react(),
        babel({presets: [reactCompilerPreset()]})
    ],
    resolve: {
        alias: [{find: '@', replacement: path.resolve(__dirname, 'src')}],
    },
})
