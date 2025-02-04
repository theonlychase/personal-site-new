/** @type {import('stylelint').Config} */
export default {
  extends: 'stylelint-config-recommended',
  rules: {
    'at-rule-no-unknown': [
      {
        ignoreAtRules: [
          'tailwind',
          'apply',
          'variants',
          'responsive',
          'screen',
        ],
      },
    ],
    // 'custom-property-no-missing-var-function': null,
    // 'custom-property-pattern': null,
    'function-no-unknown': [{ ignoreFunctions: ['spacing'] }],
    // 'keyframes-name-pattern': null,
    // 'no-unknown-custom-properties': null,
    // 'property-no-unknown': null,
    // 'selector-class-pattern': null,
    // 'selector-id-pattern': null,
    // 'at-rule-no-deprecated': null,
    // 'import-notation': null,
  },
};
