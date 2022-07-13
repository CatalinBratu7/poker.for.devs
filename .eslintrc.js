module.exports = {
  env: {
    node: true,
  },
  extends: ["eslint:recommended", "plugin:vue/vue3-recommended", "prettier"],
  plugins: ["vue", "prettier"],
  rules: {
    "prettier/prettier": "error",
    "max-len": ["error", { code: 120, ignoreUrls: true }],
  },
};
