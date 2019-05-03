


function Send_supoortMail()
{
   var client_name  = $('#client_name').val();
   var client_email = $('#client_email').val();
   var message_text = $('#message_text').val();

   $.post({
        url : appLocation + '/user/contact',
        data: { client_name, client_email, message_text },
        success : function(responseText) {
            swal({
                title: "Success",
                text: "Mail sent successfully to Newfield. Support members will be in contact shortly",
                icon: "success",
                buttons: false,
                dangerMode: true,
                timer: 2500,
                
            });
            $('#client_name').val('');
            $('#client_email').val('');
            $('#message_text').val('');
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