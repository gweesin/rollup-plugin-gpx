import vue from '@vitejs/plugin-vue'
import gpxPlugin from 'rollup-plugin-gpx'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [gpxPlugin(), vue()],
})
