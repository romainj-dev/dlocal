const nx = require('@nx/eslint-plugin');

module.exports = [
  {
    ignores: ['**/.next/**']
  },
  ...nx.configs['flat/base'],
  ...nx.configs['flat/typescript'],
  ...nx.configs['flat/javascript'],
  {
    files: ['**/next-env.d.ts'],
    rules: {
      '@typescript-eslint/triple-slash-reference': 'off'
    }
  },
  {
    files: ['**/*.{ts,tsx,js,jsx}'],
    rules: {
      '@nx/enforce-module-boundaries': [
        'error',
        {
          enforceBuildableLibDependency: true,
          allow: [],
          depConstraints: [
            {
              sourceTag: 'type:app',
              onlyDependOnLibsWithTags: ['type:ui', 'type:auth', 'type:types']
            },
            {
              sourceTag: 'type:ui',
              onlyDependOnLibsWithTags: ['type:types']
            },
            {
              sourceTag: 'type:auth',
              onlyDependOnLibsWithTags: ['type:types']
            },
            {
              sourceTag: 'type:types',
              onlyDependOnLibsWithTags: ['type:types']
            }
          ]
        }
      ]
    }
  }
];
