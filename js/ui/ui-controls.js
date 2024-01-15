// This function should be invoked after the page has loaded and PouchDB setup is complete.
export function loadMainContentControls(db, controlsId) {
  db.get(controlsId).then(function (controlsData) {
      var controlsContainer = document.createElement('div');
      controlsContainer.id = 'controls-container';
      controlsContainer.classList.add('controls-container');

      // Loop over controls data to create icons
      controlsData.icons.forEach(function (icon) {
          var controlButton = document.createElement('button');
          controlButton.classList.add('control-button');
          controlButton.setAttribute('title', icon.tooltip);
          controlButton.innerHTML = `<i class="${icon.iconClass}"></i>`; // Use iconClass for font icon

          // Add click event listener
          controlButton.addEventListener('click', function () {
              executeControlFunction(icon.name);
          });

          controlsContainer.appendChild(controlButton);
      });

      // Append the container to an existing element
      document.getElementById('app-content').appendChild(controlsContainer);
  }).catch(function (err) {
      console.error('Error loading control icons:', err);
  });
}

function executeControlFunction(iconName) {
  alert(`Icon clicked: ${iconName}`);
}