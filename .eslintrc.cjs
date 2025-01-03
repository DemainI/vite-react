module.exports = {
	root: true,
	env: { browser: true, es2021: true, node: true },
	extends: ["eslint:recommended", 'prettier', 'plugin:@typescript-eslint/recommended', 'plugin:prettier/recommended'],
	ignorePatterns: ["dist", ".eslintrc.cjs", ".prettierrc.cjs"],
	parser: "@typescript-eslint/parser",
	plugins: ["react", "@typescript-eslint", 'prettier'],
	rules: {
    "arrow-body-style": "off",
    "prefer-arrow-callback": "off",
    "no-unused-vars": "warn",
    "@typescript-eslint/no-explicit-any": ["off"],
    "@typescript-eslint/no-unused-vars": ["off"],
	},
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true
    },
    "ecmaVersion": "latest",
    "sourceType": "module"
  },
}
