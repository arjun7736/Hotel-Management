import globals from "globals";
import parser from "@typescript-eslint/parser";
import plugin from "@typescript-eslint/eslint-plugin";

// Define the ESLint recommended rules
const eslintRecommended = {
  files: ["**/*.{js,mjs,cjs,ts}"],
  languageOptions: {
    globals: {
      ...globals.browser,
      ...globals.node,
      ...globals.es2020,
    },
    parser: parser,
    parserOptions: {
      ecmaVersion: 2020,
      sourceType: "module",
    },
  },
  plugins: {
    "@typescript-eslint": plugin,
  },
  rules: {
    // Add recommended rules from ESLint
  },
};

// Define the TypeScript ESLint recommended rules
const typescriptEslintRecommended = {
  files: ["**/*.{ts,tsx}"],
  rules: {
    // Add recommended rules from @typescript-eslint
    ...plugin.configs.recommended.rules,
  },
};

export default [
  eslintRecommended,
  typescriptEslintRecommended,
];
