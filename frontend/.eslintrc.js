module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    amd: true
  },
  parserOptions: {
    "parser": "babel-eslint",
    "sourceType": "module",
    "ecmaVersion": 2017,
    "ecmaFeatures": {
      "experimentalObjectRestSpread": true
    }
  },
  extends: [
    "@nuxtjs",
    "eslint:recommended",
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
    "plugin:vue/recommended",
    "plugin:prettier/recommended",
    "plugin:import/errors",
    "plugin:import/warnings"
  ],
  // required to lint *.vue files
  plugins: [
    'vue',
    'import'
  ],
  // add your custom rules here
  rules: {
    "import/no-unresolved": [2, {commonjs: true, amd: true}],
    "semi": [2, "never"],
    "no-console": "off",
    "vue/max-attributes-per-line": "off",
    "prettier/prettier": ["error", { "semi": false }]
  }
}