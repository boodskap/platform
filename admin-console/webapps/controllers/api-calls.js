$(document).ajaxError(function myErrorHandler(event, xhr, ajaxOptions, thrownError) {

    if (DEBUG) {
        $(".platformBody .container").append('<br><code style="">DEBUG MODE: <b>' + ajaxOptions.url + '</b><br>' + JSON.stringify(xhr.responseJSON) + '</code>');
    }

    if (xhr.status === 417 && xhr.responseJSON.code === 'INVALID_AUTH_TOKEN') {
        Cookies.remove('user_details');
        document.location = '/login';
    }

});
$(document).ready(function () {

    $.ajaxSetup({
        global: false,
        crossDomain: true,
        "headers": {
            "accept": "application/json",
            "Access-Control-Allow-Origin": "*"
        }
    })
});


function getAPIFiles(cbk) {
    $.ajax({
        url: "/getfileapi",
        type: 'GET',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, null);
        }
    });

}


function getPlatformSystem(cbk) {
    $.ajax({
        url: API_BASE_PATH + "/build",
        type: 'GET',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, null);
        }
    });

}



//login, register, forget password

function loginCall(email, password, cbk) {
    var data = {
        userId : email,
        password: password
    }
    $.ajax({
        url: API_BASE_PATH + "/system/login",
        data: JSON.stringify(data),
        contentType: "application/json",
        type: 'POST',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, null);
        }
    });

}


function activateLicense(accKey, licKey, cbk) {

    $.ajax({
        url: API_BASE_PATH + "/system/activate/"+accKey+"/"+licKey,
        type: 'GET',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, e);
        }
    });

}

function switchDomainCall(domainKey, token, cbk) {
    $.ajax({
        url: API_BASE_PATH + "/domain/login/switch/" + token + "/" + domainKey,
        type: 'GET',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, null);
        }
    });

}

function loginOutCall(cbk) {
    $.ajax({
        url: API_BASE_PATH + "/system/logout?atoken=" + API_TOKEN,
        type: 'GET',
        success: function (data) {
            cbk(true);
        },
        error: function (e) {
            cbk(false);
        }
    });

}

function loginAsCall(email, password, key, id, cbk) {
    $.ajax({
        url: API_BASE_PATH + "/domain/loginas/" + email + "/" + password + "/" + key + '?userEmail=' + id,
        type: 'GET',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, null);
        }
    });

}

function resetPasswordCall(email, cbk) {

    var str = DOMAIN_KEY ? '?targetDomainKey=' + DOMAIN_KEY : '';

    $.ajax({
        url: API_BASE_PATH + "/domain/password/reset/" + email + str,
        type: 'GET',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, null);
        }
    });

}

function registerCall(data, cbk) {

    var str = DOMAIN_KEY ? '?targetDomainKey=' + DOMAIN_KEY : '';
    $.ajax({
        url: API_BASE_PATH + "/domain/register" + str,
        type: 'POST',
        contentType: "application/json",
        data: JSON.stringify(data),
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, e);
        }
    });

}

//Property Calls

function getUserProperty(name, cbk) {
    $.ajax({
        url: API_BASE_PATH + "/user/property/get/" + API_TOKEN + "/" + USER_OBJ.user.email + "/" + name,
        type: 'GET',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, null);
        }
    });

}


function getDomainProperty(name, cbk) {


    $.ajax({
        url: API_BASE_PATH + "/domain/property/get/" + API_TOKEN + "/" + name,
        type: 'GET',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, null);
        }
    });

}

function getSystemProperty(name, cbk) {


    $.ajax({
        url: API_BASE_PATH + "/system/property/get/" + API_TOKEN + "/" + name,
        type: 'GET',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, null);
        }
    });

}

function deleteDomainProperty(name, cbk) {


    $.ajax({
        url: API_BASE_PATH + "/domain/property/delete/" + API_TOKEN + "/" + name,
        type: 'DELETE',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, null);
        }
    });

}

function upsertDomainProperty(data, cbk) {

    $.ajax({
        url: API_BASE_PATH + "/domain/property/upsert/" + API_TOKEN,
        data: JSON.stringify(data),
        contentType: "application/json",
        type: 'POST',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, null);
        }
    });

}

function upsertSystemProperty(data, cbk) {

    $.ajax({
        url: API_BASE_PATH + "/system/property/upsert/" + API_TOKEN,
        data: JSON.stringify(data),
        contentType: "application/json",
        type: 'POST',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, null);
        }
    });

}

function linkDomain(data, cbk) {

    $.ajax({
        url: API_BASE_PATH + "/domain/link/" + API_TOKEN,
        data: data,
        type: 'GET',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, null);
        }
    });

}

function unlinkDomain(data, cbk) {

    $.ajax({
        url: API_BASE_PATH + "/domain/unlink/" + API_TOKEN,
        data: data,
        type: 'GET',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, null);
        }
    });

}


//Message Definition, Record Definition & Rules Engine
function listMessageRules(pageSize, direction, mid, cbk) {

    var data = {};
    if (mid && direction) {
        data = {
            mid: mid,
            direction: direction
        };
    }

    $.ajax({
        url: API_BASE_PATH + "/rules/list/" + API_TOKEN + "/" + pageSize,
        data: data,
        type: 'GET',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, null);
        }
    });

}

function listScheduleRules(pageSize, direction, mid, cbk) {

    var data = {};
    if (mid && direction) {
        data = {
            mid: mid,
            direction: direction
        };
    }

    $.ajax({
        url: API_BASE_PATH + "/srules/list/" + API_TOKEN + "/" + pageSize,
        data: data,
        type: 'GET',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, null);
        }
    });

}

function listNamedRules(pageSize, direction, mid, cbk) {

    var data = {};
    if (mid && direction) {
        data = {
            mid: mid,
            direction: direction
        };
    }

    $.ajax({
        url: API_BASE_PATH + "/nrules/list/" + API_TOKEN + "/" + pageSize,
        data: data,
        type: 'GET',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, null);
        }
    });

}


