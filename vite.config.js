import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv'

dotenv.config();
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/ezfuel/',
  define: {
    //env variables
    'process.env.VITE_GOOGLE_API_URL': JSON.stringify(process.env.VITE_GOOGLE_API_URL),
    'process.env.VITE_GOOGLE_SEARCH_API_KEY': JSON.stringify(process.env.VITE_GOOGLE_SEARCH_API_KEY),
    'process.env.VITE_GOOGLE_SEARCH_CX': JSON.stringify(process.env.VITE_GOOGLE_SEARCH_CX),
    'process.env.VITE_CAGE_DATA_API_KEY': JSON.stringify(process.env.VITE_CAGE_DATA_API_KEY),
    'process.env.VITE_STRIPE_API_KEY': JSON.stringify(process.env.VITE_STRIPE_API_KEY),
  },
  build: {
  }
})
