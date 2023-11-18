const __author__ = "Jerry Overton"
const __copyright__ = "Copyright (C) 2023 appliedAIstudio"
const __version__ = "0.1"

// menu sdk
import menu_json from "../menu/build_index_nav.json" assert { type: 'json' };
import {buildMenuFromJSON} from "../../sdk/sdk_build_menu.js";

// search bar sdk
import search_bar_json from "../search/build_index_search_bar.json" assert { type: 'json' };
import {buildSearchBarFromJSON} from "../../sdk/sdk_build_search.js";

// post processing sdk
import {renderPage } from "../../sdk/sdk_page_post_process.js";

window.addEventListener("load", function() {
    buildMenuFromJSON(menu_json);
    buildSearchBarFromJSON(search_bar_json);
    renderPage();
});
