// @ts-check
import eslint from '@eslint/js';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    ignores: ['eslint.config.mjs'],
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  eslintPluginPrettierRecommended,
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
      },
      ecmaVersion: 5,
      sourceType: 'module',
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    rules: {
      'import/no-unresolved': ['off'], // Ensures an imported module can be resolved to a module on the local filesystem
      '@typescript-eslint/no-empty-interface': [
        'error',
        {
          allowSingleExtends: false,
        },
      ],
      '@typescript-eslint/explicit-function-return-type': ['warn'],
      '@typescript-eslint/explicit-module-boundary-types': ['warn'],
      '@typescript-eslint/no-explicit-any': ['warn'],
      '@typescript-eslint/ban-ts-comment': ['off'],
      '@typescript-eslint/no-unused-vars': ['warn'],
      '@typescript-eslint/semi': ['error', 'always'],
      '@typescript-eslint/quotes': [
        'error',
        'single',
        {
          avoidEscape: true,
          allowTemplateLiterals: true,
        },
      ],
      '@typescript-eslint/restrict-template-expressions': ['warn'],
      '@typescript-eslint/ban-types': [
        'error',
        {
          types: {
            Foo: "Don't use Foo because it is unsafe",

            String: {
              message: 'Use string instead',
              fixWith: 'string',
            },
            Symbol: {
              message: 'Use symbol instead',
              fixWith: 'symbol',
            },
            '{}': {
              message: 'Use object instead',
              fixWith: 'object',
            },
          },
        },
      ],
      '@typescript-eslint/naming-convention': [
        'error',
        {
          selector: 'variableLike', // matches the same as variable, function and parameter
          format: ['camelCase', 'PascalCase', 'UPPER_CASE'],
        },
        {
          selector: 'memberLike', //matches the same as property, parameterProperty, method, accessor, enumMember with type: none
          format: ['camelCase', 'PascalCase', 'UPPER_CASE'],
          leadingUnderscore: 'forbid',
        },
        {
          selector: 'typeLike', //matches the same as class, interface, typeAlias, enum, typeParameter ( abstract, unused)
          format: ['PascalCase', 'UPPER_CASE'],
        },
        {
          selector: 'property', // classProperty, objectLiteralProperty, typeProperty with type types: boolean, string, number, function, array
          modifiers: ['readonly'],
          format: ['PascalCase', 'camelCase', 'UPPER_CASE'],
        },
      ],
    },
  },
);