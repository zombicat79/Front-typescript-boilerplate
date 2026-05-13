const js = require("@eslint/js");
const globals = require("globals");

let tsParser;
let tsPlugin;

try {
  // Optional dependency: needed for real ESLint parsing/linting of TS syntax.
  tsParser = require("@typescript-eslint/parser");
  tsPlugin = require("@typescript-eslint/eslint-plugin");
} catch {
  // Leave undefined; we will ignore TS files in the ESLint config below.
}

module.exports = [
  // Scope core JS rules to JS files only.
  { ignores: ["dist/"] },
  { ...js.configs.recommended, files: ["**/*.js"] },
  {
    files: ["**/*.js"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "commonjs",
      globals: {
        ...globals.node,
      },
    },
    rules: {
      // Safety / correctness
      "no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
      "no-console": "off", // keep console allowed for this small Node app

      // Consistency
      eqeqeq: ["error", "always"],
      curly: ["error", "all"],
      semi: ["error", "always"],
      quotes: ["error", "double"]
    },
  },
  ...(tsParser && tsPlugin
    ? [
        {
          files: ["**/*.ts", "**/*.tsx"],
          languageOptions: {
            ecmaVersion: "latest",
            sourceType: "commonjs",
            parser: tsParser,
            globals: {
              ...globals.node,
            },
          },
          plugins: {
            "@typescript-eslint": tsPlugin,
          },
          rules: {
            // Keep the same style/correctness rules you already apply to JS.
            eqeqeq: ["error", "always"],
            curly: ["error", "all"],
            semi: ["error", "always"],
            quotes: ["error", "double"],
            "no-console": "off",

            // Prefer TS-aware unused-var detection.
            "no-unused-vars": "off",
            "@typescript-eslint/no-unused-vars": [
              "warn",
              { argsIgnorePattern: "^_" },
            ],

            // If the plugin exposes its recommended rules, include them too.
            ...(tsPlugin.configs?.recommended?.rules ?? {}),
          },
        },
      ]
    : [
        // If TypeScript ESLint deps aren't installed, don't make ESLint fail.
        {
          ignores: ["**/*.ts", "**/*.tsx"],
        },
      ]),
];