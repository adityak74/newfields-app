/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

const appLocation = window.location.origin;

$(document).ready(function(){
    
  $('#admin_homepage a').trigger('onclick');
    
});

function change_content(identifier)
{
    
    if(identifier==='admin-home')
    {   
        $("#change_content").load(appLocation + '/admin/homepage');
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
    {   
        $.post({
            url : appLocation + '/user/sign-out',
            data : {},
            success : function() {
                window.history.forward();
                window.location.href = appLocation + '/user/sign-in';
            },
            error: function(xhr) {
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
