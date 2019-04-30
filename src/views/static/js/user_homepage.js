/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

 
$(document).ready(function(){
    $('#overlay1').show();
    $('#img').show();
    $.get({
        url : appLocation + '/user/getForms',
        data : {},
        success : function(responseData) {
            $('#img').hide();
            $('#overlay1').hide();
            console.log('all user forms current', responseData);
            // update the dashboard table here to pick all the data.
            // if no forms the responseData = [] empty array
            var CAT = $('#client_application_table').DataTable();
            if (responseData.length) {
                responseData.forEach(formResponse => {

                    var date = new Date(formResponse.createDate).toString();
                    var response_date = date.substr(0,28);

                    var application_type 
                    if(formResponse.formNumber === 1)
                    {
                        application_type = "Visa extension"; 
                    }
                    else if(formResponse.formNumber === 2){
                        application_type = "Entry visa application";
                    }


                    CAT.row.add([
                        response_date,
                        formResponse.formUID,
                        application_type,
                        getStatusFromCode(formResponse.status),
                        "<label onclick=\"(function(){application_form("+formResponse.formNumber+",\'"+formResponse.formUID+"\')})()\" \n\
                        style='cursor:pointer;color: #4d79ff;'><u>View Application</u></label>",
                        // "<label onclick=\"(function(){OpenDevicePage(\'"+i+"\')})()\" \n\
                        // style='background-color:"+""+";border-radius:10px; color: grey; cursor: pointer; padding: 5px 10px;' type='button'>\n\
                        //     Property Profile\n\
                        // </label>"
        
        
                    ]).draw(false);
                });
            }
        },
        error: function(xhr) {
            $('#img').hide();
            $('#overlay1').hide();
            swal({
                title: "Server Error",
                text: "It seems like the server is down or under maintainance, please check back later.",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            });
        },
    });
});

function form1_request_table()
{ 
//     var CAT = $('#client_application_table').DataTable();
//     $.ajax({
//         url : '',
//         data:{
                
//             },
//         success : function(responseText) {
        
//          //   var jsonObj = JSON.parse(responseText);
//          //   var arrayLength = jsonObj.length;
//             for (var i=0;i<2;i++)
//             {  
//              //   var id = jsonObj[i]["CLIENT_ID"];
               
//                 CAT.row.add([
// //                    activation_date,
//                    i,// jsonObj[i]["CLIENT_ID"],
//                    i,// jsonObj[i]["NAME"],
//                    i,// jsonObj[i]["PBUILDINGNAME"],
//                    i,// jsonObj[i]["STREET_NAME"],
//                    i,
//                    i,//  jsonObj[i]["ACTIVATION_CODE"],
//                    "<label onclick=\"(function(){application_form(\'"+i+"\')})()\" \n\
//                     style='cursor:pointer;color: #4d79ff;'><u>View Application</u></label>",
//                     // "<label onclick=\"(function(){OpenDevicePage(\'"+i+"\')})()\" \n\
//                     // style='background-color:"+""+";border-radius:10px; color: grey; cursor: pointer; padding: 5px 10px;' type='button'>\n\
//                     //     Property Profile\n\
//                     // </label>"


//                 ]).draw(false);
//             }
//         }
//     });
}