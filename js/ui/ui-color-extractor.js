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
export function updateThemeColorsBasedOnImage(imagePath) {
    // Create a new Vibrant instance and pass the image URL directly
    var img = new Image();
    img.src = imagePath;
    
    img.onload = function() {
        var vibrant = new Vibrant(img);
        var swatches = vibrant.swatches();
        
        if (swatches) {
            // Define the specific swatches you want to use
            let neutralColorHex = swatches.DarkMuted ? swatches.DarkMuted.getHex() : '#999'; // Fallback if undefined
            let accentColorHex = swatches.Vibrant ? swatches.Vibrant.getHex() : '#f00'; // Fallback if undefined
            let lightColorHex = swatches.LightVibrant ? swatches.LightVibrant.getHex() : '#fff'; // Fallback if undefined

            // Convert the Hex color theme to RGB
            const neutralColorRGB = hexToRGB(neutralColorHex);
            const accentColorRGB = hexToRGB(accentColorHex);
            const lightColorRGB = hexToRGB(lightColorHex);


            // Apply these colors to the CSS
            // Assume neutralColorRGB, accentColorRGB, and lightColorRGB are already computed as comma-separated strings
            const rootStyle = document.documentElement.style;
            rootStyle.setProperty('--neutral-color', `rgb(${neutralColorRGB})`);
            rootStyle.setProperty('--accent-color', `rgb(${accentColorRGB})`);
            rootStyle.setProperty('--light-color', `rgb(${lightColorRGB})`);
            rootStyle.setProperty('--font-color', `rgb(${lightColorRGB})`);

            // Set a semi-transparent version of the neutral color as a CSS variable
            rootStyle.setProperty('--neutral-color-bg', `rgba(${neutralColorRGB}, 0.8)`);
        }
    };
    
    img.onerror = function() {
        console.error('There was an error loading the image:', imagePath);
    };
}