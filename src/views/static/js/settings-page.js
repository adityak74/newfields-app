/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


$(document).ready(function(){
    $("#email1").on("change", validate1);
});

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
