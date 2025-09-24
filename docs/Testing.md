# Testing

## Unit Testing

This document describes the steps I took to begin unit testing.

### Installing Vitest

To scaffold my application, I initially used the `create vue` script. During scaffolding,
we are given the option to automatically configuring unit testing with Vitest, but I did
not select this option initially. To add it after-the-fact, I ran:

```bash
npm install -D vitest
npm install -D @vitest/eslint-plugin
```

### Updating Configuration Files

I updated `eslint.config.ts` to configure the plugin:

```diff
 import { globalIgnores } from 'eslint/config'
 import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript'
 import pluginVue from 'eslint-plugin-vue'
+import pluginVitest from '@vitest/eslint-plugin'
 import skipFormatting from '@vue/eslint-config-prettier/skip-formatting'

 // To allow more languages other than `ts` in `.vue` files, uncomment the following lines:
@@ -18,5 +19,9 @@ export default defineConfigWithVueTs(

   pluginVue.configs['flat/essential'],
   vueTsConfigs.recommended,
+  {
+    ...pluginVitest.configs.recommended,
+    files: ['src/**/__tests__/*'],
+  },
   skipFormatting,
 )
```

I updated `package.json` to create a test script:

```diff
@@ -10,6 +10,7 @@
     "dev": "vite",
     "build": "run-p type-check \"build-only {@}\" --",
     "preview": "vite preview",
+    "test:unit": "vitest",
     "build-only": "vite build",
     "type-check": "vue-tsc --build",
     "lint": "eslint . --fix",
```

### Creating a Unit Test

To create a test, for example for my `shuffleArray` function under `src/libs/utils.ts`,
I created at `src/libs/__tests__/utils.spec.ts`, imported the `test` and `expect`
functions from `vitest`, and wrote a test.

To run the test, I simply ran

```bash
npm run test:unit
```

## Component Testing

To do component testing, I installed:

```bash
npm install -D @vue/test-utils
```

I copied the `tsconfig.vitest.json` and the `vitest.config.ts` files from a template-scaffolded project. I also installed `jsdom`:

```bash
npm install -D jsdom
```

## References

- [Vue - Creating a Vue Application](https://vuejs.org/guide/quick-start#creating-a-vue-application)
- [Vue - Unit Testing](https://vuejs.org/guide/quick-start#creating-a-vue-application)
- [eslint-plugin-vitest](https://github.com/vitest-dev/eslint-plugin-vitest?tab=readme-ov-file#eslint-plugin-vitest)
- [Vitest - Getting Started](https://vitest.dev/guide/#getting-started)
- [vue/test-utils](https://test-utils.vuejs.org/guide/)