function listBinaryRules(pageSize, direction, type, cbk) {

    var data = {};
    if (type && direction) {
        data = {
            type: type,
            direction: direction
        };
    }

    $.ajax({
        url: API_BASE_PATH + "/brules/list/" + API_TOKEN + "/" + pageSize,
        data: data,
        type: 'GET',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, null);
        }
    });

}


function listMessageSpec(pageSize, direction, mid, cbk) {

    var data = {};
    if (mid && direction) {
        data = {
            mid: mid,
            direction: direction
        };
    }

    $.ajax({
        url: API_BASE_PATH + "/mspec/list/" + API_TOKEN + "/" + pageSize,
        data: data,
        type: 'GET',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, null);
        }
    });

}

function listRecordSpec(pageSize, direction, mid, cbk) {

    var data = {};
    if (mid && direction) {
        data = {
            mid: mid,
            direction: direction
        };
    }

    $.ajax({
        url: API_BASE_PATH + "/storage/spec/list/" + API_TOKEN + "/" + pageSize,
        data: data,
        type: 'GET',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, null);
        }
    });

}


function getDomainrule(cbk) {

    var data = {};


    $.ajax({
        url: API_BASE_PATH + "/drules/get/" + API_TOKEN,
        data: data,
        type: 'GET',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, null);
        }
    });

}

function updateDomainRuleCode(data, cbk) {

    var data = data;
    //{"lang":"GROOVY","code":""}

    $.ajax({
        url: API_BASE_PATH + "/drules/upsert/" + API_TOKEN,
        data: JSON.stringify(data),
        contentType: "application/json",
        type: 'POST',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, null);
        }
    });

}

function updateMessageRuleCode(data, cbk) {

    var data = data;
    //{"lang":"GROOVY","code":"","name":"Flow Meter Message","messageId":700}

    $.ajax({
        url: API_BASE_PATH + "/rules/upsert/" + API_TOKEN,
        data: JSON.stringify(data),
        contentType: "application/json",
        type: 'POST',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, null);
        }
    });

}

function updateScheduleRuleCode(data, cbk) {

    //{"lang":"GROOVY","code":"","pattern":"0 30 6 ? * * *","id":700}

    $.ajax({
        url: API_BASE_PATH + "/srules/upsert/" + API_TOKEN,
        data: JSON.stringify(data),
        contentType: "application/json",
        type: 'POST',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, null);
        }
    });

}


function updateBinaryRuleCode(data, cbk) {

    //{"lang":"GROOVY","code":"","pattern":"0 30 6 ? * * *","id":700}

    $.ajax({
        url: API_BASE_PATH + "/brules/upsert/" + API_TOKEN,
        data: JSON.stringify(data),
        contentType: "application/json",
        type: 'POST',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, null);
        }
    });

}

function updateNamedRuleCode(data, cbk) {

    //{"lang":"GROOVY","code":"","name":"Flow Meter Message"}


    $.ajax({
        url: API_BASE_PATH + "/nrules/upsert/" + API_TOKEN,
        data: JSON.stringify(data),
        contentType: "application/json",
        type: 'POST',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, null);
        }
    });

}

function deleteNamedRule(data, cbk) {


    $.ajax({
        url: API_BASE_PATH + "/nrules/delete/" + API_TOKEN + "/" + data,
        // data:  JSON.stringify(data),
        contentType: "application/json",
        type: 'DELETE',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, null);
        }
    });

}


function deleteBinaryRule(data, cbk) {

    //{"lang":"GROOVY","code":"","name":"Flow Meter Message"}

    $.ajax({
        url: API_BASE_PATH + "/brules/delete/" + API_TOKEN + "/" + data,
        // data:  JSON.stringify(data),
        contentType: "application/json",
        type: 'DELETE',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, null);
        }
    });

}

function deleteScheduleRule(data, cbk) {

    var data = data;
    //{"lang":"GROOVY","code":"","name":"Flow Meter Message"}

    $.ajax({
        url: API_BASE_PATH + "/srules/delete/" + API_TOKEN + "/" + data,
        // data:  JSON.stringify(data),
        contentType: "application/json",
        type: 'DELETE',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, null);
        }
    });

}

function retreiveRecordDef(data, cbk) {


    $.ajax({
        url: API_BASE_PATH + "/storage/spec/get/" + API_TOKEN + '/' + data,
        // data:  JSON.stringify(data),
        contentType: "application/json",
        type: 'GET',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, null);
        }
    });

}

function retreiveMessageDef(data, cbk) {


    $.ajax({
        url: API_BASE_PATH + "/mspec/get/" + API_TOKEN + '/' + data,
        // data:  JSON.stringify(data),
        contentType: "application/json",
        type: 'GET',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, null);
        }
    });

}

function retreiveNamedRule(data, cbk) {


    $.ajax({
        url: API_BASE_PATH + "/nrules/get/" + API_TOKEN + '/' + data,
        // data:  JSON.stringify(data),
        contentType: "application/json",
        type: 'GET',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, null);
        }
    });

}

function retreiveScheduleRule(data, cbk) {


    $.ajax({
        url: API_BASE_PATH + "/srules/get/" + API_TOKEN + '/' + data,
        // data:  JSON.stringify(data),
        contentType: "application/json",
        type: 'GET',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, null);
        }
    });

}

function deleteMessageDef(data, cbk) {


    $.ajax({
        url: API_BASE_PATH + "/mspec/delete/" + API_TOKEN + '/' + data,
        // data:  JSON.stringify(data),
        contentType: "application/json",
        type: 'DELETE',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, null);
        }
    });

}

function deleteRecordDef(data, cbk) {


    $.ajax({
        url: API_BASE_PATH + "/storage/spec/delete/" + API_TOKEN + '/' + data,
        // data:  JSON.stringify(data),
        contentType: "application/json",
        type: 'DELETE',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, null);
        }
    });

}

