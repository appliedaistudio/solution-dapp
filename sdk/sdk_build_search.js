
const __author__ = "Jerry Overton"
const __copyright__ = "Copyright (C) 2023 appliedAIstudio"
const __version__ = "0.1"

import {createIDfromTitleAndIndex} from "./sdk_build_utils.js"


function buildSearchResultHeader(header_title) {
    // get the search result title template html
    var search_results_header_template = document.getElementById("search_results_header_template").content;
    var search_results_header_HTML = document.importNode(search_results_header_template, true);

    // set the title of the search results header
    search_results_header_HTML.getElementById("header").textContent = header_title;

    // place the header into the search results
    document.getElementById("search-results").appendChild(search_results_header_HTML);
}

function buildSearchResultsSet(results_set_id) {
    // get the search results set template html
    var search_results_set_template = document.getElementById("search_results_set_template").content;
    var search_results_set_HTML = document.importNode(search_results_set_template, true);

    // set the id of the result set
    search_results_set_HTML.querySelector("div").id = results_set_id

    // place the result set into the search results
    document.getElementById("search-results").appendChild(search_results_set_HTML);
}

function searchResultHTML(icon, href, title, content) {
    // get the search result template html
    var search_result_template = document.getElementById("search_result_template").content;
    var search_result_HTML = document.importNode(search_result_template, true);

    //set the search result properties
    search_result_HTML.querySelector("img").src = icon;
    search_result_HTML.querySelector("a").href = href;
    search_result_HTML.querySelector("h6").textContent = title;
    search_result_HTML.querySelector("span").textContent = content;

    // return the search result html
    return search_result_HTML;
}

function placeSearchResultIntoSearchResultsSet(search_result_HTML, results_set_id) {
    document.getElementById(results_set_id).appendChild(search_result_HTML);
}

export function buildSearchBarFromJSON(search_bar_json){
    // identify the list of search result headers
    let search_result_headers = search_bar_json['search_result_headers'];

    // step through each search result header
    for (let i = 0; i <  search_result_headers.length; i++) {
        
        // get the title of the search result header
        let search_result_header = search_result_headers[i];
        let search_result_header_title = search_result_header.title;
        
        // build a search results header
        buildSearchResultHeader(search_result_header_title);

        // if the current search result header has a result set
        if (search_result_header.search_results) {
            buildSearchResults(search_result_header_title, search_result_header.search_results);
        }

    }

    function buildSearchResults(search_result_header_title, search_results) {
        // create a search result set
        const search_result_set_id = createIDfromTitleAndIndex(search_result_header_title, 0)
        buildSearchResultsSet(search_result_set_id);

        // step through the search results and place them into the search result set
        for (let i = 0; i < search_results.length; i++) {
            // get the properties of the current search result
            let search_result = search_results[i];
            let search_result_icon = search_result.icon;
            let search_result_href = search_result.href;
            let search_result_title = search_result.title;
            let search_result_content = search_result.content;

            // add the search result into the search result set
            var search_result_HTML = searchResultHTML(search_result_icon, search_result_href, search_result_title, search_result_content);
            placeSearchResultIntoSearchResultsSet(search_result_HTML, search_result_set_id);
        }
            
    }

}
