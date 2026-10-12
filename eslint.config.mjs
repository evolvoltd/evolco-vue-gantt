export default [
    { ignores: ['dist/**', 'node_modules/**'] },
    {
        files: ['**/*.js', '**/*.mjs'],
        languageOptions: { ecmaVersion: 'latest', sourceType: 'module' },
        rules: {
            'no-dupe-args': 'error',
            'no-dupe-keys': 'error',
            'no-unreachable': 'error',
            'valid-typeof': 'error',
            'constructor-super': 'error'
        }
    }
];
