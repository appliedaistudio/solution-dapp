// scripts/db.js
const db = new PouchDB('hello_world_app');

// Function to fetch JSON data from server
function fetchJSONData(url) {
    return fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        });
}

// Function to put data into PouchDB, overwriting if the document already exists
function putData(docId, data) {
  return db.get(docId).then(existingDoc => {
    // Document exists, we need to set the _rev property to overwrite
    return db.put({ ...data, _id: docId, _rev: existingDoc._rev });
  }).catch(err => {
    if (err.status === 404) {
      // Document does not exist, so we can put without a _rev
      return db.put({ ...data, _id: docId });
    } else {
      // Re-throw any other error which we do not expect
      throw err;
    }
  });
}

// Fetch menu options and content controls data and initialize PouchDB with this data
Promise.all([
    fetchJSONData('data/menu-options.json'),
    fetchJSONData('data/main-content-controls.json')
]).then(([menuOptionsData, mainContentControlsData]) => {
    // Initialize menu options, overwriting existing data if found
    putData('menu_options', menuOptionsData).then(() => {
        console.log('Menu options initialized (or updated).');
    }).catch((err) => {
        console.error('Error initializing (or updating) menu options:', err);
    });

    // Initialize main content controls, overwriting existing data if found
    putData('content_controls', mainContentControlsData).then(() => {
        console.log('Content controls initialized (or updated).');
    }).catch((err) => {
        console.error('Error initializing (or updating) content controls:', err);
    });
    
}).catch((err) => {
    console.error('Error fetching JSON data:', err);
});