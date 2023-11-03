import { navItemWrapper, navItem, placeNavItemIntoNavItemWrapper, placeNavItemWrapperIntoVerticalNavBar } from "./build_sdk_index.js";

function buildNav() {
    // create the home nav wrapper html
    home_nav_item_wrapper_HTML = navItemWrapper(nav_collapse_parent_show_id="nv-home", nav_title="brand new flava");

    // place the home nav wrapper into the vertical nav bar
    placeNavItemWrapperIntoVerticalNavBar(home_nav_item_wrapper_HTML);

    // create a home nav item and place it into the home nav wrapper
    home_nav_item_HTML = navItem("homeward bound");
    placeNavItemIntoNavItemWrapper(home_nav_item_HTML, nav_collapse_parent_show_id="nv-home")
}

window.addEventListener("load", function() {
    buildNav();

});