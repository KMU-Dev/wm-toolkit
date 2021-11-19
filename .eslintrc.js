module.exports = {
    root: true,
    env: {
        browser: true,
        commonjs: true,
        greasemonkey: true,
    },
    parser: '@typescript-eslint/parser',
    parserOptions: {
        tsconfigRootDir: __dirname,
        project: ['./tsconfig.json'],
    },
    plugins: [
        '@typescript-eslint',
        'prettier',
    ],
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
        'prettier',
    ],
    rules: {
        'prettier/prettier': 'error',
        '@typescript-eslint/restrict-template-expressions': 'off',
        '@typescript-eslint/no-empty-function': [
            'error',
            {
                'allow': ['private-constructors', 'protected-constructors', 'methods', 'asyncMethods']
            }
        ]
    },
};
