import { initializeUsers } from './db/db-init-users.js';
import { initializeMenu } from './db/db-init-menu.js';
import { initializeMainContent } from './db/db-init-main-content-controls.js';

// local database instance initialization
const db = new PouchDB('my_database');

// Initialize each part of the database
initializeUsers(db);
initializeMenu(db);
initializeMainContent(db);