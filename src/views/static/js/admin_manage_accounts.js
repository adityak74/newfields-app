


function Send_supoortMail()
{
    var first_name  = $('#Na_firstname').val();
    var last_name   = $('#Na_lastname').val();
    var user_name   = $('#Na_username').val();
    var password    = $('#Na_password').val();
    
    $.post({
        url : '',
        data: {  },
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
