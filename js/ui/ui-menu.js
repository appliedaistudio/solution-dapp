// Import functions from external libraries as needed
import { logoutUser } from './ui-auth.js';

// Define a mapping from option names to objects containing function and params
const optionFunctionMappings = {
  'Logout': { 
      func: logoutUser, // The function to execute
      params: [] // Parameters to pass to the function
  }
  // Add other options here as needed
};

export function loadMenu(db, menuId) {
  db.get(menuId).then(function (doc) {
      const menuOptions = doc.options;
      let menuHtml = '<div class="btn-group menu-group" role="group">'; // Added 'menu-group' class for styling

      menuOptions.forEach(option => {
          // Use class 'menu-button' and 'dropdown-toggle' for button styling
          menuHtml += `
              <div class="btn-group" role="group">
                  <button id="btn-${option._id}"
                      type="button"
                      class="btn menu-button dropdown-toggle"
                      data-bs-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false">
                      ${option.name}
                  </button>
                  <div class="dropdown-menu" aria-labelledby="btn-${option._id}">`;

          // Use class 'dropdown-item' for each item styling
          option.items.forEach(item => {
              menuHtml += `<a class="dropdown-item" href="#" data-option="${item}">${item}</a>`;
          });

          menuHtml += '</div></div>';
      });

      menuHtml += '</div>';
      document.getElementById('menu-container').innerHTML = menuHtml;

      // Add click event listeners to all dropdown items after rendering to the DOM
      const dropdownItems = document.querySelectorAll('.dropdown-item');
      dropdownItems.forEach(item => {
          item.addEventListener('click', function(event) {
              event.preventDefault(); // Prevent default anchor behavior
              const optionName = this.getAttribute('data-option');
              executeMenuOption(db, optionName); // Pass the db to executeMenuOption
          });
      });

  }).catch(function (err) {
      console.error('Error loading menu data:', err);
  });
}

function executeMenuOption(db, optionName) {
  alert(`Menu option clicked: ${optionName}`);

  if (optionFunctionMappings.hasOwnProperty(optionName)) {
      const mapping = optionFunctionMappings[optionName];

      // Check if params is an array and if so, make a copy and unshift the db to the parameters
      if (Array.isArray(mapping.params)) {
          const paramsWithDb = [db, ...mapping.params];
          mapping.func(...paramsWithDb);
      } else {
          // Call the function with db as the only parameter
          mapping.func(db);
      }
  } else {
      alert(`No function found for menu option: ${optionName}`);
      console.error(`No function found for menu option: ${optionName}`);
  }
}