function deleteMessagRule(data, cbk) {


    $.ajax({
        url: API_BASE_PATH + "/rules/delete/" + API_TOKEN + '/' + data,
        // data:  JSON.stringify(data),
        contentType: "application/json",
        type: 'DELETE',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, null);
        }
    });

}

function createUpdateMessageDef(data, cbk) {


    $.ajax({
        url: API_BASE_PATH + "/mspec/upsert/" + API_TOKEN,
        data: JSON.stringify(data),
        contentType: "application/json",
        type: 'POST',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, null);
        }
    });

}


function createUpdateRecordDef(data, cbk) {


    $.ajax({
        url: API_BASE_PATH + "/storage/spec/upsert/" + API_TOKEN,
        data: JSON.stringify(data),
        contentType: "application/json",
        type: 'POST',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, null);
        }
    });

}

//Script Console


function executeConsoleScript(data, cbk) {


    $.ajax({
        url: API_BASE_PATH + "/script/execute/" + API_TOKEN,
        data: JSON.stringify(data),
        contentType: "application/json",
        type: 'POST',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, null);
        }
    });

}


//User Management

function upsertUserProperty(data, cbk) {


    $.ajax({
        url: API_BASE_PATH + "/user/property/upsert/" + API_TOKEN,
        data: JSON.stringify(data),
        contentType: "application/json",
        type: 'POST',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, e);
        }
    });
}


function upsertUser(data, cbk) {


    $.ajax({
        url: API_BASE_PATH + "/user/upsert/" + API_TOKEN,
        data: JSON.stringify(data),
        contentType: "application/json",
        type: 'POST',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, e);
        }
    });
}

function retreiveUser(id, cbk) {


    $.ajax({
        url: API_BASE_PATH + "/user/get/" + API_TOKEN + '/' + id,
        // data:  JSON.stringify(data),
        contentType: "application/json",
        type: 'GET',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, null);
        }
    });

}

function deleteUser(id, cbk) {
    $.ajax({
        url: API_BASE_PATH + "/user/delete/" + API_TOKEN + "/" + id,
        type: 'DELETE',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, null);
        }
    });


}

function getUserList(data, cbk) {


    $.ajax({
        url: API_BASE_PATH + "/user/list/" + API_TOKEN + '/' + data,
        type: 'GET',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, e);
        }
    });

}


//Asset Management

function upsertAsset(data, cbk) {


    $.ajax({
        url: API_BASE_PATH + "/asset/upsert/" + API_TOKEN,
        data: JSON.stringify(data),
        contentType: "application/json",
        type: 'POST',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, e);
        }
    });
}

function retreiveAsset(id, cbk) {


    $.ajax({
        url: API_BASE_PATH + "/asset/get/" + API_TOKEN + '/' + id,
        // data:  JSON.stringify(data),
        contentType: "application/json",
        type: 'GET',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, null);
        }
    });

}

function deleteAsset(id, cbk) {
    $.ajax({
        url: API_BASE_PATH + "/asset/delete/" + API_TOKEN + "/" + id,
        contentType: "application/json",
        type: 'DELETE',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, null);
        }
    });


}

function getAssetList(data, cbk) {


    $.ajax({
        url: API_BASE_PATH + "/asset/list/" + API_TOKEN + '/' + data,
        type: 'GET',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, e);
        }
    });

}

function getAssetLinkedDevices(id, cbk) {


    $.ajax({
        url: API_BASE_PATH + "/asset/listdevices/" + API_TOKEN + '/' + id,
        type: 'GET',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, e);
        }
    });

}

function assetLink(aid, did, cbk) {


    $.ajax({
        url: API_BASE_PATH + "/asset/link/" + API_TOKEN + '/' + aid + '/' + did,
        type: 'GET',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, e);
        }
    });

}

function assetUnLink(aid, did, cbk) {


    $.ajax({
        url: API_BASE_PATH + "/asset/unlink/" + API_TOKEN + '/' + aid + '/' + did,
        type: 'GET',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, e);
        }
    });

}

//Templates

function listTemplates(pageSize, system, cbk) {

    var data = {
        system: system
    };

    $.ajax({
        url: API_BASE_PATH + "/templates/list/" + API_TOKEN + "/" + pageSize,
        data: data,
        type: 'GET',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, e);
        }
    });

}


function retreiveTemplate(data, cbk) {


    $.ajax({
        url: API_BASE_PATH + "/templates/get/" + API_TOKEN + '/' + data,
        // data:  JSON.stringify(data),
        contentType: "application/json",
        type: 'GET',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, null);
        }
    });

}

function downloadTemplates(system, cbk) {

    var data = {
        system: system
    };

    $.ajax({
        url: API_BASE_PATH + "/templates/download/" + API_TOKEN,
        data: data,
        type: 'GET',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, e);
        }
    });

}

function upsertTemplate(data, system, cbk) {


    $.ajax({
        url: API_BASE_PATH + "/templates/upsert/" + API_TOKEN + '?system=' + system,
        data: JSON.stringify(data),
        contentType: "application/json",
        type: 'POST',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, e);
        }
    });
}

function deleteTemplate(id, system, cbk) {

    var data = {
        system: system
    };
    $.ajax({
        url: API_BASE_PATH + "/templates/delete/" + API_TOKEN + "/" + id + "?system=" + system,
        data: JSON.stringify(data),
        contentType: "application/json",
        type: 'DELETE',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, null);
        }
    });


}


//Events & Notification

function upsertEvent(data, cbk) {


    $.ajax({
        url: API_BASE_PATH + "/event/upsert/" + API_TOKEN,
        data: JSON.stringify(data),
        contentType: "application/json",
        type: 'POST',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, e);
        }
    });
}

