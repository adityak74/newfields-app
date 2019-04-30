/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
*/

function getStatusFromCode(formStatusCode) {
    let statusText = '';
    switch (formStatusCode) {
        case 1: statusText = 'Incomplete'; break;//newly created 
        case 2: statusText = 'Incomplete'; break; //edited/save 
        case 3: statusText = 'Submitted'; break; //submitted
        default: statusText = 'Incomplete'; break;
    }
    return statusText;
}

function application_form(formNumber, formUID) {
    window.open(location.origin + '/form' + formNumber+'/show?action=update&formId=' + formUID, '_blank');
}

$(document).ready(function () {
    $('#overlay1').show();
    $('#img').show();
    $.get({
        url : appLocation + '/admin/getForms',
        data : {},
        success : function(responseData) {
            $('#img').hide();
            $('#overlay1').hide();
            console.log('all user forms', responseData);

            //only submitted form from client should be in form1 and form2 
            //if incomplete then in incomplete table

            form1_request_table(responseData.filter(form => form.formNumber === 1 && form.status === 3 ));
            form2_request_table(responseData.filter(form => form.formNumber === 2 && form.status === 3 ));
            incomplete_forms_request_table(responseData.filter(form => [1,2].includes(form.status)));
            processed_forms_request_table(responseData.filter(form => [3].includes(form.processingStatus)));
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

function form1_request_table(formsDataArray)
{ 
    var LCT = $('#form1_client_table').DataTable();
    formsDataArray.forEach(formResponse => {
        var date = new Date(formResponse.createDate).toString();
        var response_date = date.substr(0,28);
        LCT.row.add([
            response_date,
            formResponse.formUID,
            formResponse.name,
            formResponse.email,
            getStatusFromCode(formResponse.status),
            "<button onclick=\"(function(){form_classification(\'"+formResponse.formNumber+"','"+formResponse.formUID+"\')})()\" class='btn btn-link btn-sm' type='button'>Open</button>",
            // "<label onclick=\"(function(){OpenDevicePage(\'"+i+"\')})()\" \n\
            // style='background-color:"+""+";border-radius:10px; color: grey; cursor: pointer; padding: 5px 10px;' type='button'>\n\
            //     Property Profile\n\
            // </label>"
        ]).draw(false);
    });
}

function form_classification(formnumber, formUID)
{
    console.log("formnumber: "+ formnumber);
    console.log("formUID: "+ formUID);
    if(formnumber==="1")
    {
        Openclient_form1(formUID);
    }
    else if(formnumber==="2")
    {
        Openclient_form2(formUID);
    }
}


function Openclient_form1(id)
{
    
    var reference_id = id;
    $("#ref_no").val(reference_id);
    console.log('formdata', appLocation, id);
    //ajax call
    $.post({
        url : appLocation + '/form1/getFormData',
        data: { formId: reference_id },
        success : function(responseText) {
            console.log('formdata', responseText);

        //    $('#Unique_id').val(UniqueID);
            $('#Title').val(responseText.title); 
            $('#full_name').val(responseText.fullName); 
            $('#mobile_number').val(responseText.mobile);
            $('#address_line1').val(responseText.addressLine1);
            $('#address_line2').val(responseText.addressLine2);
            $('#town').val(responseText.town);
            $('#county').val(responseText.county);
            $('#postcode').val(responseText.postcode);
            $('#email_address').val(responseText.email);
            $('#relationship_status').val(responseText.relationship);
            $('#nationalities').val(responseText.nationalities);
            $('#date_UK_entry').val(responseText.ukEntryDate);
            $('#conviction_text_area').val(responseText.convictionText);
            $('#visa_refusals_textarea').val(responseText.visaRefusalText);

            $('#details_public_funds').val(responseText.publicFunds);
            $('#UK_NINo').val(responseText.nationalInsuranceNumber);
            $('#next_planned_departure').val(responseText.ukNextDepartureDate);
            $('#UK_date_arrival_back').val(responseText.ukNextArrivalDate);
            
            $('#partner_Title').val(responseText.partnerTitle);
            $('#partner_full_name').val(responseText.partnerFullName); 
            $('#partner_mobile_number').val(responseText.partnerMobile);
            $('#partner_uk_home_address').val(responseText.partnerUKHomeAddress);
            $('#partner_nationalities').val(responseText.partnerNationalities);
            $('#partner_dob').val(responseText.partnerDateOfBirth);
            $('#partner_placeofbirth').val(responseText.partnerPlaceOfBirth);
           
            $('#child1_full_name').val(responseText.child1FullName); 
            $('#child1_nationalities').val(responseText.child1Nationalitites);
            $('#child1_dob').val(responseText.child1DateOfBirth);
            $('#child1_placeofbirth').val(responseText.child1CountryOfBirth);
            
            $('#child2_full_name').val(responseText.child2FullName); 
            $('#child2_nationalities').val(responseText.child2Nationalitites);
            $('#child2_dob').val(responseText.child2DateOfBirth);
            $('#child2_placeofbirth').val(responseText.child2CountryOfBirth);  

 //download documents pending


        $('#form1_request_modal').modal('show');   
        }
    });
 }


function form2_request_table(formsDataArray)
{ 
    var LCT = $('#form2_client_table').DataTable();
    formsDataArray.forEach(formResponse => {
        var date = new Date(formResponse.createDate).toString();
        var response_date = date.substr(0,28);
        LCT.row.add([
            response_date,
            formResponse.formUID,
            formResponse.name,
            formResponse.email,
            getStatusFromCode(formResponse.status),
            "<button onclick=\"(function(){form_classification(\'"+formResponse.formNumber+"','"+formResponse.formUID+"\')})()\" class='btn btn-link btn-sm' type='button'>Open</button>",
            
            // "<label onclick=\"(function(){OpenDevicePage(\'"+i+"\')})()\" \n\
            // style='background-color:"+""+";border-radius:10px; color: grey; cursor: pointer; padding: 5px 10px;' type='button'>\n\
            //     Property Profile\n\
            // </label>"
        ]).draw(false);
    });
}

function incomplete_forms_request_table(formsDataArray)
{ 
    var LCT = $('#incomplete_forms_client_table').DataTable();
    formsDataArray.forEach(formResponse => {
        var date = new Date(formResponse.createDate).toString();
        var response_date = date.substr(0,28);
        LCT.row.add([
            response_date,
            formResponse.formUID,
            formResponse.name,
            formResponse.email,
            getStatusFromCode(formResponse.status),
            "<button onclick=\"(function(){form_classification(\'"+formResponse.formNumber+"','"+formResponse.formUID+"\')})()\" class='btn btn-link btn-sm' type='button'>Open</button>",
            
            // "<label onclick=\"(function(){OpenDevicePage(\'"+i+"\')})()\" \n\
            // style='background-color:"+""+";border-radius:10px; color: grey; cursor: pointer; padding: 5px 10px;' type='button'>\n\
            //     Property Profile\n\
            // </label>"
        ]).draw(false);
    });
}

function processed_forms_request_table(formsDataArray)
{ 
    var LCT = $('#processed_forms_client_table').DataTable();
    formsDataArray.forEach(formResponse => {
        var date = new Date(formResponse.createDate).toString();
        var response_date = date.substr(0,28);
        LCT.row.add([
            response_date,
            formResponse.formUID,
            formResponse.name,
            formResponse.email,
            getStatusFromCode(formResponse.status),
            "<button onclick=\"(function(){form_classification(\'"+formResponse.formNumber+"','"+formResponse.formUID+"\')})()\" class='btn btn-link btn-sm' type='button'>Open</button>",
            
            // "<label onclick=\"(function(){OpenDevicePage(\'"+i+"\')})()\" \n\
            // style='background-color:"+""+";border-radius:10px; color: grey; cursor: pointer; padding: 5px 10px;' type='button'>\n\
            //     Property Profile\n\
            // </label>"
        ]).draw(false);
    });
}

function Openclient_form2(id)
{
    var reference_id = id;
    $("#ref_no").val(reference_id);
    
    //ajax call
    $.ajax({
        url : appLocation + '/form1/getFormData',
        data:{ formId: reference_id },
        success : function(responseText) {
            $('#Unique_id').val(responseText.UniqueID);
            $('#f2_title').val(responseText.title);
            $('#f2_full_name').val(responseText.fullName); 
            $('#f2_mobile_number').val(responseText.mobile);
            $('#f2_landline_no').val(responseText.landline);
            $('#f2_email_addr').val(responseText.email);
            $('#f2_home_addr').val(responseText.homeAddress);
            $('#f2_addr_move_indate').val(responseText.moveInDate);
            $('#f2_house_ownrship').val(responseText.homeOwnership);
           
            $('#f2_addr_while_visa').val(responseText.addressOnVisa);
            $('#f2_uk_addr_text_area').val(responseText.ukAddressInfo);
            $('#f2_nationalities').val(responseText.nationalities);
            $('#f2_national_id').val(responseText.nationalIdentityNumber);
            $('#f2__other_names').val(responseText.otherNames);
            $('#f2_relationship_status').val(responseText.relationship);
            
            $('#f2_conviction_text_area').val(responseText.convictionText);
            $('#f2_visa_refusals_textarea').val(responseText.visaRefusalText);
            $('#f2_medical_textarea').val(responseText.medicalText);
            $('#f2_uk_nino_textarea').val(responseText.nationalInsuranceNumber);
            $('#f2_armedforces_textarea').val(responseText.armedForcesText);
            $('#f2_immediate_family_textarea').val(responseText.immediateFamilyText);

            $('#f2_Proposaldate_UK_entry').val(responseText.ukEntryDate);

            $('#f2_family_member_travelalong_textarea').val(responseText.familyMemberTravelAlongText);
            $('#f2_any_overseas_travel').val(responseText.overseasTravel);
            $('#f2_Departuredate_UK').val(responseText.ukNextDepartureDate);
            $('#f2_Returndate_UK').val(responseText.ukNextArrivalDate);

        //family details    
            $('#f2_fa_frst').val(responseText.fatherFullName);
            $('#f2_father_country_of_birth').val(responseText.fatherCountryOfBirth);
            $('#f2_father_nationality').val(responseText.fatherNationality);
            $('#f2_father_Secondnationality').val(responseText.fatherAlternateNationality);
            $('#f2_father_DOB').val(responseText.fatherDateOfBirth);
            
            $('#f2_mothers_f_na').val(responseText.motherFullName);
            $('#f2_mothersCountryofBirth').val(responseText.motherCountryOfBirth);
            $('#f2_mother_nationality').val(responseText.motherNationality);
            $('#f2_mother_Secondnationality').val(responseText.motherAlternateNationality);
            $('#f2_mother_DOB').val(responseText.motherDateOfBirth);
            
            $('#f2_partner_fna').val(responseText.partnerFullName);
            $('#f2_partner_countryofbirth').val(responseText.partnerPlaceOfBirth);
            $('#f2_partner_nationlity').val(responseText.partnerNationalities);
            $('#f2_partner_Snationality').val(responseText.partnerAlternateNationality);
            $('#f2_partner_DOB').val(responseText.partnerDateOfBirth);
            
            $('#f2_child1_f_na').val(responseText.child1FullName);
            $('#f2_child1_countryofbirth').val(responseText.child1CountryOfBirth);
            $('#f2_child1_nationality').val(responseText.child1Nationalitites);
            $('#f2_child1_Snationality').val(responseText.child1AlternateNationality);
            $('#f2_child1_DOB').val(responseText.child1DateOfBirth);
           
            $('#f2_child2_f_na').val(responseText.child2FullName);
            $('#f2_child2_countryofbirth').val(responseText.child2CountryOfBirth);
            $('#f2_child2_nationality').val(responseText.child2Nationalitites);
            $('#f2_child2_Snationality').val(responseText.child2AlternateNationality);
            $('#f2_child2_DOB').val(responseText.child2DateOfBirth);

        //visits

            $('#f2_UK_arrival_date1').val(responseText.visitInfo[0].arrivalDate);
            $('#f2_UK_departure_date1').val(responseText.visitInfo[0].departureDate);
            $('#f2_reason_ofvisit1').val(responseText.visitInfo[0].reasonInfo);

            $('#f2_UK_arrival_date2').val(responseText.visitInfo[1].arrivalDate);
            $('#f2_UK_departure_date2').val(responseText.visitInfo[1].departureDate);
            $('#f2_reason_ofvisit2').val(responseText.visitInfo[1].reasonInfo);

            $('#f2_UK_arrival_date3').val(responseText.visitInfo[2].arrivalDate);
            $('#f2_UK_departure_date3').val(responseText.visitInfo[2].departureDate);
            $('#f2_reason_ofvisit3').val(responseText.visitInfo[2].reasonInfo);

            $('#f2_UK_arrival_date4').val(responseText.visitInfo[3].arrivalDate);
            $('#f2_UK_departure_date4').val(responseText.visitInfo[3].departureDate);
            $('#f2_reason_ofvisit4').val(responseText.visitInfo[3].reasonInfo);

            $('#f2_UK_arrival_date5').val(responseText.visitInfo[4].arrivalDate);
            $('#f2_UK_departure_date5').val(responseText.visitInfo[4].departureDate);
            $('#f2_reason_ofvisit5').val(responseText.visitInfo[4].reasonInfo);

  //trips abroad to: Australia; NZ; Canada; USA; Europe,
            $('#f2_country1').val(responseText.tripInfo[0].country);
            $('#f2_date_arrival_country1').val(responseText.tripInfo[0].arrivalDate);
            $('#f2_date_departure_country1').val(responseText.tripInfo[0].departureDate);
            $('#f2_tripreason_ofvisit1').val(responseText.tripInfo[0].reasonInfo);

            $('#f2_country2').val(responseText.tripInfo[1].country);
            $('#f2_date_arrival_country2').val(responseText.tripInfo[1].arrivalDate);
            $('#f2_date_departure_country2').val(responseText.tripInfo[1].departureDate);
            $('#f2_tripreason_ofvisit2').val(responseText.tripInfo[1].reasonInfo);

            $('#f2_country3').val(responseText.tripInfo[2].country);
            $('#f2_date_arrival_country3').val(responseText.tripInfo[2].arrivalDate);
            $('#f2_date_departure_country3').val(responseText.tripInfo[2].departureDate);
            $('#f2_tripreason_ofvisit3').val(responseText.tripInfo[2].reasonInfo);

            $('#f2_country4').val(responseText.tripInfo[3].country);
            $('#f2_date_arrival_country4').val(responseText.tripInfo[3].arrivalDate);
            $('#f2_date_departure_country4').val(responseText.tripInfo[3].departureDate);
            $('#f2_tripreason_ofvisit4').val(responseText.tripInfo[3].reasonInfo);

            $('#f2_country5').val(responseText.tripInfo[4].country);
            $('#f2_date_arrival_country5').val(responseText.tripInfo[4].arrivalDate);
            $('#f2_date_departure_country5').val(responseText.tripInfo[4].departureDate);
            $('#f2_tripreason_ofvisit5').val(responseText.tripInfo[4].reasonInfo);

//trips abroad to any other country not listed

            $('#f2_othertrip_country1').val(responseText.otherTripInfo[0].country);
            $('#f2_othertrip_arrivaldate1').val(responseText.otherTripInfo[0].arrivalDate);
            $('#f2_othertrip_departuredate1').val(responseText.otherTripInfo[0].departureDate);
            $('#f2_othertripreason_ofvisit1').val(responseText.otherTripInfo[0].reasonInfo);
        
            $('#f2_othertrip_country2').val(responseText.otherTripInfo[1].country);
            $('#f2_othertrip_arrivaldate2').val(responseText.otherTripInfo[1].arrivalDate);
            $('#f2_othertrip_departuredate2').val(responseText.otherTripInfo[1].departureDate);
            $('#f2_othertripreason_ofvisit2').val(responseText.otherTripInfo[1].reasonInfo);

            $('#f2_othertrip_country3').val(responseText.otherTripInfo[2].country);
            $('#f2_othertrip_arrivaldate3').val(responseText.otherTripInfo[2].arrivalDate);
            $('#f2_othertrip_departuredate3').val(responseText.otherTripInfo[2].departureDate);
            $('#f2_othertripreason_ofvisit3').val(responseText.otherTripInfo[2].reasonInfo);

            $('#f2_othertrip_country4').val(responseText.otherTripInfo[3].country);
            $('#f2_othertrip_arrivaldate4').val(responseText.otherTripInfo[3].arrivalDate);
            $('#f2_othertrip_departuredate4').val(responseText.otherTripInfo[3].departureDate);
            $('#f2_othertripreason_ofvisit4').val(responseText.otherTripInfo[3].reasonInfo);

            $('#f2_othertrip_country5').val(responseText.otherTripInfo[4].country);
            $('#f2_othertrip_arrivaldate5').val(responseText.otherTripInfo[4].arrivalDate);
            $('#f2_othertrip_departuredate5').val(responseText.otherTripInfo[4].departureDate);
            $('#f2_othertripreason_ofvisit5').val(responseText.otherTripInfo[4].reasonInfo);

            //download documents pending

            
        $('#form2_request_modal').modal('show');   
        }
    });
 }