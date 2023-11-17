const __author__ = "Jerry Overton"
const __copyright__ = "Copyright (C) 2023 appliedAIstudio"
const __version__ = "0.1"

import menu_json from "./build_index_nav.json" assert { type: 'json' };
import search_bar_json from "./build_index_search_bar.json" assert { type: 'json' };
import {buildMenuFromJSON, buildSearchBarFromJSON, renderPage} from "./build_sdk_index.js";

window.addEventListener("load", function() {
    buildMenuFromJSON(menu_json);
    buildSearchBarFromJSON(search_bar_json);
    renderPage();
});
