
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

//also add

function application_form(formNumber, formUID) {
    window.open(location.origin + '/form' + formNumber+'/show?action=update&formId=' + formUID, '_blank');
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

                    CAT.row.add([
                        response_date,
                        formResponse.formRefNumber || formResponse.formUID,
                        application_type,
                        getStatusFromCode(formResponse.status),
                        getFormProcessingStatusFromCode(formResponse.processingStatus),
                        "<label onclick=\"(function(){application_form("+formResponse.formNumber+",\'"+formResponse.formUID+"\')})()\" \n\
                        style='cursor:pointer;color: #4d79ff;'><u>"+user_access+"</u></label>",
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

function form1_request_table()
{ 
//     var CAT = $('#client_application_table').DataTable();
//     $.ajax({
//         url : '',
//         data:{
                
//             },
//         success : function(responseText) {
        
//          //   var jsonObj = JSON.parse(responseText);
//          //   var arrayLength = jsonObj.length;
//             for (var i=0;i<2;i++)
//             {  
//              //   var id = jsonObj[i]["CLIENT_ID"];
               
//                 CAT.row.add([
// //                    activation_date,
//                    i,// jsonObj[i]["CLIENT_ID"],
//                    i,// jsonObj[i]["NAME"],
//                    i,// jsonObj[i]["PBUILDINGNAME"],
//                    i,// jsonObj[i]["STREET_NAME"],
//                    i,
//                    i,//  jsonObj[i]["ACTIVATION_CODE"],
//                    "<label onclick=\"(function(){application_form(\'"+i+"\')})()\" \n\
//                     style='cursor:pointer;color: #4d79ff;'><u>View Application</u></label>",
//                     // "<label onclick=\"(function(){OpenDevicePage(\'"+i+"\')})()\" \n\
//                     // style='background-color:"+""+";border-radius:10px; color: grey; cursor: pointer; padding: 5px 10px;' type='button'>\n\
//                     //     Property Profile\n\
//                     // </label>"


//                 ]).draw(false);
//             }
//         }
//     });
}