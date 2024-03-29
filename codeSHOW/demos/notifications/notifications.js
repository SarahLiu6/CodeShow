﻿(function () {
    "use strict";

    var element;
    
    WinJS.UI.Pages.define("/demos/notifications/notifications.html", {
        ready: function (e, options) {
            element = e;
            initTileTextSection();
            initSecondaryTilesSection();
        }
    });
    
    function initTileTextSection() {
        var updater = Windows.UI.Notifications.TileUpdateManager.createTileUpdaterForApplication();

        q("button.sendText", element).onclick = function (e) {
            // build and send the tile notification
            var tileContent = NotificationsExtensions.TileContent.TileContentFactory.createTileWideText03();
            tileContent.textHeadingWrap.text = q("#tileText", element).value;
            var squareTileContent = NotificationsExtensions.TileContent.TileContentFactory.createTileSquareText04();
            squareTileContent.textBodyWrap.text = q("#tileText", element).value;
            tileContent.squareContent = squareTileContent;
            updater.enableNotificationQueue(q("#enableQueueing", element).winControl.checked);
            updater.update(tileContent.createNotification());
        };
        
        q("button.clear", element).onclick = function (e) {
            updater.clear();
        };
    }
    
    function initSecondaryTilesSection() {
        //TODO: implement creation of secondary tile
    }
})();