function retreiveEvent(id, cbk) {


    $.ajax({
        url: API_BASE_PATH + "/event/get/" + API_TOKEN + '/' + id,
        // data:  JSON.stringify(data),
        contentType: "application/json",
        type: 'GET',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, null);
        }
    });

}

function deleteEvent(id, cbk) {
    $.ajax({
        url: API_BASE_PATH + "/event/delete/" + API_TOKEN + "/" + id,
        type: 'DELETE',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, null);
        }
    });


}

function listEventsApi(pageSize, direction, mid, cbk) {

    var data = {};
    if (mid && direction) {
        data = {
            mid: mid,
            direction: direction
        };
    }

    $.ajax({
        url: API_BASE_PATH + "/event/list/" + API_TOKEN + "/" + pageSize,
        data: data,
        type: 'GET',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, null);
        }
    });

}

function registerEvent(eid, channel, address, cbk) {


    $.ajax({
        url: API_BASE_PATH + "/eventreg/register/" + API_TOKEN + "/" + eid + "/" + channel + "/" + address,
        contentType: "application/json",
        type: 'POST',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, e);
        }
    });
}

function unregisterEvent(eid, channel, address, cbk) {


    $.ajax({
        url: API_BASE_PATH + "/eventreg/unregister/" + API_TOKEN + "/" + eid + "/" + channel + "/" + address,
        type: 'DELETE',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, e);
        }
    });
}


function listNotificationApi(id, type, pageSize, direction, mid, cbk) {

    var data = {};
    if (mid && direction) {
        data = {
            mid: mid,
            direction: direction
        };
    }

    $.ajax({
        url: API_BASE_PATH + "/eventreg/list/" + API_TOKEN + "/" + id + "/" + type + "/" + pageSize,
        data: data,
        type: 'GET',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, null);
        }
    });

}


function listFCMDeviceApi(pageSize, cbk) {

    $.ajax({
        url: API_BASE_PATH + "/device/fcm/list/" + API_TOKEN + "/" + pageSize,
        type: 'GET',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, null);
        }
    });

}

//Firmware

function listFirmwareApi(id, pageSize, direction, mid, cbk) {

    var data = {};
    if (mid && direction) {
        data = {
            mid: mid,
            direction: direction
        };
    }

    $.ajax({
        url: API_BASE_PATH + "/firmware/list/" + API_TOKEN + "/" + id + "/" + pageSize,
        data: data,
        type: 'GET',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, null);
        }
    });

}


function deleteFirmware(dmid, version, cbk) {
    $.ajax({
        url: API_BASE_PATH + "/firmware/delete/" + API_TOKEN + "/" + dmid + "/" + version,
        type: 'DELETE',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, null);
        }
    });


}

function downloadFirmware(dmid, version, cbk) {


    $.ajax({
        url: API_BASE_PATH + "/ota/update/download/" + DOMAIN_KEY + "/" + API_KEY + "/" + dmid + "/" + version,
        type: 'GET',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, e);
        }
    });

}

//Device Management
function upsertDevice(data, cbk) {


    $.ajax({
        url: API_BASE_PATH + "/device/upsert/" + API_TOKEN,
        data: JSON.stringify(data),
        contentType: "application/json",
        type: 'POST',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, e);
        }
    });
}

function retreiveDevice(id, cbk) {


    $.ajax({
        url: API_BASE_PATH + "/device/get/" + API_TOKEN + '/' + id,
        // data:  JSON.stringify(data),
        contentType: "application/json",
        type: 'GET',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, null);
        }
    });

}

function deleteDevice(id, cbk) {
    $.ajax({
        url: API_BASE_PATH + "/device/delete/" + API_TOKEN + "/" + id,
        type: 'DELETE',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, null);
        }
    });


}

function upsertDeviceProperty(data, cbk) {


    $.ajax({
        url: API_BASE_PATH + "/device/property/upsert/" + API_TOKEN,
        data: JSON.stringify(data),
        contentType: "application/json",
        type: 'POST',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, e);
        }
    });
}


function getDeviceMessage(id, cbk) {

    $.ajax({
        url: API_BASE_PATH + "/message/get/" + API_TOKEN + '/' + id,
        type: 'GET',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, e);
        }
    });
}

function retrieveDeviceProperty(id, name, cbk) {


    $.ajax({
        url: API_BASE_PATH + "/device/property/get/" + API_TOKEN + "/" + id + "/" + name,
        type: 'GET',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, e);
        }
    });
}


function upsertDeviceModelProperty(data, cbk) {


    $.ajax({
        url: API_BASE_PATH + "/dmodel/property/upsert/" + API_TOKEN,
        data: JSON.stringify(data),
        contentType: "application/json",
        type: 'POST',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, e);
        }
    });
}

function retrieveDeviceModelProperty(id, name, cbk) {


    $.ajax({
        url: API_BASE_PATH + "/dmodel/property/get/" + API_TOKEN + "/" + id + "/" + name,
        type: 'GET',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, e);
        }
    });
}


function simulateDeviceMessage(id, data, cbk) {


    $.ajax({
        url: API_BASE_PATH + "/push/raw/" + DOMAIN_KEY + "/" + API_KEY + "/SIMULATOR_" + id + "/BOODSKAP/1.0/" + id + '?type=JSON',
        data: JSON.stringify(data),
        contentType: "text/plain",
        type: 'POST',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, e);
        }
    });
}


function upsertDeviceModel(data, cbk) {


    $.ajax({
        url: API_BASE_PATH + "/dmodel/upsert/" + API_TOKEN,
        data: JSON.stringify(data),
        contentType: "application/json",
        type: 'POST',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, e);
        }
    });
}

function retreiveDeviceModel(id, cbk) {


    $.ajax({
        url: API_BASE_PATH + "/dmodel/get/" + API_TOKEN + '/' + id,
        // data:  JSON.stringify(data),
        contentType: "application/json",
        type: 'GET',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, null);
        }
    });

}

