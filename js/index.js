import { initializeUsers } from './db/users.js';
import { initializeMenu } from './db/menu.js';
import { initializeMainContent } from './db/main-content-controls.js';

// Example of db instance, replace with your actual database initialization
const db = new PouchDB('my_database');

// Initialize each part of the database
initializeUsers(db);
initializeMenu(db);
initializeMainContent(db);