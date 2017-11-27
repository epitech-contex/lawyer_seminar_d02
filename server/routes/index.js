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

// Handle HTTP Request POST on URL (address) '/api/v1/todos'
router.post('/api/v1/todos', (request, res, next) => {
  
  //We'll store data here
  const results = [];

  // Get the data sent by the browser (REQUEST)
  const data = {text: request.body.text, complete: false};

  // Connect to the database
  pg.connect(connectionString, (err, client, done) => {

    // Handle errors
    if(err) {
      done();
      console.log(err);
      return res.status(500).json({success: false, data: err});
    }

    // Create a query for the database. INSERT means write $1 and $2 get replaced by data.text and data.complete
    client.query('INSERT INTO ' + tableName + '(text, complete) values($1, $2)',
    [data.text, data.complete]);

    // Grab the data (as in the first function)
    const query = client.query('SELECT * FROM ' + tableName + ' ORDER BY id ASC');

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


// Handle HTTP Request DELETE on URL (address) '/api/v1/todos'
router.delete('/api/v1/todos/:todo_id', (req, res, next) => {
  
  // We'll store results here
  const results = [];

  // Get the data sent by the browser (request)
  const id = req.params.todo_id;

  // Connect to the database
  pg.connect(connectionString, (err, client, done) => {

    // Handle connection errors
    if(err) {
      done();
      console.log(err);
      return res.status(500).json({success: false, data: err});
    }

    // Create a request for the SQL server. Delete means... delete ! 
    client.query('DELETE FROM ' + tableName + ' WHERE id=($1)', [id]);

    // From now on code we've already seen two times
    var query = client.query('SELECT * FROM ' + tableName + ' ORDER BY id ASC');

    query.on('row', (row) => {
      results.push(row);
    });

    query.on('end', () => {
      done();
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
