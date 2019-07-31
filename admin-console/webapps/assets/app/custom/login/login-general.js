"use strict";

// Class Definition
var LoginGeneral = function() {

    var login = $('#login');

    var showErrorMsg = function(form, type, msg) {
        var alert = $('<div class="alert alert--outline alert alert-' + type + ' alert-dismissible" role="alert">\
			<button type="button" class="close" data-dismiss="alert" aria-label="Close"></button>\
			<span></span>\
		</div>');

        form.find('.alert').remove();
        alert.prependTo(form);
        //alert.animateClass('fadeIn animated');
       Util.animateClass(alert[0], 'fadeIn animated');
        alert.find('span').html(msg);
    }

    // Private Functions
    var displaySignUpForm = function() {
        login.removeClass('login--forgot');
        login.removeClass('login--signin');

        login.addClass('login--signup');
       Util.animateClass(login.find('.login__signup')[0], 'flipInX animated');
    }

    var displaySignInForm = function() {
        login.removeClass('login--forgot');
        login.removeClass('login--signup');

        login.addClass('login--signin');
       Util.animateClass(login.find('.login__signin')[0], 'flipInX animated');
        //login.find('.login__signin').animateClass('flipInX animated');
    }

    var displayForgotForm = function() {
        login.removeClass('login--signin');
        login.removeClass('login--signup');

        login.addClass('login--forgot');
        //login.find('.login--forgot').animateClass('flipInX animated');
       Util.animateClass(login.find('.login__forgot')[0], 'flipInX animated');

    }

    var handleFormSwitch = function() {
        $('#login_forgot').click(function(e) {
            e.preventDefault();
            displayForgotForm();
        });

        $('#login_forgot_cancel').click(function(e) {
            e.preventDefault();
            displaySignInForm();
        });

        $('#login_signup').click(function(e) {
            e.preventDefault();
            displaySignUpForm();
        });

        $('#login_signup_cancel').click(function(e) {
            e.preventDefault();
            displaySignInForm();
        });
    }

    var handleSignInFormSubmit = function() {
        $('#login_signin_submit').click(function(e) {
            e.preventDefault();
            var btn = $(this);
            var form = $(this).closest('form');

            form.validate({
                rules: {
                    email: {
                        required: true,
                        email: true
                    },
                    password: {
                        required: true
                    }
                }
            });

            if (!form.valid()) {
                return;
            }

            btn.addClass('spinner spinner--right spinner--sm spinner--light').attr('disabled', true);

            form.ajaxSubmit({
                url: '',
                success: function(response, status, xhr, $form) {
                	// similate 2s delay
                	setTimeout(function() {
	                    btn.removeClass('spinner spinner--right spinner--sm spinner--light').attr('disabled', false);
	                    showErrorMsg(form, 'danger', 'Incorrect username or password. Please try again.');
                    }, 2000);
                }
            });
        });
    }

    var handleSignUpFormSubmit = function() {
        $('#login_signup_submit').click(function(e) {
            e.preventDefault();

            var btn = $(this);
            var form = $(this).closest('form');

            form.validate({
                rules: {
                    fullname: {
                        required: true
                    },
                    email: {
                        required: true,
                        email: true
                    },
                    password: {
                        required: true
                    },
                    rpassword: {
                        required: true
                    },
                    agree: {
                        required: true
                    }
                }
            });

            if (!form.valid()) {
                return;
            }

            btn.addClass('spinner spinner--right spinner--sm spinner--light').attr('disabled', true);

            form.ajaxSubmit({
                url: '',
                success: function(response, status, xhr, $form) {
                	// similate 2s delay
                	setTimeout(function() {
	                    btn.removeClass('spinner spinner--right spinner--sm spinner--light').attr('disabled', false);
	                    form.clearForm();
	                    form.validate().resetForm();

	                    // display signup form
	                    displaySignInForm();
	                    var signInForm = login.find('.login__signin form');
	                    signInForm.clearForm();
	                    signInForm.validate().resetForm();

	                    showErrorMsg(signInForm, 'success', 'Thank you. To complete your registration please check your email.');
	                }, 2000);
                }
            });
        });
    }

    var handleForgotFormSubmit = function() {
        $('#login_forgot_submit').click(function(e) {
            e.preventDefault();

            var btn = $(this);
            var form = $(this).closest('form');

            form.validate({
                rules: {
                    email: {
                        required: true,
                        email: true
                    }
                }
            });

            if (!form.valid()) {
                return;
            }

            btn.addClass('spinner spinner--right spinner--sm spinner--light').attr('disabled', true);

            form.ajaxSubmit({
                url: '',
                success: function(response, status, xhr, $form) { 
                	// similate 2s delay
                	setTimeout(function() {
                		btn.removeClass('spinner spinner--right spinner--sm spinner--light').attr('disabled', false); // remove
	                    form.clearForm(); // clear form
	                    form.validate().resetForm(); // reset validation states

	                    // display signup form
	                    displaySignInForm();
	                    var signInForm = login.find('.login__signin form');
	                    signInForm.clearForm();
	                    signInForm.validate().resetForm();

	                    showErrorMsg(signInForm, 'success', 'Cool! Password recovery instruction has been sent to your email.');
                	}, 2000);
                }
            });
        });
    }

    // Public Functions
    return {
        // public functions
        init: function() {
            handleFormSwitch();
            // handleSignInFormSubmit();
            // handleSignUpFormSubmit();
            // handleForgotFormSubmit();
        }
    };
}();

// Class Initialization
jQuery(document).ready(function() {
   LoginGeneral.init();
});