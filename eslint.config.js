import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import prettier from 'eslint-config-prettier'; // No need for rules access
import { projectStructurePlugin } from 'eslint-plugin-project-structure';
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
      globals: {...globals.builtin, ...globals.browser, ...globals.node},
      
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      'project-structure': projectStructurePlugin,
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
    }
  },
);
