module.exports = {
    extends: [
      'react-app', // Default configuration from Create React App
      'plugin:react/recommended', // React recommended rules
    ],
    plugins: ['react'], // Enable the 'react' plugin
    parserOptions: {
      ecmaVersion: 2020, // Use ECMAScript 2020 syntax
      sourceType: 'module', // Enable ECMAScript modules
    },
    
  };
  