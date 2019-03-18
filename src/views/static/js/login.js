/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

const actions = {
    'signup': 0,
    'signin': 1,
    'forgot': 2,
};

const actionsEndpoint = {
    0: '/user/sign-up',
    1: '/user/sign-in',
    2: '/user/forgot-password',
}

const appLocation = window.location.origin;
let currentAction = actions.signin;

function getFormDataOnAction(action) {
    let form_data = {};
    let email = '';
    let password = '';
    let name = '';

    switch (action) {
        case actions.signin:
            email = $("#email").val();
            password = $("#password").val();
            form_data = { email, password };
            break;
        case actions.signup:
            email = $("#register_email").val();
            password = $("#register_password").val();
            name = $("#register_name").val();
            form_data = { email, password, name };
            break;
        case actions.forgot:
            break;
    }
    return form_data;
}

function handleSuccess(action, responseText) {
    switch (action) {
        case actions.signin:
            if (responseText.userId && responseText.admin) {
                window.location.href = appLocation + '/admin/page';
            } else if (responseText.userId) {
                window.location.href = appLocation + '/user/dashboard';
            }
            break;
        case actions.signup:
            if (responseText.userId) {
                swal({
                    title: "Sign up success!",
                    text: "Successfully registered. You can now log in.",
                    icon: "success",
                    buttons: false,
                    dangerMode: false,
                });
                register(actions.signin);
            }
            break;
        case actions.forgot:
            break;
    }
}

$(document).ready(function() {
    
    // show sign in on start
    // $("#signIN").css('display', 'block');
    register(actions.signin);

    $("#signup_option").css('display', 'block');
    $("#forgetpassword_option").css('display', 'block');

    $("#user-credentials-form").submit(function() {
        let formData = getFormDataOnAction(currentAction);
        $.post({
            url : appLocation + actionsEndpoint[`${currentAction}`],
            data : formData,
            success : function(responseText) {
                handleSuccess(currentAction, responseText);
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
                        case 'duplicateUser':
                            message = "This email already exists. Please login.";
                            $("#email").val(formData.email ? formData.email : '');
                            register(actions.signin);
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
    currentAction = option;
    if(option===0)
    {
        $("#label_header").text("Sign Up");
        $("#register").css("display","block");
        $("#signIN").css("display","none");
        $("#forget_password").css("display","none");
        $("#signup_option").css('display','none');
        $("#signin_option").css("display","block");
        $("#forgetpassword_option").css("display","block");
    }
    else if(option===1)
    {
        $("#label_header").text("Sign In");
        $("#register").css("display","none");
        $("#signIN").css("display","block");
        $("#forget_password").css("display","none");
        $("#signup_option").css('display','block');
        $("#signin_option").css("display","none");
        $("#forgetpassword_option").css("display","block");
    }
    else if(option===2)
    {
        $("#label_header").text("Forget password");
        $("#register").css("display","none");
        $("#signIN").css("display","none");
        $("#forget_password").css("display","block");
        $("#signup_option").css('display','block');
        $("#signin_option").css("display","block");
        $("#forgetpassword_option").css("display","none");
        $("#forgot_password_email").val($("#email").val());
    }
}
