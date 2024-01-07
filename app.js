// Initialize a new PouchDB instance
const db = new PouchDB('hello_world_pwa');

// Dummy data for dropdown menus
const dropdownMenuData = {
  menu1: [
    { name: 'Action 1', id: 'action1' },
    { name: 'Action 2', id: 'action2' }
  ],
  menu2: [
    { name: 'Action 3', id: 'action3' },
    { name: 'Action 4', id: 'action4' }
  ]
};

// Function to create dropdown menus with options
function createDropdownMenus(menus) {
  const menuContainer = document.getElementById('menu');
  menuContainer.className = 'btn-group'; // Align dropdowns horizontally

  Object.keys(menus).forEach((menuKey) => {
    const dropdownDiv = document.createElement('div');
    dropdownDiv.className = 'btn-group'; // Ensures horizontal alignment

    const dropdownButton = document.createElement('button');
    dropdownButton.className = 'btn btn-secondary dropdown-toggle';
    dropdownButton.type = 'button';
    dropdownButton.id = `dropdownMenuButton-${menuKey}`;
    dropdownButton.setAttribute('data-toggle', 'dropdown');
    dropdownButton.setAttribute('aria-haspopup', 'true');
    dropdownButton.setAttribute('aria-expanded', 'false');
    dropdownButton.innerText = `Menu ${menuKey.charAt(0).toUpperCase() + menuKey.slice(1)}`;

    const dropdownMenu = document.createElement('div');
    dropdownMenu.className = 'dropdown-menu';
    dropdownMenu.setAttribute('aria-labelledby', `dropdownMenuButton-${menuKey}`);
    
    menus[menuKey].forEach((item) => {
      const dropdownItem = document.createElement('button');
      dropdownItem.className = 'dropdown-item';
      dropdownItem.type = 'button';
      dropdownItem.innerText = item.name;
      dropdownItem.onclick = function() {
        alert('You clicked ' + item.name);
      };
      dropdownMenu.appendChild(dropdownItem);
    });

    dropdownDiv.appendChild(dropdownButton);
    dropdownDiv.appendChild(dropdownMenu);
    menuContainer.appendChild(dropdownDiv);
  });
}

// Load data once the DOM is fully loaded.
document.addEventListener('DOMContentLoaded', function() {
  // In a real-world application, you would fetch the data from PouchDB.
  // For simplicity, we are using predefined dummy data.
  createDropdownMenus(dropdownMenuData);
});

// We will not provide actual PouchDB initialization with dummy data in this code snippet.
// Normally, you would need to initialize PouchDB with data like this:
// db.bulkDocs([...]).then(function (result) { /* handle result */ }).catch(function (err) { /* handle error */ });