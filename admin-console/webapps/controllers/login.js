$(document).ready(function () {

});

function login() {
    var username = $("#username").val();
    var password = $("#password").val();

    loginCall(username, password, function (status, data) {
        if(status){

            Cookies.set('session_obj',data);
            document.location="/home";

        }else{
            $(".errorText").html(`<div class="alert alert-danger mb-2" role="alert">
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
              <span aria-hidden="true">×</span>
            </button>
            <strong>Error!</strong> Invalid Credentials.
          </div>`)
        }
    })
}