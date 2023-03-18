// ==UserScript==
// @name         rrgc userscript
// @namespace    malikremgcregion.github.io/
// @version      0.8
// @description  try to take over the world!
// @author       rrgc
// @match        https://malikremgcregion.github.io/*
// @match        https://steam-tracker.com/ranking/apps
// @match        https://steamdb.info/badge/13/
// @connect     malikremgcregion.github.io
// @connect     raw.githubusercontent.com
// @connect     steamcommunity.com
// @connect     steam-tracker.com
// @connect     steamdb.info
// @icon         https://www.google.com/s2/favicons?sz=64&domain=undefined.
// @require     https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js
// @grant        GM_xmlhttpRequest
// @downloadURL      https://github.com/MalikRemgcRegion/MalikRemgcRegion.github.io/raw/main/rrgc.user.js
// @updateURL        https://github.com/MalikRemgcRegion/MalikRemgcRegion.github.io/raw/main/rrgc.user.js
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

    // Steam-tracker + SteamDB
    if (window.location.href.indexOf("steamdb") > -1 || window.location.href.indexOf("steam-tracker") > -1) {
        jQuery( "tr" ).each(function() {
            $(this).children('td').eq(2).css("width","200px");
        });

        GM_xmlhttpRequest({
            method: "GET",
            url: "https://raw.githubusercontent.com/MalikRemgcRegion/malikremgcregion.github.io/main/db/db.json",
            synchronous: true,
            onload: function(res) {
                const db = JSON.parse(res.responseText);
                const currentURL = window.location.href;

                if (currentURL.includes("steam-tracker")) {
                    const rows = document.querySelectorAll("tr");
                    rows.forEach(row => {
                        const id = row.getAttribute("id");
                        const steamID = getSteamID("s" + id, db);
                        if (steamID.length > 0) {
                            const countries = steamID[0]["region"]
                            .filter(r => r !== "ZZ")
                            .map(r => `<img src="https://steam-tracker.com/images/cc16px/${r.toLowerCase()}.png">`)
                            .join("");
                            row.children[2].innerHTML = countries;
                        }
                    });
                }

                if (currentURL.includes("steamdb")) {
                    jQuery(document).ready(function() {
                        jQuery("tr").each(function() {
                            const id = jQuery(this).prop("id");
                            const steamID = getSteamID(id, db);
                            if (steamID.length > 0) {
                                const countries = steamID[0]["region"]
                                .filter(r => r !== "ZZ")
                                .map(r => `<img src="https://steamdb.info/static/country/${r.toLowerCase()}.svg">`)
                                .join("");
                                jQuery(this).children("td").eq(2).html(countries);
                            }
                        });
                    });
                }
            }
        });

        function getSteamID(ids, db) {
            return db.filter(c => c.id !== "" && ids.includes(c.id));
        }
    }
})();
