import js from "@eslint/js";
import globals from "globals";
import { defineConfig, globalIgnores } from "eslint/config";
import stylisticJs from "@stylistic/eslint-plugin-js";

export default defineConfig([
  {
    files: ["**/*.js"],
    plugins: { js, '@stylistic/js': stylisticJs },
    extends: ["js/recommended"],
    rules: {
      "eqeqeq": 'error',
      'no-console': 'off',
      "@stylistic/js/indent": ["error", 2],
      "@stylistic/js/linebreak-style": ["error", "unix"],
      "@stylistic/js/quotes": ["error", "single"],
      "@stylistic/js/semi": ["error", "never"],
      "@stylistic/js/no-trailing-spaces": ["error", { "skipBlankLines": true }],
      "@stylistic/js/object-curly-spacing": ["error", "always"],
      "@stylistic/js/arrow-spacing": ["error", { "before": true, "after": true }],
    },
    languageOptions: {
      sourceType: "commonjs",
      globals: { ...globals.node },
      ecmaVersion: "latest",
    },
  },
  globalIgnores(["dist/**"])
]);