module.exports = {
	root: true,
	env: { browser: true, es2021: true, node: true },
	extends: ["eslint:recommended", "plugin:prettier/recommended"],
	ignorePatterns: ["dist", ".eslintrc.cjs", ".prettierrc.cjs"],
	parser: "@typescript-eslint/parser",
	plugins: ["react-refresh", "react", "@typescript-eslint", "prettier"],
	rules: {
		"react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
    "prettier/prettier": "error",
    "arrow-body-style": "off",
    "prefer-arrow-callback": "off",
    "no-unused-vars": "warn"
	},
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true
    },
    "ecmaVersion": "latest",
    "sourceType": "module"
  },
}
