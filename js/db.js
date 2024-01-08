// Initialize the PouchDB instance and fill it with dummy data
const db = new PouchDB('hello_world_app');

db.bulkDocs([
    { _id: 'user_1', name: 'John Doe', accessLevel: 'admin', password: 'password123' },
    // ... other dummy users ...
]).then(function (result) {
    console.log('Dummy user data initialized:', result);
}).catch(function (err) {
    console.log(err);
});

// Dummy menu and content control settings
db.put({
    _id: 'menu_options',
    options: [{name: "Option 1"}, {name: "Option 2"}] // etc...
}).then(function () {
    console.log('Dummy menu data initialized.');
}).catch(function (err) {
    console.log(err);
});

db.put({
    _id: 'content_controls',
    controls: [{icon: "icon1", name: "Control 1"}, {icon: "icon2", name: "Control 2"}] // etc...
}).then(function () {
    console.log('Dummy content controls data initialized.');
}).catch(function (err) {
    console.log(err);
});

// More initialization and dummy data as needed...