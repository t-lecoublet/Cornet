import pluginVue from 'eslint-plugin-vue'
import pluginVueA11y from 'eslint-plugin-vuejs-accessibility'
import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript'

export default defineConfigWithVueTs(
  {
    ignores: ['node_modules/**', 'dist/**', 'coverage/**', 'build-scripts/**'],
  },
  pluginVue.configs['flat/essential'],
  ...pluginVueA11y.configs['flat/recommended'],
  vueTsConfigs.recommended,
  {
    rules: {
      // A `<label>` that wraps its control is a valid association; the rule's
      // default demands a `for` on top of the nesting.
      'vuejs-accessibility/label-has-for': [
        'error',
        { required: { some: ['nesting', 'id'] } },
      ],
      '@typescript-eslint/no-explicit-any': 'error',
      'vue/multi-word-component-names': 'off',
      'no-console': ['error', { allow: ['warn', 'error'] }],
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
    },
  },
  {
    // Cornet's form primitives render the bare control and leave the label to
    // the consumer — `<DuLabel>Email <DuInputField/></DuLabel>`, or a `for`/`id`
    // pair. `form-control-has-label` cannot see across that boundary, so here
    // it only produces noise. The components that render both a control AND
    // its label stay covered by the rule.
    files: [
      'components/DataInput/du-checkbox/**',
      'components/DataInput/du-file-input/**',
      'components/DataInput/du-input-field/**',
      'components/DataInput/du-radio/**',
      'components/DataInput/du-range/**',
      'components/DataInput/du-text-area/**',
    ],
    rules: {
      'vuejs-accessibility/form-control-has-label': 'off',
    },
  },
  {
    // Stories are example fixtures: unused render args are part of the Storybook
    // signature, and so is `render: (args: any)` — Storybook types the args bag
    // itself, and re-deriving it per story buys nothing.
    files: ['**/*.stories.ts'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      'vue/return-in-computed-property': 'off',
    },
  },
  {
    // The Vite plugin and packaging scripts report progress on stdout by design.
    files: ['plugin-vite.ts', 'scripts/**'],
    rules: {
      'no-console': 'off',
    },
  },
)
