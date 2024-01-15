import config from './dapp-config.js';

import { initializeUsers } from './db/db-init-users.js';
import { initializeMenu } from './db/db-init-menu.js';
import { initializeMainContent } from './db/db-init-main-content-controls.js';
import { isLoggedIn } from './ui/ui-auth.js';
import { loadMenu } from './ui/ui-menu.js';
import { loadMainContentControls } from './ui/ui-controls.js';
import { updateThemeColorsBasedOnImage } from './ui/ui-color-extractor.js';

// Construct the full remote database URL with credentials for authentication
const remoteDbUrl = `https://${encodeURIComponent(config.remoteDbUsername)}:${encodeURIComponent(config.remoteDbPassword)}@${config.remoteDbBase}`;


// Initialize local and remote PouchDB instances using the provided configuration
const localDb = new PouchDB(config.localDbName);

// Sync function with authentication
function syncDatabases() {
    // Perform a two-way, continuous replication with credential as part of the URL
    PouchDB.sync(localDb, remoteDbUrl, {
        live: true,
        retry: true,
        // Optionally, add other sync options if needed
    })
    .on('change', info => {
        console.log('Database sync: change detected', info);
    })
    .on('paused', info => {
        console.log('Database sync paused', info);
    })
    .on('active', info => {
        console.log('Database sync resumed', info);
    })
    .on('denied', err => {
        console.error('Database sync denied access', err);
    })
    .on('complete', info => {
        console.log('Database sync complete', info);
    })
    .on('error', err => {
        console.error('Database sync error', err);
    });
}

// Call the sync function to start the process when the app starts
//syncDatabases();

// Initialize each part of the database
initializeUsers(localDb);
initializeMenu(localDb);
initializeMainContent(localDb);

// Check users' logged-in status and load UI
isLoggedIn(localDb).then(loggedIn => {
    console.log(loggedIn ? 'A user is currently logged in.' : 'No user is currently logged in.');
}).catch(err => {
    console.error('Error while checking if user is logged in:', err);
});

// Define the path to the background image
const backgroundImagePath = '../images/background.jpg';

// When DOM is ready, load the UI components
document.addEventListener('DOMContentLoaded', () => {
    loadMenu(localDb, 'hello_world_menu');
    loadMainContentControls(localDb, 'hello_world_controls');
    updateThemeColorsBasedOnImage(backgroundImagePath);
});