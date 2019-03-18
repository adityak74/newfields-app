/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

const appLocation = window.location.origin;

$(document).ready(function(){
    
    $("#signIN").css('display','block');
    $("#signup_option").css('display','block');
    $("#forgetpassword_option").css("display","block");

    $("#user-credentials-form").submit(function() {
        const email = $("#email").val();
        const password = $("#password").val();
        const form_data = { email, password };
        $.post({
            url : appLocation + '/user/sign-in',
            data : form_data,
            success : function(responseText) {
                if (responseText.userId && responseText.admin) {
                    window.location.href = appLocation + '/admin/page';
                } else if (responseText.userId) {
                    window.location.href = appLocation + '/user/dashboard';
                }
            },
            error: function(xhr) {
                if(xhr.status === 400) {
                    let message = "";
                    const error = xhr.responseText;
                    switch (error) {
                        case 'wrongPassword':
                            message = "Please check your password.";
                            break;
                        case 'userNotFound':
                            message = "No such email or password found on the system. Please sign up before you can log-in.";
                            break;
                        case 'unverifiedAccount':
                            message = "Please verify your account by link sent to your email before you could log-in.";
                            break;
                        default: 
                            message = "Unidentified error occurred";
                    }                    
                    swal({
                        title: "Oops?",
                        text: message,
                        icon: "warning",
                        buttons: true,
                        dangerMode: true,
                    });
                } else {
                    swal({
                        title: "Server Error",
                        text: "It seems like the server is down or under maintainance, please check back later.",
                        icon: "warning",
                        buttons: true,
                        dangerMode: true,
                    });
                }
            },
        }); 

        return false;
    });

});

function register(option)
{
    if(option==='0')
    {
        $("#label_header").text("Sign Up");
        $("#register").css("display","block");
        $("#signIN").css("display","none");
        $("#forget_password").css("display","none");
        $("#signup_option").css('display','none');
        $("#signin_option").css("display","block");
        $("#forgetpassword_option").css("display","block");
    }
    else if(option==='1')
    {
        $("#label_header").text("Sign In");
        $("#register").css("display","none");
        $("#signIN").css("display","block");
        $("#forget_password").css("display","none");
        $("#signup_option").css('display','block');
        $("#signin_option").css("display","none");
        $("#forgetpassword_option").css("display","block");
    }
    else if(option==='2')
    {
        $("#label_header").text("Forget password");
        $("#register").css("display","none");
        $("#signIN").css("display","none");
        $("#forget_password").css("display","block");
        $("#signup_option").css('display','block');
        $("#signin_option").css("display","block");
        $("#forgetpassword_option").css("display","none");
    }
}
