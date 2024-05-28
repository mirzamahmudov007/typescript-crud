module.exports = {
  env: { browser: true, es2021: true },
  node: true,
  extends: ["eslint:recommended", "plugin:react/recommended", "plugin:@typescript-eslint/recommended"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: { jsx: true },
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react", "@typescript-eslint"],
  rules: {
    "no-cond-assign": 2,
    "no-console": ["error", { allow: ["log", "warn", "error", "info"] }],
    "no-dupe-args": 2,
    "no-dupe-keys": 2,
    "no-duplicate-case": 2,
    "no-empty": 2,
    "no-ex-assign": 2,
    "no-extra-boolean-cast": 2,
    "no-extra-parens": 0,
    curly: [2, "all"],
    "no-catch-shadow": 0,
    "no-label-var": 2,
    "no-shadow": 0,
    "no-shadow-restricted-names": 2,
    "no-use-before-define": 0,
    "array-bracket-spacing": [2, "never"],
    "block-spacing": [1, "never"],
    "brace-style": [2, "1tbs", { allowSingleLine: true }],
    indent: ["error", 2],
    "func-call-spacing": 2,
    "key-spacing": [2, { beforeColon: false, afterColon: true }],
    "lines-around-comment": [2, { beforeBlockComment: true }],
    "func-style": 0,
    quotes: [2, "single", "avoid-escape"],
    semi: [2, "always"],
    "no-unused-vars": 0,
  },
  extends: ["prettier"],
};