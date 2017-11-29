// Boilerplate code to configure the framework
const express = require('express');
const router = express.Router();
const pg = require('pg');
const path = require('path');
// End boilerplate

// Database configuration
const connectionString = 'postgresql://contex:contexisthebest@squarecell.eu:5432/contex';
const tableName = 'items'
// End configuration

// Handle HTTP Request GET on URL (address) '/api/v1/todos'
router.get('/api/v1/todos', (req, res, next) => {

  // Get the data from the database
  
  // We'll store the data there
  const results = [];

  // Connects to the database
  pg.connect(connectionString, (err, client, done) => {
  
    // Handle errors
    if(err) {
      done();
      console.log(err);
      // Returns an error to the browser
      return res.status(500).json({success: false, data: err});
    }
  
    // Create a request for the database. Select means read.
    const query = client.query('SELECT * FROM ' + tableName + ' ORDER BY id ASC;');

    // Store the data in an array
    query.on('row', (row) => {
      results.push(row);
    });

    // When the data is returned
    query.on('end', () => {
      done();

      // Returns the result to the browser as JSON
      return res.json(results);
    });
  });
});





// Don't worry about that
router.get('/', (req, res, next) => {
  res.sendFile(path.join(
    __dirname, '..', '..', 'client', 'views', 'index.html'));
});

module.exports = router;
