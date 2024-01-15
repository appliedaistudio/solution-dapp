// Needed to initialize the local database
import { initializeUsers } from './db/db-init-users.js';
import { initializeMenu } from './db/db-init-menu.js';
import { initializeMainContent } from './db/db-init-main-content-controls.js';

// Needed to authorize the user
import { isLoggedIn } from './ui/ui-auth.js';

// Needed to render the UI content
import { loadMenu } from './ui/ui-menu.js';
import { loadMainContentControls } from './ui/ui-controls.js';
import { updateThemeColorsBasedOnImage } from './ui/ui-color-extractor.js';

// local database instance initialization
const db = new PouchDB('my_database');

// Initialize each part of the database
initializeUsers(db);
initializeMenu(db);
initializeMainContent(db);

// Make sure the user is currently logged in
isLoggedIn(db).then((loggedIn) => {
    if (loggedIn) {
        console.log('A user is currently logged in.');
    } else {
        console.log('No user is currently logged in.');
    }
}).catch((err) => {
    console.error('Error while checking if user is logged in:', err);
});

// Define the path to the background image
const backgroundImagePath = '../images/background.jpg';

// Update the UI assuming we are using DOMContentLoaded event to initialize UI after the document is fully loaded.
document.addEventListener('DOMContentLoaded', () => {
    loadMenu(db, 'hello_world_menu');
    loadMainContentControls(db, 'hello_world_controls');
    updateThemeColorsBasedOnImage(backgroundImagePath);
});