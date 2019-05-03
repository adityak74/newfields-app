


function Send_supoortMail()
{
   var client_name  = $('#n_a_m_e').val();
   var client_email = $('#e_m_a_i_l').val();
   var message_text = $('#message_text').val();

   $.post({
        url : '',
        data: {  },
        success : function(responseText) {
            swal({
                title: "Success",
                text: "Mail sent successfully to Newfield. Support members will be in contact shortly",
                icon: "success",
                buttons: false,
                dangerMode: true,
                timer: 2500,
                
            });
            $('#n_a_m_e').val('');
            $('#e_m_a_i_l').val('');
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