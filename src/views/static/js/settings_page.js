/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$(document).ready(function(){
    $("#email1").on("change", validate1);
});

function toggleEye(elementId) {
    const input = $('#'+elementId);
    const eyecon = $('#eyecon_'+elementId);
    if(input.attr("type") == 'password') {
        input.attr("type", "text");
        eyecon.attr('class', 'fa fa-eye-slash');
    } else {
        input.attr("type", "password");
        eyecon.attr('class', 'fa fa-eye');
    }
}

function clear_password_fields() {
    $('#login_password').val('');
    $('#confirmlogin_password').val('');
}

function clear_all_fields() {
    clear_password_fields();
    $('#Password_check').text('');
}

function form_submit() {
    let password = $('#login_password').val();
    let confirm_password = $('#confirmlogin_password').val();
    
    if (password !== confirm_password) {
        $('#Password_check').text('Passwords do not match.');
        $('#Password_check').css('color', 'red');
    } else {
        $('#Password_check').text('Updating your password...');
        $('#Password_check').css('color', 'green');
        let form_data = {
            password,
            confirm_password,
        };
        $.post({
            url : appLocation + '/user/change-password',
            data : form_data,
            success : function(responseText) {
                $('#Password_check').text('Successfully updated password.');
                $('#Password_check').css('color', 'green');
                clear_password_fields();
            },  
            error: function(xhr) {
                const status = xhr.status;
                if (status === 400) {
                    $('#Password_check').text('Passwords do not match.');
                    $('#Password_check').css('color', 'red');
                } else if (status === 500) {
                    $('#Password_check').text('Unexpected server error occurred.');
                    $('#Password_check').css('color', 'red');
                }
                clear_password_fields();
            },
        });
    }
}

function validate1() 
{
    var email1 = $("#email1").val();
    
    $("#emailvalid1").css("display","none");
    $("#emailinvalid1").css("display","none");
    
    
    if(email1!==null) {
        if (validateEmail(email1)) 
        {
            $("#emailvalid1").css("display","block");
            $("#emailinvalid1").css("display","none");
        } 

        else 
        {
            $("#emailvalid1").css("display","none");
            $("#emailinvalid1").css("display","block");
        }
    }
    
}

function validateEmail(email) {
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}
