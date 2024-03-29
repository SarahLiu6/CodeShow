﻿(function () {
    "use strict";

    var tileColors;
    var r = appdata.roamingSettings.values;
    
    WinJS.UI.Pages.define("/demos/settings/settings.html", {
        ready: function (element, options) {
            init(element);
            loadPrefs();
        }
    });

    function init(element) {
        
        q("#showPrefs").onclick = function (e) {
            WinJS.UI.SettingsFlyout.showSettings("preferencesDiv", "/demos/settings/settings.html");
        };

        //tile color
        var colors = ["#375369", "#6294ad", "#2fa66d", "#d35ba7", "#ef6541", "#ffb96d"];
        r["tileColor"] || (r["tileColor"] = colors[0]); //default
        tileColors = q("#tileColors > div");
        tileColors.forEach(function (d, i) {
            d.style.backgroundColor = colors[i];
            d.onclick = function (e) {
                tileColors.forEach(function (d) { d.classList.remove("selected"); });
                e.target.classList.add("selected");
                r["tileColor"] = e.target.style.backgroundColor;
                codeSHOW.Pages.Home.applySettings();
            };
        });
        
        //group by tag
        r["groupByTag"] || (r["groupByTag"] = false); //default
        q("#tglTagGroup").onchange = function (e) {
            r["groupByTag"] = q("#tglTagGroup").winControl.checked;
        };
        
        //sort by
        r["sortBy"] || (r["sortBy"] = "name"); //default
        q("#sortBy").onchange = function(e) {
            r["sortBy"] = q("#sortBy").value;
        };
    }
    
    function loadPrefs() {
        //load tile color
        if (!r["tileColor"]) r["tileColor"] = "rgb(0, 144, 134)";
        tileColors.forEach(function (d) {
            if (d.style.backgroundColor == r["tileColor"]) d.classList.add("selected");
        });
        
        //load group setting
        q("#tglTagGroup").winControl.checked = r["groupByTag"];
        //TODO: trigger this change to take effect
        
        //sort by
        q("#sortBy").value = r["sortBy"];
        //TODO: trigger this change to take effect
    }
})();
