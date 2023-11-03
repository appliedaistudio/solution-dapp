export function navItemWrapper(nav_collapse_parent_show_id, nav_title) {
    // get the nav item wrapper template html
    var nav_item_wrapper = document.getElementById("nav-item-wrapper-template").content;
    var nav_item_wrapper_HTML = document.importNode(nav_item_wrapper, true);

    // place the nav collapse parent show id and title inside the template
    nav_item_wrapper_HTML.querySelector(".navbar-vertical-label").textContent = nav_title;
    nav_item_wrapper_HTML.querySelector(".nav.collapse.parent.show").id = nav_collapse_parent_show_id;

    return nav_item_wrapper_HTML;
}

export function navItem(nav_item_title) {
    // get the nav item template html
    var nav_item = document.getElementById("nav-item-template").content;
    var nav_item_HTML = document.importNode(nav_item, true);

    // place the nav title inside the template
    nav_item_HTML.querySelector(".nav-link-text").textContent = nav_item_title;

    return nav_item_HTML;
}

export function placeNavItemIntoNavItemWrapper(nav_item_HTML, nav_collapse_parent_show_id) {
    document.getElementById(nav_collapse_parent_show_id).appendChild(nav_item_HTML);
}

export function placeNavItemWrapperIntoVerticalNavBar(nav_item_wrapper_HTML) {
    document.getElementById("navbarVerticalNav").appendChild(nav_item_wrapper_HTML);
}