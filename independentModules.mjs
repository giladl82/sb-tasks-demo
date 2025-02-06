// @ts-check
// es
import { createIndependentModules } from 'eslint-plugin-project-structure';

export const independentModulesConfig = createIndependentModules({
  modules: [
    // assets folder
    {
      name: 'assets folder',
      pattern: 'src/assets/**/*',
      errorMessage:
        '🔥 The `assets` folder cannot import from any other folder. 🔥',
      allowImportsFrom: [],
      allowExternalImports: false,
    },
    // components folder
    {
      name: 'components folder',
      pattern: 'src/components/**/*',
      errorMessage:
        '🔥 The `components` folder can only import from `[components, models]`. 🔥',
      allowImportsFrom: ['{family}/*', 'src/assets/*', 'src/models/*'],
      allowExternalImports: true,
    },
    //models folder
    {
      name: 'models folder',
      pattern: 'src/models/**/*',
      errorMessage:
        '🔥 The `models` folder can only import from `[models]`. 🔥',
      allowImportsFrom: ['{family}/*'],
      allowExternalImports: true,
    },
    // pages folder
    {
      name: 'pages folder',
      pattern: 'src/pages/**/*',
      errorMessage:
        '🔥 The `pages` folder can only import from `[assets, components, models, services]`. 🔥',
      allowImportsFrom: [
        '{family}/*',
        'src/assets/*',
        'src/components/*',
        'src/models/*',
        'src/services/*',
      ],
      allowExternalImports: true,
    },
    // services folder
    {
      name: 'services folder',
      pattern: 'src/services/**/*',
      errorMessage:
        '🔥 The `services` folder can only import from `[models, services]`. 🔥',
      allowImportsFrom: ['src/models/*', 'src/services/*'],
      allowExternalImports: true,
    },

    // All files not specified in the rules are not allowed to import anything.
    // Ignore all non-nested files in the `src` folder.
    {
      name: 'Unknown files',
      pattern: [['**', 'src/**/*', '!src/App.tsx', '!src/main.tsx']],
      allowImportsFrom: [],
      allowExternalImports: true,
      errorMessage:
        '🔥 This file is not specified as an independent module in `independentModules.mjs`. 🔥',
    },
  ],
  pathAliases: {
    baseUrl: '.',
    paths: {
      '@assets/*': ['./src/assets'],
      '@components/*': ['./src/components'],
      '@models/*': ['./src/models'],
      '@pages/*': ['./src/pages'],
      '@services/*': ['./src/services'],
    },
  },
});
