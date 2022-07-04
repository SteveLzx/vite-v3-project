import { defineConfig } from 'vite'
import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'
// 自动按需引入
// 会进行依赖分析，导致加载时间过长
// import AutoImport from 'unplugin-auto-import/vite'
// import Components from 'unplugin-vue-components/vite'
// import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// 引入mock
import { viteMockServe } from 'vite-plugin-mock'

// 引入cdn
import importToCDN from 'vite-plugin-cdn-import'

// 代码gizp压缩
import viteCompression from 'vite-plugin-compression';

// 图片压缩
import viteImagemin from 'vite-plugin-imagemin'

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [
    vue(),
    // 本地按需引入也不推荐，推荐直接使用cdn
    // AutoImport({
    //   resolvers: [ElementPlusResolver()],
    // }),
    // Components({
    //   resolvers: [ElementPlusResolver()],
    // }),
    viteMockServe({
      mockPath: 'mock',
    }),
    importToCDN({
      modules: [
        {
          name: 'vue',
          var: 'Vue',
          path: 'https://unpkg.com/vue@next',
        },
        {
          name: 'vue-router',
          var: 'VueRouter',
          path: 'https://unpkg.com/vue-router@4',
        }, 
        {
          name: 'vuex',
          var: 'Vuex',
          path: 'https://unpkg.com/vuex@4',
        },                 
        {
          name: 'element-plus',
          var: 'ElementPlus',
          path: 'https://unpkg.com/element-plus',
          css: 'https://unpkg.com/element-plus/dist/index.css'
        },
      ],
    }),
    viteCompression(),
    viteImagemin({
      gifsicle: {
        optimizationLevel: 7,
        interlaced: false,
      },
      optipng: {
        optimizationLevel: 7,
      },
      mozjpeg: {
        quality: 20,
      },
      pngquant: {
        quality: [0.8, 0.9],
        speed: 4,
      },
      svgo: {
        plugins: [
          {
            name: 'removeViewBox',
          },
          {
            name: 'removeEmptyAttrs',
            active: false,
          },
        ],
      },
    }),    
  ],
  resolve: {
    alias: {
      comps: resolve(__dirname, 'src/components'),
      views: resolve(__dirname, 'src/views'),
      styles: resolve(__dirname, 'src/styles'),
      layouts: resolve(__dirname, 'src/layouts'),
      '/img': './src/assets/image',
    }
  },
  build: {
    minify: 'terser', // 需要加上这个才生效
    terserOptions: { // 移除 console debugger
      compress: {
        drop_console: true,
        drop_debugger: true,
      }
    },
    // outDir: 'dist', // 打包输出的文件名
    sourcemap: true, // 线上环境关闭html注释
    chunkSizeWarningLimit: 500, // chunk 大小警告的限制（以 kbs 为单位）。
    rollupOptions: { // 打包时资源分类
      output: {
        chunkFileNames: 'js[name]-[hash].js',
        entryFileNames: 'js[name]-[hash].js',
        assetFileNames: '[ext]/[name]-[hash].[ext]'
      }
    }
  },
  server: {
    proxy: {
      // 字符串简写写法
      '/foo': 'http://localhost:4567',
      // 选项写法
      '/api': {
        target: 'http://jsonplaceholder.typicode.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      },
      // 正则表达式写法
      '^/fallback/.*': {
        target: 'http://jsonplaceholder.typicode.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/fallback/, '')
      },
      // 使用 proxy 实例
      '/app': {
        target: 'http://jsonplaceholder.typicode.com',
        changeOrigin: true,
        configure: (proxy, options) => {
          // proxy 是 'http-proxy' 的实例
        }
      }
    }
  }  
})
