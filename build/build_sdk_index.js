
/*
@todo
I don't like using this function to get icon code. The orginal HTML templates we bought denotes icons using classes in DIVs.
There's some kind of page scrit=pt that converts those DIVs into SVG tags (with the appropriate content) based on parsing the content
of the icon DIVs. This allows the page creators to create icons using much cleaner code.

Because we separate this JS code into modules, we have to link to this code in such a way that these modules are loaded last. These
modules are loaded after the code that generates SVG tags. That means that we have to generate those tags ourselves in this code.
The solution is to maintain our own mapping between icon names and detailed SVG tags. We have to get those SVG details by scouring
through the HTML source of different pages after they have been generated. It's not a solution that I like. If you can think of somehting
better, please replace what I've done.

Jerry Overton, jerry@appliedai.studio
*/
export const IconHTML = {
    shopping_cart: '<svg xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-shopping-cart"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>'
}

export function navSection(nav_section_id, nav_section_title) {
    // get the nav section template html
    var nav_section_template = document.getElementById("nav-section-template").content;
    var nav_section_HTML = document.importNode(nav_section_template, true);

    // place the nav section id and title inside the template
    nav_section_HTML.querySelector(".nav-item").id = nav_section_id;
    nav_section_HTML.querySelector(".navbar-vertical-label").textContent = nav_section_title;

    return nav_section_HTML;
}

export function navItemsContainer(nav_items_container_id, nav_items_container_icon_HTML, nav_items_container_heading) {
    // get the nav items container template html
    var nav_items_container_template = document.getElementById("nav_items_container_template").content;
    var nav_items_container_HTML = document.importNode(nav_items_container_template, true);

    // place the nav items container id, icon, and heading inside the template
    nav_items_container_HTML.querySelector(".nav.collapse.parent").id = nav_items_container_id;
    nav_items_container_HTML.querySelector(".nav-link.dropdown-indicator.label-1").href = "#" + nav_items_container_id;
    nav_items_container_HTML.querySelector(".nav-link.dropdown-indicator.label-1").ariaControls = nav_items_container_id;
    nav_items_container_HTML.querySelector(".nav-link-icon").innerHTML += nav_items_container_icon_HTML;
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


// REFACTOR THIS FUNCTION INTO SMALLER COMPOSITE FUNCTIONS
export function buildNavFromJSON(menu){

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
        // step through each nav items container in the current nav section
        if (nav_section.nav_items_containers){
            let nav_items_containers = nav_section["nav_items_containers"]
            for (let j = 0; j < nav_items_containers.length; j++) {
                // get the properties of the nav items container
                let nav_items_container = nav_items_containers[j];
                let nav_items_container_title = nav_items_container.title;
                let nav_items_container_icon = IconHTML[nav_items_container.icon];
                var nav_items_container_id = createIDfromTitleAndIndex(nav_items_container_title, j);

                // create a nav items container and place it into the nav section
                var nav_items_container_HTML = navItemsContainer(nav_items_container_id, nav_items_container_icon, nav_items_container_title);
                placeNavItemsContainerIntoNavSection(nav_items_container_HTML, nav_section_id);

                // if the current nav items container has nav items
                // step through each nav item in the current nav items container
                if (nav_items_container.nav_items) {
                    let nav_items = nav_items_container["nav_items"];
                    for (let k = 0; k < nav_items.length; k++) {

                        // get the properties of the nav item
                        let nav_item = nav_items[k];
                        let nav_item_title = nav_item.title;
                        let nav_item_href= nav_item.href;

                        // create a nav item and place it into the nav items container
                        var nav_item_HTML = navItem(nav_item_title, nav_item_href);
                        placeNavItemIntoNavItemsContainer(nav_item_HTML, nav_items_container_id);
                    }
                }

            }

        }
    }
}