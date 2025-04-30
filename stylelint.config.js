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
    'at-rule-no-deprecated': [{
      ignoreAtRules: [
        'apply',
      ],
    }],
    'function-no-unknown': [{ ignoreFunctions: ['spacing', 'modifier'] }],
  },
}
