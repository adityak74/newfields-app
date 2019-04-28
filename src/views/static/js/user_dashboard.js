/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
const appLocation = window.location.origin;

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

function application_form(formNumber, formUID) {
    window.open(location.origin + '/form' + formNumber+'/show?action=update&formId=' + formUID, '_blank');
}

$(document).ready(function(){
  $('#user_homepage a').trigger('onclick');
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


                CAT.row.add([
                    response_date,
                    formResponse.formUID,
                    application_type,
                    getStatusFromCode(formResponse.status),
                    "<label onclick=\"(function(){application_form("+formResponse.formNumber+",\'"+formResponse.formUID+"\')})()\" \n\
                    style='cursor:pointer;color: #4d79ff;'><u>View Application</u></label>",
                    // "<label onclick=\"(function(){OpenDevicePage(\'"+i+"\')})()\" \n\
                    // style='background-color:"+""+";border-radius:10px; color: grey; cursor: pointer; padding: 5px 10px;' type='button'>\n\
                    //     Property Profile\n\
                    // </label>"
    
    
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

function change_content(identifier)
{
    if(identifier==='user-home')
    {   
        $("#change_content").load(appLocation + '/user/homepage');
    } 
    else if(identifier==='contact')
    {   
        $("#change_content").load(appLocation + '/user/contact');
    }
    else if(identifier==='settings')
    {   
        $("#change_content").load(appLocation + '/user/settings');
    }
    else if(identifier==='sign-out')
    {   $('#overlay1').show();
        $('#img').show();
        $.post({
            url : appLocation + '/user/sign-out',
            data : {},
            success : function() {
                $('#img').hide();
                $('#overlay1').hide();
                window.history.forward();
                window.location.href = appLocation + '/user/sign-in';
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
    }
}    