$(document).ready(function () {
    loadApiDocs()
    $(".docmenu").addClass('active')
});

function loadApiDocs() {
    getAPIFiles(function (status,data) {
        $(".apiDocs").html("")
        if(status && data.status){
            for(var i=0;i<data.data.length;i++){
                var val = data.data[i].split(".")[0];
                var valText = val.replace("api-","")

                $(".apiDocs").append('<li><a href="javascript:void(0)" onclick="loadURL(\''+val+'\')" style="text-transform: capitalize">'+valText+' API</a></li>');
            }
            loadURL(data.data[0].split(".")[0])
        }
    })
}

function loadURL(val,url) {

    var valText = val.replace("api-","");

    var url = val.replace("api","doc")

    $(".apiTitle").html(valText +' API')


   $("#loadApiContent").attr("src","/"+url)


        jQuery('html,body').animate({scrollTop:0},0);
}