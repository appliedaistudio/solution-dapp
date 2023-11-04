import { navSection, placeNavSectionIntoVerticalNavBar, navItemsContainer, placeNavItemsContainerIntoNavSection} from "./build_sdk_index.js";
import { navItem, placeNavItemIntoNavItemsContainer} from "./build_sdk_index.js";

function buildNav() {
    // create a nav section html
    var nav_section_HTML = navSection("nav-section-1", "nav section 1");

    // place the nav section html into the vertical nav bar
    placeNavSectionIntoVerticalNavBar(nav_section_HTML);

    // create a nav items container and place it into the nav section
    var nav_items_container_HTML = navItemsContainer("nav-items-container-1", "nav items container");
    placeNavItemsContainerIntoNavSection(nav_items_container_HTML, "nav-section-1")

    // create a nav item and place it into the nav items container
    var nav_item_HTML = navItem("nav item 1", "https://appliedai.studio");
    placeNavItemIntoNavItemsContainer(nav_item_HTML, "nav-items-container-1");
}

window.addEventListener("load", function() {
    buildNav();

});