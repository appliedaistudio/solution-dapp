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

    function buildProfileDisplay(avatar_image, username) {
        // update the avatar image display
        document.getElementById("avatarMenuImage").src = avatar_image;
        document.getElementById("avatarDropdownImage").src = avatar_image;

        // update the username
        document.getElementById("username").textContent = username;
    }

}
