const pg = require('pg');
const connectionString = 'postgresql://contex:contexisthebest@squarecell.eu:5432/contex';

const client = new pg.Client(connectionString);
client.connect();
const query = client.query(
  'CREATE TABLE items(id SERIAL PRIMARY KEY, text VARCHAR(40) not null, complete BOOLEAN)');
query.on('end', () => { client.end(); });
