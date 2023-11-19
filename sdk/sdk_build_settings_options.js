const __author__ = "Jerry Overton"
const __copyright__ = "Copyright (C) 2023 appliedAIstudio"
const __version__ = "0.1"

import {iconNode} from "./sdk_build_utils.js"

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
        let setting_icon_name = setting_option.icon_name;
        let setting_option_name = setting_option.name;
        let setting_href = setting_option.href;

        addSettingOption(setting_icon_name, setting_option_name, setting_href, "settingsOptions");
    }

    // step through the settings footer options and add each to the settings footer
    let settings_footer = settings_options_json['footer'];
    for (let i = 0; i < settings_footer.length; i++) {
        // identify the setting footer properties
        let setting_option = settings_footer[i]
        let setting_icon_name = setting_option.icon_name;
        let setting_option_name = setting_option.name;
        let setting_href = setting_option.href;

        addSettingOption(setting_icon_name, setting_option_name, setting_href, "settingsOptionsFooter");
    }

    function buildProfileDisplay(avatar_image, username) {
        // update the avatar image display
        document.getElementById("avatarMenuImage").src = avatar_image;
        document.getElementById("avatarDropdownImage").src = avatar_image;

        // update the username
        document.getElementById("username").textContent = username;
    }

    function addSettingOption(icon_name, settings_option_name, href, settings_options_section) {
         // get the setting option template html
        var settings_option_template = document.getElementById("settingsOptionTemplate").content;
        var settings_option_HTML = document.importNode(settings_option_template, true);

        //set the setting option properties:

        //place the appropriate icon inside the setting option
        const icon_element = iconNode(icon_name);
        settings_option_HTML.querySelector(".nav-link.px-3").prepend(icon_element);

        // set the settings option name and href
        settings_option_HTML.getElementById("settingsOptionNameTemplate").textContent = settings_option_name;
        settings_option_HTML.querySelector(".nav-link.px-3").href = href;

        // place the setting option into the settings list
        document.getElementById(settings_options_section).appendChild(settings_option_HTML);
    }

}
