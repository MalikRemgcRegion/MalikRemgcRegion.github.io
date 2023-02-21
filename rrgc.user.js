// ==UserScript==
// @name         rrgc userscript
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://malikremgcregion.github.io/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=undefined.
// @require     https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js
// @grant        GM_xmlhttpRequest
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const steamid = urlParams.get('id')
    if (steamid) {
        if(steamid.length == 17 && typeof parseInt(steamid) == "number" ){


            GM_xmlhttpRequest({
                method: "GET",
                url: `https://steamcommunity.com/miniprofile/s${steamid}/json`,
                synchronous: true,
                onload: function(res) {
                    let j_steamprofile = res.responseText;
                    let g_steamprofile = JSON.parse(j_steamprofile);

                    //let level = g_steamprofile['level'];
                    //let level_class = g_steamprofile['level_class'];
                    let avatar_url = g_steamprofile['avatar_url'];
                    let persona_name = g_steamprofile['persona_name'];
                    //let favorite_badge_name = g_steamprofile['favorite_badge']['name'];
                    //let favorite_badge_xp = g_steamprofile['favorite_badge']['xp'];
                    //let favorite_badge_level = g_steamprofile['favorite_badge']['level'];
                    //let favorite_badge_description = g_steamprofile['favorite_badge']['description'];
                    //let favorite_badge_icon = g_steamprofile['favorite_badge']['icon'];
                    //let in_game_name = g_steamprofile['in_game']['name'];
                    //let in_game_is_non_steam = g_steamprofile['in_game']['is_non_steam'];
                    //let in_game_logo = g_steamprofile['in_game']['logo'];
                    //let in_game_rich_presence = g_steamprofile['in_game']['rich_presence'];
                    //let profile_background_webm = g_steamprofile['profile_background']['video/webm'];
                    //let profile_background_mp4 = g_steamprofile['profile_background']['video/mp4'];
                    //let avatar_frame = g_steamprofile['avatar_frame'];

                    $("#steamAvatar").attr("src", avatar_url);
                    $("#steamAlias").html(persona_name);



                }
            });
        }
    }
})();