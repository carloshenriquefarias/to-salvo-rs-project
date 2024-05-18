const { resolve } = require('node:path');

const project = resolve(__dirname, 'tsconfig.json');

module.exports = {
  root: true,
  extends: [
    require.resolve('@vercel/style-guide/eslint/node'),
    require.resolve('@vercel/style-guide/eslint/typescript'),
    require.resolve('@vercel/style-guide/eslint/browser'),
    require.resolve('@vercel/style-guide/eslint/react'),
    require.resolve('@vercel/style-guide/eslint/next'),
  ],
  parserOptions: {
    project,
  },
  settings: {
    'import/resolver': {
      typescript: {
        project,
      },
    },
  },
  rules: {
    "react/self-closing-comp": "off",
    "import/no-duplicates": "off",
    "@typescript-eslint/prefer-regexp-exec": "off",
    "react/jsx-curly-brace-presence": "off",
    "react/no-array-index-key": "off",
    "unicorn/filename-case": "off",
    "object-shorthand": "off",
    "no-useless-return": "off",
    "react/jsx-no-useless-fragment": "off",
    "@typescript-eslint/no-unsafe-return": "off",
    "react-hooks/exhaustive-deps": "off",
    "react/jsx-no-leaked-render": "off",
    "prefer-template": "off",
    "no-console": "off",
    "no-else-return": "off",
    "react/function-component-definition": "off",
    "no-unused-vars": "off",
    "no-promise-executor-return": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-unsafe-assignment": "off",
    "@typescript-eslint/no-unsafe-call": "off",
    "@typescript-eslint/no-unsafe-member-access": "off",
    '@typescript-eslint/no-unused-vars': "off",
    "@typescript-eslint/no-unsafe-argument": "off",
    "@typescript-eslint/no-unnecessary-boolean-literal-compare": "off",
    "@typescript-eslint/no-shadow": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/use-unknown-in-catch-callback-variable": "off",
    "@typescript-eslint/prefer-optional-chain": "off",
    "@typescript-eslint/prefer-promise-reject-errors": "off",
    "@typescript-eslint/no-floating-promises": "off",
    "@typescript-eslint/no-confusing-void-expression": "off",
    '@typescript-eslint/restrict-template-expressions': "off",
    '@typescript-eslint/no-empty-interface': [
      'error',
      {
        allowSingleExtends: true,
      },
    ],
   
    'import/newline-after-import': 'error',
    'react/jsx-uses-react': 'error',
    'react/react-in-jsx-scope': 'off',
    

    // Deactivated
    '@typescript-eslint/dot-notation': 'off', // paths are used with a dot notation
    '@typescript-eslint/no-misused-promises': 'off', // onClick with async fails
    '@typescript-eslint/no-non-null-assertion': 'off', // sometimes compiler is unable to detect
    '@typescript-eslint/no-unnecessary-condition': 'off', // remove when no static data is used
    '@typescript-eslint/require-await': 'off', // Server Actions require async flag always
    '@typescript-eslint/prefer-nullish-coalescing': 'off', // personal style
    'import/no-default-export': 'off', // Next.js components must be exported as default
    'import/no-extraneous-dependencies': 'off', // conflict with sort-imports plugin
    'import/order': 'off', // using custom sort plugin
    'no-nested-ternary': 'off', // personal style
    'no-redeclare': 'off', // conflict with TypeScript function overloads
    'react/jsx-fragments': 'off', // personal style
    'react/prop-types': 'off', // TypeScript is used for type checking
    'prefer-named-capture-group': "off", //
    'no-param-reassign': "off", //

    'no-irregular-whitespace': "off", //
    '@next/next/no-img-element': 'off', // Temporary disabled,
    '@typescript-eslint/restrict-plus-operands': 'off',
    'jsx-a11y/media-has-caption': 'off', //
    'no-undef': 'off'
  },
};
