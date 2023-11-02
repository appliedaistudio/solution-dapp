function buildHomeNav(nav_title) {
    // get the home nav template html
    var home_nav = this.document.getElementById("nav-item-wrapper-home").content;
    var home_nav_HTML = this.document.importNode(home_nav, true);

    // place the nav title inside the template
    home_nav_HTML.querySelector(".nav-link-text").textContent = nav_title;

    // place the home nav template html into the vertical navbar
    this.document.getElementById("navbarVerticalNav").appendChild(home_nav_HTML);
}

window.addEventListener("load", function() { 

    buildHomeNav(nav_title = "Home Fool!");

});