function deleteDeviceModel(id, cbk) {
    $.ajax({
        url: API_BASE_PATH + "/dmodel/delete/" + API_TOKEN + "/" + id,
        type: 'DELETE',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, null);
        }
    });


}

function getDeviceModel(data, cbk) {


    $.ajax({
        url: API_BASE_PATH + "/dmodel/list/" + API_TOKEN + '/' + data,
        type: 'GET',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, e);
        }
    });

}


//Elastic Search

function searchByQuery(id, type, data, cbk) {

    if(id){
        data['specId'] = id
    }
    data['type'] = type;

    $.ajax({
        url: API_BASE_PATH + "/elastic/search/query/" + API_TOKEN,
        data: JSON.stringify(data),
        contentType: "application/json",
        type: 'POST',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, e);
        }
    });
}

function findByID(id, type, cbk) {

    $.ajax({
        url: API_BASE_PATH + "/elastic/find/" + API_TOKEN + '/' + type + '/' + id,
        type: 'GET',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, e);
        }
    });
}


function searchByTemplate(id, type, data, cbk) {

    // https://api.boodskap.io/search/template/41f8993d-5a35-4f14-9512-862878dd27a3/MESSAGE/?id=500001000
    $.ajax({
        url: API_BASE_PATH + "/elastic/search/template/" + API_TOKEN + '/' + type + '?specId=' + id,
        data: JSON.stringify(data),
        contentType: "application/json",
        type: 'POST',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, e);
        }
    });
}

function searchDevice(data, cbk) {

    data['type'] = 'DEVICE';

    $.ajax({
        url: API_BASE_PATH + "/elastic/search/query/" + API_TOKEN,
        data: JSON.stringify(data),
        contentType: "application/json",
        type: 'POST',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, e);
        }
    });
}


//Commands
function getCommandStatus(did, corid, cbk) {

    $.ajax({
        url: API_BASE_PATH + "/command/status/" + API_TOKEN + '/' + did + "/" + corid,
        type: 'GET',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, e);
        }
    });
}

function sendCommandProperty(did, cmdid, pname, data, cbk) {

    $.ajax({
        url: API_BASE_PATH + "/command/property/send/" + API_TOKEN + '/' + did + "/" + cmdid + "/" + pname,
        data: JSON.stringify(data),
        contentType: "application/json",
        type: 'POST',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, e);
        }
    });
}

function sendCommandTemplate(did, cmdid, tid, system, data, cbk) {

    $.ajax({
        url: API_BASE_PATH + "/command/template/send/" + API_TOKEN + '/' + did + "/" + cmdid + "/" + tid + "/" + system,
        data: JSON.stringify(data),
        contentType: "application/json",
        type: 'POST',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, e);
        }
    });
}

function sendRawCommand(did, cmdtype, command, cbk) {

    $.ajax({
        url: API_BASE_PATH + "/command/raw/send/" + API_TOKEN + '/' + cmdtype,
        data: JSON.stringify(data),
        contentType: "application/json",
        type: 'POST',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, e);
        }
    });
}


// Global Property
function insertGlobalProperty(data, cbk) {

    $.ajax({
        url: API_BASE_PATH + "/global/data/insert/" + API_TOKEN,
        data: JSON.stringify(data),
        contentType: "application/json",
        type: 'POST',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, e);
        }
    });
}


function insertGlobalPropertyWithId(data, id, cbk) {

    $.ajax({
        url: API_BASE_PATH + "/global/data/insert/" + API_TOKEN+'?id='+id,
        data: JSON.stringify(data),
        contentType: "application/json",
        type: 'POST',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, e);
        }
    });
}


function updateGlobalProperty(data, id, cbk) {

    $.ajax({
        url: API_BASE_PATH + "/global/data/update/" + API_TOKEN + '/' + id,
        data: JSON.stringify(data),
        contentType: "application/json",
        type: 'POST',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, e);
        }
    });
}

function getGlobalProperty(id, cbk) {

    $.ajax({
        url: API_BASE_PATH + "/global/data/get/" + id + "/" + DOMAIN_KEY,
        type: 'GET',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, e);
        }
    });
}

function getGlobalPropertyWithKey(id,dkey, cbk) {

    $.ajax({
        url: API_BASE_PATH + "/global/data/get/" + id + "/" + dkey,
        type: 'GET',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, e);
        }
    });
}

function getDomainGlobalProperty(id, domainKey, cbk) {

    $.ajax({
        url: API_BASE_PATH + "/global/data/get/" + id + "/" + domainKey,
        type: 'GET',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, e);
        }
    });
}

function deleteGlobalProperty(id, cbk) {

    $.ajax({
        url: API_BASE_PATH + "/global/data/delete/" + API_TOKEN + '/' + id,
        type: 'DELETE',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, e);
        }
    });
}


//get domain settings

function getDomainSettings(id, cbk) {

    $.ajax({
        url: API_BASE_PATH + "/settings/get/" + id + "/" + API_TOKEN,
        type: 'GET',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, e);
        }
    });
}

function setDomainSettings(id, data, cbk) {

    $.ajax({
        url: API_BASE_PATH + "/settings/set/" + id + "/" + API_TOKEN,
        data: JSON.stringify(data),
        contentType: "application/json",
        type: 'POST',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, e);
        }
    });
}


// Machine Learning

function upsertDataModel(data, cbk) {

    $.ajax({
        url: API_BASE_PATH + "/ml/upsert/" + API_TOKEN,
        data: JSON.stringify(data),
        contentType: "application/json",
        type: 'POST',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, e);
        }
    });
}


function insertMLData(id, data, cbk) {

    $.ajax({
        url: API_BASE_PATH + "/ml/insert/" + API_TOKEN + "/" + id,
        data: JSON.stringify(data),
        contentType: "application/json",
        type: 'POST',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, e);
        }
    });
}

