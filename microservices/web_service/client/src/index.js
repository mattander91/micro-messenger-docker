/*

Cleanup:
  package.json files
  .gitignore files
  console.logs

1.) micro_messenger(this file) - for GitHub
     - keep load test files
     - keep docker files
     - README:
       - Overview and other descriptions
       - How to run on docker
       - How to run tests


2.) micro_messenger_local - for deployment
      - remove test files
     - remove docker files
     - Check ajax URLs in each service
     - Set up database for each service
     - Webpack for web_service?

*/


import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.js';

ReactDOM.render(<App />, document.getElementById('app'));