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
            $('#Unique_id').val(UniqueID);
            $('#f2_title').val(Title);
            
            
            $('#f2_full_name').val(full_name); 
            $('#f2_mobile_number').val(mobile_number);
            $('#f2_landline_no').val(landline_no);
            $('#f2_email_addr').val(email_addr);
            $('#f2_home_addr').val(home_addr);
            $('#f2_addr_move_indate').val(addr_move_indate);
            $('#f2_house_ownrship').val(house_ownrship);
           
            $('#f2_addr_while_visa').val(addr_while_visa);
            $('#f2_uk_addr_text_area').val(uk_addr_text_area);
            $('#f2_nationalities').val(nationalities);
            $('#f2_national_id').val(national_id);
            $('#f2__other_names').val(_other_names);
            $('#f2_relationship_status').val(relationship_status);
            
            $('#f2_conviction_text_area').val(conviction_text_area);
            $('#f2_visa_refusals_textarea').val(visa_refusals_textarea);
            $('#f2_medical_textarea').val(medical_textarea);
            $('#f2_uk_nino_textarea').val(uk_nino_textarea);
            $('#f2_armedforces_textarea').val(armedforces_textarea);
            $('#f2_immediate_family_textarea').val(immediate_family_textarea);
            $('#f2_Proposaldate_UK_entry').val(f2_Proposaldate_UK_entry);
            $('#f2_family_member_travelalong_textarea').val(family_member_travelalong_textarea);
            $('#f2_any_overseas_travel').val(any_overseas_travel);
            $('#f2_Departuredate_UK').val(Departuredate_UK);
            $('#f2_Returndate_UK').val(Returndate_UK);

        //family details    
            $('#f2_fa_frst').val(fa_frst);
            $('#f2_father_country_of_birth').val(father_country_of_birth);
            $('#f2_father_nationality').val(father_nationality);
            $('#f2_father_Secondnationality').val(father_Secondnationality);
            $('#f2_father_DOB').val(father_DOB);
            
            $('#f2_mothers_f_na').val(mothers_f_na);
            $('#f2_mothersCountryofBirth').val(mothersCountryofBirth);
            $('#f2_mother_nationality').val(mother_nationality);
            $('#f2_mother_Secondnationality').val(mother_Secondnationality);
            $('#f2_mother_DOB').val(mother_DOB);
            
            $('#f2_partner_fna').val(partner_fna);
            $('#f2_partner_countryofbirth').val(partner_countryofbirth);
            $('#f2_partner_nationlity').val(partner_nationlity);
            $('#f2_partner_Snationality').val(partner_Snationality);
            $('#f2_partner_DOB').val(partner_DOB);
            
            $('#f2_child1_f_na').val(child1_f_na);
            $('#f2_child1_countryofbirth').val(child1_countryofbirth);
            $('#f2_child1_nationality').val(child1_nationality);
            $('#f2_child1_Snationality').val(child1_Snationality);
            $('#f2_child1_DOB').val(child1_DOB);
           
            $('#f2_child2_f_na').val(child2_f_na);
            $('#f2_child2_countryofbirth').val(child2_countryofbirth);
            $('#f2_child2_nationality').val(child2_nationality);
            $('#f2_child2_Snationality').val(child2_Snationality);
            $('#f2_child2_DOB').val(child2_DOB);

        //visits

            
        $('#form2_request_modal').modal('show');   
        }
    });
 }