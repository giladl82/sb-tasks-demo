import js from '@eslint/js';
import prettier from 'eslint-config-prettier'; // No need for rules access
import importPlugin from 'eslint-plugin-import';
import { projectStructurePlugin } from 'eslint-plugin-project-structure';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import globals from 'globals';
import tseslint from 'typescript-eslint';

import { folderStructureConfig } from './folderStructure.mjs';
import { independentModulesConfig } from './independentModules.mjs';


export default tseslint.config(
  { ignores: ['dist', 'projectStructure.cache.json', '**/test-runner.js'] },
  {
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
      prettier, // Include Prettier as part of `extends`
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: { ...globals.builtin, ...globals.browser, ...globals.node },
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      'project-structure': projectStructurePlugin,
      import: importPlugin,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      'project-structure/folder-structure': ['error', folderStructureConfig],
      'project-structure/independent-modules': [
        'error',
        independentModulesConfig,
      ],
      'import/order': [
        'error',
        {
          groups: [
            'builtin', // Node.js built-in modules
            'external', // npm packages
            'internal', // paths aliased to src/
            'parent', // parent directory imports
            'sibling', // same directory imports
            'index', // index file imports
          ],
          'newlines-between': 'always',
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
        },
      ],
    },
  },
);
