import { navItemWrapper, navItem, placeNavItemIntoNavItemWrapper, placeNavItemWrapperIntoVerticalNavBar } from "./build_sdk_index.js";

function buildNav() {
    // create the home nav wrapper html
    var home_nav_item_wrapper_HTML = navItemWrapper("nv-home", "brand new flava");

    // place the home nav wrapper into the vertical nav bar
    placeNavItemWrapperIntoVerticalNavBar(home_nav_item_wrapper_HTML);

    // create a home nav item and place it into the home nav wrapper
    var home_nav_item_HTML = navItem("homeward bound");
    placeNavItemIntoNavItemWrapper(home_nav_item_HTML, "nv-home")
}

window.addEventListener("load", function() {
    buildNav();

});