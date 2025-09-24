import { fileURLToPath } from 'url'

import { mergeConfig, defineConfig, configDefaults } from 'vitest/config'
import viteConfig from './vite.config'

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      environment: 'jsdom',
      include: [...configDefaults.include, 'src/components/**/__tests__'],
      root: fileURLToPath(new URL('./', import.meta.url)),
    },
  }),
)
