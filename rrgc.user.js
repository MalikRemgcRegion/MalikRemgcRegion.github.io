// ==UserScript==
// @name         rrgc userscript
// @namespace    malikremgcregion.github.io/
// @version      0.16
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
        CCdropdownMenu();
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
                    steamtracker(db)
                }

                if (currentURL.includes("steamdb")) {
                    const urlp = new URL(window.location.href);
                    if (urlp.searchParams.has('cc')) {
                        const cc = urlp.searchParams.get("cc");
                        if (cc && cc.length === 2 && cc.match(/[A-Z]/i)) {
                            steamdb(db, steamDB1000, club7000DB, remgcnDB, gamescollectorsDB, cc);
                        } else {
                            steamdb(db, steamDB1000, club7000DB, remgcnDB, gamescollectorsDB, "");
                        }
                    } else {
                        steamdb(db, steamDB1000, club7000DB, remgcnDB, gamescollectorsDB, "");
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

        function steamdb(db, steamDB1000, club7000DB, remgcnDB, gamescollectorsDB, ccfilterCriteria) {
            jQuery(document).ready(function() {
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

                jQuery(".flag").on("click", function() {
                    const flagTitle = jQuery(this).attr("title");
                    const urlp = new URL(window.location.href);
                    urlp.searchParams.set('cc', flagTitle);
                    window.location.href = urlp.toString();
                });
            });
        }

        function CCdropdownMenu() {
            $('#main > div:nth-child(2) > table > thead > tr > th:nth-child(3)').append(`
        <select id="SelectCountry">
        <option value="Country">Country</option>
		<option value="US">United States</option>
		<option value="CA">Canada</option>
		<option value="AF">Afghanistan</option>
		<option value="AX">Aland Islands</option>
		<option value="AL">Albania</option>
		<option value="DZ">Algeria</option>
		<option value="AS">American Samoa</option>
		<option value="AD">Andorra</option>
		<option value="AO">Angola</option>
		<option value="AI">Anguilla</option>
		<option value="AQ">Antarctica</option>
		<option value="AG">Antigua & Barbuda</option>
		<option value="AR">Argentina</option>
		<option value="AM">Armenia</option>
		<option value="AW">Aruba</option>
		<option value="AU">Australia</option>
		<option value="AT">Austria</option>
		<option value="AZ">Azerbaijan</option>
		<option value="BS">Bahamas</option>
		<option value="BH">Bahrain</option>
		<option value="BD">Bangladesh</option>
		<option value="BB">Barbados</option>
		<option value="BY">Belarus</option>
		<option value="BE">Belgium</option>
		<option value="BZ">Belize</option>
		<option value="BJ">Benin</option>
		<option value="BM">Bermuda</option>
		<option value="BT">Bhutan</option>
		<option value="BO">Bolivia</option>
		<option value="BQ">Bonaire, Sint Eustatius and Saba</option>
		<option value="BA">Bosnia and Herzegovina</option>
		<option value="BW">Botswana</option>
		<option value="BV">Bouvet Island</option>
		<option value="BR">Brazil</option>
		<option value="IO">British Indian Ocean Territory</option>
		<option value="VG">British Virgin Islands</option>
		<option value="BN">Brunei Darussalam</option>
		<option value="BG">Bulgaria</option>
		<option value="BF">Burkina Faso</option>
		<option value="BI">Burundi</option>
		<option value="KH">Cambodia</option>
		<option value="CM">Cameroon</option>
		<option value="CV">Cape Verde</option>
		<option value="KY">Cayman Islands</option>
		<option value="CF">Central African Republic</option>
		<option value="TD">Chad</option>
		<option value="CL">Chile</option>
		<option value="CN">China</option>
		<option value="CX">Christmas Island</option>
		<option value="CC">Cocos (Keeling) Islands</option>
		<option value="CO">Colombia</option>
		<option value="KM">Comoros</option>
		<option value="CG">Congo</option>
		<option value="CD">Congo, the Democratic Republic of the</option>
		<option value="CK">Cook Islands</option>
		<option value="CR">Costa Rica</option>
		<option value="CI">Cote D'ivoire (Ivory Coast)</option>
		<option value="HR">Croatia</option>
		<option value="CU">Cuba</option>
		<option value="CW">Curacao</option>
		<option value="CY">Cyprus</option>
		<option value="CZ">Czech Republic</option>
		<option value="DK">Denmark</option>
		<option value="DJ">Djibouti</option>
		<option value="DM">Dominica</option>
		<option value="DO">Dominican Republic</option>
		<option value="EC">Ecuador</option>
		<option value="EG">Egypt</option>
		<option value="SV">El Salvador</option>
		<option value="GQ">Equatorial Guinea</option>
		<option value="ER">Eritrea</option>
		<option value="EE">Estonia</option>
		<option value="ET">Ethiopia</option>
		<option value="FK">Falkland Islands (Malvinas)</option>
		<option value="FO">Faroe Islands</option>
		<option value="FJ">Fiji</option>
		<option value="FI">Finland</option>
		<option value="FR">France</option>
		<option value="GF">French Guiana</option>
		<option value="PF">French Polynesia</option>
		<option value="TF">French Southern Territories</option>
		<option value="GA">Gabon</option>
		<option value="GM">Gambia</option>
		<option value="GE">Georgia</option>
		<option value="DE">Germany</option>
		<option value="GH">Ghana</option>
		<option value="GI">Gibraltar</option>
		<option value="GR">Greece</option>
		<option value="GL">Greenland</option>
		<option value="GD">Grenada</option>
		<option value="GP">Guadeloupe</option>
		<option value="GU">Guam</option>
		<option value="GT">Guatemala</option>
		<option value="GG">Guernsey</option>
		<option value="GN">Guinea</option>
		<option value="GW">Guinea-Bissau</option>
		<option value="GY">Guyana</option>
		<option value="HT">Haiti</option>
		<option value="HM">Heard & McDonald Islands</option>
		<option value="HN">Honduras</option>
		<option value="HK">Hong Kong</option>
		<option value="HU">Hungary</option>
		<option value="IS">Iceland</option>
		<option value="IN">India</option>
		<option value="ID">Indonesia</option>
		<option value="IQ">Iraq</option>
		<option value="IE">Ireland</option>
		<option value="IR">Islamic Republic of Iran</option>
		<option value="IM">Isle of Man</option>
		<option value="IL">Israel</option>
		<option value="IT">Italy</option>
		<option value="JM">Jamaica</option>
		<option value="JP">Japan</option>
		<option value="JE">Jersey</option>
		<option value="JO">Jordan</option>
		<option value="KZ">Kazakhstan</option>
		<option value="KE">Kenya</option>
		<option value="KI">Kiribati</option>
		<option value="KP">Korea, Democratic People's Republic of</option>
		<option value="KR">Korea, Republic of</option>
		<option value="XK">Kosovo</option>
		<option value="KW">Kuwait</option>
		<option value="KG">Kyrgyzstan</option>
		<option value="LA">Laos</option>
		<option value="LV">Latvia</option>
		<option value="LB">Lebanon</option>
		<option value="LS">Lesotho</option>
		<option value="LR">Liberia</option>
		<option value="LY">Libya</option>
		<option value="LI">Liechtenstein</option>
		<option value="LT">Lithuania</option>
		<option value="LU">Luxembourg</option>
		<option value="MO">Macau</option>
		<option value="MK">Macedonia, The Former Yugoslav Republic of</option>
		<option value="MG">Madagascar</option>
		<option value="MW">Malawi</option>
		<option value="MY">Malaysia</option>
		<option value="MV">Maldives</option>
		<option value="ML">Mali</option>
		<option value="MT">Malta</option>
		<option value="MH">Marshall Islands</option>
		<option value="MQ">Martinique</option>
		<option value="MR">Mauritania</option>
		<option value="MU">Mauritius</option>
		<option value="YT">Mayotte</option>
		<option value="MX">Mexico</option>
		<option value="FM">Micronesia</option>
		<option value="MD">Moldova, Republic of</option>
		<option value="MC">Monaco</option>
		<option value="MN">Mongolia</option>
		<option value="MS">Monserrat</option>
		<option value="ME">Montenegro</option>
		<option value="MA">Morocco</option>
		<option value="MZ">Mozambique</option>
		<option value="MM">Myanmar</option>
		<option value="NA">Namibia</option>
		<option value="NR">Nauru</option>
		<option value="NP">Nepal</option>
		<option value="NL">Netherlands</option>
		<option value="NC">New Caledonia</option>
		<option value="NZ">New Zealand</option>
		<option value="NI">Nicaragua</option>
		<option value="NE">Niger</option>
		<option value="NG">Nigeria</option>
		<option value="NU">Niue</option>
		<option value="NF">Norfolk Island</option>
		<option value="MP">Northern Mariana Islands</option>
		<option value="NO">Norway</option>
		<option value="OM">Oman</option>
		<option value="PK">Pakistan</option>
		<option value="PW">Palau</option>
		<option value="PS">Palestinian Territory, Occupied</option>
		<option value="PA">Panama</option>
		<option value="PG">Papua New Guinea</option>
		<option value="PY">Paraguay</option>
		<option value="PE">Peru</option>
		<option value="PH">Philippines</option>
		<option value="PN">Pitcairn</option>
		<option value="PL">Poland</option>
		<option value="PT">Portugal</option>
		<option value="PR">Puerto Rico</option>
		<option value="QA">Qatar</option>
		<option value="RE">Reunion</option>
		<option value="RO">Romania</option>
		<option value="RU">Russian Federation</option>
		<option value="RW">Rwanda</option>
		<option value="BL">Saint Barthelemy</option>
		<option value="LC">Saint Lucia</option>
		<option value="MF">Saint Martin (French part)</option>
		<option value="WS">Samoa</option>
		<option value="SM">San Marino</option>
		<option value="ST">Sao Tome & Principe</option>
		<option value="SA">Saudi Arabia</option>
		<option value="SN">Senegal</option>
		<option value="RS">Serbia</option>
		<option value="SC">Seychelles</option>
		<option value="SL">Sierra Leone</option>
		<option value="SG">Singapore</option>
		<option value="SX">Sint Maarten (Dutch part)</option>
		<option value="SK">Slovakia</option>
		<option value="SI">Slovenia</option>
		<option value="SB">Solomon Islands</option>
		<option value="SO">Somalia</option>
		<option value="ZA">South Africa</option>
		<option value="GS">South Georgia and the South Sandwich Islands</option>
		<option value="SS">South Sudan</option>
		<option value="ES">Spain</option>
		<option value="LK">Sri Lanka</option>
		<option value="SH">St. Helena</option>
		<option value="KN">St. Kitts and Nevis</option>
		<option value="PM">St. Pierre & Miquelon</option>
		<option value="VC">St. Vincent & the Grenadines</option>
		<option value="SD">Sudan</option>
		<option value="SR">Suriname</option>
		<option value="SJ">Svalbard & Jan Mayen Islands</option>
		<option value="SZ">Swaziland</option>
		<option value="SE">Sweden</option>
		<option value="CH">Switzerland</option>
		<option value="SY">Syrian Arab Republic</option>
		<option value="TW">Taiwan</option>
		<option value="TJ">Tajikistan</option>
		<option value="TZ">Tanzania, United Republic of</option>
		<option value="TH">Thailand</option>
		<option value="TL">Timor-Leste</option>
		<option value="TG">Togo</option>
		<option value="TK">Tokelau</option>
		<option value="TO">Tonga</option>
		<option value="TT">Trinidad & Tobago</option>
		<option value="TN">Tunisia</option>
		<option value="TR">Turkey</option>
		<option value="TM">Turkmenistan</option>
		<option value="TC">Turks & Caicos Islands</option>
		<option value="TV">Tuvalu</option>
		<option value="UG">Uganda</option>
		<option value="UA">Ukraine</option>
		<option value="AE">United Arab Emirates</option>
		<option value="GB">United Kingdom (Great Britain)</option>
		<option value="UM">United States Minor Outlying</option>
		<option value="VI">United States Virgin Islands</option>
		<option value="UY">Uruguay</option>
		<option value="UZ">Uzbekistan</option>
		<option value="VU">Vanuatu</option>
		<option value="VA">Vatican City State (Holy See)</option>
		<option value="VE">Venezuela</option>
		<option value="VN">Viet Nam</option>
		<option value="WF">Wallis & Futuna Islands</option>
		<option value="EH">Western Sahara</option>
		<option value="YE">Yemen</option>
		<option value="ZM">Zambia</option>
		<option value="ZW">Zimbabwe</option>
        </select>`)
        }
        var menu = document.getElementById("SelectCountry");
        menu.addEventListener("change", SelectCountry);

        function SelectCountry(event) {
            if (menu.value == 'Country') {
                window.location.href = `https://steamdb.info/badge/13/`;
            } else if (menu.value == 'US') {
                window.location.href = `https://steamdb.info/badge/13/?cc=${menu.value}`;
            } else if (menu.value == 'CA') {
                window.location.href = `https://steamdb.info/badge/13/?cc=${menu.value}`;
            } else if (menu.value == 'AF') {
                window.location.href = `https://steamdb.info/badge/13/?cc=${menu.value}`;
            } else if (menu.value == 'AX') {
                window.location.href = `https://steamdb.info/badge/13/?cc=${menu.value}`;
            } else if (menu.value == 'AL') {
                window.location.href = `https://steamdb.info/badge/13/?cc=${menu.value}`;
            } else if (menu.value == 'DZ') {
                window.location.href = `https://steamdb.info/badge/13/?cc=${menu.value}`;
            } else if (menu.value == 'AS') {
                window.location.href = `https://steamdb.info/badge/13/?cc=${menu.value}`;
            } else if (menu.value == 'AD') {
                window.location.href = `https://steamdb.info/badge/13/?cc=${menu.value}`;
            } else if (menu.value == 'AO') {
                window.location.href = `https://steamdb.info/badge/13/?cc=${menu.value}`;
            } else if (menu.value == 'AI') {
                window.location.href = `https://steamdb.info/badge/13/?cc=${menu.value}`;
            } else if (menu.value == 'AQ') {
                window.location.href = `https://steamdb.info/badge/13/?cc=${menu.value}`;
            } else if (menu.value == 'AG') {
                window.location.href = `https://steamdb.info/badge/13/?cc=${menu.value}`;
            } else if (menu.value == 'AR') {
                window.location.href = `https://steamdb.info/badge/13/?cc=${menu.value}`;
            } else if (menu.value == 'AM') {
                window.location.href = `https://steamdb.info/badge/13/?cc=${menu.value}`;
            } else if (menu.value == 'AW') {
                window.location.href = `https://steamdb.info/badge/13/?cc=${menu.value}`;
            } else if (menu.value == 'AU') {
                window.location.href = `https://steamdb.info/badge/13/?cc=${menu.value}`;
            } else if (menu.value == 'AT') {
                window.location.href = `https://steamdb.info/badge/13/?cc=${menu.value}`;
            } else if (menu.value == 'AZ') {
                window.location.href = `https://steamdb.info/badge/13/?cc=${menu.value}`;
            } else if (menu.value == 'BS') {
                window.location.href = `https://steamdb.info/badge/13/?cc=${menu.value}`;
            } else if (menu.value == 'BH') {
                window.location.href = `https://steamdb.info/badge/13/?cc=${menu.value}`;
            } else if (menu.value == 'BD') {
                window.location.href = `https://steamdb.info/badge/13/?cc=${menu.value}`;
            } else if (menu.value == 'BB') {
                window.location.href = `https://steamdb.info/badge/13/?cc=${menu.value}`;
            } else if (menu.value == 'BY') {
                window.location.href = `https://steamdb.info/badge/13/?cc=${menu.value}`;
            } else if (menu.value == 'BE') {
                window.location.href = `https://steamdb.info/badge/13/?cc=${menu.value}`;
            } else if (menu.value == 'BZ') {
                window.location.href = `https://steamdb.info/badge/13/?cc=${menu.value}`;
            } else if (menu.value == 'BJ') {
                window.location.href = `https://steamdb.info/badge/13/?cc=${menu.value}`;
            } else if (menu.value == 'BM') {
                window.location.href = `https://steamdb.info/badge/13/?cc=${menu.value}`;
            } else if (menu.value == 'BT') {
                window.location.href = `https://steamdb.info/badge/13/?cc=${menu.value}`;
            } else if (menu.value == 'BO') {
                window.location.href = `https://steamdb.info/badge/13/?cc=${menu.value}`;
            } else if (menu.value == 'BQ') {
                window.location.href = `https://steamdb.info/badge/13/?cc=${menu.value}`;
            } else if (menu.value == 'BA') {
                window.location.href = `https://steamdb.info/badge/13/?cc=${menu.value}`;
            } else if (menu.value == 'BW') {
                window.location.href = `https://steamdb.info/badge/13/?cc=${menu.value}`;
            } else if (menu.value == 'BV') {
                window.location.href = `https://steamdb.info/badge/13/?cc=${menu.value}`;
            } else if (menu.value == 'BR') {
                window.location.href = `https://steamdb.info/badge/13/?cc=${menu.value}`;
            } else if (menu.value == 'IO') {
                window.location.href = `https://steamdb.info/badge/13/?cc=${menu.value}`;
            } else if (menu.value == 'VG') {
                window.location.href = `https://steamdb.info/badge/13/?cc=${menu.value}`;
            } else if (menu.value == 'BN') {
                window.location.href = `https://steamdb.info/badge/13/?cc=${menu.value}`;
            } else if (menu.value == 'BG') {
                window.location.href = `https://steamdb.info/badge/13/?cc=${menu.value}`;
            } else if (menu.value == 'BF') {
                window.location.href = `https://steamdb.info/badge/13/?cc=${menu.value}`;
            } else if (menu.value == 'BI') {
                window.location.href = `https://steamdb.info/badge/13/?cc=${menu.value}`;
            } else if (menu.value == 'KH') {
                window.location.href = `https://steamdb.info/badge/13/?cc=${menu.value}`;
            } else if (menu.value == 'CM') {
                window.location.href = `https://steamdb.info/badge/13/?cc=${menu.value}`;
            } else if (menu.value == 'CV') {
                window.location.href = `https://steamdb.info/badge/13/?cc=${menu.value}`;
            } else if (menu.value == 'KY') {
                window.location.href = `https://steamdb.info/badge/13/?cc=${menu.value}`;
            } else if (menu.value == 'CF') {
                window.location.href = `https://steamdb.info/badge/13/?cc=${menu.value}`;
            } else if (menu.value == 'TD') {
                window.location.href = `https://steamdb.info/badge/13/?cc=${menu.value}`;
            } else if (menu.value == 'CL') {
                window.location.href = `https://steamdb.info/badge/13/?cc=${menu.value}`;
            } else if (menu.value == 'CN') {
                window.location.href = `https://steamdb.info/badge/13/?cc=${menu.value}`;
            } else if (menu.value == 'CX') {
                window.location.href = `https://steamdb.info/badge/13/?cc=${menu.value}`;
            } else if (menu.value == 'CC') {
                window.location.href = `https://steamdb.info/badge/13/?cc=${menu.value}`;
            } else if (menu.value == 'CO') {
                window.location.href = `https://steamdb.info/badge/13/?cc=${menu.value}`;
            } else if (menu.value == 'KM') {
                window.location.href = `https://steamdb.info/badge/13/?cc=${menu.value}`;
            } else if (menu.value == 'CG') {
                window.location.href = `https://steamdb.info/badge/13/?cc=${menu.value}`;
            } else if (menu.value == 'CD') {
                window.location.href = `https://steamdb.info/badge/13/?cc=${menu.value}`;
            } else if (menu.value == 'CK') {
                window.location.href = `https://steamdb.info/badge/13/?cc=${menu.value}`;
            } else if (menu.value == 'CR') {
                window.location.href = `https://steamdb.info/badge/13/?cc=${menu.value}`;
            } else if (menu.value == 'CI') {
                window.location.href = `https://steamdb.info/badge/13/?cc=${menu.value}`;
            } else if (menu.value == 'HR') {
                window.location.href = `https://steamdb.info/badge/13/?cc=${menu.value}`;
            } else if (menu.value == 'CU') {
                window.location.href = `https://steamdb.info/badge/13/?cc=${menu.value}`;
            } else if (menu.value == 'CW') {
                window.location.href = `https://steamdb.info/badge/13/?cc=${menu.value}`;
            } else if (menu.value == 'CY') {
                window.location.href = `https://steamdb.info/badge/13/?cc=${menu.value}`;
            } else if (menu.value == 'CZ') {
                window.location.href = `https://steamdb.info/badge/13/?cc=${menu.value}`;
            } else if (menu.value == 'DK') {
                window.location.href = `https://steamdb.info/badge/13/?cc=${menu.value}`;
            } else if (menu.value == 'DJ') {
                window.location.href = `https://steamdb.info/badge/13/?cc=${menu.value}`;
            } else if (menu.value == 'DM') {
                window.location.href = `https://steamdb.info/badge/13/?cc=${menu.value}`;
            } else if (menu.value == 'DO') {
                window.location.href = `https://steamdb.info/badge/13/?cc=${menu.value}`;
            } else if (menu.value == 'EC') {
                window.location.href = `https://steamdb.info/badge/13/?cc=${menu.value}`;
            } else if (menu.value == 'EG') {
                window.location.href = `https://steamdb.info/badge/13/?cc=${menu.value}`;
            } else if (menu.value == 'SV') {
                window.location.href = `https://steamdb.info/badge/13/?cc=${menu.value}`;
            } else if (menu.value == 'GQ') {
                window.location.href = `https://steamdb.info/badge/13/?cc=${menu.value}`;
            } else if (menu.value == 'ER') {
                window.location.href = `https://steamdb.info/badge/13/?cc=${menu.value}`;
            } else if (menu.value == 'EE') {
                window.location.href = `https://steamdb.info/badge/13/?cc=${menu.value}`;
            } else if (menu.value == 'ET') {
                window.location.href = `https://steamdb.info/badge/13/?cc=${menu.value}`;
            } else if (menu.value == 'FK') {
                window.location.href = `https://steamdb.info/badge/13/?cc=${menu.value}`;
            } else if (menu.value == 'FO') {
                window.location.href = `https://steamdb.info/badge/13/?cc=${menu.value}`;
            } else if (menu.value == 'FJ') {
                window.location.href = `https://steamdb.info/badge/13/?cc=${menu.value}`;
            } else if (menu.value == 'FI') {
                window.location.href = `https://steamdb.info/badge/13/?cc=${menu.value}`;
            } else if (menu.value == 'FR') {
                window.location.href = `https://steamdb.info/badge/13/?cc=${menu.value}`;
            } else if (menu.value == 'GF') {
                window.location.href = `https://steamdb.info/badge/13/?cc=${menu.value}`;
            } else if (menu.value == 'PF') {
                window.location.href = `https://steamdb.info/badge/13/?cc=${menu.value}`;
            } else if (menu.value == 'TF') {
                window.location.href = `https://steamdb.info/badge/13/?cc=${menu.value}`;
            } else if (menu.value == 'GA') {
                window.location.href = `https://steamdb.info/badge/13/?cc=${menu.value}`;
            } else if (menu.value == 'GM') {
                window.location.href = `https://steamdb.info/badge/13/?cc=${menu.value}`;
            } else if (menu.value == 'GE') {
                window.location.href = `https://steamdb.info/badge/13/?cc=${menu.value}`;
            } else if (menu.value == 'DE') {
                window.location.href = `https://steamdb.info/badge/13/?cc=${menu.value}`;
            } else if (menu.value == 'GH') {
                window.location.href = `https://steamdb.info/badge/13/?cc=${menu.value}`;
            } else if (menu.value == 'GI') {
                window.location.href = `https://steamdb.info/badge/13/?cc=${menu.value}`;
            } else if (menu.value == 'GR') {
                window.location.href = `https://steamdb.info/badge/13/?cc=${menu.value}`;
            } else if (menu.value == 'GL') {
                window.location.href = `https://steamdb.info/badge/13/?cc=${menu.value}`;
            } else if (menu.value == 'GD') {
                window.location.href = `https://steamdb.info/badge/13/?cc=${menu.value}`;
            } else if (menu.value == 'GP') {
                window.location.href = `https://steamdb.info/badge/13/?cc=${menu.value}`;
            } else if (menu.value == 'GU') {
                window.location.href = `https://steamdb.info/badge/13/?cc=${menu.value}`;
            } else if (menu.value == 'GT') {
                window.location.href = `https://steamdb.info/badge/13/?cc=${menu.value}`;
            } else if (menu.value == 'GG') {
                window.location.href = `https://steamdb.info/badge/13/?cc=${menu.value}`;
            } else if (menu.value == 'GN') {
                window.location.href = `https://steamdb.info/badge/13/?cc=${menu.value}`;
            } else if (menu.value == 'GW') {
                window.location.href = `https://steamdb.info/badge/13/?cc=${menu.value}`;
            } else if (menu.value == 'GY') {
                window.location.href = `https://steamdb.info/badge/13/?cc=${menu.value}`;
            } else if (menu.value == 'HT') {
                window.location.href = `https://steamdb.info/badge/13/?cc=${menu.value}`;
            } else if (menu.value == 'HM') {
                window.location.href = `https://steamdb.info/badge/13/?cc=${menu.value}`;
            } else if (menu.value == 'HN') {
                window.location.href = `https://steamdb.info/badge/13/?cc=${menu.value}`;
            } else if (menu.value == 'HK') {
                window.location.href = `https://steamdb.info/badge/13/?cc=${menu.value}`;
            } else if (menu.value == 'HU') {
                window.location.href = `https://steamdb.info/badge/13/?cc=${menu.value}`;
            } else if (menu.value == 'IS') {
                window.location.href = `https://steamdb.info/badge/13/?cc=${menu.value}`;
            } else if (menu.value == 'IN') {
                window.location.href = `https://steamdb.info/badge/13/?cc=${menu.value}`;
            } else if (menu.value == 'ID') {
                window.location.href = `https://steamdb.info/badge/13/?cc=${menu.value}`;
            } else if (menu.value == 'IQ') {
                window.location.href = `https://steamdb.info/badge/13/?cc=${menu.value}`;
            } else if (menu.value == 'IE') {
                window.location.href = `https://steamdb.info/badge/13/?cc=${menu.value}`;
            } else if (menu.value == 'IR') {
                window.location.href = `https://steamdb.info/badge/13/?cc=${menu.value}`;
            } else if (menu.value == 'IM') {
                window.location.href = `https://steamdb.info/badge/13/?cc=${menu.value}`;
            } else if (menu.value == 'IL') {
                window.location.href = `https://steamdb.info/badge/13/?cc=${menu.value}`;
            } else if (menu.value == 'IT') {
                window.location.href = `https://steamdb.info/badge/13/?cc=${menu.value}`;
            } else if (menu.value == 'JM') {
                window.location.href = `https://steamdb.info/badge/13/?cc=${menu.value}`;
            } else if (menu.value == 'JP') {
                window.location.href = `https://steamdb.info/badge/13/?cc=${menu.value}`;
            } else if (menu.value == 'JE') {
                window.location.href = `https://steamdb.info/badge/13/?cc=${menu.value}`;
            } else if (menu.value == 'JO') {
                window.location.href = `https://steamdb.info/badge/13/?cc=${menu.value}`;
            } else if (menu.value == 'KZ') {
                window.location.href = `https://steamdb.info/badge/13/?cc=${menu.value}`;
            } else if (menu.value == 'KE') {
                window.location.href = `https://steamdb.info/badge/13/?cc=${menu.value}`;
            } else if (menu.value == 'KI') {
                window.location.href = `https://steamdb.info/badge/13/?cc=${menu.value}`;
            } else if (menu.value == 'KP') {
                window.location.href = `https://steamdb.info/badge/13/?cc=${menu.value}`;
            } else if (menu.value == 'KR') {
                window.location.href = `https://steamdb.info/badge/13/?cc=${menu.value}`;
            } else if (menu.value == 'XK') {
                window.location.href = `https://steamdb.info/badge/13/?cc=${menu.value}`;
            } else if (menu.value == 'KW') {
                window.location.href = `https://steamdb.info/badge/13/?cc=${menu.value}`;
            } else if (menu.value == 'KG') {
                window.location.href = `https://steamdb.info/badge/13/?cc=${menu.value}`;
            } else if (menu.value == 'LA') {
                window.location.href = `https://steamdb.info/badge/13/?cc=${menu.value}`;
            } else if (menu.value == 'LV') {
                window.location.href = `https://steamdb.info/badge/13/?cc=${menu.value}`;
            } else if (menu.value == 'LB') {
                window.location.href = `https://steamdb.info/badge/13/?cc=${menu.value}`;
            } else if (menu.value == 'LS') {
                window.location.href = `https://steamdb.info/badge/13/?cc=${menu.value}`;
            } else if (menu.value == 'LR') {
                window.location.href = `https://steamdb.info/badge/13/?cc=${menu.value}`;
            } else if (menu.value == 'LY') {
                window.location.href = `https://steamdb.info/badge/13/?cc=${menu.value}`;
            } else if (menu.value == 'LI') {
                window.location.href = `https://steamdb.info/badge/13/?cc=${menu.value}`;
            } else if (menu.value == 'LT') {
                window.location.href = `https://steamdb.info/badge/13/?cc=${menu.value}`;
            } else if (menu.value == 'LU') {
                window.location.href = `https://steamdb.info/badge/13/?cc=${menu.value}`;
            } else if (menu.value == 'MO') {
                window.location.href = `https://steamdb.info/badge/13/?cc=${menu.value}`;
            } else if (menu.value == 'MK') {
                window.location.href = `https://steamdb.info/badge/13/?cc=${menu.value}`;
            } else if (menu.value == 'MG') {
                window.location.href = `https://steamdb.info/badge/13/?cc=${menu.value}`;
            } else if (menu.value == 'MW') {
                window.location.href = `https://steamdb.info/badge/13/?cc=${menu.value}`;
            } else if (menu.value == 'MY') {
                window.location.href = `https://steamdb.info/badge/13/?cc=${menu.value}`;
            } else if (menu.value == 'MV') {
                window.location.href = `https://steamdb.info/badge/13/?cc=${menu.value}`;
            } else if (menu.value == 'ML') {
                window.location.href = `https://steamdb.info/badge/13/?cc=${menu.value}`;
            } else if (menu.value == 'MT') {
                window.location.href = `https://steamdb.info/badge/13/?cc=${menu.value}`;
            } else if (menu.value == 'MH') {
                window.location.href = `https://steamdb.info/badge/13/?cc=${menu.value}`;
            } else if (menu.value == 'MQ') {
                window.location.href = `https://steamdb.info/badge/13/?cc=${menu.value}`;
            } else if (menu.value == 'MR') {
                window.location.href = `https://steamdb.info/badge/13/?cc=${menu.value}`;
            } else if (menu.value == 'MU') {
                window.location.href = `https://steamdb.info/badge/13/?cc=${menu.value}`;
            } else if (menu.value == 'YT') {
                window.location.href = `https://steamdb.info/badge/13/?cc=${menu.value}`;
            } else if (menu.value == 'MX') {
                window.location.href = `https://steamdb.info/badge/13/?cc=${menu.value}`;
            } else if (menu.value == 'FM') {
                window.location.href = `https://steamdb.info/badge/13/?cc=${menu.value}`;
            } else if (menu.value == 'MD') {
                window.location.href = `https://steamdb.info/badge/13/?cc=${menu.value}`;
            } else if (menu.value == 'MC') {
                window.location.href = `https://steamdb.info/badge/13/?cc=${menu.value}`;
            } else if (menu.value == 'MN') {
                window.location.href = `https://steamdb.info/badge/13/?cc=${menu.value}`;
            } else if (menu.value == 'MS') {
                window.location.href = `https://steamdb.info/badge/13/?cc=${menu.value}`;
            } else if (menu.value == 'ME') {
                window.location.href = `https://steamdb.info/badge/13/?cc=${menu.value}`;
            } else if (menu.value == 'MA') {
                window.location.href = `https://steamdb.info/badge/13/?cc=${menu.value}`;
            } else if (menu.value == 'MZ') {
                window.location.href = `https://steamdb.info/badge/13/?cc=${menu.value}`;
            } else if (menu.value == 'MM') {
                window.location.href = `https://steamdb.info/badge/13/?cc=${menu.value}`;
            } else if (menu.value == 'NA') {
                window.location.href = `https://steamdb.info/badge/13/?cc=${menu.value}`;
            } else if (menu.value == 'NR') {
                window.location.href = `https://steamdb.info/badge/13/?cc=${menu.value}`;
            } else if (menu.value == 'NP') {
                window.location.href = `https://steamdb.info/badge/13/?cc=${menu.value}`;
            } else if (menu.value == 'NL') {
                window.location.href = `https://steamdb.info/badge/13/?cc=${menu.value}`;
            } else if (menu.value == 'NC') {
                window.location.href = `https://steamdb.info/badge/13/?cc=${menu.value}`;
            } else if (menu.value == 'NZ') {
                window.location.href = `https://steamdb.info/badge/13/?cc=${menu.value}`;
            } else if (menu.value == 'NI') {
                window.location.href = `https://steamdb.info/badge/13/?cc=${menu.value}`;
            } else if (menu.value == 'NE') {
                window.location.href = `https://steamdb.info/badge/13/?cc=${menu.value}`;
            } else if (menu.value == 'NG') {
                window.location.href = `https://steamdb.info/badge/13/?cc=${menu.value}`;
            } else if (menu.value == 'NU') {
                window.location.href = `https://steamdb.info/badge/13/?cc=${menu.value}`;
            } else if (menu.value == 'NF') {
                window.location.href = `https://steamdb.info/badge/13/?cc=${menu.value}`;
            } else if (menu.value == 'MP') {
                window.location.href = `https://steamdb.info/badge/13/?cc=${menu.value}`;
            } else if (menu.value == 'NO') {
                window.location.href = `https://steamdb.info/badge/13/?cc=${menu.value}`;
            } else if (menu.value == 'OM') {
                window.location.href = `https://steamdb.info/badge/13/?cc=${menu.value}`;
            } else if (menu.value == 'PK') {
                window.location.href = `https://steamdb.info/badge/13/?cc=${menu.value}`;
            } else if (menu.value == 'PW') {
                window.location.href = `https://steamdb.info/badge/13/?cc=${menu.value}`;
            } else if (menu.value == 'PS') {
                window.location.href = `https://steamdb.info/badge/13/?cc=${menu.value}`;
            } else if (menu.value == 'PA') {
                window.location.href = `https://steamdb.info/badge/13/?cc=${menu.value}`;
            } else if (menu.value == 'PG') {
                window.location.href = `https://steamdb.info/badge/13/?cc=${menu.value}`;
            } else if (menu.value == 'PY') {
                window.location.href = `https://steamdb.info/badge/13/?cc=${menu.value}`;
            } else if (menu.value == 'PE') {
                window.location.href = `https://steamdb.info/badge/13/?cc=${menu.value}`;
            } else if (menu.value == 'PH') {
                window.location.href = `https://steamdb.info/badge/13/?cc=${menu.value}`;
            } else if (menu.value == 'PN') {
                window.location.href = `https://steamdb.info/badge/13/?cc=${menu.value}`;
            } else if (menu.value == 'PL') {
                window.location.href = `https://steamdb.info/badge/13/?cc=${menu.value}`;
            } else if (menu.value == 'PT') {
                window.location.href = `https://steamdb.info/badge/13/?cc=${menu.value}`;
            } else if (menu.value == 'PR') {
                window.location.href = `https://steamdb.info/badge/13/?cc=${menu.value}`;
            } else if (menu.value == 'QA') {
                window.location.href = `https://steamdb.info/badge/13/?cc=${menu.value}`;
            } else if (menu.value == 'RE') {
                window.location.href = `https://steamdb.info/badge/13/?cc=${menu.value}`;
            } else if (menu.value == 'RO') {
                window.location.href = `https://steamdb.info/badge/13/?cc=${menu.value}`;
            } else if (menu.value == 'RU') {
                window.location.href = `https://steamdb.info/badge/13/?cc=${menu.value}`;
            } else if (menu.value == 'RW') {
                window.location.href = `https://steamdb.info/badge/13/?cc=${menu.value}`;
            } else if (menu.value == 'BL') {
                window.location.href = `https://steamdb.info/badge/13/?cc=${menu.value}`;
            } else if (menu.value == 'LC') {
                window.location.href = `https://steamdb.info/badge/13/?cc=${menu.value}`;
            } else if (menu.value == 'MF') {
                window.location.href = `https://steamdb.info/badge/13/?cc=${menu.value}`;
            } else if (menu.value == 'WS') {
                window.location.href = `https://steamdb.info/badge/13/?cc=${menu.value}`;
            } else if (menu.value == 'SM') {
                window.location.href = `https://steamdb.info/badge/13/?cc=${menu.value}`;
            } else if (menu.value == 'ST') {
                window.location.href = `https://steamdb.info/badge/13/?cc=${menu.value}`;
            } else if (menu.value == 'SA') {
                window.location.href = `https://steamdb.info/badge/13/?cc=${menu.value}`;
            } else if (menu.value == 'SN') {
                window.location.href = `https://steamdb.info/badge/13/?cc=${menu.value}`;
            } else if (menu.value == 'RS') {
                window.location.href = `https://steamdb.info/badge/13/?cc=${menu.value}`;
            } else if (menu.value == 'SC') {
                window.location.href = `https://steamdb.info/badge/13/?cc=${menu.value}`;
            } else if (menu.value == 'SL') {
                window.location.href = `https://steamdb.info/badge/13/?cc=${menu.value}`;
            } else if (menu.value == 'SG') {
                window.location.href = `https://steamdb.info/badge/13/?cc=${menu.value}`;
            } else if (menu.value == 'SX') {
                window.location.href = `https://steamdb.info/badge/13/?cc=${menu.value}`;
            } else if (menu.value == 'SK') {
                window.location.href = `https://steamdb.info/badge/13/?cc=${menu.value}`;
            } else if (menu.value == 'SI') {
                window.location.href = `https://steamdb.info/badge/13/?cc=${menu.value}`;
            } else if (menu.value == 'SB') {
                window.location.href = `https://steamdb.info/badge/13/?cc=${menu.value}`;
            } else if (menu.value == 'SO') {
                window.location.href = `https://steamdb.info/badge/13/?cc=${menu.value}`;
            } else if (menu.value == 'ZA') {
                window.location.href = `https://steamdb.info/badge/13/?cc=${menu.value}`;
            } else if (menu.value == 'GS') {
                window.location.href = `https://steamdb.info/badge/13/?cc=${menu.value}`;
            } else if (menu.value == 'SS') {
                window.location.href = `https://steamdb.info/badge/13/?cc=${menu.value}`;
            } else if (menu.value == 'ES') {
                window.location.href = `https://steamdb.info/badge/13/?cc=${menu.value}`;
            } else if (menu.value == 'LK') {
                window.location.href = `https://steamdb.info/badge/13/?cc=${menu.value}`;
            } else if (menu.value == 'SH') {
                window.location.href = `https://steamdb.info/badge/13/?cc=${menu.value}`;
            } else if (menu.value == 'KN') {
                window.location.href = `https://steamdb.info/badge/13/?cc=${menu.value}`;
            } else if (menu.value == 'PM') {
                window.location.href = `https://steamdb.info/badge/13/?cc=${menu.value}`;
            } else if (menu.value == 'VC') {
                window.location.href = `https://steamdb.info/badge/13/?cc=${menu.value}`;
            } else if (menu.value == 'SD') {
                window.location.href = `https://steamdb.info/badge/13/?cc=${menu.value}`;
            } else if (menu.value == 'SR') {
                window.location.href = `https://steamdb.info/badge/13/?cc=${menu.value}`;
            } else if (menu.value == 'SJ') {
                window.location.href = `https://steamdb.info/badge/13/?cc=${menu.value}`;
            } else if (menu.value == 'SZ') {
                window.location.href = `https://steamdb.info/badge/13/?cc=${menu.value}`;
            } else if (menu.value == 'SE') {
                window.location.href = `https://steamdb.info/badge/13/?cc=${menu.value}`;
            } else if (menu.value == 'CH') {
                window.location.href = `https://steamdb.info/badge/13/?cc=${menu.value}`;
            } else if (menu.value == 'SY') {
                window.location.href = `https://steamdb.info/badge/13/?cc=${menu.value}`;
            } else if (menu.value == 'TW') {
                window.location.href = `https://steamdb.info/badge/13/?cc=${menu.value}`;
            } else if (menu.value == 'TJ') {
                window.location.href = `https://steamdb.info/badge/13/?cc=${menu.value}`;
            } else if (menu.value == 'TZ') {
                window.location.href = `https://steamdb.info/badge/13/?cc=${menu.value}`;
            } else if (menu.value == 'TH') {
                window.location.href = `https://steamdb.info/badge/13/?cc=${menu.value}`;
            } else if (menu.value == 'TL') {
                window.location.href = `https://steamdb.info/badge/13/?cc=${menu.value}`;
            } else if (menu.value == 'TG') {
                window.location.href = `https://steamdb.info/badge/13/?cc=${menu.value}`;
            } else if (menu.value == 'TK') {
                window.location.href = `https://steamdb.info/badge/13/?cc=${menu.value}`;
            } else if (menu.value == 'TO') {
                window.location.href = `https://steamdb.info/badge/13/?cc=${menu.value}`;
            } else if (menu.value == 'TT') {
                window.location.href = `https://steamdb.info/badge/13/?cc=${menu.value}`;
            } else if (menu.value == 'TN') {
                window.location.href = `https://steamdb.info/badge/13/?cc=${menu.value}`;
            } else if (menu.value == 'TR') {
                window.location.href = `https://steamdb.info/badge/13/?cc=${menu.value}`;
            } else if (menu.value == 'TM') {
                window.location.href = `https://steamdb.info/badge/13/?cc=${menu.value}`;
            } else if (menu.value == 'TC') {
                window.location.href = `https://steamdb.info/badge/13/?cc=${menu.value}`;
            } else if (menu.value == 'TV') {
                window.location.href = `https://steamdb.info/badge/13/?cc=${menu.value}`;
            } else if (menu.value == 'UG') {
                window.location.href = `https://steamdb.info/badge/13/?cc=${menu.value}`;
            } else if (menu.value == 'UA') {
                window.location.href = `https://steamdb.info/badge/13/?cc=${menu.value}`;
            } else if (menu.value == 'AE') {
                window.location.href = `https://steamdb.info/badge/13/?cc=${menu.value}`;
            } else if (menu.value == 'GB') {
                window.location.href = `https://steamdb.info/badge/13/?cc=${menu.value}`;
            } else if (menu.value == 'UM') {
                window.location.href = `https://steamdb.info/badge/13/?cc=${menu.value}`;
            } else if (menu.value == 'VI') {
                window.location.href = `https://steamdb.info/badge/13/?cc=${menu.value}`;
            } else if (menu.value == 'UY') {
                window.location.href = `https://steamdb.info/badge/13/?cc=${menu.value}`;
            } else if (menu.value == 'UZ') {
                window.location.href = `https://steamdb.info/badge/13/?cc=${menu.value}`;
            } else if (menu.value == 'VU') {
                window.location.href = `https://steamdb.info/badge/13/?cc=${menu.value}`;
            } else if (menu.value == 'VA') {
                window.location.href = `https://steamdb.info/badge/13/?cc=${menu.value}`;
            } else if (menu.value == 'VE') {
                window.location.href = `https://steamdb.info/badge/13/?cc=${menu.value}`;
            } else if (menu.value == 'VN') {
                window.location.href = `https://steamdb.info/badge/13/?cc=${menu.value}`;
            } else if (menu.value == 'WF') {
                window.location.href = `https://steamdb.info/badge/13/?cc=${menu.value}`;
            } else if (menu.value == 'EH') {
                window.location.href = `https://steamdb.info/badge/13/?cc=${menu.value}`;
            } else if (menu.value == 'YE') {
                window.location.href = `https://steamdb.info/badge/13/?cc=${menu.value}`;
            } else if (menu.value == 'ZM') {
                window.location.href = `https://steamdb.info/badge/13/?cc=${menu.value}`;
            } else if (menu.value == 'ZW') {
                window.location.href = `https://steamdb.info/badge/13/?cc=${menu.value}`;
            }
        }
    }
})();
