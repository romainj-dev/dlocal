const nx = require('@nx/eslint-plugin');

module.exports = [
  ...nx.configs['flat/base'],
  ...nx.configs['flat/typescript'],
  ...nx.configs['flat/javascript'],
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
