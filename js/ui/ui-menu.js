
export function loadMenu(db, menuId) {
    db.get(menuId).then(function (doc) {
      const menuOptions = doc.options;
      let menuHtml = '<div class="btn-group" role="group">';
  
      menuOptions.forEach(option => {
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
            <div class="dropdown-menu" aria-labelledby="btn-${option._id}">`;
  
        option.items.forEach(item => {
          // Pass item to the data-option attribute to be used later in event listener
          menuHtml += `<a class="dropdown-item" href="#" data-option="${item}">${item}</a>`;
        });
  
        menuHtml += '</div></div>';
      });
  
      menuHtml += '</div>';
      document.getElementById('menu-container').innerHTML = menuHtml;
  
      // After setting the innerHTML, add click event listeners to all dropdown items
      const dropdownItems = document.querySelectorAll('.dropdown-item');
      dropdownItems.forEach(item => {
        item.addEventListener('click', function(event) {
          // Prevent default anchor behavior
          event.preventDefault();
  
          // Retrieve the data-option attribute and call executeMenuOption
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
}
