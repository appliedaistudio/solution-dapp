// A helper function to convert a hex color to a comma-separated RGB string
function hexToRGB(hex) {
    let r = 0, g = 0, b = 0;

    // 3 digits
    if (hex.length === 4) {
        r = parseInt(hex[1] + hex[1], 16);
        g = parseInt(hex[2] + hex[2], 16);
        b = parseInt(hex[3] + hex[3], 16);
    // 6 digits
    } else if (hex.length === 7) {
        r = parseInt(hex[1] + hex[2], 16);
        g = parseInt(hex[3] + hex[4], 16);
        b = parseInt(hex[5] + hex[6], 16);
    }

    return `${r}, ${g}, ${b}`;
}

// Assuming vibrant.js is included and the DOM is ready
export function updateThemeColorsBasedOnImage() {
    const imagePath = '../images/background.jpg'; // update path as necessary
    // Create a new Vibrant instance and pass the image URL directly
    var img = new Image();
    img.src = imagePath;
    
    img.onload = function() {
        var vibrant = new Vibrant(img);
        var swatches = vibrant.swatches();
        
        if (swatches) {

            // Set the color theme in Hex
            let primaryColorHex = swatches.Vibrant.getHex();
            let secondaryColorHex = swatches.Muted.getHex();
            let tertiaryColorHex = swatches.DarkVibrant.getHex();

            // Convert the Hex color theme to RGB
            const primaryColorRGB = hexToRGB(primaryColorHex);
            const secondaryColorRGB = hexToRGB(secondaryColorHex);
            const tertiaryColorRGB = hexToRGB(tertiaryColorHex);

            // Apply these colors to the CSS
            const rootStyle = document.documentElement.style;
            rootStyle.setProperty('--primary-color', primaryColorRGB);
            rootStyle.setProperty('--secondary-color', secondaryColorRGB);
            rootStyle.setProperty('--tertiary-color', tertiaryColorRGB);
        }
    };
    
    img.onerror = function() {
        console.error('There was an error loading the image:', imagePath);
    };
}
