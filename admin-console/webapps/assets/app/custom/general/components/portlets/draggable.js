"use strict";

var PortletDraggable = function () {

    return {
        //main function to initiate the module
        init: function () {
            $("#sortable_portlets").sortable({
                connectWith: ".portlet__head",
                items: ".portlet",
                opacity: 0.8,
                handle : '.portlet__head',
                coneHelperSize: true,
                placeholder: 'portlet--sortable-placeholder',
                forcePlaceholderSize: true,
                tolerance: "pointer",
                helper: "clone",
                tolerance: "pointer",
                forcePlaceholderSize: !0,
                helper: "clone",
                cancel: ".portlet--sortable-empty", // cancel dragging if portlet is in fullscreen mode
                revert: 250, // animation in milliseconds
                update: function(b, c) {
                    if (c.item.prev().hasClass("portlet--sortable-empty")) {
                        c.item.prev().before(c.item);
                    }                    
                }
            });
        }
    };
}();

jQuery(document).ready(function() {
   PortletDraggable.init();
});