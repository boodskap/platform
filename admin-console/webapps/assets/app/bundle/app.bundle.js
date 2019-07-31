"use strict";

var BDemoPanel = function() {
    var demoPanel = BUtil.getByID('BUtildemo_panel');
    var offcanvas;

    var init = function() {
        offcanvas = new BOffcanvas(demoPanel, {
            overlay: true,
            baseClass: 'BUtildemo-panel',
            closeBy: 'BUtildemo_panel_close',
            toggleBy: 'BUtildemo_panel_toggle'
        });

        var head = BUtil.find(demoPanel, '.BUtildemo-panel__head');
        var body = BUtil.find(demoPanel, '.BUtildemo-panel__body');

        BUtil.scrollInit(body, {
            disableForMobile: true,
            resetHeightOnDestroy: true,
            handleWindowResize: true,
            height: function() {
                var height = parseInt(BUtil.getViewPort().height);

                if (head) {
                    height = height - parseInt(BUtil.actualHeight(head));
                    height = height - parseInt(BUtil.css(head, 'marginBottom'));
                }

                height = height - parseInt(BUtil.css(demoPanel, 'paddingTop'));
                height = height - parseInt(BUtil.css(demoPanel, 'paddingBottom'));

                return height;
            }
        });

        if (typeof offcanvas !== 'undefined' && offcanvas.length === 0) {
            offcanvas.on('hide', function() {
                var expires = new Date(new Date().getTime() + 60 * 60 * 1000); // expire in 60 minutes from now
                Cookies.set('BUtildemo_panel_shown', 1, {expires: expires});
            });
        }
    }

    var remind = function() {
        if (!(encodeURI(window.location.hostname) == 'keenthemes.com' || encodeURI(window.location.hostname) == 'www.keenthemes.com')) {
            return;
        }

        setTimeout(function() {
            if (!Cookies.get('BUtildemo_panel_shown')) {
                var expires = new Date(new Date().getTime() + 15 * 60 * 1000); // expire in 15 minutes from now
                Cookies.set('BUtildemo_panel_shown', 1, { expires: expires });
                offcanvas.show();
            }
        }, 4000);
    }

    return {
        init: function() {
            init();
            remind();
        }
    };
}();

$(document).ready(function() {
    BDemoPanel.init();
});
"use strict";

