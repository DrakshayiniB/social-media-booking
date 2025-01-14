import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

//  https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  
  
  optimizeDeps: {
    include: ['socket.io-client']
  },
  resolve: {
    alias: {
      'socket.io-client' : 'socket.io-client/dist/socket.io.js',
    },
  },
  })


   
   

