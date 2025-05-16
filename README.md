# ESLint Configuration pour un Projet TypeScript

Ce projet utilise une configuration avancée d'ESLint pour garantir :

-  Une bonne qualité de code TypeScript
-  Un respect strict des conventions de nommage (camelCase, PascalCase, SNAKE_CASE)
- Une structure de projet lisible et maintenable
-  L’interdiction de fichiers ambigus comme `index.ts`

---

## Installation des dépendances

Installez les paquets nécessaires avec :

```bash
npm install --save-dev eslint @eslint/js typescript-eslint eslint-plugin-check-file
```

---

##  Fichier `eslint.config.ts` expliqué

Ce fichier contient la configuration complète d'ESLint pour le projet. Il est basé sur les recommandations officielles de `eslint` et `typescript-eslint`, avec des règles supplémentaires pour renforcer la rigueur du code.

```ts
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
      "check-file/no-index": "error",
      "check-file/filename-naming-convention": [
        "error",
        {
          "src/**/*.{js,ts}": "SNAKE_CASE",
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
```

### Détails des éléments importants

####  `eslint.configs.recommended` et les autres configs
Ces configurations activent automatiquement les règles recommandées par ESLint et TypeScript.

#### `plugins`
Utilisation du plugin `check-file` pour :

- Interdire les fichiers `index.ts` (`check-file/no-index`)
- Imposer des conventions de nommage strictes :
  - Fichiers et dossiers : `SNAKE_CASE`
  - Variables/fonctions/paramètres : `camelCase`
  - Classes : `PascalCase`

####  `parserOptions`
Permet d’utiliser `tsconfig.json` comme base d’analyse du code pour les vérifications avancées.

####  `rules` principales
- `no-unused-vars` : interdit les variables non utilisées (sauf celles commençant par `_`)
- `ban-ts-comment` : les commentaires `@ts-ignore` doivent contenir une description d'au moins 10 caractères

---

##  Exemple de nommage valide

```
src/
  └── services/
      └── USER_SERVICE.ts ← OK (fichier en SNAKE_CASE)

class UserService {} ← OK (classe en PascalCase)

function fetchData() {} ← OK (fonction en camelCase)

const userName = "John"; ← OK (variable en camelCase)
```

---

##  Exemple de nommage invalide

```
src/
  └── services/
      └── userService.ts ←  (fichier doit être en SNAKE_CASE)

class user_service {} ←  (classe doit être en PascalCase)
```

---

## Exécuter l'analyse

Lancez ESLint dans le projet avec :

```bash
npm run lint
```
