/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$(document).ready(function(){

});
const actions = {
    'signup': 0,
    'signin': 1,
    'forgot': 2,
    'tokenSignIn': 3,
};

const actionsEndpoint = {
    0: '/user/sign-up',
    1: '/user/sign-in',
    2: '/user/forgot-password',
    3: '/user/sign-in/verify/token',
}

const appLocation = window.location.origin;
let currentAction = actions.signin;

function getFormDataOnAction(action) {
    let form_data = {};
    let email = '';
    let password = '';
    let name = '';
    let isAdmin = '';
    let isAgent = '';
    let session_token = '';

    switch (action) {
        case actions.signin:
            email = $("#email").val();
            password = $("#password").val();
            isAdmin = $('#isAdmin').prop('checked');
            form_data = { email, password, isAdmin };
            break;
        case actions.signup:
            email = $("#register_email").val();
            password = $("#register_password").val();
            name = $("#register_name").val();
            isAgent = $('#isAgent').prop('checked');
            form_data = { email, password, name, isAgent };
            break;
        case actions.forgot:
            email = $('#forgot_password_email').val();
            form_data = { email };
            break;
        case actions.tokenSignIn:
            email = $("#email").val();
            password = $("#password").val();
            isAdmin = $('#isAdmin').prop('checked');
            session_token = $('#admin_session_token').val();
            form_data = { email, password, isAdmin, session_token };
            break;
    }
    return form_data;
}

function handleSuccess(action, responseText) {
    
    switch (action) {
        
        case actions.signin:
            if (responseText.userId && responseText.admin && responseText.tokenGenerated) {
                register(3);
                $('#confirm_admin').modal('show');
            } else if (responseText.userId) {
                window.location.href = appLocation + '/user/dashboard';
            }
            break;
        case actions.signup:
            let message = "";
            if (responseText.userId && responseText.agent) {
                message = "Successfully registered. Check your email for verification link to log in. You can login when an admin approves your agent account.";
            } else {
                message = "Successfully registered. Check your email for verification link to log in.";
            }
            swal({
                title: "Sign up success!",
                text: message,
                icon: "success",
                buttons: false,
                dangerMode: false,
            });
            register(actions.signin);
            break;
        case actions.forgot:
            if (responseText.userId) {
                swal({
                    title: "Reset password success!",
                    text: "You password has been temporarily reset. Check your email for the new password to login.",
                    icon: "success",
                    buttons: false,
                    dangerMode: false,
                });
                register(actions.signin);
            }
            break;
        case actions.tokenSignIn:
            if (responseText.userId && responseText.admin) {
                window.location.href = appLocation + '/admin/page';
            }
            break;
    }
}

function show_overlay_img() {
    $('#overlay1').show();
    $('#img').show(); 
}

function hide_overlay_img() {
    $('#overlay1').hide();
    $('#img').hide(); 
}

function formSubmitAction() {
    show_overlay_img();
    let formData = getFormDataOnAction(currentAction);

    $.post({
        url : appLocation + actionsEndpoint[`${currentAction}`],
        data : formData,
        success : function(responseText) {
            hide_overlay_img();
            handleSuccess(currentAction, responseText);
        },
        error: function(xhr) {
            hide_overlay_img();
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
                    case 'unverifiedAgentAccount':
                        message = "You will be able to log-in once Newfields Law verifies your agent account.";
                        break;
                    case 'unverifiedAccount':
                        message = "Please verify your account by link sent to your email before you could log-in.";
                        break;
                    case 'badSessionToken':
                        message = "Please verify your token or sign-in again.";
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
}

$(document).ready(function() {
    
    // show sign in on start show some spinner or loader here
    // $("#signIN").css('display', 'block');
    
    register(actions.signin);

    $("#signup_option").css('display', 'block');
    $("#forgetpassword_option").css('display', 'block');

    $("#user-credentials-form").submit(function() {
        formSubmitAction();
        return false;
    });

    $("#admin_token_sign_in").submit(function() {
        formSubmitAction();
        return false;
    });

    $('#confirm_admin').on('hidden.bs.modal', function () {
        register(actions.signin);
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
