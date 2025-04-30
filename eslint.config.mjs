// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(
  {
    rules: {
      'vue/v-on-event-hyphenation': ['error', 'always', {
        autofix: true,
        ignore: [],
      }],
      '@stylistic/space-before-function-paren': 'off',
      '@stylistic/object-curly-newline': ['error', {
        minProperties: 2,
        multiline: true,
      }],
      '@stylistic/object-property-newline': 'error',
      '@stylistic/brace-style': ['error', '1tbs', { allowSingleLine: true }],
      '@typescript-eslint/no-inferrable-types': 'off',
      'vue/component-name-in-template-casing': ['error', 'PascalCase', {
        registeredComponentsOnly: false,
        ignores: [],
      }],
      'no-console': [
        'warn',
        { allow: ['error'] },
      ],
      'vue/multi-word-component-names': 'off',
    },
  },
)
