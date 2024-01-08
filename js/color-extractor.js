// Assuming vibrant.js is included and the DOM is ready
function updateThemeColorsBasedOnImage() {
    const imagePath = '../images/background.jpg'; // update path as necessary
    // Create a new Vibrant instance and pass the image URL directly
    var img = new Image();
    img.src = imagePath;
    
    img.onload = function() {
        var vibrant = new Vibrant(img);
        var swatches = vibrant.swatches();
        
        if (swatches) {
            // Example: Set the primary color to the Vibrant swatch
            const primaryColor = swatches.Vibrant.getHex();
            const secondaryColor = swatches.Muted.getHex();
            const tertiaryColor = swatches.DarkVibrant.getHex();

            // Apply these colors to the CSS
            const rootStyle = document.documentElement.style;
            rootStyle.setProperty('--primary-color', primaryColor);
            rootStyle.setProperty('--secondary-color', secondaryColor);
            rootStyle.setProperty('--tertiary-color', tertiaryColor);
        }
    };
    
    img.onerror = function() {
        console.error('There was an error loading the image:', imagePath);
    };
}

document.addEventListener('DOMContentLoaded', updateThemeColorsBasedOnImage);
