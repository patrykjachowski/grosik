module.exports = {
    plugins: ['testing-library', "react"],
    extends: ['plugin:testing-library/react', 'plugin:react/recommended'],
    parserOptions: {
        ecmaVersion: 2018,
        ecmaFeatures: {
            globalReturn: true,
            experimentalObjectRestSpread: true,
            jsx: true,
            modules: true,
        },
        sourceType: 'module',
    },
    env: {
        browser: true,
        es6: true,
        node: true,
    },
    rules: {
        'no-console': 0,
        'no-unused-vars': 0,
        'testing-library/await-async-query': 'error',
        'testing-library/no-await-sync-query': 'error',
        'testing-library/no-debug': 'warn',
        'react/state-in-constructor': [2, "always"],
        'react/prop-types': 0
    },
    overrides: [
        {
            files: ['*.test.js', '*.spec.js'],
            rules: {
                'no-unused-expressions': 'off',
            },
        },
    ],
}
