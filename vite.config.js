import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import Dotenv from 'dotenv-webpack';
export default defineConfig({
  plugins: [react()],
})
