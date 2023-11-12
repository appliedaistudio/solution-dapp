const __author__ = "Jerry Overton"
const __copyright__ = "Copyright (C) 2023 appliedAIstudio"
const __version__ = "0.1"

import menu_json from "./build_index_nav.json" assert { type: 'json' };;
import {buildMenuFromJSON} from "./build_sdk_index.js";

window.addEventListener("load", function() {
    buildMenuFromJSON(menu_json);
});