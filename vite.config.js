import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteSingleFile } from 'vite-plugin-singlefile'

export default defineConfig(({ mode }) => {
  const localBuild = mode === 'standalone'
  const relativeCssAssets = {
    name: 'relative-css-assets',
    transform(code, id) {
      if (id.endsWith('.css')) {
        const assetPrefix = localBuild ? './' : '../'
        return code.replace(/url\((['"]?)\/(?!\/)([^)'\"]+)\1\)/g, (_match, quote, assetPath) => {
          const normalizedPath = assetPath.replace(/^staging\/nexgen\//, '').replace(/^nexgen\//, '')
          return `url(${quote}${assetPrefix}${normalizedPath}${quote})`
        })
      }
    },
  }

  return {
  base: './',
  plugins: [react(), relativeCssAssets, ...(localBuild ? [viteSingleFile()] : [])],
  build: localBuild ? { outDir: 'dist-local', assetsInlineLimit: 0 } : {},
  server: {
    host: '0.0.0.0',
    port: 3000,
  },
  }
})
