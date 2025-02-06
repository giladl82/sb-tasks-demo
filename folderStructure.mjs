// @ts-check

import { createFolderStructure } from 'eslint-plugin-project-structure';

export const folderStructureConfig = createFolderStructure({
  structure: [
    // Allow any files in the root of your project, like package.json, eslint.config.mjs, etc.
    { name: '*' },

    // Allow any folders in the root of your project.
    { name: '*', children: [] },

    // The `src` folder should follow this structure.
    {
      name: 'src',
      children: [
        { name: '*' },
        {
          name: 'assets',
          children: [{ name: '{PascalCase}.(tsx|stories.tsx)' }],
        },
        {
          name: 'pages',
          children: [{ name: '{PascalCase}.(tsx|stories.tsx)' }],
        },
        {
          name: 'services',
          children: [
            { name: 'use{PascalCase}.(ts|tsx)' },
            { name: '{kebab-case}.(ts|tsx)' },
          ],
        },
        { name: 'models', children: [{ name: '{kebab-case}.(ts|tsx)' }] },
        {
          name: 'components',
          children: [{ name: '{PascalCase}.(tsx|stories.tsx)' }],
        },
      ],
    },
  ],
});