var BOffcanvasPanel = function() {
    var notificationPanel = BUtil.get('BUtiloffcanvas_toolbar_notifications');
    var quickActionsPanel = BUtil.get('BUtiloffcanvas_toolbar_quick_actions');
    var profilePanel = BUtil.get('BUtiloffcanvas_toolbar_profile');
    var searchPanel = BUtil.get('BUtiloffcanvas_toolbar_search');

    var initNotifications = function() {
        var head = BUtil.find(notificationPanel, '.BUtiloffcanvas-panel__head');
        var body = BUtil.find(notificationPanel, '.BUtiloffcanvas-panel__body');

        var offcanvas = new BOffcanvas(notificationPanel, {
            overlay: true,
            baseClass: 'BUtiloffcanvas-panel',
            closeBy: 'BUtiloffcanvas_toolbar_notifications_close',
            toggleBy: 'BUtiloffcanvas_toolbar_notifications_toggler_btn'
        });

        BUtil.scrollInit(body, {
            disableForMobile: true,
            resetHeightOnDestroy: true,
            handleWindowResize: true,
            height: function() {
                var height = parseInt(BUtil.getViewPort().height);

                if (head) {
                    height = height - parseInt(BUtil.actualHeight(head));
                    height = height - parseInt(BUtil.css(head, 'marginBottom'));
                }

                height = height - parseInt(BUtil.css(notificationPanel, 'paddingTop'));
                height = height - parseInt(BUtil.css(notificationPanel, 'paddingBottom'));

                return height;
            }
        });
    }

    var initQucikActions = function() {
        var head = BUtil.find(quickActionsPanel, '.BUtiloffcanvas-panel__head');
        var body = BUtil.find(quickActionsPanel, '.BUtiloffcanvas-panel__body');

        var offcanvas = new BOffcanvas(quickActionsPanel, {
            overlay: true,
            baseClass: 'BUtiloffcanvas-panel',
            closeBy: 'BUtiloffcanvas_toolbar_quick_actions_close',
            toggleBy: 'BUtiloffcanvas_toolbar_quick_actions_toggler_btn'
        });

        BUtil.scrollInit(body, {
            disableForMobile: true,
            resetHeightOnDestroy: true,
            handleWindowResize: true,
            height: function() {
                var height = parseInt(BUtil.getViewPort().height);

                if (head) {
                    height = height - parseInt(BUtil.actualHeight(head));
                    height = height - parseInt(BUtil.css(head, 'marginBottom'));
                }

                height = height - parseInt(BUtil.css(quickActionsPanel, 'paddingTop'));
                height = height - parseInt(BUtil.css(quickActionsPanel, 'paddingBottom'));

                return height;
            }
        });
    }

    var initProfile = function() {
        var head = BUtil.find(profilePanel, '.BUtiloffcanvas-panel__head');
        var body = BUtil.find(profilePanel, '.BUtiloffcanvas-panel__body');

        var offcanvas = new BOffcanvas(profilePanel, {
            overlay: true,
            baseClass: 'BUtiloffcanvas-panel',
            closeBy: 'BUtiloffcanvas_toolbar_profile_close',
            toggleBy: 'BUtiloffcanvas_toolbar_profile_toggler_btn'
        });

        BUtil.scrollInit(body, {
            disableForMobile: true,
            resetHeightOnDestroy: true,
            handleWindowResize: true,
            height: function() {
                var height = parseInt(BUtil.getViewPort().height);

                if (head) {
                    height = height - parseInt(BUtil.actualHeight(head));
                    height = height - parseInt(BUtil.css(head, 'marginBottom'));
                }

                height = height - parseInt(BUtil.css(profilePanel, 'paddingTop'));
                height = height - parseInt(BUtil.css(profilePanel, 'paddingBottom'));

                return height;
            }
        });
    }

    var initSearch = function() {
        var head = BUtil.find(searchPanel, '.BUtiloffcanvas-panel__head');
        var body = BUtil.find(searchPanel, '.BUtiloffcanvas-panel__body');

        var offcanvas = new BOffcanvas(searchPanel, {
            overlay: true,
            baseClass: 'BUtiloffcanvas-panel',
            closeBy: 'BUtiloffcanvas_toolbar_search_close',
            toggleBy: 'BUtiloffcanvas_toolbar_search_toggler_btn'
        });

        BUtil.scrollInit(body, {
            disableForMobile: true,
            resetHeightOnDestroy: true,
            handleWindowResize: true,
            height: function() {
                var height = parseInt(BUtil.getViewPort().height);

                if (head) {
                    height = height - parseInt(BUtil.actualHeight(head));
                    height = height - parseInt(BUtil.css(head, 'marginBottom'));
                }

                height = height - parseInt(BUtil.css(searchPanel, 'paddingTop'));
                height = height - parseInt(BUtil.css(searchPanel, 'paddingBottom'));

                return height;
            }
        });
    }

    return {
        init: function() {
            initNotifications();
            initQucikActions();
            initProfile();
            initSearch();
        }
    };
}();

$(document).ready(function() {
    BOffcanvasPanel.init();
});
"use strict";

var BQuickPanel = function() {
    var panel = BUtil.get('quick_panel');
    var notificationPanel = BUtil.get('quick_panel_tab_notifications');
    var logsPanel = BUtil.get('quick_panel_tab_logs');
    var settingsPanel = BUtil.get('quick_panel_tab_settings');

    var getContentHeight = function() {
        var height;
        var nav = BUtil.find(panel, '.quick-panel__nav');
        var content = BUtil.find(panel, '.quick-panel__content');

        height = parseInt(BUtil.getViewPort().height) - parseInt(BUtil.actualHeight(nav)) - (2 * parseInt(BUtil.css(nav, 'padding-top'))) - 10;

        return height;
    }

    var initOffcanvas = function() {
        var offcanvas = new BOffcanvas(panel, {
            overlay: true,
            baseClass: 'quick-panel',
            closeBy: 'quick_panel_close_btn',
            toggleBy: 'quick_panel_toggler_btn'
        });
    }

    var initNotifications = function() {
        BUtil.scrollInit(notificationPanel, {
            disableForMobile: true,
            resetHeightOnDestroy: true,
            handleWindowResize: true,
            height: function() {
                return getContentHeight();
            }
        });
    }

    var initLogs = function() {
        BUtil.scrollInit(logsPanel, {
            disableForMobile: true,
            resetHeightOnDestroy: true,
            handleWindowResize: true,
            height: function() {
                return getContentHeight();
            }
        });
    }

    var initSettings = function() {
        BUtil.scrollInit(settingsPanel, {
            disableForMobile: true,
            resetHeightOnDestroy: true,
            handleWindowResize: true,
            height: function() {
                return getContentHeight();
            }
        });
    }

    var updatePerfectScrollbars = function() {
        $(panel).find('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
            BUtil.scrollUpdate(notificationPanel);
            BUtil.scrollUpdate(logsPanel);
            BUtil.scrollUpdate(settingsPanel);
        });
    }

    return {
        init: function() {
            initOffcanvas();
            initNotifications();
            initLogs();
            initSettings();
            updatePerfectScrollbars();
        }
    };
}();

$(document).ready(function() {
    BQuickPanel.init();
});
"use strict";

