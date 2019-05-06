


$(document).ready(function () {
    fetchadmin_table();
    fetchagent_table();
    $("#add_new_admin_form").submit(function(){
        return false;
    });
});



function create_new_admin()
{
    $('#overlay1').show();
    $('#img').show();
    var first_name  = $('#Na_firstname').val();
    var last_name   = $('#Na_lastname').val();
    var user_name   = $('#Na_username').val();
    var password    = $('#Na_password').val();
    
    $.post({
        url : appLocation + '/admin/add-admin',
        data: { first_name, last_name, user_name, password },
        success : function(responseText) {
           // $('#img').hide();
           // $('#overlay1').hide();
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
            fetchadmin_table();
        },
        error: function(xhr) {
            $('#img').hide();
            $('#overlay1').hide();
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
    $('#overlay1').show();
    $('#img').show();
    var AT = $('#admin_table').DataTable();
    AT.clear();
    $.post({
        url : appLocation + '/admin/all',
        data : {},
        success : function(responseData) {
            $('#img').hide();
            $('#overlay1').hide();
            console.log('adminsData--->', responseData);
            
            responseData.forEach(formResponse => {
                var date = new Date(formResponse.createdDate).toString();
                var response_date = date.substr(0,28);
                AT.row.add([
                    response_date ,
                    formResponse.name,
                    formResponse.email,
                    "Active",
                ]).draw(false);
            });
         
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
{   $('#overlay1').show();
    $('#img').show();

    var AT = $('#agents_table').DataTable();
    AT.clear();
    $.post({
        url : appLocation + '/admin/allAgents',
        data : {},
        success : function(responseData) {
            $('#img').hide();
            $('#overlay1').hide();
            console.log('agentsData--->', responseData);
            
            var agent_status;

            responseData.forEach(formResponse => {
                var date = new Date(formResponse.createdDate).toString();
                var response_date = date.substr(0,28);
        
                if(formResponse.isVerified===0)
                {
                    agent_status ="Activation required";
                }
                else if (formResponse.isVerified===1){
                    agent_status ="Active";
                }
               
                AT.row.add([
                    response_date ,
                    formResponse.name,
                    formResponse.email,
                    "<button onclick=\"activate_agent('"+formResponse.id+"',"+formResponse.isVerified+");\"  class='btn btn-link btn-sm' type='button'>"+agent_status+"</button>",
                ]).draw(false);
            });
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

function activate_agent(agent_id,isVerified)
{
    if(isVerified===0)
    {
        $.post({
            url : appLocation + '/admin/agent/authorize',
            data : {agent_user_id: agent_id},
            success : function(responseData) {
                $('#img').hide();
                $('#overlay1').hide();
                swal({
                    title: "Success",
                    text: "Account successfully activated and mail has been forwarded to the agent.",
                    type: "success",
                    showCancelButton: false,
                    closeOnConfirm: true
                  });
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
    else if(isVerified===1)
    {
        swal({
            title: "Info",
            text: "This account is already active.",
            icon: "info",
            buttons: true,
        });
    }
    
}