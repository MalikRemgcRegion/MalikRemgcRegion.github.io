// ==UserScript==
// @name         rrgc userscript
// @namespace    malikremgcregion.github.io/
// @version      0.14
// @description  try to take over the world!
// @author       rrgc
// @match        https://malikremgcregion.github.io/*
// @match        https://steam-tracker.com/ranking/apps
// @match        https://steamdb.info/badge/13/*
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
    const restrictedUrl = "https://malikremgcregion.github.io/restricted.html";
    const shameUrl = "https://malikremgcregion.github.io/shame.html";
    const suspectsUrl = "https://malikremgcregion.github.io/suspects.html";
    const aboutUrl = "https://malikremgcregion.github.io/about.html";
    const mainUrl = "https://malikremgcregion.github.io/";
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const steamid = urlParams.get('id');
    const ccfilterCriteria = "";

    $(document).ready(function() {
        // Shame page
        if (window.location.href === restrictedUrl || window.location.href === shameUrl || window.location.href === suspectsUrl || window.location.href.includes("cc")) {
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
            const profilesArray = ["76561198034957967", "76561198192399786", "76561198355625888"];
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
        let gamescollectorsDB,club7000DB,remgcnDB, steamDB1000;
        GM_xmlhttpRequest({
            method: "GET",
            url: "https://raw.githubusercontent.com/MalikRemgcRegion/malikremgcregion.github.io/main/db_gamescollectors/db/db.json",
            synchronous: true,
            onload: function(res) {
                gamescollectorsDB = JSON.parse(res.responseText);
            }
        });
        GM_xmlhttpRequest({
            method: "GET",
            url: "https://raw.githubusercontent.com/MalikRemgcRegion/malikremgcregion.github.io/main/db_club7000/db/db.json",
            synchronous: true,
            onload: function(res) {
                club7000DB = JSON.parse(res.responseText);
            }
        });
        GM_xmlhttpRequest({
            method: "GET",
            url: "https://raw.githubusercontent.com/MalikRemgcRegion/malikremgcregion.github.io/main/db_remgcn/db/db.json",
            synchronous: true,
            onload: function(res) {
                remgcnDB = JSON.parse(res.responseText);
            }
        });
		
		GM_xmlhttpRequest({
            method: "GET",
            url: "https://raw.githubusercontent.com/MalikRemgcRegion/malikremgcregion.github.io/main/db_steamdb1000/db/db.json",
            synchronous: true,
            onload: function(res) {
                steamDB1000 = JSON.parse(res.responseText);
            }
        });

        GM_xmlhttpRequest({
            method: "GET",
            url: "https://raw.githubusercontent.com/MalikRemgcRegion/malikremgcregion.github.io/main/db/db.json",
            synchronous: true,
            onload: function(res) {
                const db = JSON.parse(res.responseText);
                const currentURL = window.location.href;

                if (currentURL.includes("steam-tracker")) {
                    steamtracker(db)
                }

                if (currentURL.includes("steamdb")) {
                    const urlp = new URL(window.location.href);
                    if (urlp.searchParams.has('cc')) {
                        const cc = urlp.searchParams.get("cc");
                        if (cc && cc.length === 2 && cc.match(/[A-Z]/i)) {
                            steamdb(db, gamescollectorsDB, club7000DB, remgcnDB, steamDB1000, cc);
                        } else {
                            steamdb(db, gamescollectorsDB, club7000DB, remgcnDB, steamDB1000, "");
                        }
                    } else {
                        steamdb(db, gamescollectorsDB, club7000DB, remgcnDB, steamDB1000, "");
                    }
                }
            }
        });

        function getSteamID(ids, db, gamescollectorsDB, club7000DB, remgcnDB, steamDB1000) {
            const steamIDInDB = db.find(c => c.id !== "" && ids.includes(c.id));

            if (steamIDInDB) {
                return steamIDInDB;
            }

            if (Array.isArray(gamescollectorsDB)) {
                const steamIDInGamesCollectorsDB = gamescollectorsDB.find(c => c.id !== "" && ids.includes(c.id));
                if (steamIDInGamesCollectorsDB) {
                    return steamIDInGamesCollectorsDB;
                }
            }

            if (Array.isArray(club7000DB)) {
                const steamIDInClub7000DB = club7000DB.find(c => c.id !== "" && ids.includes(c.id));
                if (steamIDInClub7000DB) {
                    return steamIDInClub7000DB;
                }
            }

            if (Array.isArray(remgcnDB)) {
                const steamIDInRemgCNDB = remgcnDB.find(c => c.id !== "" && ids.includes(c.id));
                if (steamIDInRemgCNDB) {
                    return steamIDInRemgCNDB;
                }
            }
			
			if (Array.isArray(steamDB1000)) {
                const steamIDInRemgCNDB = steamDB1000.find(c => c.id !== "" && ids.includes(c.id));
                if (steamIDInSteamDB1000) {
                    return steamIDInSteamDB1000;
                }
            }

            return null;
        }

        function steamdb(db, gamesCollectorsDB, club7000DB, remgcnDB, ccfilterCriteria) {
            jQuery(document).ready(function () {
                let i = 0;
                jQuery("tr[id]").each(function () {
                    const id = jQuery(this).prop("id");
                    const steamID = getSteamID(id, db, gamesCollectorsDB, club7000DB, remgcnDB);

                    if (steamID) {
                        if (ccfilterCriteria) {
                            if (!steamID.region.includes(ccfilterCriteria)) {
                                jQuery(this).hide();
                                return;
                            }
                            jQuery(this).find(".rank").text(`#${++i}`);
                        }
                        const countries = steamID.region
                        .filter(r => r !== "ZZ")
                        .map(r => {
                            // Add a click event to the flag
                            return `<img src="https://steamdb.info/static/country/${r.toLowerCase()}.svg" title="${r}" class="flag">`;
                        })
                        .join("");
                        jQuery(this).children("td").eq(2).html(countries);
                    } else {
                        // Handle the case where steamID is null or undefined
                        jQuery(this).hide();
                    }
                });

                jQuery(".flag").on("click", function () {
                    const flagTitle = jQuery(this).attr("title");
                    const urlp = new URL(window.location.href);
                    urlp.searchParams.set('cc', flagTitle);
                    window.location.href = urlp.toString();
                });
            });
        }

        function steamtracker(db){
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
    }
})();
