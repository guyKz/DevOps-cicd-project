module.exports = {
    // Environment settings - tells ESLint what global variables are available
    env: {
        node: true,        // Node.js environment (console, process, etc.)
        es2021: true,      // Modern JavaScript features
        jest: true         // Jest testing framework globals (describe, test, expect)
    },

    // Extends popular ESLint configurations
    extends: [
        'eslint:recommended'  // Use ESLint's recommended rules
    ],

    // Parser options for modern JavaScript
    parserOptions: {
        ecmaVersion: 'latest',  // Latest ECMAScript version
        sourceType: 'module'    // Allow import/export statements
    },

    // Custom rules for your project
    rules: {
        // Code Quality Rules
        'no-unused-vars': 'warn',           // Warn about unused variables
        'no-console': 'off',                // Allow console.log (needed for server)
        'no-undef': 'error',                // Error on undefined variables
        
        // Style Rules
        'indent': ['error', 4],             // 4 spaces for indentation
        'quotes': ['error', 'single'],      // Use single quotes
        'semi': ['error', 'always'],        // Require semicolons
        
        // Best Practices
        'eqeqeq': 'error',                  // Require === instead of ==
        'no-var': 'error',                  // Use let/const instead of var
        'prefer-const': 'warn',             // Prefer const when variable isn't reassigned
        
        // Function Rules
        'no-unused-expressions': 'error',   // No unused expressions
        'no-unreachable': 'error',          // No unreachable code
        
        // Object/Array Rules
        'no-trailing-spaces': 'error',      // No trailing whitespace
        'comma-dangle': ['error', 'never'], // No trailing commas
        
        // ES6+ Rules
        'arrow-spacing': 'error',           // Spaces around arrow functions
        'template-curly-spacing': 'error'   // No spaces in template literals
    },

    // Global variables that ESLint should recognize
    globals: {
        'process': 'readonly',    // Node.js process object
        'Buffer': 'readonly',     // Node.js Buffer
        '__dirname': 'readonly',  // Node.js directory name
        '__filename': 'readonly'  // Node.js file name
    },

    // Ignore patterns - files/folders ESLint should skip
    ignorePatterns: [
        'node_modules/',     // Don't lint npm packages
        'dist/',             // Don't lint build output
        'build/',            // Don't lint build folder
        'coverage/',         // Don't lint test coverage reports
        '*.min.js'          // Don't lint minified files
    ]
};