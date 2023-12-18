const __author__ = "Jerry Overton"
const __copyright__ = "Copyright (C) 2023 appliedAIstudio"
const __version__ = "0.1"

// menu sdk
import menu_json from "../menu/build_index_nav.json" assert { type: 'json' };
import {buildMenuFromJSON} from "../../sdk/sdk_build_menu.js";

// search bar sdk
import search_bar_json from "../search/build_index_search_bar.json" assert { type: 'json' };
import {buildSearchBarFromJSON} from "../../sdk/sdk_build_search.js";

// settings options
import settings_options_json from "../settings/build_settings_options.json" assert { type: 'json' };
import { buildSettingsOptionsFromJSON} from "../../sdk/sdk_build_settings_options.js";

// notifications
import { writeTestNotifications, refreshNotifications } from "../../sdk/sdk_pouchdb_notifications.js";

// assistance
import { writeTestCobotOptionsData, refreshCoboticsOptions } from "../../sdk/sdk_build_cobot.js";

// post processing sdk
import {renderPage } from "../../sdk/sdk_page_post_process.js";

window.addEventListener("load", function() {
    // @TODO standardize the names of all HTML id attributes with camel case

    //writeTestNotifications();
    writeTestCobotOptionsData();
    buildMenuFromJSON(menu_json);
    buildSearchBarFromJSON(search_bar_json);
    buildSettingsOptionsFromJSON(settings_options_json);
    refreshNotifications();
    refreshCoboticsOptions();
    renderPage();
});