function trainMLData(id, cbk) {

    $.ajax({
        url: API_BASE_PATH + "/ml/train/" + API_TOKEN + "/" + id,
        type: 'GET',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, e);
        }
    });
}

function deleteMLDataModel(id, cbk) {

    $.ajax({
        url: API_BASE_PATH + "/ml/delete/" + API_TOKEN + '/' + id,
        type: 'DELETE',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, e);
        }
    });
}

function getMachineLearningDLList(pageCount, cbk) {

    $.ajax({
        url: API_BASE_PATH + "/ml/list/" + API_TOKEN + '/' + pageCount,
        type: 'GET',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, e);
        }
    });
}

function getMachineLearningDLModel(id, cbk) {

    $.ajax({
        url: API_BASE_PATH + "/ml/get/" + API_TOKEN + '/' + id,
        type: 'GET',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, e);
        }
    });
}

function getMachineLearningDLDataList(id, data, pageCount, cbk) {

    var data = {
        direction: 'NEXT'
    };
    if (lastId) {
        data['lastId'] = lastId;
    }
    $.ajax({
        url: API_BASE_PATH + "/ml/list/data/" + API_TOKEN + '/' + id + '/' + pageCount,
        data: data,
        type: 'GET',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, e);
        }
    });
}

//face Recognition


function getMachineLearningFRList(pageCount, cbk) {

    $.ajax({
        url: API_BASE_PATH + "/fr/list/" + API_TOKEN + '/' + pageCount,
        type: 'GET',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, e);
        }
    });
}


function upsertFRModel(data, cbk) {

    $.ajax({
        url: API_BASE_PATH + "/fr/upsert/" + API_TOKEN,
        data: JSON.stringify(data),
        contentType: "application/json",
        type: 'POST',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, e);
        }
    });
}


function deleteFRModel(id, cbk) {

    $.ajax({
        url: API_BASE_PATH + "/fr/delete/" + API_TOKEN + '/' + id,
        type: 'DELETE',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, e);
        }
    });
}

function trainMLFRData(id, cbk) {

    $.ajax({
        url: API_BASE_PATH + "/fr/train/" + API_TOKEN + "/" + id,
        type: 'GET',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, e);
        }
    });
}

function getMachineLearningFRModel(id, cbk) {

    $.ajax({
        url: API_BASE_PATH + "/fr/get/" + API_TOKEN + '/' + id,
        type: 'GET',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, e);
        }
    });
}


function getMachineLearningFRLabelsList(id, pageCount, lastId, cbk) {
    var data = {};
    if (lastId) {
        data = {
            lastLabel: lastId
        }
    }

    $.ajax({
        url: API_BASE_PATH + "/fr/list/labels/" + API_TOKEN + '/' + id + '/' + pageCount,
        data: data,
        type: 'GET',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, e);
        }
    });
}

function getMachineLearningFRLabelsImageList(id, label, pageCount, lastId, cbk) {
    var data = {};
    if (lastId) {
        data = {
            lastLabel: lastId
        }
    }

    $.ajax({
        url: API_BASE_PATH + "/fr/image/list/" + API_TOKEN + '/' + id + '/' + label + '/' + pageCount,
        data: data,
        type: 'GET',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, e);
        }
    });
}


//Widgets

function upsertWidget(data, cbk) {

    $.ajax({
        url: API_BASE_PATH + "/widget/upsert/" + API_TOKEN,
        data: JSON.stringify(data),
        contentType: "application/json",
        type: 'POST',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, e);
        }
    });
}

function importWidget(id, cbk) {

    $.ajax({
        url: API_BASE_PATH + "/widget/import/" + API_TOKEN + '/' + id,
        type: 'GET',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, e);
        }
    });
}

function deleteImportWidget(id, cbk) {

    $.ajax({
        url: API_BASE_PATH + "/widget/imported/delete/" + API_TOKEN + '/' + id,
        type: 'DELETE',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, e);
        }
    });
}

function deleteWidget(id, cbk) {

    $.ajax({
        url: API_BASE_PATH + "/widget/delete/" + API_TOKEN + '/' + id,
        type: 'DELETE',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, e);
        }
    });
}


//Vertical

function upsertVertical(data, cbk) {

    $.ajax({
        url: API_BASE_PATH + "/vertical/upsert/" + API_TOKEN,
        data: JSON.stringify(data),
        contentType: "application/json",
        type: 'POST',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, e);
        }
    });
}

function importVertical(id, cbk) {

    $.ajax({
        url: API_BASE_PATH + "/vertical/import/" + API_TOKEN + '/' + id,
        type: 'GET',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, e);
        }
    });
}

function deleteImportVertical(id, cbk) {

    $.ajax({
        url: API_BASE_PATH + "/vertical/imported/delete/" + API_TOKEN + '/' + id,
        type: 'DELETE',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, e);
        }
    });
}

function deleteVertical(id, cbk) {

    $.ajax({
        url: API_BASE_PATH + "/vertical/delete/" + API_TOKEN + '/' + id,
        type: 'DELETE',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, e);
        }
    });
}


function searchVerticals(version, data, cbk) {

    $.ajax({
        url: API_BASE_PATH + "/vertical/search/query?version=" + version,
        data: JSON.stringify(data),
        contentType: "application/json",
        type: 'POST',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, e);
        }
    });
}

//**************************************************
//Geofence Api calls
//**************************************************

function deleteEntityGeofence(id, cbk) {

    $.ajax({
        url: API_BASE_PATH + "/elastic/remove/" + API_TOKEN + "/GEOFENCE/" + id,
        type: 'GET',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, e);
        }
    });
}

//Domain User Group

function upsertDomainUserGroup(data, cbk) {

    $.ajax({
        url: API_BASE_PATH + "/domain/user/group/upsert/" + API_TOKEN,
        data: JSON.stringify(data),
        contentType: "application/json",
        type: 'POST',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, e);
        }
    });
}

