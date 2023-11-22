// ==UserScript==
// @name         rrgc userscript
// @namespace    malikremgcregion.github.io/
// @version      0.18
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
    const c7k_ladderUrl = "https://malikremgcregion.github.io/c7k_ladder.html";
    const remgcn_ladderUrl = "https://malikremgcregion.github.io/remgcn_ladder.html";
    const ladderdUrl = "https://malikremgcregion.github.io/ladder.html";
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
        if (window.location.href === c7k_ladderUrl ||
            window.location.href === remgcn_ladderUrl ||
            window.location.href === ladderdUrl ||
            window.location.href === restrictedUrl ||
            window.location.href === shameUrl ||
            window.location.href === suspectsUrl ||
            window.location.href.includes("cc")) {
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
                $('h5.card-title a[href*="7656"]').each(function() {
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
        $(document).ready(function() {
            CCdropdownMenu();
        });
        jQuery("tr").each(function() {
            $(this).children('td').eq(2).css("width", "200px");
        });

        let steamDB1000, club7000DB, remgcnDB, gamescollectorsDB;

        //this gamescollectors
        GM_xmlhttpRequest({
            method: "GET",
            url: "https://raw.githubusercontent.com/MalikRemgcRegion/malikremgcregion.github.io/main/db_gamescollectors/db/db.json",
            synchronous: true,
            onload: function(res) {
                gamescollectorsDB = JSON.parse(res.responseText);
                console.log(gamescollectorsDB);
            }
        });

        //this remgcn
        GM_xmlhttpRequest({
            method: "GET",
            url: "https://raw.githubusercontent.com/MalikRemgcRegion/malikremgcregion.github.io/main/db_remgcn/db/db.json",
            synchronous: true,
            onload: function(res) {
                remgcnDB = JSON.parse(res.responseText);
                console.log(remgcnDB);
            }
        });

        //this club7000
        GM_xmlhttpRequest({
            method: "GET",
            url: "https://raw.githubusercontent.com/MalikRemgcRegion/malikremgcregion.github.io/main/db_club7000/db/db.json",
            synchronous: true,
            onload: function(res) {
                club7000DB = JSON.parse(res.responseText);
                console.log(club7000DB);
            }
        });

        //this steamdb1000
        GM_xmlhttpRequest({
            method: "GET",
            url: "https://raw.githubusercontent.com/MalikRemgcRegion/malikremgcregion.github.io/main/db_steamdb1000/db/db.json",
            synchronous: true,
            onload: function(res) {
                steamDB1000 = JSON.parse(res.responseText);
                console.log(steamDB1000);
            }
        });

        //remgc
        GM_xmlhttpRequest({
            method: "GET",
            url: "https://raw.githubusercontent.com/MalikRemgcRegion/malikremgcregion.github.io/main/db/db.json",
            synchronous: true,
            onload: function(res) {
                const db = JSON.parse(res.responseText);
                const currentURL = window.location.href;

                if (currentURL.includes("steam-tracker")) {
                    const urlp = new URL(window.location.href);
                    if (urlp.searchParams.has('cc')) {
                        const cc = urlp.searchParams.get("cc");
                        if (cc && cc.length === 2 && cc.match(/[A-Z]/i)) {
                            GetSteamAccountRegion(0, db, steamDB1000, club7000DB, remgcnDB, gamescollectorsDB, cc);
                        } else {
                            GetSteamAccountRegion(0, db, steamDB1000, club7000DB, remgcnDB, gamescollectorsDB, "");
                        }
                    } else {
                        GetSteamAccountRegion(0, db, steamDB1000, club7000DB, remgcnDB, gamescollectorsDB, "");
                    }
                }

                if (currentURL.includes("steamdb")) {
                    const urlp = new URL(window.location.href);
                    if (urlp.searchParams.has('cc')) {
                        const cc = urlp.searchParams.get("cc");
                        if (cc && cc.length === 2 && cc.match(/[A-Z]/i)) {
                            GetSteamAccountRegion(1, db, steamDB1000, club7000DB, remgcnDB, gamescollectorsDB, cc);
                        } else {
                            GetSteamAccountRegion(1, db, steamDB1000, club7000DB, remgcnDB, gamescollectorsDB, "");
                        }
                    } else {
                        GetSteamAccountRegion(1, db, steamDB1000, club7000DB, remgcnDB, gamescollectorsDB, "");
                    }
                }
            }
        });

        function getSteamID(ids, db, steamDB1000, club7000DB, remgcnDB, gamescollectorsDB) {
            const steamIDInDB = db.find(c => c.id !== "" && ids.includes(c.id));

            if (steamIDInDB) {
                return steamIDInDB;
            }

            if (Array.isArray(gamescollectorsDB)) {
                const steamIDIngamescollectorsDB = gamescollectorsDB.find(c => c.id !== "" && ids.includes(c.id));
                if (steamIDIngamescollectorsDB) {
                    return steamIDIngamescollectorsDB;
                }
            }



            if (Array.isArray(remgcnDB)) {
                const steamIDInRemgCNDB = remgcnDB.find(c => c.id !== "" && ids.includes(c.id));
                if (steamIDInRemgCNDB) {
                    return steamIDInRemgCNDB;
                }
            }

            if (Array.isArray(club7000DB)) {
                const steamIDInClub7000DB = club7000DB.find(c => c.id !== "" && ids.includes(c.id));
                if (steamIDInClub7000DB) {
                    return steamIDInClub7000DB;
                }
            }

            if (Array.isArray(steamDB1000)) {
                const steamIDInsteamDB1000 = steamDB1000.find(c => c.id !== "" && ids.includes(c.id));
                if (steamIDInsteamDB1000) {
                    return steamIDInsteamDB1000;
                }
            }

            return null;
        }

        function GetSteamAccountRegion(site,db, steamDB1000, club7000DB, remgcnDB, gamescollectorsDB, ccfilterCriteria) {
            jQuery(document).ready(function() {
                let cc_image = "";

                let i = 0;
                jQuery("tr[id]").each(function() {
                    const id = jQuery(this).prop("id");
                    const steamID = getSteamID(id, db, steamDB1000, club7000DB, remgcnDB, gamescollectorsDB);

                    if (steamID) {
                        if (ccfilterCriteria) {
                            if (!steamID.region.includes(ccfilterCriteria)) {
                                jQuery(this).hide();
                                return;
                            }
                            jQuery(this).find(".rank").text(`#${++i}`);
                        }
                        const countries = steamID.region.filter(r => r !== "ZZ").map(r => {
                            // Add a click event to the flag
                            if(site == 0){
                                cc_image = `<img src="https://steam-tracker.com/images/cc16px/${r.toLowerCase()}.png" title="${r}" class="flag">`;
                            }else if(site == 1){
                                cc_image = `<img src="https://steamdb.info/static/country/${r.toLowerCase()}.svg" title="${r}" class="flag">`;
                            }else{
                                //something else.
                            }
                            return cc_image;
                        }).join("");
                        jQuery(this).children("td").eq(2).html(countries);
                    } else {
                        // Handle the case where steamID is null or undefined
                        jQuery(this).hide();
                    }
                });

                jQuery(".flag").on("click", function() {
                    const flagTitle = jQuery(this).attr("title");
                    const urlp = new URL(window.location.href);
                    urlp.searchParams.set('cc', flagTitle);
                    window.location.href = urlp.toString();
                });

            });
        }

        function CCdropdownMenu() {
            var countries = [
                { value: 'Country', text: 'Country' },
                { value: 'US', text: 'United States' },
                { value: 'CA', text: 'Canada' },
                { value: 'AF', text: 'Afghanistan' },
                { value: 'AX', text: 'Aland Islands' },
                { value: 'AL', text: 'Albania' },
                { value: 'DZ', text: 'Algeria' },
                { value: 'AS', text: 'American Samoa' },
                { value: 'AD', text: 'Andorra' },
                { value: 'AO', text: 'Angola' },
                { value: 'AI', text: 'Anguilla' },
                { value: 'AQ', text: 'Antarctica' },
                { value: 'AG', text: 'Antigua & Barbuda' },
                { value: 'AR', text: 'Argentina' },
                { value: 'AM', text: 'Armenia' },
                { value: 'AW', text: 'Aruba' },
                { value: 'AU', text: 'Australia' },
                { value: 'AT', text: 'Austria' },
                { value: 'AZ', text: 'Azerbaijan' },
                { value: 'BS', text: 'Bahamas' },
                { value: 'BH', text: 'Bahrain' },
                { value: 'BD', text: 'Bangladesh' },
                { value: 'BB', text: 'Barbados' },
                { value: 'BY', text: 'Belarus' },
                { value: 'BE', text: 'Belgium' },
                { value: 'BZ', text: 'Belize' },
                { value: 'BJ', text: 'Benin' },
                { value: 'BM', text: 'Bermuda' },
                { value: 'BT', text: 'Bhutan' },
                { value: 'BO', text: 'Bolivia' },
                { value: 'BQ', text: 'Bonaire, Sint Eustatius and Saba' },
                { value: 'BA', text: 'Bosnia and Herzegovina' },
                { value: 'BW', text: 'Botswana' },
                { value: 'BV', text: 'Bouvet Island' },
                { value: 'BR', text: 'Brazil' },
                { value: 'IO', text: 'British Indian Ocean Territory' },
                { value: 'VG', text: 'British Virgin Islands' },
                { value: 'BN', text: 'Brunei Darussalam' },
                { value: 'BG', text: 'Bulgaria' },
                { value: 'BF', text: 'Burkina Faso' },
                { value: 'BI', text: 'Burundi' },
                { value: 'KH', text: 'Cambodia' },
                { value: 'CM', text: 'Cameroon' },
                { value: 'CV', text: 'Cape Verde' },
                { value: 'KY', text: 'Cayman Islands' },
                { value: 'CF', text: 'Central African Republic' },
                { value: 'TD', text: 'Chad' },
                { value: 'CL', text: 'Chile' },
                { value: 'CN', text: 'China' },
                { value: 'CX', text: 'Christmas Island' },
                { value: 'CC', text: 'Cocos (Keeling) Islands' },
                { value: 'CO', text: 'Colombia' },
                { value: 'KM', text: 'Comoros' },
                { value: 'CG', text: 'Congo' },
                { value: 'CD', text: 'Congo, the Democratic Republic of the' },
                { value: 'CK', text: 'Cook Islands' },
                { value: 'CR', text: 'Costa Rica' },
                { value: 'CI', text: "Cote D'ivoire (Ivory Coast)" },
                { value: 'HR', text: 'Croatia' },
                { value: 'CU', text: 'Cuba' },
                { value: 'CW', text: 'Curacao' },
                { value: 'CY', text: 'Cyprus' },
                { value: 'CZ', text: 'Czech Republic' },
                { value: 'DK', text: 'Denmark' },
                { value: 'DJ', text: 'Djibouti' },
                { value: 'DM', text: 'Dominica' },
                { value: 'DO', text: 'Dominican Republic' },
                { value: 'EC', text: 'Ecuador' },
                { value: 'EG', text: 'Egypt' },
                { value: 'SV', text: 'El Salvador' },
                { value: 'GQ', text: 'Equatorial Guinea' },
                { value: 'ER', text: 'Eritrea' },
                { value: 'EE', text: 'Estonia' },
                { value: 'ET', text: 'Ethiopia' },
                { value: 'FK', text: 'Falkland Islands (Malvinas)' },
                { value: 'FO', text: 'Faroe Islands' },
                { value: 'FJ', text: 'Fiji' },
                { value: 'FI', text: 'Finland' },
                { value: 'FR', text: 'France' },
                { value: 'GF', text: 'French Guiana' },
                { value: 'PF', text: 'French Polynesia' },
                { value: 'TF', text: 'French Southern Territories' },
                { value: 'GA', text: 'Gabon' },
                { value: 'GM', text: 'Gambia' },
                { value: 'GE', text: 'Georgia' },
                { value: 'DE', text: 'Germany' },
                { value: 'GH', text: 'Ghana' },
                { value: 'GI', text: 'Gibraltar' },
                { value: 'GR', text: 'Greece' },
                { value: 'GL', text: 'Greenland' },
                { value: 'GD', text: 'Grenada' },
                { value: 'GP', text: 'Guadeloupe' },
                { value: 'GU', text: 'Guam' },
                { value: 'GT', text: 'Guatemala' },
                { value: 'GG', text: 'Guernsey' },
                { value: 'GN', text: 'Guinea' },
                { value: 'GW', text: 'Guinea-Bissau' },
                { value: 'GY', text: 'Guyana' },
                { value: 'HT', text: 'Haiti' },
                { value: 'HM', text: 'Heard & McDonald Islands' },
                { value: 'HN', text: 'Honduras' },
                { value: 'HK', text: 'Hong Kong' },
                { value: 'HU', text: 'Hungary' },
                { value: 'IS', text: 'Iceland' },
                { value: 'IN', text: 'India' },
                { value: 'ID', text: 'Indonesia' },
                { value: 'IQ', text: 'Iraq' },
                { value: 'IE', text: 'Ireland' },
                { value: 'IR', text: 'Islamic Republic of Iran' },
                { value: 'IM', text: 'Isle of Man' },
                { value: 'IL', text: 'Israel' },
                { value: 'IT', text: 'Italy' },
                { value: 'JM', text: 'Jamaica' },
                { value: 'JP', text: 'Japan' },
                { value: 'JE', text: 'Jersey' },
                { value: 'JO', text: 'Jordan' },
                { value: 'KZ', text: 'Kazakhstan' },
                { value: 'KE', text: 'Kenya' },
                { value: 'KI', text: 'Kiribati' },
                { value: 'KP', text: "Korea, Democratic People's Republic of" },
                { value: 'KR', text: 'Korea, Republic of' },
                { value: 'XK', text: 'Kosovo' },
                { value: 'KW', text: 'Kuwait' },
                { value: 'KG', text: 'Kyrgyzstan' },
                { value: 'LA', text: 'Laos' },
                { value: 'LV', text: 'Latvia' },
                { value: 'LB', text: 'Lebanon' },
                { value: 'LS', text: 'Lesotho' },
                { value: 'LR', text: 'Liberia' },
                { value: 'LY', text: 'Libya' },
                { value: 'LI', text: 'Liechtenstein' },
                { value: 'LT', text: 'Lithuania' },
                { value: 'LU', text: 'Luxembourg' },
                { value: 'MO', text: 'Macau' },
                { value: 'MK', text: 'Macedonia, The Former Yugoslav Republic of' },
                { value: 'MG', text: 'Madagascar' },
                { value: 'MW', text: 'Malawi' },
                { value: 'MY', text: 'Malaysia' },
                { value: 'MV', text: 'Maldives' },
                { value: 'ML', text: 'Mali' },
                { value: 'MT', text: 'Malta' },
                { value: 'MH', text: 'Marshall Islands' },
                { value: 'MQ', text: 'Martinique' },
                { value: 'MR', text: 'Mauritania' },
                { value: 'MU', text: 'Mauritius' },
                { value: 'YT', text: 'Mayotte' },
                { value: 'MX', text: 'Mexico' },
                { value: 'FM', text: 'Micronesia' },
                { value: 'MD', text: 'Moldova, Republic of' },
                { value: 'MC', text: 'Monaco' },
                { value: 'MN', text: 'Mongolia' },
                { value: 'MS', text: 'Montserrat' },
                { value: 'ME', text: 'Montenegro' },
                { value: 'MA', text: 'Morocco' },
                { value: 'MZ', text: 'Mozambique' },
                { value: 'MM', text: 'Myanmar' },
                { value: 'NA', text: 'Namibia' },
                { value: 'NR', text: 'Nauru' },
                { value: 'NP', text: 'Nepal' },
                { value: 'NL', text: 'Netherlands' },
                { value: 'NC', text: 'New Caledonia' },
                { value: 'NZ', text: 'New Zealand' },
                { value: 'NI', text: 'Nicaragua' },
                { value: 'NE', text: 'Niger' },
                { value: 'NG', text: 'Nigeria' },
                { value: 'NU', text: 'Niue' },
                { value: 'NF', text: 'Norfolk Island' },
                { value: 'MP', text: 'Northern Mariana Islands' },
                { value: 'NO', text: 'Norway' },
                { value: 'OM', text: 'Oman' },
                { value: 'PK', text: 'Pakistan' },
                { value: 'PW', text: 'Palau' },
                { value: 'PS', text: 'Palestinian Territory, Occupied' },
                { value: 'PA', text: 'Panama' },
                { value: 'PG', text: 'Papua New Guinea' },
                { value: 'PY', text: 'Paraguay' },
                { value: 'PE', text: 'Peru' },
                { value: 'PH', text: 'Philippines' },
                { value: 'PN', text: 'Pitcairn' },
                { value: 'PL', text: 'Poland' },
                { value: 'PT', text: 'Portugal' },
                { value: 'PR', text: 'Puerto Rico' },
                { value: 'QA', text: 'Qatar' },
                { value: 'RE', text: 'Reunion' },
                { value: 'RO', text: 'Romania' },
                { value: 'RU', text: 'Russian Federation' },
                { value: 'RW', text: 'Rwanda' },
                { value: 'BL', text: 'Saint Barthelemy' },
                { value: 'LC', text: 'Saint Lucia' },
                { value: 'MF', text: 'Saint Martin (French part)' },
                { value: 'WS', text: 'Samoa' },
                { value: 'SM', text: 'San Marino' },
                { value: 'ST', text: 'Sao Tome & Principe' },
                { value: 'SA', text: 'Saudi Arabia' },
                { value: 'SN', text: 'Senegal' },
                { value: 'RS', text: 'Serbia' },
                { value: 'SC', text: 'Seychelles' },
                { value: 'SL', text: 'Sierra Leone' },
                { value: 'SG', text: 'Singapore' },
                { value: 'SX', text: 'Sint Maarten (Dutch part)' },
                { value: 'SK', text: 'Slovakia' },
                { value: 'SI', text: 'Slovenia' },
                { value: 'SB', text: 'Solomon Islands' },
                { value: 'SO', text: 'Somalia' },
                { value: 'ZA', text: 'South Africa' },
                { value: 'GS', text: 'South Georgia and the South Sandwich Islands' },
                { value: 'SS', text: 'South Sudan' },
                { value: 'ES', text: 'Spain' },
                { value: 'LK', text: 'Sri Lanka' },
                { value: 'SH', text: 'St. Helena' },
                { value: 'KN', text: 'St. Kitts and Nevis' },
                { value: 'PM', text: 'St. Pierre & Miquelon' },
                { value: 'VC', text: 'St. Vincent & the Grenadines' },
                { value: 'SD', text: 'Sudan' },
                { value: 'SR', text: 'Suriname' },
                { value: 'SJ', text: 'Svalbard & Jan Mayen Islands' },
                { value: 'SZ', text: 'Swaziland' },
                { value: 'SE', text: 'Sweden' },
                { value: 'CH', text: 'Switzerland' },
                { value: 'SY', text: 'Syrian Arab Republic' },
                { value: 'TW', text: 'Taiwan' },
                { value: 'TJ', text: 'Tajikistan' },
                { value: 'TZ', text: 'Tanzania, United Republic of' },
                { value: 'TH', text: 'Thailand' },
                { value: 'TL', text: 'Timor-Leste' },
                { value: 'TG', text: 'Togo' },
                { value: 'TK', text: 'Tokelau' },
                { value: 'TO', text: 'Tonga' },
                { value: 'TT', text: 'Trinidad & Tobago' },
                { value: 'TN', text: 'Tunisia' },
                { value: 'TR', text: 'Turkey' },
                { value: 'TM', text: 'Turkmenistan' },
                { value: 'TC', text: 'Turks & Caicos Islands' },
                { value: 'TV', text: 'Tuvalu' },
                { value: 'UG', text: 'Uganda' },
                { value: 'UA', text: 'Ukraine' },
                { value: 'AE', text: 'United Arab Emirates' },
                { value: 'GB', text: 'United Kingdom (Great Britain)' },
                { value: 'UM', text: 'United States Minor Outlying' },
                { value: 'VI', text: 'United States Virgin Islands' },
                { value: 'UY', text: 'Uruguay' },
                { value: 'UZ', text: 'Uzbekistan' },
                { value: 'VU', text: 'Vanuatu' },
                { value: 'VA', text: 'Vatican City State (Holy See)' },
                { value: 'VE', text: 'Venezuela' },
                { value: 'VN', text: 'Viet Nam' },
                { value: 'WF', text: 'Wallis & Futuna Islands' },
                { value: 'EH', text: 'Western Sahara' },
                { value: 'YE', text: 'Yemen' },
                { value: 'ZM', text: 'Zambia' },
                { value: 'ZW', text: 'Zimbabwe' }
            ];

            var selectHTML = '<select id="countryDropdown">';
            countries.forEach(function(country) {
                selectHTML += `<option value="${country.value}">${country.text}</option>`;
            });
            selectHTML += '</select>';

            $('#main > div:nth-child(2) > table > thead > tr > th:nth-child(3)').append(selectHTML);
            $('#countryDropdown').on('change', SelectCountry);
        }

        function SelectCountry(event) {
            var menu = document.getElementById("countryDropdown");
            var selectedCountry = menu.value;

            if (selectedCountry !== 'Country') {
                window.location.href = `https://steamdb.info/badge/13/?cc=${selectedCountry}`;
            }
        }
    }
})();
