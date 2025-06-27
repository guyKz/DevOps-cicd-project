module.exports = {
    // Environment settings - tells ESLint what global variables are available
    env: {
        node: true,        
        es2021: true,      
        jest: true         
    },

    // Extends popular ESLint configurations
    extends: [
        'eslint:recommended'  
    ],

    // Parser options for modern JavaScript
    parserOptions: {
        ecmaVersion: 'latest',  
        sourceType: 'module'    
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
        'arrow-spacing': 'error',           
        'template-curly-spacing': 'error'   
    },

    // Global variables that ESLint should recognize
    globals: {
        'process': 'readonly',    
        'Buffer': 'readonly',     
        '__dirname': 'readonly',  
        '__filename': 'readonly'  
    },

    // Ignore patterns - files/folders ESLint should skip
    ignorePatterns: [
        'node_modules/',     
        'dist/',             
        'build/',            
        'coverage/',         
        '*.min.js'          
    ]
};