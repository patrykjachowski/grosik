module.exports = {
    extends: ['eslint:recommended'],
    "parserOptions": {
        "ecmaVersion": 8,
        "ecmaFeatures": {
            "globalReturn": true,
            "experimentalObjectRestSpread": true
        }
    },
    env: {
        browser: true,
        es6: true,
        node: true
    },
    rules: {
        "no-console": 0,
        "no-unused-vars": 0
    }
};