
export function loadMenu() {
    const db = new PouchDB('hello_world_app');

    db.get('menu_options').then(function (doc) {
        const menuOptions = doc.options;
        let menuHtml = '<div class="btn-group" role="group">'; // Updated for horizontal layout

        menuOptions.forEach(option => {
            // Create dropdown button for each menu option
            menuHtml += `
                <div class="btn-group" role="group">
                    <button id="menu-${option.name.replace(/\s+/g, '-').toLowerCase()}"
                        type="button"
                        class="btn btn-outline-info dropdown-toggle"
                        data-bs-toggle="dropdown" // change to 'data-toggle' if using Bootstrap 4 or earlier
                        aria-haspopup="true"
                        aria-expanded="false">
                        ${option.name}
                    </button>
                    <div class="dropdown-menu">`;

            // Create a dropdown item for each item inside an option
            option.items.forEach(item => {
                menuHtml += `<a class="dropdown-item" href="#" onclick="executeMenuOption('${item}')">${item}</a>`;
            });

            menuHtml += `</div></div>`; // Close dropdown menu and group
        });

        menuHtml += '</div>'; // Close the main button group

        // Insert the HTML into the menu-container in the DOM
        document.getElementById('menu-container').innerHTML = menuHtml;

        // Initialize dropdowns with Bootstap JS (This may be necessary for Bootstrap 4 or earlier)
        // if you are using Bootstrap 5, the data-bs-toggle attribute will take care of the initialization
        // $('.dropdown-toggle').dropdown(); 
    }).catch(function (err) {
        console.error('Error loading menu data:', err);
    });
}

function executeMenuOption(optionName) {
    alert(`Menu option clicked: ${optionName}`);
}
