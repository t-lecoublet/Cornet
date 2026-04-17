import type { DocPageData } from '@/types/docs'

export default {
  title: 'Installation',
  description: 'No npm publish, no registry — just Git. Pick your setup and go.',
  category: 'Guides',
  sections: [
    {
      title: '1. Add to Your project',
      description: 'Add only the lib as a Git submodule — no npm publish needed.',
      lang: 'bash',
      code: `git submodule add -b lib \\
  git@gitlab.limos.fr:hub-isima/daisyui-vue-kit.git lib
git submodule update --init --recursive
npm install ./lib`,
    },
    {
      title: 'Or with New project',
      description: 'Clone the full repo — Vite + Vue already wired up.',
      lang: 'bash',
      code: `git clone --recurse-submodules \\
  git@gitlab.limos.fr:hub-isima/daisyui-vue-kit.git`,
    },
    {
      title: 'Or with Nuxt',
      description: 'Grab our ready-made Nuxt starter instead.',
      lang: 'bash',
      code: `git clone git@gitlab.limos.fr:hub-isima/daisyui-vue-kit-nuxt-starter.git`,
    },
    {
      title: '2. Add the Vite plugin',
      lang: 'ts',
      code: `// vite.config.ts
import vueDaisyUI from 'daisyui-vue-kit/plugin-vite'

export default defineConfig({
  plugins: [vueDaisyUI({ showOutput: true }), vue(), tailwindcss()]
})`,
    },
    {
      title: '3. Import the CSS',
      lang: 'css',
      code: `/* your main CSS file */
@import "tailwindcss";
@import "daisyui-vue-kit/css";
@plugin "daisyui";`,
    },
    {
      title: 'Use a component',
      lang: 'vue',
      code: `import { DuButton } from 'daisyui-vue-kit'

<DuButton variant="primary">Hello World!</DuButton>`,
    },
  ],
} satisfies DocPageData