var BQuickSearch = function() {
    var target;
    var form;
    var input;
    var closeIcon;
    var resultWrapper;
    var resultDropdown;
    var resultDropdownToggle;
    var inputGroup;
    var query = '';

    var hasResult = false;
    var timeout = false;
    var isProcessing = false;
    var requestTimeout = 200; // ajax request fire timeout in milliseconds 
    var spinnerClass = 'BUtilspinner BUtilspinner--input BUtilspinner--sm BUtilspinner--brand BUtilspinner--right';
    var resultClass = 'quick-search--has-result';
    var minLength = 2;

    var showProgress = function() {
        isProcessing = true;
        BUtil.addClass(inputGroup, spinnerClass);

        if (closeIcon) {
            BUtil.hide(closeIcon);
        }
    }

    var hideProgress = function() {
        isProcessing = false;
        BUtil.removeClass(inputGroup, spinnerClass);

        if (closeIcon) {
            if (input.value.length < minLength) {
                BUtil.hide(closeIcon);
            } else {
                BUtil.show(closeIcon, 'flex');
            }
        }
    }

    var showDropdown = function() {
        if (resultDropdownToggle && !BUtil.hasClass(resultDropdown, 'show')) {
            $(resultDropdownToggle).dropdown('toggle');
            $(resultDropdownToggle).dropdown('update');
        }
    }

    var hideDropdown = function() {
        if (resultDropdownToggle && BUtil.hasClass(resultDropdown, 'show')) {
            $(resultDropdownToggle).dropdown('toggle');
        }
    }

    var processSearch = function() {
        if (hasResult && query === input.value) {
            hideProgress();
            BUtil.addClass(target, resultClass);
            showDropdown();
            BUtil.scrollUpdate(resultWrapper);

            return;
        }

        query = input.value;

        BUtil.removeClass(target, resultClass);
        showProgress();

        setTimeout(function() {
            $.ajax({
                url: 'https://keenthemes.com/metronic/themes/themes/metronic/dist/preview/inc/api/quick_search.php',
                data: {
                    query: query
                },
                dataType: 'html',
                success: function(res) {
                    hasResult = true;
                    hideProgress();
                    BUtil.addClass(target, resultClass);
                    BUtil.setHTML(resultWrapper, res);
                    showDropdown();
                    BUtil.scrollUpdate(resultWrapper);
                },
                error: function(res) {
                    hasResult = false;
                    hideProgress();
                    BUtil.addClass(target, resultClass);
                    BUtil.setHTML(resultWrapper, '<span class="quick-search__message">Connection error. Pleae try again later.</div>');
                    showDropdown();
                    BUtil.scrollUpdate(resultWrapper);
                }
            });
        }, 1000);
    }

    var handleCancel = function(e) {
        input.value = '';
        query = '';
        hasResult = false;
        BUtil.hide(closeIcon);
        BUtil.removeClass(target, resultClass);
        hideDropdown();
    }

    var handleSearch = function() {
        if (input.value.length < minLength) {
            hideProgress();
            hideDropdown();

            return;
        }

        if (isProcessing == true) {
            return;
        }

        if (timeout) {
            clearTimeout(timeout);
        }

        timeout = setTimeout(function() {
            processSearch();
        }, requestTimeout);
    }

    return {
        init: function(element) {
            // Init
            target = element;
            form = BUtil.find(target, '.quick-search__form');
            input = BUtil.find(target, '.quick-search__input');
            closeIcon = BUtil.find(target, '.quick-search__close');
            resultWrapper = BUtil.find(target, '.quick-search__wrapper');
            resultDropdown = BUtil.find(target, '.dropdown-menu');
            resultDropdownToggle = BUtil.find(target, '[data-toggle="dropdown"]');
            inputGroup = BUtil.find(target, '.input-group');

            // Attach input keyup handler
            BUtil.addEvent(input, 'keyup', handleSearch);
            BUtil.addEvent(input, 'focus', handleSearch);

            // Prevent enter click
            form.onkeypress = function(e) {
                var key = e.charCode || e.keyCode || 0;
                if (key == 13) {
                    e.preventDefault();
                }
            }

            BUtil.addEvent(closeIcon, 'click', handleCancel);

            // Auto-focus on the form input on dropdown form open
            var toggle = BUtil.getByID('quick_search_toggle');
            if (toggle) {
                $(toggle).on('shown.bs.dropdown', function () {
                    input.focus();
                });
            }
        }
    };
};

var BQuickSearchMobile = BQuickSearch;

$(document).ready(function() {
    if (BUtil.get('quick_search_default')) {
        BQuickSearch().init(BUtil.get('quick_search_default'));
    }

    if (BUtil.get('quick_search_inline')) {
        BQuickSearchMobile().init(BUtil.get('quick_search_inline'));
    }
});