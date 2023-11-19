const __author__ = "Jerry Overton"
const __copyright__ = "Copyright (C) 2023 appliedAIstudio"
const __version__ = "0.1"

import {createIDfromTitleAndIndex} from "./sdk_build_utils.js"

export function buildSettingsOptionsFromJSON(settings_options_json) {
    // identify the profile information
    let profile = settings_options_json['profile'];
    let avatar_image = profile.avatar_image;
    let username = profile.username;

    buildProfileDisplay(avatar_image, username);

    // step through the settings and add each to the settings menu
    let settings_options = settings_options_json['options']
    for (let i = 0; i < settings_options.length; i++) {
        // identify the setting option properties
        let setting_option = settings_options[i]
        let setting_icon = setting_option.icon;
        let setting_title = setting_option.title;
        let setting_href = setting_option.href;

        addSettingOption(setting_icon, setting_title, setting_href);
    }

    function buildProfileDisplay(avatar_image, username) {
        // update the avatar image display
        document.getElementById("avatarMenuImage").src = avatar_image;
        document.getElementById("avatarDropdownImage").src = avatar_image;

        // update the username
        document.getElementById("username").textContent = username;
    }

    function addSettingOption(icon, title, href) {
         // get the setting option template html
        var settings_option_template = document.getElementById("settingsOptionTemplate").content;
        var settings_option_HTML = document.importNode(settings_option_template, true);

        //set the setting option properties
        //search_result_HTML.querySelector("img").src = icon;
        //search_result_HTML.querySelector("a").href = href;
        //search_result_HTML.querySelector("h6").textContent = title;
        //search_result_HTML.querySelector("span").textContent = content;

        // place the setting option into the settings list
        document.getElementById("settingsOptions").appendChild(settings_option_HTML);
    }

}
