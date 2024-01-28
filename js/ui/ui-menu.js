// Import functions from external libraries as needed
import { logoutUser } from './ui-auth.js';

// Define a mapping from option names to functions
const optionFunctionMappings = {
  'logoutUser': logoutUser // These keys should match option names
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
              executeMenuOption(optionName);
          });
      });

  }).catch(function (err) {
      console.error('Error loading menu data:', err);
  });
}

function executeMenuOption(optionName) {
    alert(`Menu option clicked: ${optionName}`);

    if (optionFunctionMappings.hasOwnProperty(optionName)) {
      // Call the mapped function for the given optionName
      optionFunctionMappings[optionName]();
    } else {
      alert(`No function found for menu option: ${optionName}`);
      console.error(`No function found for menu option: ${optionName}`);
    }
  }