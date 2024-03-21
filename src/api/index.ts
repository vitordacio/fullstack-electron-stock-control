/* eslint-disable no-console */
import { createConnection } from 'typeorm';

createConnection()
  .then(() => {
    console.log('Connected to database');
    import('./server');
  })
  .catch(() => console.log('Unable to connect to database.'));
