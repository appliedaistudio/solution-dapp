
export function loadMenu(db, menuId) {
    db.get(menuId).then(function (doc) {
      // Assuming the doc object directly contains the options array
      const menuOptions = doc.options;
      let menuHtml = '<div class="btn-group" role="group">'; // Updated for horizontal layout
  
      menuOptions.forEach(option => {
        // Create dropdown button for each menu option
        menuHtml += `
          <div class="btn-group" role="group">
            <button id="btn-${option._id}"
              type="button"
              class="btn btn-outline-info dropdown-toggle"
              data-bs-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false">
              ${option.name}
            </button>
            <div class="dropdown-menu">`;
  
        // Create a dropdown item for each item inside an option
        option.items.forEach(item => {
          menuHtml += `<a class="dropdown-item" href="#">${item}</a>`;
        });
  
        menuHtml += '</div></div>'; // Close dropdown menu and group
      });
  
      menuHtml += '</div>'; // Close the main button group
  
      // Insert the HTML into the menu-container in the DOM
      document.getElementById('menu-container').innerHTML = menuHtml;
  
    }).catch(function (err) {
      console.error('Error loading menu data:', err);
    });
}

function executeMenuOption(optionName) {
    alert(`Menu option clicked: ${optionName}`);
}
