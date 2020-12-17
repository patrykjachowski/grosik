module.exports = {
    plugins: ["testing-library"],
    extends: ["plugin:testing-library/react"],
    parserOptions: {
        "ecmaVersion": 2018,
        "ecmaFeatures": {
            "globalReturn": true,
            "experimentalObjectRestSpread": true,
            "jsx": true,
            "modules": true
        },
        "sourceType": "module",
    },
    env: {
        browser: true,
        es6: true,
        node: true
    },
    rules: {
        "no-console": 0,
        "no-unused-vars": 0,
        "testing-library/await-async-query": "error",
        "testing-library/no-await-sync-query": "error",
        "testing-library/no-debug": "warn",
    },
    overrides: [
        {
            "files": ["*.test.js", "*.spec.js"],
            "rules": {
                "no-unused-expressions": "off"
            }
        }
    ]
};