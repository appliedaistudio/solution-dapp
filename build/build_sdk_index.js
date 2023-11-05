export function navSection(nav_section_id, nav_section_title) {
    // get the nav section template html
    var nav_section_template = document.getElementById("nav-section-template").content;
    var nav_section_HTML = document.importNode(nav_section_template, true);

    // place the nav section id and title inside the template
    nav_section_HTML.querySelector(".nav-item").id = nav_section_id;
    nav_section_HTML.querySelector(".navbar-vertical-label").textContent = nav_section_title;

    return nav_section_HTML;
}

export function navItemsContainer(nav_items_container_id, nav_items_container_heading) {
    // get the nav items container template html
    var nav_items_container_template = document.getElementById("nav_items_container_template").content;
    var nav_items_container_HTML = document.importNode(nav_items_container_template, true);

    // place the nav items container id and heading inside the template
    nav_items_container_HTML.querySelector(".nav.collapse.parent").id = nav_items_container_id;
    nav_items_container_HTML.querySelector(".nav-link.dropdown-indicator.label-1").href = "#" + nav_items_container_id;
    nav_items_container_HTML.querySelector(".nav-link.dropdown-indicator.label-1").ariaControls = nav_items_container_id;
    nav_items_container_HTML.querySelector(".nav-link-text").textContent = nav_items_container_heading;

    return nav_items_container_HTML;
}

export function navItem(nav_item_title, nav_item_link) {
    // get the nav item template html
    var nav_item_template = document.getElementById("nav_item_template").content;
    var nav_item_HTML = document.importNode(nav_item_template, true);

    //place the nav item title and link inside the template
    nav_item_HTML.querySelector(".nav-link-text").textContent = nav_item_title;
    nav_item_HTML.querySelector(".nav-link").href = nav_item_link;

    return nav_item_HTML;
}

export function placeNavSectionIntoVerticalNavBar(nav_section_HTML) {
    document.getElementById("navbarVerticalNav").appendChild(nav_section_HTML);

    //to do: replace the above with the following
    //document.getElementById("navbarVerticalNav").replaceWith(nav_section_HTML);
}

export function placeNavItemsContainerIntoNavSection(nav_items_container_HTML, nav_section_id) {
    document.getElementById(nav_section_id).appendChild(nav_items_container_HTML);
}

export function placeNavItemIntoNavItemsContainer(nav_item_HTML, nav_items_container_id) {
    document.getElementById(nav_items_container_id).appendChild(nav_item_HTML);
}
