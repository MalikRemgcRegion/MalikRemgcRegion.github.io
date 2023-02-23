// ==UserScript==
// @name         rrgc ladder userscript
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Steam-Tracker / SteamDB Account regions Ladder.
// @author       You
// @match        https://steam-tracker.com/ranking/apps
// @match        https://steamdb.info/badge/13/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=steam-tracker.com
// @require     https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js
// @grant        GM_xmlhttpRequest
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...

    jQuery( "tr" ).each(function() {
        $(this).children('td').eq(2).css("width","200px");
    });

    GM_xmlhttpRequest({
        method: "GET",
        url: "https://raw.githubusercontent.com/MalikRemgcRegion/RemGC_DB/main/db/db.json",
        synchronous: true,
        onload: function(res) {
            let db = res.responseText;
            let json = JSON.parse(db);
            if (window.location.href.indexOf("steam-tracker") > -1) {
                jQuery( "tr" ).each(function() {
                    var id = $(this).attr('id');
                    var g_getSteamID = getSteamID("s" + id);
                    if(g_getSteamID.length > 0){
                        var countries = "";
                        for (let i = 0; i < g_getSteamID[0]['region'].length; i++) {
                            if(g_getSteamID[0]['region'][i] === "ZZ") {
                            }else{
                                countries += '<img src="https://steam-tracker.com/images/cc16px/'+g_getSteamID[0]['region'][i].toLowerCase()+'.png">';
                            }
                        }
                        $(this).children('td').eq(2).html(countries);
                    }
                });
            }

            if (window.location.href.indexOf("steamdb") > -1) {
                jQuery(document).ready(function() {
                    jQuery( "tr" ).each(function() {
                        var id = jQuery(this).prop('id');
                        var g_getSteamID = getSteamID(id,json);
                        if(g_getSteamID.length > 0){
                            var countries = "";
                            for (let i = 0; i < g_getSteamID[0]['region'].length; i++) {
                                if(g_getSteamID[0]['region'][i] === "ZZ") {
                                }else{
                                    countries += '<img src="https://steamdb.info/static/country/'+g_getSteamID[0]['region'][i].toLowerCase()+'.svg">';
                                }
                            }
                            $(this).children('td').eq(2).html(countries);
                        }
                    });
                });
            }
        }
    });

    function getSteamID(ids,json){
        let result = [];
        if(ids == "") {
            result = json;
        }else{
            //let steamids = ids.split(",");
            result = json.filter(c=> c.id != "" && ids.includes(c.id));
        }
        return result;
    }
})();