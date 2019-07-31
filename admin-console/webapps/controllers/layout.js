$(document).ready(function () {
    USER_OBJ = JSON.parse(USER_OBJ);
    API_TOKEN = USER_OBJ.token;
    DOMAIN_KEY = USER_OBJ.domainKey;
    API_KEY = USER_OBJ.apiKey;

    $(".currentYear").html(moment().format('YYYY'));
    getSystemStatus()

    $(".user_name").html(USER_OBJ.user.firstName +' '+USER_OBJ.user.lastName);
    $(".user_email").html(USER_OBJ.user.email);

    $(".domainKey").html(DOMAIN_KEY)
    $(".apiKey").html(API_KEY)
    $(".token").html(API_TOKEN)

});

function getSystemStatus() {
    getPlatformSystem(function (status, data) {
        if(status){
            $(".licenseType").html(data.licenseType)
        }
    })
}

function logout() {

    loginOutCall(function (status) {
        if(status){
            Cookies.set('session_obj','');
            document.location="/login";
        }else{
            errorMsg('Error in logout')
        }
    })
}