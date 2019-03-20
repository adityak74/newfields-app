/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



$(document).ready(function () {
    
    form1_request_table();
    form2_request_table();
    
});

$(function () {
    $('[data-toggle="tooltip"]').tooltip();
});

function form1_request_table()
{ 
    var LCT = $('#form1_client_table').DataTable();
    
    $.ajax({
        url : '',
        data:{
                
            },
        success : function(responseText) {
        
         //   var jsonObj = JSON.parse(responseText);
         //   var arrayLength = jsonObj.length;
            for (var i=0;i<10;i++)
            {  
             //   var id = jsonObj[i]["CLIENT_ID"];
               
                LCT.row.add([
                    "<input type='radio' name='optradio' onclick=\"(function(){Openclient_form1(\'"+i+"\')})()\">",
//                    activation_date,
                   i,// jsonObj[i]["CLIENT_ID"],
                   i,// jsonObj[i]["NAME"],
                   i,// jsonObj[i]["PBUILDINGNAME"],
                   i,// jsonObj[i]["STREET_NAME"],
                   i,
                   i,//  jsonObj[i]["ACTIVATION_CODE"],
                    "Pending"
                 //   parseInt(jsonObj[i]["PERMISSIONS"]) === 1 ? 'All Access' : 'Read Only',
                ]).draw(false);
            }//onclick=\"(function(){UsersandPermission_edit_button(\'"+user_id+"\')})()\"
        }
    });
}


function Openclient_form1(id)
{
    
    var reference_id = id;
    $("#ref_no").val(reference_id);
    
    //ajax call
    $.ajax({
        url : '',
        data:{
            },
        success : function(responseText) {
                
        $('#form1_request_modal').modal('show');   
        }
    });
 }


function form2_request_table()
{ 
    var LCT = $('#form2_client_table').DataTable();
    
    $.ajax({
        url : '',
        data:{
                
            },
        success : function(responseText) {
        
         //   var jsonObj = JSON.parse(responseText);
         //   var arrayLength = jsonObj.length;
            for (var i=0;i<10;i++)
            {  
             //   var id = jsonObj[i]["CLIENT_ID"];
               
                LCT.row.add([
                    "<input type='radio' name='optradio' onclick=\"(function(){Openclient_form2(\'"+i+"\')})()\">",
//                    activation_date,
                   i,// jsonObj[i]["CLIENT_ID"],
                   i,// jsonObj[i]["NAME"],
                   i,// jsonObj[i]["PBUILDINGNAME"],
                   i,// jsonObj[i]["STREET_NAME"],
                   i,
                   i,//  jsonObj[i]["ACTIVATION_CODE"],
                    "Pending"
                 //   parseInt(jsonObj[i]["PERMISSIONS"]) === 1 ? 'All Access' : 'Read Only',
                ]).draw(false);
            }//onclick=\"(function(){UsersandPermission_edit_button(\'"+user_id+"\')})()\"
        }
    });
}

function Openclient_form2(id)
{
    
    var reference_id = id;
    $("#ref_no").val(reference_id);
    
    //ajax call
    $.ajax({
        url : '',
        data:{
            },
        success : function(responseText) {
                
        $('#form2_request_modal').modal('show');   
        }
    });
 }