function navItemWrapper(nav_collapse_parent_show_id, nav_title) {
    // get the nav item wrapper template html
    var nav_item_wrapper = this.document.getElementById("nav-item-wrapper-template").content;
    var nav_item_wrapper_HTML = this.document.importNode(nav_item_wrapper, true);

    // place the nav collapse parent show id and title inside the template
    nav_item_wrapper_HTML.querySelector(".navbar-vertical-label").textContent = nav_title;
    nav_item_wrapper_HTML.querySelector(".nav.collapse.parent.show").id = nav_collapse_parent_show_id;

    return nav_item_wrapper_HTML;
}

function navItem(nav_item_title) {
    // get the nav item template html
    var nav_item = this.document.getElementById("nav-item-template").content;
    var nav_item_HTML = this.document.importNode(nav_item, true);

    // place the nav title inside the template
    nav_item_HTML.querySelector(".nav-link-text").textContent = nav_item_title;

    return nav_item_HTML;
}

function placeNavItemIntoNavItemWrapper(nav_item_HTML, nav_collapse_parent_show_id) {
    this.document.getElementById(nav_collapse_parent_show_id).appendChild(nav_item_HTML);
}

function placeNavItemWrapperIntoVerticalNavBar(nav_item_wrapper_HTML) {
    this.document.getElementById("navbarVerticalNav").appendChild(nav_item_wrapper_HTML);
}

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