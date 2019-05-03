
function getStatusFromCode(formStatusCode) {
    let statusText = '';
    switch (formStatusCode) {
        case 1: statusText = 'Incomplete'; break;
        case 2: statusText = 'Incomplete'; break;
        case 3: statusText = 'Submitted'; break;
        default: statusText = 'Incomplete'; break;
    }
    return statusText;
}

function getFormProcessingStatusFromCode(formProcessingStatusCode) {
    let statusText = '';
    switch (formProcessingStatusCode) {
        case 0: statusText = 'Application not submitted'; break; // not submitted
        case 1: statusText = 'Application submitted'; break; // submitted but admnin not started
        case 2: statusText = 'Application in process by Newfields '; break; // submitted and admin in progress
        case 3: statusText = 'Application processed by Newfields'; break; // admin complete
        default: statusText = 'Incomplete'; break;
    }
    return statusText;
}

//also add status

function application_form(formNumber, formUID, status) {
    console.log("status: "+ status);
    window.open(location.origin + '/form' + formNumber+'/show?action=update&formId=' + formUID + '&status='+status   , '_blank');
}

$(document).ready(function(){
    $('#overlay1').show();
    $('#img').show();
    $.get({
        url : appLocation + '/user/getForms',
        data : {},
        success : function(responseData) {
            $('#img').hide();
            $('#overlay1').hide();
            console.log('all user forms current', responseData);
            // update the dashboard table here to pick all the data.
            // if no forms the responseData = [] empty array
            var CAT = $('#client_application_table').DataTable();
            if (responseData.length) {
                responseData.forEach(formResponse => {

                    var date = new Date(formResponse.createDate).toString();
                    var response_date = date.substr(0,28);

                    var application_type 
                    if(formResponse.formNumber === 1)
                    {
                        application_type = "Visa extension"; 
                    }
                    else if(formResponse.formNumber === 2){
                        application_type = "Entry visa application";
                    }

                    var user_access;
                    if([1,2].includes(formResponse.status))
                    {
                        user_access='Edit Application'
                    }
                    else if([3].includes(formResponse.status))
                    {
                        user_access='View Application'
                    }
              //      console.log("formResponse.processingStatus: "+ formResponse.processingStatus);

                    CAT.row.add([
                        response_date,
                        formResponse.formRefNumber || formResponse.formUID,
                        application_type,
                        getStatusFromCode(formResponse.status),
                        getFormProcessingStatusFromCode(formResponse.processingStatus),
                        "<button onclick=\"(function(){application_form("+formResponse.formNumber+",\'"+formResponse.formUID+"\',"+formResponse.status+")})()\" \n\
                        class='btn btn-link btn-sm' type='button'>"+user_access+"</button>",
                    ]).draw(false);
                });
            }
        },
        error: function(xhr) {
            $('#img').hide();
            $('#overlay1').hide();
            swal({
                title: "Server Error",
                text: "It seems like the server is down or under maintainance, please check back later.",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            });
        },
});
});
