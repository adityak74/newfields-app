/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function getStatusFromCode(formStatusCode) {
    let statusText = '';
    switch (formStatusCode) {
        case 1: statusText = 'NEW'; break;
        case 2: statusText = 'UPDATE'; break;
        case 3: statusText = 'SUBMIT'; break;
        default: statusText = 'NEW'; break;
    }
    return statusText;
}

function application_form(formNumber, formUID) {
    window.open(location.origin + '/form' + formNumber+'/show?action=update&formId=' + formUID, '_blank');
}

$(document).ready(function () {
    
    form1_request_table();
    form2_request_table();
    $('#overlay1').show();
    $('#img').show();
    $.get({
        url : appLocation + '/admin/getForms',
        data : {},
        success : function(responseData) {
            $('#img').hide();
            $('#overlay1').hide();
            console.log('all user forms', responseData);
            // update the dashboard table here to pick all the data.
            // if no forms the responseData = [] empty array
            // var CAT = $('#client_application_table').DataTable();
            // if (responseData.length) {
            //     responseData.forEach(formResponse => {
            //         CAT.row.add([
            //             formResponse.createDate,
            //             formResponse.formUID,
            //             formResponse.formNumber,
            //             getStatusFromCode(formResponse.status),
            //             "<label onclick=\"(function(){application_form("+formResponse.formNumber+",\'"+formResponse.formUID+"\')})()\" \n\
            //             style='cursor:pointer;color: #4d79ff;'><u>View Application</u></label>",
            //             // "<label onclick=\"(function(){OpenDevicePage(\'"+i+"\')})()\" \n\
            //             // style='background-color:"+""+";border-radius:10px; color: grey; cursor: pointer; padding: 5px 10px;' type='button'>\n\
            //             //     Property Profile\n\
            //             // </label>"
        
        
            //         ]).draw(false);
            //     });
            // }
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

$(function () {
    $('[data-toggle="tooltip"]').tooltip();
});

function form1_request_table()
{ 
    var LCT = $('#form1_client_table').DataTable();

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
        data:{},
        success : function(responseText) {


        //    $('#Unique_id').val(UniqueID);
            $('#Title').val(Title); 
            
            $('#full_name').val(full_name); 
            $('#mobile_number').val(mobile_number);
            $('#address_line1').val(address_line1);
            $('#address_line2').val(address_line2);
            $('#town').val(town);
            $('#county').val(county);
            $('#postcode').val(postcode);
            $('#email_address').val(email_address);
            $('#relationship_status').val(relationship_status);
            $('#nationalities').val(nationalities);
            $('#nationalities').val(nationalities);
            $('#date_UK_entry').val(date_UK_entry);
            $('#conviction_text_area').val(conviction_text_area);
            $('#visa_refusals_textarea').val(visa_refusals_textarea);
            $('#details_public_funds').val(details_public_funds);
            $('#UK_NINo').val(UK_NINo);
            $('#next_planned_departure').val(next_planned_departure);
            $('#UK_date_arrival_back').val(UK_date_arrival_back);
            
            $('#partner_Title').val(partner_Title);
            $('#partner_full_name').val(partner_full_name); 
            $('#partner_mobile_number').val(partner_mobile_number);
            $('#partner_uk_home_address').val(partner_uk_home_address);
            $('#partner_nationalities').val(partner_nationalities);
            $('#partner_dob').val(partner_dob);
            $('#partner_placeofbirth').val(partner_placeofbirth);
           
            $('#child1_full_name').val(child1_full_name); 
            $('#child1_nationalities').val(child1_nationalities);
            $('#child1_dob').val(child1_dob);
            $('#child1_placeofbirth').val(child1_placeofbirth);
            
            $('#child2_full_name').val(child2_full_name); 
            $('#child2_nationalities').val(child2_nationalities);
            $('#child2_dob').val(child2_dob);
            $('#child2_placeofbirth').val(child2_placeofbirth);  

 //download documents pending


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
            $('#Unique_id').val(responseText.UniqueID);
            $('#f2_title').val(responseText.Title);
            
            
            $('#f2_full_name').val(responseText.full_name); 
            $('#f2_mobile_number').val(responseText.mobile_number);
            $('#f2_landline_no').val(responseText.landline_no);
            $('#f2_email_addr').val(responseText.email_addr);
            $('#f2_home_addr').val(responseText.home_addr);
            $('#f2_addr_move_indate').val(responseText.addr_move_indate);
            $('#f2_house_ownrship').val(responseText.house_ownrship);
           
            $('#f2_addr_while_visa').val(responseText.addr_while_visa);
            $('#f2_uk_addr_text_area').val(responseText.uk_addr_text_area);
            $('#f2_nationalities').val(responseText.nationalities);
            $('#f2_national_id').val(responseText.national_id);
            $('#f2__other_names').val(responseText._other_names);
            $('#f2_relationship_status').val(responseText.relationship_status);
            
            $('#f2_conviction_text_area').val(responseText.conviction_text_area);
            $('#f2_visa_refusals_textarea').val(responseText.visa_refusals_textarea);
            $('#f2_medical_textarea').val(responseText.medical_textarea);
            $('#f2_uk_nino_textarea').val(responseText.uk_nino_textarea);
            $('#f2_armedforces_textarea').val(responseText.armedforces_textarea);
            $('#f2_immediate_family_textarea').val(responseText.immediate_family_textarea);
            $('#f2_Proposaldate_UK_entry').val(responseText.f2_Proposaldate_UK_entry);
            $('#f2_family_member_travelalong_textarea').val(responseText.family_member_travelalong_textarea);
            $('#f2_any_overseas_travel').val(responseText.any_overseas_travel);
            $('#f2_Departuredate_UK').val(responseText.Departuredate_UK);
            $('#f2_Returndate_UK').val(responseText.Returndate_UK);

        //family details    
            $('#f2_fa_frst').val(responseText.fa_frst);
            $('#f2_father_country_of_birth').val(responseText.father_country_of_birth);
            $('#f2_father_nationality').val(responseText.father_nationality);
            $('#f2_father_Secondnationality').val(responseText.father_Secondnationality);
            $('#f2_father_DOB').val(responseText.father_DOB);
            
            $('#f2_mothers_f_na').val(responseText.mothers_f_na);
            $('#f2_mothersCountryofBirth').val(responseText.mothersCountryofBirth);
            $('#f2_mother_nationality').val(responseText.mother_nationality);
            $('#f2_mother_Secondnationality').val(responseText.mother_Secondnationality);
            $('#f2_mother_DOB').val(responseText.mother_DOB);
            
            $('#f2_partner_fna').val(responseText.partner_fna);
            $('#f2_partner_countryofbirth').val(responseText.partner_countryofbirth);
            $('#f2_partner_nationlity').val(responseText.partner_nationlity);
            $('#f2_partner_Snationality').val(responseText.partner_Snationality);
            $('#f2_partner_DOB').val(responseText.partner_DOB);
            
            $('#f2_child1_f_na').val(responseText.child1_f_na);
            $('#f2_child1_countryofbirth').val(responseText.child1_countryofbirth);
            $('#f2_child1_nationality').val(responseText.child1_nationality);
            $('#f2_child1_Snationality').val(responseText.child1_Snationality);
            $('#f2_child1_DOB').val(responseText.child1_DOB);
           
            $('#f2_child2_f_na').val(responseText.child2_f_na);
            $('#f2_child2_countryofbirth').val(responseText.child2_countryofbirth);
            $('#f2_child2_nationality').val(responseText.child2_nationality);
            $('#f2_child2_Snationality').val(responseText.child2_Snationality);
            $('#f2_child2_DOB').val(responseText.child2_DOB);

        //visits

        //     $('#f2_UK_arrival_date1').val(responseText.);
        //     $('#f2_UK_departure_date1').val(responseText.);
        //     $('#f2_reason_ofvisit1').val(responseText.);

        //     $('#f2_UK_arrival_date2').val(responseText.);
        //     $('#f2_UK_departure_date2').val(responseText.);
        //     $('#f2_reason_ofvisit2').val(responseText.);

        //     $('#f2_UK_arrival_date3').val(responseText.);
        //     $('#f2_UK_departure_date3').val(responseText.);
        //     $('#f2_reason_ofvisit3').val(responseText.);

        //     $('#f2_UK_arrival_date4').val(responseText.);
        //     $('#f2_UK_departure_date4').val(responseText.);
        //     $('#f2_reason_ofvisit4').val(responseText.);

        //     $('#f2_UK_arrival_date5').val(responseText.);
        //     $('#f2_UK_departure_date5').val(responseText.);
        //     $('#f2_reason_ofvisit5').val(responseText.);

        // //trips abroad to: Australia; NZ; Canada; USA; Europe,
        //     $('#f2_country1').val(responseText.);
        //     $('#f2_date_arrival_country1').val(responseText.);
        //     $('#f2_date_departure_country1').val(responseText.);
        //     $('#f2_tripreason_ofvisit1').val(responseText.);

        //     $('#f2_country2').val(responseText.);
        //     $('#f2_date_arrival_country2').val(responseText.);
        //     $('#f2_date_departure_country2').val(responseText.);
        //     $('#f2_tripreason_ofvisit2').val(responseText.);

        //     $('#f2_country3').val(responseText.);
        //     $('#f2_date_arrival_country3').val(responseText.);
        //     $('#f2_date_departure_country3').val(responseText.);
        //     $('#f2_tripreason_ofvisit3').val(responseText.);

        //     $('#f2_country4').val(responseText.);
        //     $('#f2_date_arrival_country4').val(responseText.);
        //     $('#f2_date_departure_country4').val(responseText.);
        //     $('#f2_tripreason_ofvisit4').val(responseText.);

        //     $('#f2_country5').val(responseText.);
        //     $('#f2_date_arrival_country5').val(responseText.);
        //     $('#f2_date_departure_country5').val(responseText.);
        //     $('#f2_tripreason_ofvisit5').val(responseText.);

        // //trips abroad to any other country not listed

        //     $('#f2_othertrip_country1').val(responseText.);
        //     $('#f2_othertrip_arrivaldate1').val(responseText.);
        //     $('#f2_othertrip_departuredate1').val(responseText.);
        //     $('#f2_othertripreason_ofvisit1').val(responseText.);
        
        //     $('#f2_othertrip_country2').val(responseText.);
        //     $('#f2_othertrip_arrivaldate2').val(responseText.);
        //     $('#f2_othertrip_departuredate2').val(responseText.);
        //     $('#f2_othertripreason_ofvisit2').val(responseText.);

        //     $('#f2_othertrip_country3').val(responseText.);
        //     $('#f2_othertrip_arrivaldate3').val(responseText.);
        //     $('#f2_othertrip_departuredate3').val(responseText.);
        //     $('#f2_othertripreason_ofvisit3').val(responseText.);

        //     $('#f2_othertrip_country4').val(responseText.);
        //     $('#f2_othertrip_arrivaldate4').val(responseText.);
        //     $('#f2_othertrip_departuredate4').val(responseText.);
        //     $('#f2_othertripreason_ofvisit4').val(responseText.);

        //     $('#f2_othertrip_country5').val(responseText.);
        //     $('#f2_othertrip_arrivaldate5').val(responseText.);
        //     $('#f2_othertrip_departuredate5').val(responseText.);
        //     $('#f2_othertripreason_ofvisit5').val(responseText.);

            //download documents pending

            
        $('#form2_request_modal').modal('show');   
        }
    });
 }