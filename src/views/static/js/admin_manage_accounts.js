


$(document).ready(function () {
    fetchadmin_table();
    fetchagent_table();
    $("#add_new_admin_form").submit(function(){
        return false;
    });
});



function create_new_admin()
{
    var first_name  = $('#Na_firstname').val();
    var last_name   = $('#Na_lastname').val();
    var user_name   = $('#Na_username').val();
    var password    = $('#Na_password').val();
    
    $.post({
        url : appLocation + '/admin/add-admin',
        data: { first_name, last_name, user_name, password },
        success : function(responseText) {
            swal({
                title: "Success",
                text: "New admin account created successfully",
                type: "success",
                showCancelButton: true,
                closeOnConfirm: true
              });
            $('#Na_firstname').val('');
            $('#Na_lastname').val('');
            $('#Na_username').val('');
            $('#Na_password').val('');
        },
        error: function(xhr) {
            swal({
                title: "Server Error",
                text: xhr.responseText,
                icon: "warning",
                buttons: false,
                dangerMode: true,
                timer: 2500,
            });
        }
    });
}

function fetchadmin_table()
{
    var AT = $('#admin_table').DataTable();
    $.get({
        url : '',
        data : {},
        success : function(responseData) {    
            for (var i=0;i<5;i++)
            {
                AT.row.add([
                    "Date" ,
                    "name",
                    "Email",
                    "Status",
                ]).draw(false);
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
}


function fetchagent_table()
{
    var AT = $('#agents_table').DataTable();
  //  formsDataArray.forEach(formResponse => {
       // var date = new Date(formResponse.createDate).toString();
       // var response_date = date.substr(0,28);
    var AT = $('#admin_table').DataTable();
    $.get({
        url : '',
        data : {},
        success : function(responseData) {  
        var agent_status;
        var agent_request_status = 0;

        if(agent_request_status===0)
        {
                agent_status ="Authenticate account";
        }
        else if (agent_request_status===1){
                agent_status ="Active";
        }


        for (var i=0;i<5;i++)
        {

            AT.row.add([
                "Date" ,
                "name",
                "Email",
                "Password",
                "<button onclick=\"alert('activating agent account');\"  class='btn btn-link btn-sm' type='button'>"+agent_status+"</button>",
            ]).draw(false);
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
}

function activate_agent()
{
    
}