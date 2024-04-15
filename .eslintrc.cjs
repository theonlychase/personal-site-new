module.exports = {
  root: true,
  env: {
    browser: true,
    es2022: true,
    node: true,
  },
  extends: [
    '@nuxtjs/eslint-config-typescript',
    'plugin:vue/vue3-recommended',
  ],
  rules: {
    'comma-dangle': ['error', 'always-multiline'],
    'vue/v-on-event-hyphenation': ['error', 'always', {
      autofix: true,
      ignore: [],
    }],
    'space-before-function-paren': 'off',
    '@typescript-eslint/space-before-function-paren': 'off',
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
}