function retrieveDomainUserGroup(gid, cbk) {

    $.ajax({
        url: API_BASE_PATH + "/domain/user/group/get/" + API_TOKEN + "/" + gid,
        type: 'GET',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, e);
        }
    });
}

function deleteDomainUserGroup(gid, cbk) {

    $.ajax({
        url: API_BASE_PATH + "/domain/user/group/delete/" + API_TOKEN + "/" + gid,
        type: 'DELETE',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, e);
        }
    });
}


function listDomainUserGroupUsers(gid, pageSize, cbk) {

    $.ajax({
        url: API_BASE_PATH + "/domain/user/group/listmembers/" + API_TOKEN + "/" + gid + '/' + pageSize,
        type: 'GET',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, e);
        }
    });
}

function addUserToDomainGroup(data, gid, cbk) {

    $.ajax({
        url: API_BASE_PATH + "/domain/user/group/add/" + API_TOKEN + '/' + gid,
        data: JSON.stringify(data),
        contentType: "application/json",
        type: 'POST',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, e);
        }
    });
}

function removeUserToDomainGroup(data, gid, cbk) {

    $.ajax({
        url: API_BASE_PATH + "/domain/user/group/remove/" + API_TOKEN + '/' + gid,
        data: JSON.stringify(data),
        contentType: "application/json",
        type: 'POST',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, e);
        }
    });
}


//FILES
function deleteFile(fid, ispublic, cbk) {

    $.ajax({
        url: API_BASE_PATH + "/files/delete/" + API_TOKEN + "/" + fid + '?ispublic=' + ispublic,
        type: 'DELETE',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, e);
        }
    });
}

function updateFileInfo(id, data, cbk) {

    $.ajax({
        url: API_BASE_PATH + "/files/update/" + API_TOKEN + "/" + id,
        data: data,
        type: 'POST',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, e);
        }
    });
}


//ALEXA

function upsertAlexa(data, cbk) {

    $.ajax({
        url: API_BASE_PATH + "/alexa/upsert/" + API_TOKEN,
        data: JSON.stringify(data),
        contentType: "application/json",
        type: 'POST',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, e);
        }
    });
}

function deleteAlexa(aid, cbk) {

    $.ajax({
        url: API_BASE_PATH + "/alexa/delete/" + API_TOKEN + "/" + aid,
        type: 'DELETE',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, e);
        }
    });
}

//GROOVY
function groovyCompile(isPublic, isOpen, data, cbk) {

    $.ajax({
        url: API_BASE_PATH + "/groovy/compile/script/" + API_TOKEN + "/" + isPublic + "/" + isOpen,
        data: JSON.stringify(data),
        contentType: 'application/json',
        type: 'POST',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, e);
        }
    });
}

function uploadGroovyScript(isPublic, isOpen, data, cbk) {

    $.ajax({
        url: API_BASE_PATH + "/groovy/upload/script/" + API_TOKEN + "/" + isPublic + "/" + isOpen,
        data: JSON.stringify(data),
        contentType: 'application/json',
        type: 'POST',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, e);
        }
    });
}


// SQL Calls


function executeSQLQuery(data, cbk) {

    $.ajax({
        url: API_BASE_PATH + "/sql/exec/" + API_TOKEN,
        data: JSON.stringify(data),
        contentType: "application/json",
        type: 'POST',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, e);
        }
    });
}

function executeSQLTemplateQuery(data, cbk) {

    $.ajax({
        url: API_BASE_PATH + "/sql/template/exec/" + API_TOKEN ,
        data: JSON.stringify(data),
        contentType: "application/json",
        type: 'POST',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, e);
        }
    });
}


function checkSQLAccess(dkey, cbk) {

    var domainKey = '';

    if(dkey){
        domainKey = '?dkey=' + dkey;
    }

    $.ajax({
        url: API_BASE_PATH + "/sql/access/check/" + API_TOKEN + domainKey,
        type: 'GET',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, e);
        }
    });
}


function setSQLAccess(dkey, state, cbk) {

    $.ajax({
        url: API_BASE_PATH + "/sql/access/set/" + API_TOKEN + '/' + dkey + '/' + state,
        type: 'PUT',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, e);
        }
    });
}


function listSQLTemplates(pageSize, cbk) {

    $.ajax({
        url: API_BASE_PATH + "/sql/template/list/" + API_TOKEN + "/" + pageSize,
        type: 'GET',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, e);
        }
    });

}



function retreiveSQLTemplate(id, cbk) {

    $.ajax({
        url: API_BASE_PATH + "/sql/template/get/" + API_TOKEN + '/' + id,
        // data:  JSON.stringify(data),
        contentType: "application/json",
        type: 'GET',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, null);
        }
    });

}


function upsertSQLTemplate(data, cbk) {


    $.ajax({
        url: API_BASE_PATH + "/sql/template/upsert/" + API_TOKEN,
        data: JSON.stringify(data),
        contentType: "application/json",
        type: 'POST',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, e);
        }
    });
}

function deleteSQLTemplate(id, cbk) {

    $.ajax({
        url: API_BASE_PATH + "/sql/template/remove/" + API_TOKEN + "/" + id,
        type: 'DELETE',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, null);
        }
    });


}


function createSQLTable(data, ignore, cbk) {

    var ignore = 'ignore=false';

    if(ignore){
        ignore = 'ignore=true'
    }


    $.ajax({
        url: API_BASE_PATH + "/sql/table/create/" + API_TOKEN+'?'+ignore,
        data: JSON.stringify(data),
        contentType: "application/json",
        type: 'POST',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, e);
        }
    });
}


function addSQLTableField(table, data, cbk) {


    $.ajax({
        url: API_BASE_PATH + "/sql/table/field/add/" + API_TOKEN + "/"+table,
        data: JSON.stringify(data),
        contentType: "application/json",
        type: 'POST',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, e);
        }
    });
}



