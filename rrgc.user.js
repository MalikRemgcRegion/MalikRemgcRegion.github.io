// ==UserScript==
// @name         rrgc userscript
// @namespace    http://tampermonkey.net/
// @version      0.6
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
    $(document).ready(function() {
        const shameUrl = "https://malikremgcregion.github.io/shame.html";
        const aboutUrl = "https://malikremgcregion.github.io/about.html";
        const mainUrl = "https://malikremgcregion.github.io/";
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const steamid = urlParams.get('id');

        // Shame page
        if (window.location.href === shameUrl || window.location.href.includes("cc")) {
            $('td:first-child').each(function() {
                const $td = $(this);
                const steamids = $td[0].innerText;
                if (steamids && steamids.length == 17 && typeof parseInt(steamids) == "number") {
                    GM_xmlhttpRequest({
                        method: "GET",
                        url: `https://steamcommunity.com/actions/ajaxresolveusers?steamids=${steamids}`,
                        onload: function(res) {
                            const t_ajaxresolveusers = res.responseText;
                            const j_ajaxresolveusers = JSON.parse(t_ajaxresolveusers);
                            const avatar_url = j_ajaxresolveusers[0].avatar_url;
                            const persona_name = j_ajaxresolveusers[0].persona_name;
                            const steamid = j_ajaxresolveusers[0].steamid;
                            $td.html(`<a href="https://malikremgcregion.github.io/?id=${steamid}">${persona_name}</a>`);
                        }
                    });
                }
            });
        }

        // About page
        if (window.location.href === aboutUrl) {
            const profilesArray = [STEAM_ID_1, STEAM_ID_2, STEAM_ID_3]; // Replace with your Steam IDs
            profilesArray.forEach(steamid => {
                GM_xmlhttpRequest({
                    method: "GET",
                    url: `https://steamcommunity.com/miniprofile/s${steamid}/json`,
                    onload: function(res) {
                        const j_steamprofile = res.responseText;
                        const g_steamprofile = JSON.parse(j_steamprofile);
                        const avatar_url = g_steamprofile['avatar_url'];
                        const persona_name = g_steamprofile['persona_name'];
                        $(`#steamAvatar_${steamid}`).attr("src", avatar_url);
                        $(`#steamAlias_${steamid}`).html(`<a href="https://steamcommunity.com/profiles/${steamid}">${persona_name}</a>`);
                    }
                });
            });
        }

        // Profile page
        if (steamid && steamid.length == 17 && typeof parseInt(steamid) == "number") {
            GM_xmlhttpRequest({
                method: "GET",
                url: `https://steamcommunity.com/miniprofile/s${steamid}/json`,
                onload: function(res) {
                    const j_steamprofile = res.responseText;
                    const g_steamprofile = JSON.parse(j_steamprofile);
                    const avatar_url = g_steamprofile['avatar_url'];
                    const persona_name = g_steamprofile['persona_name'];
                    $("#steamAvatar").attr("src", avatar_url);
                    $("#steamAlias").html(`<a href="https://steamcommunity.com/profiles/${steamid}">${persona_name}</a>`);
                }
            });
        }

        // Main page
        if (window.location.href === mainUrl) {
            function resolveSteamIDs() {
                $('h5.card-title a[href*="7656"]').each(function(){
                    var $a = $(this);
                    let steamid = $a.attr('href').match(/(\d+)/)[0];
                    GM_xmlhttpRequest({
                        method: "GET",
                        url: `https://steamcommunity.com/actions/ajaxresolveusers?steamids=${steamid}`,
                        synchronous: true,
                        onload: function(res) {
                            let t_ajaxresolveusers = res.responseText;
                            let j_ajaxresolveusers = JSON.parse(t_ajaxresolveusers);
                            let persona_name = j_ajaxresolveusers[0].persona_name;
                            $a.text(persona_name);
                        }
                    });
                });
            }
            resolveSteamIDs();
        }
    });
})();
