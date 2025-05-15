import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import checkFilePlugin from "eslint-plugin-check-file";

export default tseslint.config(
    eslint.configs.recommended,
    tseslint.configs.recommendedTypeChecked,
    tseslint.configs.strictTypeChecked,
    tseslint.configs.stylisticTypeChecked,
    {
        plugins: {
            "check-file": checkFilePlugin,
        },
        ignores: [
            "node_modules/**",
            "dist/**",
            "build/**",
        ],

        languageOptions: {
            parserOptions: {
                project: "./tsconfig.json",
                tsconfigRootDir: __dirname,
            },
        },
        rules: {
            "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
            'check-file/no-index': 'error',
            "check-file/filename-naming-convention": [
                "error",
                {
                    "src/**/*.{js,ts}": "CAMEL_CASE",
                }
            ],
            "check-file/folder-naming-convention": [
                "error",
                {
                    "src/**/*": "SNAKE_CASE"
                }
            ],
            "@typescript-eslint/naming-convention": [
                "error",
                {
                    "selector": "variableLike",
                    "format": ["camelCase"]
                },
                {
                    "selector": "function",
                    "format": ["camelCase"]
                },
                {
                    "selector": "parameter",
                    "format": ["camelCase"]
                },
                {
                    "selector": "class",
                    "format": ["PascalCase"],
                }
            ],
            "@typescript-eslint/ban-ts-comment": [
                "error",
                { minimumDescriptionLength: 10 },
            ],
        },
    }
);
