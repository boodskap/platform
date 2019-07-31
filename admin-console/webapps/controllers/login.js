$(document).ready(function () {
    App.block('.initialContent', {
        overlayColor: '#fff',
        type: 'v2',
        state: 'success',
        size: 'lg'
    });
    checkLicense();
});

function checkLicense() {
    getPlatformSystem(function (status, data) {

        setTimeout(function () {
            App.unblock('.initialContent');
        },500)


        if(status){

            // data.licenseStatus= 'TERMINATED';
            // data.licenseStatus= 'ACTIVE';
            // data.licenseStatus= 'UNACTIVATED';

            if(data.licenseStatus === 'UNACTIVATED') {

                $(".initialContent").html($("#licensePage").html())

                $(".domainKey").html(data.domainKey+' <small class="cpyBtn" data-clipboard-text="'+data.domainKey+'"><i class="la la-copy"></i></small>')
                $(".clusterId").html(data.clusterId+' <small class="cpyBtn" data-clipboard-text="'+data.clusterId+'"><i class="la la-copy"></i></small>')

                var clipboard = new ClipboardJS('.cpyBtn');

                clipboard.on('success', function(e) {
                   successMsg('Copied Successfully');
                    e.clearSelection();
                });

                clipboard.on('error', function(e) {
                    errorMsg('Error in Copy');
                });

            }
            else if(data.licenseStatus === 'ACTIVE'){
                $(".initialContent").html($("#loginPage").html())
            }
            else{
                $(".initialContent").html($("#licenseExpiredPage").html())

                    var statusToggle = {
                        'DISABLED' : 'badge--dark',
                        'SUSPENDED' : 'badge--warning',
                        'TERMINATED' : 'badge--danger',
                    }

                $(".licenseStatus").html('<span class="badge badge--xl '+statusToggle[data.licenseStatus]+' badge--inline">'+data.licenseStatus+'</span>')
            }



        }else{

            $(".initialContent").html(' <h5 class="licenseText">Error in Fetching License Information. <br> Please contact Boodskap Support Team</h5>')


        }
    })
}

function activate() {
    var accKey = $("#accKey").val();
    var licenseKey = $("#licenseKey").val();

    var form = $("#licenseForm");

    form.validate({
        rules: {
            accKey: {
                required: true,
            },
            licenseKey: {
                required: true
            }
        }
    });

    if (!form.valid()) {
        return;
    }

    $(".actBtn").attr('disabled','disabled');

    $(".actBtn").html('<i class="fa fa-spinner fa-spin"></i> Please wait...');


    activateLicense(accKey, licenseKey, function (status, data) {

        $(".actBtn").removeAttr('disabled');
        $(".actBtn").html('Activate');
        if(status){
            successMsg('Your Instance Activated Successfully');
            $(".initialContent").html($("#loginPage").html())

        }else{

            var errorMessage = 'Error in activation';

            if(data['responseJSON']['message'] === 'CLUSTER_NOT_ACTIVATED'){
                errorMessage = 'Your instance not activated, Please activate your license!'
            }
            errorMsg(errorMessage,'danger');


        }
    })
}


function loadForgetPassword() {
    var login = $('#login');
    $('#forgetForm')[0].reset();
    login.removeClass('login--signin');
    login.removeClass('login--signup');

    login.addClass('login--forgot');
    //login.find('.login--forgot').animateClass('flipInX animated');
    Util.animateClass(login.find('.login__forgot')[0], 'flipInX animated');


}

function loadSignIn() {
    var login = $('#login');
    $('#loginForm')[0].reset();
    login.removeClass('login--forgot');
    login.removeClass('login--signup');

    login.addClass('login--signin');
    Util.animateClass(login.find('.login__signin')[0], 'flipInX animated');


}

function loadSignUp() {
    var login = $('#login');
    $('#signUpForm')[0].reset();
    login.removeClass('login--forgot');
    login.removeClass('login--signin');

    login.addClass('login--signup');
    Util.animateClass(login.find('.login__signup')[0], 'flipInX animated');
}



function login() {
    var username = $("#username").val();
    var password = $("#password").val();

    var form = $("#loginForm");

    form.validate({
        rules: {
            username: {
                required: true,
            },
            password: {
                required: true
            }
        }
    });

    if (!form.valid()) {
        return;
    }

    $(".loginBtn").attr('disabled','disabled')
    $(".loginBtn").html('<i class="fa fa-spinner fa-spin"></i> Please wait...');

    loginCall(username, password, function (status, data) {

        if(status){

            Cookies.set('session_obj',data);
            document.location="/home";

        }else{
            $(".loginBtn").removeAttr('disabled');
            $(".loginBtn").html('Sign In')
            errorMsg('Invalid Credentials! Please check Username/Password','dark')
        }
    })
}




function resetPassword() {
    var emailId = $("#fEmail").val();

    var form = $("#forgetForm");

    form.validate({
        rules: {
            fEmail: {
                required: true,
                email: true
            }
        }
    });

    if (!form.valid()) {
        return;
    }

    $(".resetBtn").attr('disabled','disabled')
    $(".resetBtn").html('<i class="fa fa-spinner fa-spin"></i> Please wait...');

    resetPasswordCall(emailId.toLowerCase(),function (status, data) {

        $(".resetBtn").removeAttr('disabled');
        $(".resetBtn").html('Request')

        loadSignIn();

        successMsg('Password reset successfully. Please check your Registered Email!');
    });


}



function registerUser() {
    var firstName = $("#firstName").val();
    var lastName = $("#lastName").val();
    var emailId = $("#emailId").val();
    var rpassword = $("#rpassword").val();
    var rcpassword = $("#rcpassword").val();

    var form = $("#signUpForm");

    form.validate({
        rules: {
            firstName: {
                required: true
            },
            lastName: {
                required: true
            },
            emailId: {
                required: true,
                email: true
            },
            rpassword: {
                required: true
            },
            rcpassword: {
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

    if(rpassword !== rcpassword){
        errorMsg('Password mismatch!');
        return false;
    }


    var data = {
        email: emailId.toLowerCase(),
        password: rpassword,
        firstName: firstName,
        lastName: lastName
    };

    $(".signUpBtn").attr('disabled','disabled')
    $(".signUpBtn").html('<i class="fa fa-spinner fa-spin"></i> Please wait...');

    registerCall(data,function (status, data) {

        $(".signUpBtn").removeAttr('disabled');
        $(".signUpBtn").html('Sign Up')
        if(status){
            successMsg('New Domain Created Successfully!');
            loadSignIn();
        }else{
            if(data.message === 'USER_EXISTS'){
                errorMsg('Email Id already exists!')
            }else{
                errorMsg('Something went wrong!')
            }

        }
    })


}