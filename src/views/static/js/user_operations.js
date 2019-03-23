$(document).ready(function(){
    form1_request_table();
});

  function form1_request_table()
{ 
    var CAT = $('#client_application_table').DataTable();
    $.ajax({
        url : '',
        data:{
                
            },
        success : function(responseText) {
        
         //   var jsonObj = JSON.parse(responseText);
         //   var arrayLength = jsonObj.length;
            for (var i=0;i<2;i++)
            {  
             //   var id = jsonObj[i]["CLIENT_ID"];
               
                CAT.row.add([
//                    activation_date,
                   i,// jsonObj[i]["CLIENT_ID"],
                   i,// jsonObj[i]["NAME"],
                   i,// jsonObj[i]["PBUILDINGNAME"],
                   i,// jsonObj[i]["STREET_NAME"],
                   i,
                   i,//  jsonObj[i]["ACTIVATION_CODE"],
                    "View Application"
                ]).draw(false);
            }
        }
    });
}