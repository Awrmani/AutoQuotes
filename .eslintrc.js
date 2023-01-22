module.exports = {
  extends: [
    'airbnb-base',
    'prettier',
    'react-app',
    'plugin:cypress/recommended',
  ],
  plugins: ['react', 'cypress'],
  rules: {
    'import/prefer-default-export': ['off'],
    'react/jsx-filename-extension': ['off'],
    'react/jsx-props-no-spreading': ['off'],
    // Enforce that state initialization should happen as a class property (and not in the constructor)
    'react/state-in-constructor': ['warn', 'never'],
    'no-plusplus': ['off'],
    'no-throw-literal': ['off'],
    'arrow-body-style': ['off'],
    // we need to have some unnamed generator functions for saga
    'func-names': ['off'],
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: [
          '**/*.test.js',
          '**/*.test.jsx',
          '**/*.test.ts',
          '**/*.test.tsx',
        ],
      },
    ],
    'react-hooks/exhaustive-deps': ['error'],
    'react/function-component-definition': [
      'warn',
      {
        namedComponents: 'arrow-function',
        unnamedComponents: 'arrow-function',
      },
    ],
    'default-param-last': ['off'],
    'react/prop-types': ['warn'],
    'no-underscore-dangle': ['off'], // Mongoose loves underscore dangling
    'no-constructor-return': ['off'], // We sometimes return a promise from the constructor
    'constructor-super': ['off'], // This is buggy with extended classes
  },
  env: {
    'cypress/globals': true,
  },
};
