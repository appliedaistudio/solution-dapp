
const __author__ = "Jerry Overton"
const __copyright__ = "Copyright (C) 2023 appliedAIstudio"
const __version__ = "0.1"

function iconNode (icon_name) {
    // create and retuern a new icon span element
    const icon_span = document.createElement("span");
    icon_span.setAttribute("data-feather", icon_name);
    return icon_span
}

function navSection(nav_section_id, nav_section_title) {
    // get the nav section template html
    var nav_section_template = document.getElementById("nav-section-template").content;
    var nav_section_HTML = document.importNode(nav_section_template, true);

    // place the nav section id and title inside the template
    nav_section_HTML.querySelector(".nav-item").id = nav_section_id;
    nav_section_HTML.querySelector(".navbar-vertical-label").textContent = nav_section_title;

    return nav_section_HTML;
}

function navItemsContainer(nav_items_container_id, nav_items_container_icon, nav_items_container_heading) {
    // get the nav items container template html
    var nav_items_container_template = document.getElementById("nav_items_container_template").content;
    var nav_items_container_HTML = document.importNode(nav_items_container_template, true);

    // place the nav items container id, and heading inside the template
    nav_items_container_HTML.querySelector(".nav.collapse.parent").id = nav_items_container_id;
    nav_items_container_HTML.querySelector(".nav-link.dropdown-indicator.label-1").href = "#" + nav_items_container_id;
    nav_items_container_HTML.querySelector(".nav-link.dropdown-indicator.label-1").ariaControls = nav_items_container_id;
    nav_items_container_HTML.querySelector(".nav-link-text").textContent = nav_items_container_heading;

    //place the appropriate icon inside the template
    const icon_element = iconNode(nav_items_container_icon);
    nav_items_container_HTML.querySelector(".nav-link-icon").replaceChildren(icon_element);

    return nav_items_container_HTML;
}

function navItem(nav_item_title, nav_item_link) {
    // get the nav item template html
    var nav_item_template = document.getElementById("nav_item_template").content;
    var nav_item_HTML = document.importNode(nav_item_template, true);

    //place the nav item title and link inside the template
    nav_item_HTML.querySelector(".nav-link-text").textContent = nav_item_title;
    nav_item_HTML.querySelector(".nav-link").href = nav_item_link;

    return nav_item_HTML;
}

function placeNavSectionIntoVerticalNavBar(nav_section_HTML) {
    document.getElementById("navbarVerticalNav").appendChild(nav_section_HTML);

    //to do: replace the above with the following
    //document.getElementById("navbarVerticalNav").replaceWith(nav_section_HTML);
}

function placeNavItemsContainerIntoNavSection(nav_items_container_HTML, nav_section_id) {
    document.getElementById(nav_section_id).appendChild(nav_items_container_HTML);
}

function placeNavItemIntoNavItemsContainer(nav_item_HTML, nav_items_container_id) {
    document.getElementById(nav_items_container_id).appendChild(nav_item_HTML);
}

function createIDfromTitleAndIndex(title, index){
    // turn everything to lowercase
    var id = title.toLowerCase();

    // replace spaces with underscores
    id = id.split(' ').join('_')

    // get rid of non alphanumeric characters
     id = id.replace(/\W/g, '');

    // add an index at the end
    var id = id + "_" + index

    return id;
}

export function buildMenuFromJSON(menu){

    // identify the list of nav sections
    let nav_sections = menu['nav_sections'];

    // step through each nav section
    for (let i = 0; i <  nav_sections.length; i++) {
        // create a nav section title
        let nav_section = nav_sections[i];
        let nav_section_title = nav_section.title

        // create a nav section id
        var nav_section_id = nav_section_title + "-" + i

        // create a nav section html
        var nav_section_HTML = navSection(nav_section_id, nav_section_title);

        // place the nav section html into the vertical nav bar
        placeNavSectionIntoVerticalNavBar(nav_section_HTML);

        // if the current nav section contains nav items containers
        if (nav_section.nav_items_containers){
            buildNavItemsContainers(nav_section);

        }
    }

    function buildNavItemsContainers(nav_section) {
        // step through each nav items container in the current nav section

        let nav_items_containers = nav_section["nav_items_containers"]
        for (let j = 0; j < nav_items_containers.length; j++) {
            // get the properties of the nav items container
            let nav_items_container = nav_items_containers[j];
            let nav_items_container_title = nav_items_container.title;
            let nav_items_container_icon = nav_items_container.icon;
            var nav_items_container_id = createIDfromTitleAndIndex(nav_items_container_title, j);

            // create a nav items container and place it into the nav section
            var nav_items_container_HTML = navItemsContainer(nav_items_container_id, nav_items_container_icon, nav_items_container_title);
            placeNavItemsContainerIntoNavSection(nav_items_container_HTML, nav_section_id);

            // if the current nav items container has nav items
            if (nav_items_container.nav_items) {
                buildNavItems(nav_items_container, nav_items_container_id);
            }

        }
    }

    function buildNavItems(nav_items_container, nav_items_container_id) {
        // step through each nav item in the current nav items container

        let nav_items = nav_items_container["nav_items"];
        for (let k = 0; k < nav_items.length; k++) {

            // get the properties of the nav item
            let nav_item = nav_items[k];
            let nav_item_title = nav_item.title;
            let nav_item_href = nav_item.href;

            // create a nav item and place it into the nav items container
            var nav_item_HTML = navItem(nav_item_title, nav_item_href);
            placeNavItemIntoNavItemsContainer(nav_item_HTML, nav_items_container_id);
        }
    }
}

export function renderPage () {
    // perform the final steps needed to display the page

    // render the icons
    feather.replace();
}