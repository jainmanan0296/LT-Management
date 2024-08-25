module.exports = {
    "env": {
        "node": true,
        "commonjs": true,
        "es2021": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended"
    ],
    "overrides": [
    ],
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "rules": {
        "linebreak-style": [
            "error",
            "windows"
        ],
        "semi": [
            "error",
            "always"
        ],
        "no-unused-vars": [
            "error",
            { "varsIgnorePattern": "^err|^err1|^err2|^err3" }
          ]
    }
};
