$(document).ready(function () {
    USER_OBJ = JSON.parse(USER_OBJ);
    API_TOKEN = USER_OBJ.token;
    DOMAIN_KEY = USER_OBJ.domainKey;
    API_KEY = USER_OBJ.apiKey;
});

function logout() {

    loginOutCall(function (status) {
        if(status){
            Cookies.set('session_obj','');
            document.location="/login";
        }
    })
}