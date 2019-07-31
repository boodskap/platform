"use strict";
// Class definition

var BlockUIDemo = function () {
    
    // Private functions

    // Basic demo
    var demo1 = function () {
        // default
        $('#blockui_1_1').click(function() {
           App.block('#blockui_1_content', {});

            setTimeout(function() {
               App.unblock('#blockui_1_content');
            }, 2000);
        });

        $('#blockui_1_2').click(function() {
           App.block('#blockui_1_content', {
                overlayColor: '#000000',
                state: 'primary'
            });  

            setTimeout(function() {
               App.unblock('#blockui_1_content');
            }, 2000);
        });

        $('#blockui_1_3').click(function() {
           App.block('#blockui_1_content', {
                overlayColor: '#000000',
                type: 'v2',
                state: 'success',
                size: 'lg'
            });

            setTimeout(function() {
               App.unblock('#blockui_1_content');
            }, 2000);
        });

        $('#blockui_1_4').click(function() {
           App.block('#blockui_1_content', {
                overlayColor: '#000000',
                type: 'v2',
                state: 'success',
                message: 'Please wait...'
            });

            setTimeout(function() {
               App.unblock('#blockui_1_content');
            }, 2000);
        });

        $('#blockui_1_5').click(function() {
           App.block('#blockui_1_content', {
                overlayColor: '#000000',
                type: 'v2',
                state: 'primary',
                message: 'Processing...'
            });

            setTimeout(function() {
               App.unblock('#blockui_1_content');
            }, 2000);
        });
    }

    // portlet blocking
    var demo2 = function () {
        // default
        $('#blockui_2_1').click(function() {
           App.block('#blockui_2_portlet', {});

            setTimeout(function() {
               App.unblock('#blockui_2_portlet');
            }, 2000);
        });

        $('#blockui_2_2').click(function() {
           App.block('#blockui_2_portlet', {
                overlayColor: '#000000',
                state: 'primary'
            });

            setTimeout(function() {
               App.unblock('#blockui_2_portlet');
            }, 2000);
        });

        $('#blockui_2_3').click(function() {
           App.block('#blockui_2_portlet', {
                overlayColor: '#000000',
                type: 'v2',
                state: 'success',
                size: 'lg'
            });

            setTimeout(function() {
               App.unblock('#blockui_2_portlet');
            }, 2000);
        });

        $('#blockui_2_4').click(function() {
           App.block('#blockui_2_portlet', {
                overlayColor: '#000000',
                type: 'v2',
                state: 'success',
                message: 'Please wait...'
            });

            setTimeout(function() {
               App.unblock('#blockui_2_portlet');
            }, 2000);
        });

        $('#blockui_2_5').click(function() {
           App.block('#blockui_2_portlet', {
                overlayColor: '#000000',
                type: 'v2',
                state: 'primary',
                message: 'Processing...'
            });

            setTimeout(function() {
               App.unblock('#blockui_2_portlet');
            }, 2000);
        });
    }

    // page blocking
    var demo3 = function () {
        // default
        $('#blockui_3_1').click(function() {
           App.blockPage();

            setTimeout(function() {
               App.unblockPage();
            }, 2000);
        });

        $('#blockui_3_2').click(function() {
           App.blockPage({
                overlayColor: '#000000',
                state: 'primary'
            });

            setTimeout(function() {
               App.unblockPage();
            }, 2000);
        });

        $('#blockui_3_3').click(function() {
           App.blockPage({
                overlayColor: '#000000',
                type: 'v2',
                state: 'success',
                size: 'lg'
            });

            setTimeout(function() {
               App.unblockPage();
            }, 2000);
        });

        $('#blockui_3_4').click(function() {
           App.blockPage({
                overlayColor: '#000000',
                type: 'v2',
                state: 'success',
                message: 'Please wait...'
            });

            setTimeout(function() {
               App.unblockPage();
            }, 2000);
        });

        $('#blockui_3_5').click(function() {
           App.blockPage({
                overlayColor: '#000000',
                type: 'v2',
                state: 'primary',
                message: 'Processing...'
            });

            setTimeout(function() {
               App.unblockPage();
            }, 2000);
        });
    }

    // modal blocking
    var demo4 = function () {
        // default
        $('#blockui_4_1').click(function() {
           App.block('#blockui_4_1_modal .modal-content', {});

            setTimeout(function() {
               App.unblock('#blockui_4_1_modal .modal-content');
            }, 2000);
        });

        $('#blockui_4_2').click(function() {
           App.block('#blockui_4_2_modal .modal-content', {
                overlayColor: '#000000',
                state: 'primary'
            });

            setTimeout(function() {
               App.unblock('#blockui_4_2_modal .modal-content');
            }, 2000);
        });

        $('#blockui_4_3').click(function() {
           App.block('#blockui_4_3_modal .modal-content', {
                overlayColor: '#000000',
                type: 'v2',
                state: 'success',
                size: 'lg'
            });

            setTimeout(function() {
               App.unblock('#blockui_4_3_modal .modal-content');
            }, 2000);
        });

        $('#blockui_4_4').click(function() {
           App.block('#blockui_4_4_modal .modal-content', {
                overlayColor: '#000000',
                type: 'v2',
                state: 'success',
                message: 'Please wait...'
            });

            setTimeout(function() {
               App.unblock('#blockui_4_4_modal .modal-content');
            }, 2000);
        });

        $('#blockui_4_5').click(function() {
           App.block('#blockui_4_5_modal .modal-content', {
                overlayColor: '#000000',
                type: 'v2',
                state: 'primary',
                message: 'Processing...'
            });

            setTimeout(function() {
               App.unblock('#blockui_4_5_modal .modal-content');
            }, 2000);
        });
    }

    return {
        // public functions
        init: function() {
            demo1();
            demo2(); 
            demo3(); 
            demo4(); 
        }
    };
}();

jQuery(document).ready(function() {    
   BlockUIDemo.init();
});
