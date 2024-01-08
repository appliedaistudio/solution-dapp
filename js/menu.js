function loadMenu() {
    // Fetch the menu options from the PouchDB instance
    const db = new PouchDB('hello_world_app');

    db.get('menu_options').then(function (doc) {
        const menuOptions = doc.options;
        // Create the HTML for bootstrap horizontal dropdown menu items
        let menuHtml = '<div class="btn-group" role="group">'; // Updated to 'btn-group' for horizontal layout

        for (const option of menuOptions) {
            menuHtml += `<div class="btn-group" role="group">
                            <button type="button" class="btn btn-outline-info dropdown-toggle menu-item-btn" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                ${option.name}
                            </button>`;
            if (option.items && option.items.length > 0) {
                menuHtml += '<div class="dropdown-menu">';
                for (const item of option.items) {
                    menuHtml += `<a class="dropdown-item" href="#" onclick="executeMenuOption('${item}')">${item}</a>`;
                }
                menuHtml += '</div>';
            }
            menuHtml += '</div>'; // Closing the individual button group
        }
        
        menuHtml += '</div>'; // Closing the main button group

        // Insert the HTML into the 'menu-container' in the index.html
        document.getElementById('menu-container').innerHTML = menuHtml;

    }).catch(function (err) {
        console.error('Error loading menu data:', err);
    });
}

function loadMainContentControls() {
    // Assuming a function to load and insert main-content controls based on the PouchDB instance
}

function executeMenuOption(optionName) {
    alert('Menu option clicked: ' + optionName);
}

// Call menu loading functions after DOM is ready
document.addEventListener('DOMContentLoaded', function () {
    loadMenu();
    loadMainContentControls();
});