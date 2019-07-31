"use strict";

// Class definition

var BootstrapNotifyDemo = function () {
    
    // Private functions

    // basic demo
    var demo = function () {
        // init bootstrap switch
        $('[data-switch=true]').bootstrapSwitch();

        // handle the demo
        $('#notify_btn').click(function() {
            var content = {};

            content.message = 'New order has been placed';
            if ($('#notify_title').prop('checked')) {
                content.title = 'Notification Title';
            }
            if ($('#notify_icon').val() != '') {
                content.icon = 'icon ' + $('#notify_icon').val();
            }
            if ($('#notify_url').prop('checked')) {
                content.url = 'www.keenthemes.com';
                content.target = '_blank';
            }

            var notify = $.notify(content, {
                type: $('#notify_state').val(),
                allow_dismiss: $('#notify_dismiss').prop('checked'),
                newest_on_top: $('#notify_top').prop('checked'),
                mouse_over:  $('#notify_pause').prop('checked'),
                showProgressbar:  $('#notify_progress').prop('checked'),
                spacing: $('#notify_spacing').val(),                    
                timer: $('#notify_timer').val(),
                placement: {
                    from: $('#notify_placement_from').val(), 
                    align: $('#notify_placement_align').val()
                },
                offset: {
                    x: $('#notify_offset_x').val(), 
                    y: $('#notify_offset_y').val()
                },
                delay: $('#notify_delay').val(),
                z_index: $('#notify_zindex').val(),
                animate: {
                    enter: 'animated ' + $('#notify_animate_enter').val(),
                    exit: 'animated ' + $('#notify_animate_exit').val()
                }
            });

            if ($('#notify_progress').prop('checked')) {
                setTimeout(function() {
                    notify.update('message', '<strong>Saving</strong> Page Data.');
                    notify.update('type', 'primary');
                    notify.update('progress', 20);
                }, 1000);

                setTimeout(function() {
                    notify.update('message', '<strong>Saving</strong> User Data.');
                    notify.update('type', 'warning');
                    notify.update('progress', 40);
                }, 2000);

                setTimeout(function() {
                    notify.update('message', '<strong>Saving</strong> Profile Data.');
                    notify.update('type', 'danger');
                    notify.update('progress', 65);
                }, 3000);

                setTimeout(function() {
                    notify.update('message', '<strong>Checking</strong> for errors.');
                    notify.update('type', 'success');
                    notify.update('progress', 100);
                }, 4000);
            }
        });
    }

    return {
        // public functions
        init: function() {
            demo();
        }
    };
}();

jQuery(document).ready(function() {    
   BootstrapNotifyDemo.init();
});