import menu_json from "./build_index_nav.json" assert { type: 'json' };;
import {buildMenuFromJSON} from "./build_sdk_index.js";

window.addEventListener("load", function() {
    buildMenuFromJSON(menu_json);
});