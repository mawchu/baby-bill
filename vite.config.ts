import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// const path = require('path')
// const stylePath = path.resolve(__dirname, './src/assets/scss/main.scss');

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
        modifyVars: {
          'primary-color': '#94D0C9',
	        'link-color': 'red',
        },
        additionalData: '@import "./src/assets/style/global.less";',
      }
    },
  },
})
