// This function should be invoked after the page has loaded and PouchDB setup is complete.
export function loadMainContentControls(db, controlsId) {

    // Assuming db is the PouchDB instance and 'content_controls' is an id in your PouchDB:
    db.get(controlsId).then(function (controlsData) {

      // Create a container for the controls
      var controlsContainer = document.createElement('div');
      controlsContainer.id = 'controls-container';
      controlsContainer.classList.add('controls-container');
  
      // Loop over controls data to create icons
      controlsData.icons.forEach(function (icon) {
        var controlButton = document.createElement('button');
        controlButton.classList.add('control-button', 'btn', 'btn-outline-light', 'btn-square');
        controlButton.setAttribute('title', icon.tooltip);
        controlButton.innerHTML = `<i class="${icon.iconClass}"></i>`; // Assuming iconClass is like 'fa fa-icon-name'
        controlsContainer.appendChild(controlButton);
  
        // Add click event listener if needed, for example:
        controlButton.addEventListener('click', function () {
          executeControlFunction(icon.name); // Implement this function based on your app logic
        });
      });
  
      // Add the controls to the main content area
      var mainContentArea = document.getElementById('main-content-controls'); // You should have an element with this id in your HTML
      mainContentArea.appendChild(controlsContainer);
    }).catch(function (err) {
      console.log(err);
    });
  }

// This function will be called when a control button is clicked
function executeControlFunction(iconName) {
  alert(`Icon clicked: ${iconName}`);
}