function createSQLTableFieldIndex(table, field, sortDesc, ignore, cbk) {

    var sort = 'sortDesc=false';

    if(sortDesc){
        sort = 'sortDesc=true'
    }

    var ignore = 'ignore=false';

    if(ignore){
        ignore = 'ignore=true'
    }


    $.ajax({
        url: API_BASE_PATH + "/sql/table/index/create/" + API_TOKEN + "/"+table +"/"+field+'?'+ignore+'&'+sort,
        contentType: "application/json",
        type: 'PUT',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, e);
        }
    });
}



function dropSQLTable(table, ignore, cbk) {

    var ignore = 'ignore=false';

    if(ignore){
        ignore = 'ignore=true'
    }

    $.ajax({
        url: API_BASE_PATH + "/sql/table/drop/" + API_TOKEN + "/" + table+'?'+ignore,
        type: 'DELETE',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, null);
        }
    });


}

function dropSQLTableField(table,field, cbk) {

    $.ajax({
        url: API_BASE_PATH + "/sql/table/field/drop/" + API_TOKEN + "/" + table +"/"+field,
        type: 'DELETE',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, null);
        }
    });


}



function dropSQLTableIndex(table, field, ignore, cbk) {

    var ignore = 'ignore=false';

    if(ignore){
        ignore = 'ignore=true'
    }


    $.ajax({
        url: API_BASE_PATH + "/sql/table/index/drop/" + API_TOKEN + "/" + table+"/"+field+'?'+ignore,
        type: 'DELETE',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, null);
        }
    });


}

//DB Calls

function checkDBAccess(dkey, cbk) {

    var domainKey = '';

    if(dkey){
        domainKey = '?dkey=' + dkey;
    }

    $.ajax({
        url: API_BASE_PATH + "/db/access/check/" + API_TOKEN + domainKey,
        type: 'GET',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, e);
        }
    });
}


function setDBAccess(dkey, state, cbk) {

    $.ajax({
        url: API_BASE_PATH + "/db/access/set/" + API_TOKEN + '/' + dkey + '/' + state,
        type: 'PUT',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, e);
        }
    });
}


function retreiveDBTemplate(id, cbk) {

    $.ajax({
        url: API_BASE_PATH + "/db/template/get/" + API_TOKEN + '/' + id,
        // data:  JSON.stringify(data),
        contentType: "application/json",
        type: 'GET',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, null);
        }
    });

}


function upsertDBTemplate(data, cbk) {


    $.ajax({
        url: API_BASE_PATH + "/db/template/upsert/" + API_TOKEN,
        data: JSON.stringify(data),
        contentType: "application/json",
        type: 'POST',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, e);
        }
    });
}

function deleteDBTemplate(id, cbk) {

    $.ajax({
        url: API_BASE_PATH + "/db/template/remove/" + API_TOKEN + "/" + id,
        type: 'DELETE',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, null);
        }
    });


}


function executeDBTemplateQuery(data, cbk) {

    $.ajax({
        url: API_BASE_PATH + "/db/template/exec/" + API_TOKEN ,
        data: JSON.stringify(data),
        contentType: "application/json",
        type: 'POST',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, e);
        }
    });
}



function executeDBQuery(data, cbk) {

    $.ajax({
        url: API_BASE_PATH + "/db/exec/" + API_TOKEN,
        data: JSON.stringify(data),
        contentType: "application/json",
        type: 'POST',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, e);
        }
    });
}



function syncDBPool(pool,async, cbk) {

    var str = '';

    if(async){
        str = '&async=true'
    }else{
        str = '&async=false'
    }

    $.ajax({
        url: API_BASE_PATH + "/db/pool/sync/" + API_TOKEN+'?pool='+pool+str,
        type: 'GET',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, e);
        }
    });
}



function deleteDBPool(id, cbk) {

    $.ajax({
        url: API_BASE_PATH + "/db/pool/remove/" + API_TOKEN + "/" + id,
        type: 'DELETE',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, null);
        }
    });


}


function retreiveDBPool(id, cbk) {

    $.ajax({
        url: API_BASE_PATH + "/db/pool/get/" + API_TOKEN + '/' + id,
        // data:  JSON.stringify(data),
        contentType: "application/json",
        type: 'GET',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, null);
        }
    });

}


function upsertDBPool(data, cbk) {


    $.ajax({
        url: API_BASE_PATH + "/db/pool/upsert/" + API_TOKEN,
        data: JSON.stringify(data),
        contentType: "application/json",
        type: 'POST',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, e);
        }
    });
}


//Plugins


function retreivePlugin(id, cbk) {


    $.ajax({
        url: API_BASE_PATH + "/plugin/get/" + API_TOKEN + '/' + id,
        // data:  JSON.stringify(data),
        contentType: "application/json",
        type: 'GET',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, null);
        }
    });

}


function retreivePluginConfiguration(id, cbk) {


    $.ajax({
        url: API_BASE_PATH + "/plugin/config/get/" + API_TOKEN + '/' + id,
        // data:  JSON.stringify(data),
        contentType: "application/json",
        type: 'GET',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, null);
        }
    });

}


function updatePluginConfig(id, data, cbk) {

    $.ajax({
        url: API_BASE_PATH + "/plugin/config/set/" + API_TOKEN + '/' + id,
        data: JSON.stringify(data),
        contentType: "application/json",
        type: 'POST',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, e);
        }
    });
}

//Lookup



function putLookup(data, cbk) {

    $.ajax({
        url: API_BASE_PATH + "/lookup/put/" + API_TOKEN,
        data: JSON.stringify(data),
        contentType: "application/json",
        type: 'POST',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, e);
        }
    });
}


function getLookup(data, cbk) {

    $.ajax({
        url: API_BASE_PATH + "/lookup/get/" + API_TOKEN ,
        data: JSON.stringify(data),
        contentType: "application/json",
        type: 'POST',
        success: function (data) {
            //called when successful
            cbk(true, data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
            cbk(false, null);
        }
    });
}