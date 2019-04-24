/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

const appLocation = window.location.origin;

$(document).ready(function(){
    
    $("#demo").submit(function(){
        $('#myModal').modal('show');
        return false;
    });
  
    
    $("#addr_move_indate").datepicker({format: 'dd/mm/yyyy'});
    $("#Proposaldate_UK_entry").datepicker({format: 'dd/mm/yyyy'});
    $("#Departuredate_UK").datepicker({format: 'dd/mm/yyyy'});
    $("#Returndate_UK").datepicker({format: 'dd/mm/yyyy'});
    $("#father_DOB").datepicker({format: 'dd/mm/yyyy'});
    $("#mother_DOB").datepicker({format: 'dd/mm/yyyy'});
    $("#partner_DOB").datepicker({format: 'dd/mm/yyyy'});
    $("#child1_DOB").datepicker({format: 'dd/mm/yyyy'});
    $("#child2_DOB").datepicker({format: 'dd/mm/yyyy'});
    
    $("#UK_arrival_date1").datepicker({format: 'dd/mm/yyyy'});
    $("#UK_departure_date1").datepicker({format: 'dd/mm/yyyy'});
    $("#UK_arrival_date2").datepicker({format: 'dd/mm/yyyy'});
    $("#UK_departure_date2").datepicker({format: 'dd/mm/yyyy'});
    $("#UK_arrival_date3").datepicker({format: 'dd/mm/yyyy'});
    $("#UK_departure_date3").datepicker({format: 'dd/mm/yyyy'});
    $("#UK_arrival_date4").datepicker({format: 'dd/mm/yyyy'});
    $("#UK_departure_date4").datepicker({format: 'dd/mm/yyyy'});
    $("#UK_arrival_date5").datepicker({format: 'dd/mm/yyyy'});
    $("#UK_departure_date5").datepicker({format: 'dd/mm/yyyy'});
    
    
    $("#date_arrival_country1").datepicker({format: 'dd/mm/yyyy'});
    $("#date_departure_country1").datepicker({format: 'dd/mm/yyyy'});
    $("#date_arrival_country2").datepicker({format: 'dd/mm/yyyy'});
    $("#date_departure_country2").datepicker({format: 'dd/mm/yyyy'});
    $("#date_arrival_country3").datepicker({format: 'dd/mm/yyyy'});
    $("#date_departure_country3").datepicker({format: 'dd/mm/yyyy'});
    $("#date_arrival_country4").datepicker({format: 'dd/mm/yyyy'});
    $("#date_departure_country4").datepicker({format: 'dd/mm/yyyy'});
    $("#date_arrival_country5").datepicker({format: 'dd/mm/yyyy'});
    $("#date_departure_country5").datepicker({format: 'dd/mm/yyyy'});
    
    
    $("#othertrip_arrivaldate1").datepicker({format: 'dd/mm/yyyy'});
    $("#othertrip_departuredate1").datepicker({format: 'dd/mm/yyyy'});
    $("#othertrip_arrivaldate2").datepicker({format: 'dd/mm/yyyy'});
    $("#othertrip_departuredate2").datepicker({format: 'dd/mm/yyyy'});
    $("#othertrip_arrivaldate3").datepicker({format: 'dd/mm/yyyy'});
    $("#othertrip_departuredate3").datepicker({format: 'dd/mm/yyyy'});
    $("#othertrip_arrivaldate4").datepicker({format: 'dd/mm/yyyy'});
    $("#othertrip_departuredate4").datepicker({format: 'dd/mm/yyyy'});
    $("#othertrip_arrivaldate5").datepicker({format: 'dd/mm/yyyy'});
    $("#othertrip_departuredate5").datepicker({format: 'dd/mm/yyyy'});


    const url = new URL(window.location.href);
    if (url.searchParams.get('formId')) {
        const formId = url.searchParams.get('formId');
        $.post({
            url : appLocation + '/form2/getFormData',
            data : { formId: formId },
            success : function(response) {
                $("#errors").css("display", "none");
                console.log(response);

                $('#Unique_id').val();
                $('#Title').val(response.title);
    
                $('#full_name').val(response.fullName); 
                $('#mobile_number').val(response.mobile);
                $('#landline_no').val(response.landline);
                $('#email_addr').val(response.email);
<<<<<<< HEAD
                $('#home_addr').val(response.homeAddress); 
                
                $('#addr_move_indate').val(response.moveInDate);
                $('#house_ownrship').val(response.homeOwnership);
                $('#addr_while_visa').val(response.addressOnVisa);
 //       
                var $radios = $('input:radio[name=uk_addr]');
                if($radios.is(':checked') === false) {
                    $radios.filter('[value='+ response.ifUKaddress +']').prop('checked', true);
                }
                if(response.ifUKaddress==='Yes')
                {
                    $("#uk_addr_text_area").css("display","block");
                    $("#uk_addr_text_area").val(response.ukAddressInfo);
                }else{
                    $("#uk_addr_text_area").css("display","none");
                }
              
                $('#nationalities').val(response.nationalities);
                $('#national_id').val(response.nationalIdentityNumber);

                $('#_other_names').val(response.otherNames); 
                $('#relationship_status').val(response.relationship);

// any convictions
                var $radios = $('input:radio[name=any_convictions]');
                if($radios.is(':checked') === false) {
                    $radios.filter('[value='+ response.anyConvictions +']').prop('checked', true);
                }
                if(response.anyConvictions==='Yes')
                {
                    $("#conviction_text_area").css("display","block");
                    $("#conviction_text_area").val(response.convictionText);
                }else{
                    $("#conviction_text_area").css("display","none");
                }
// any visa refusals
                var $radios = $('input:radio[name=visa_refusals]');
                if($radios.is(':checked') === false) {
                    $radios.filter('[value='+ response.visaRefusals +']').prop('checked', true);
                }
                if (response.visaRefusals === 'Yes')
                {
                    $("#visa_refusals_textarea").css("display","block");
                    $("#visa_refusals_textarea").val(response.visaRefusalText);
                }else{
                    $("#visa_refusals_textarea").css("display","none");
                }
// medical
                var $radios = $('input:radio[name=medical]');
                if($radios.is(':checked') === false) {
                    $radios.filter('[value='+ response.medical +']').prop('checked', true);
                }
                if (response.medical === 'Yes')
                {
                    $("#medical_textarea").css("display","block");
                    $("#medical_textarea").val(response.medicalInfo);
                }else{
                    $("#medical_textarea").css("display","none");
                }
// UK NINO 
                var $radios = $('input:radio[name=uk_NINo]');
                if($radios.is(':checked') === false) {
                    $radios.filter('[value='+ response.UKNINumber +']').prop('checked', true);
                }
                if (response.UKNINumber === 'Yes')
                { 
                    $("#uk_nino_textarea").css("display","block");
                    $("#uk_nino_textarea").val(response.UKNINumberInfo);
                }else{
                    $("#uk_nino_textarea").css("display","none");
                }
//armed forces
                var $radios = $('input:radio[name=anyarmedforces]');
                if($radios.is(':checked') === false) {
                    $radios.filter('[value='+ response.ifArmedForces +']').prop('checked', true);
                }
                if (response.ifArmedForces === 'Yes')
                { 
                    $("#armedforces_textarea").css("display","block");
                    $("#armedforces_textarea").val(response.armedForcesInfo);
                }else{
                    $("#armedforces_textarea").css("display","none");
                }
//immediate family
                var $radios = $('input:radio[name=immediate_family]');
                if($radios.is(':checked') === false) {
                    $radios.filter('[value='+ response.ifImmediateFamily +']').prop('checked', true);
                }
                if (response.ifImmediateFamily === 'Yes')
                { alert();
                    $("#immediate_family_textarea").css("display","block");
                    $("#immediate_family_textarea").val(response.immediateFamilyInfo);
                }else{
                    $("#immediate_family_textarea").css("display","none");
                }

 //familymembertravelalong
                var $radios = $('input:radio[name=familymembertravelalong]');
                if($radios.is(':checked') === false) {
                    $radios.filter('[value='+ response.familyMemberTravelAlong +']').prop('checked', true);
                }
                if (response.familyMemberTravelAlong === 'Yes')
                { 
                    $("#family_member_travelalong_textarea").css("display","block");
                    $("#family_member_travelalong_textarea").val(response.familyMemberTravelAlongInfo);
                }else{
                    $("#family_member_travelalong_textarea").css("display","none");
                }
 
                $('#Proposaldate_UK_entry').val(response.ukProposedEntryDate); 
 //    
    
=======
                $('#home_addr').val(response.homeAddress);
                $('#addr_move_indate').val(response.moveInDate);
                $('#address_line1').val(response.addressLine1);
                $('#address_line2').val(response.addressLine2);
                $('#town').val(response.town);
                $('#county').val(response.county);
                $('#postcode').val(response.postcode);
                $('#email_address').val(response.email);
                $('#relationship_status').val(response.relationship); 
                $('#nationalities').val(response.nationalities);
                $('#date_UK_entry').val(response.ukEntryDate);
                $('#conviction_text_area').val(response.convictionText);
                $('#visa_refusals_textarea').val(response.visaRefusalText);
                $('#details_public_funds').val(response.publicFunds); 
                $('#UK_NINo').val(response.nationalInsuranceNumber);
>>>>>>> 9e7a3d378a0b07bf27ed8b1fa35b72de17a341f0
                $('#next_planned_departure').val(response.ukNextDepartureDate);
                $('#UK_date_arrival_back').val(response.ukNextArrivalDate);

                $('#partner_Title').val(response.partnerTitle);  
                
                $('#partner_full_name').val(response.partnerFullName); 
                $('#partner_mobile_number').val(response.partnerMobile);
                $('#partner_uk_home_address').val(response.partnerUKHomeAddress);
                $('#partner_nationalities').val(response.partnerNationalities);
                $('#partner_dob').val(response.partnerDateOfBirth);
                $('#partner_placeofbirth').val(response.partnerPlaceOfBirth);


                var $radios = $('input:radio[name=any_children]');
                if($radios.is(':checked') === false) {
                    $radios.filter('[value='+ response.anyChildren +']').prop('checked', true);
                }
<<<<<<< HEAD
// start here 
              //  convictions(response.conviction.toLowerCase());
             //   visa(response.visaRefusal.toLowerCase());
=======

                convictions(response.conviction ? response.conviction.toLowerCase() : '');
                visa(response.visaRefusal.toLowerCase());
>>>>>>> 9e7a3d378a0b07bf27ed8b1fa35b72de17a341f0
            
                $('#child1_full_name').val(response.child1FullName); 
                $('#child1_nationalities').val(response.child1Nationalitites);
                $('#child1_dob').val(response.child1DateOfBirth);
                $('#child1_placeofbirth').val(response.child1CountryOfBirth);
                
                $('#child2_full_name').val(response.child2FullName); 
                $('#child2_nationalities').val(response.child2Nationalitites);
                $('#child2_dob').val(response.child2DateOfBirth);
                $('#child2_placeofbirth').val(response.child2CountryOfBirth);
            },
            error: function(xhr) {
                if(xhr.status === 400) {
                    swal({
                        title: "Server Error",
                        text: xhr.responseText,
                        icon: "warning",
                        buttons: false,
                        dangerMode: true,
                        timer: 2500,
                        onClose: () => window.location.href = appLocation + '/user/dashboard',
                    });
                }
            },
        });
    }

});

function show_date(option){
    
    if (option==='0')
    {
        $("#addr_move_indate").datepicker('show');
    }
    else if(option==='1')
    {
        $("#Proposaldate_UK_entry").datepicker('show');
    }
    else if(option==='2')
    {
        $("#Departuredate_UK").datepicker('show');
    }
    else if(option==='3')
    {
        $("#Returndate_UK").datepicker('show');
    }
    else if(option==='4')
    {
        $("#father_DOB").datepicker('show');
    }
    else if(option==='5')
    {
        $("#mother_DOB").datepicker('show');
    }
    else if(option==='6')
    {
        $("#partner_DOB").datepicker('show');
    }
    else if(option==='7')
    {
        $("#child1_DOB").datepicker('show');
    }
    else if(option==='8')
    {
        $("#child2_DOB").datepicker('show');
    }
    else if(option==='9')
    {
        $("#UK_arrival_date1").datepicker('show');
    }
    else if(option==='10')
    {
        $("#UK_departure_date1").datepicker('show');
    }
    else if(option==='11')
    {
        $("#UK_arrival_date2").datepicker('show');
    }
    else if(option==='12')
    {
        $("#UK_departure_date2").datepicker('show');
    }
    else if(option==='13')
    {
        $("#UK_arrival_date3").datepicker('show');
    }
    else if(option==='14')
    {
        $("#UK_departure_date3").datepicker('show');
    }
    else if(option==='15')
    {
        $("#UK_arrival_date4").datepicker('show');
    }
    else if(option==='16')
    {
        $("#UK_departure_date4").datepicker('show');
    }
    else if(option==='17')
    {
        $("#UK_arrival_date5").datepicker('show');
    }
    else if(option==='18')
    {
        $("#UK_departure_date5").datepicker('show');
    }
    else if(option==='19')
    {
        $("#date_arrival_country1").datepicker('show');
    }
    else if(option==='20')
    {
        $("#date_departure_country1").datepicker('show');
    }
    else if(option==='21')
    {
        $("#date_arrival_country2").datepicker('show');
    }
    else if(option==='22')
    {
        $("#date_departure_country2").datepicker('show');
    }
    else if(option==='23')
    {
        $("#date_arrival_country3").datepicker('show');
    }
    else if(option==='24')
    {
        $("#date_departure_country3").datepicker('show');
    }
    else if(option==='25')
    {
        $("#date_arrival_country4").datepicker('show');
    }
    else if(option==='26')
    {
        $("#date_departure_country4").datepicker('show');
    }
    else if(option==='27')
    {
        $("#date_arrival_country5").datepicker('show');
    }
    else if(option==='28')
    {
        $("#date_departure_country5").datepicker('show');
    }
    //other trips
    else if(option==='29')
    {
        $("#othertrip_arrivaldate1").datepicker('show');
    }
    else if(option==='30')
    {
        $("#othertrip_departuredate1").datepicker('show');
    }
    else if(option==='31')
    {
        $("#othertrip_arrivaldate2").datepicker('show');
    }
    else if(option==='32')
    {
        $("#othertrip_departuredate2").datepicker('show');
    }
    else if(option==='23')
    {
        $("#othertrip_arrivaldate3").datepicker('show');
    }
    else if(option==='34')
    {
        $("#othertrip_departuredate3").datepicker('show');
    }
    else if(option==='35')
    {
        $("#othertrip_arrivaldate4").datepicker('show');
    }
    else if(option==='36')
    {
        $("#othertrip_departuredate4").datepicker('show');
    }
    else if(option==='37')
    {
        $("#othertrip_arrivaldate5").datepicker('show');
    }
    else if(option==='38')
    {
        $("#othertrip_departuredate5").datepicker('show');
    }
    
}

function uk_addrs(option)
{
    if(option==="yes")
    {
        $("#uk_addr_text_area").css("display","block");
    }
    else if(option==="no")
    {
        $("#uk_addr_text_area").css("display","none");
    }
}

//Convictions
function convictions(option)
{
    if(option==="yes")
    {
        $("#conviction_text_area").css("display","block");
    }
    else if(option==="no")
    {
        $("#conviction_text_area").css("display","none");
    }
}

//visa refusals
function visa(option)
{
    if(option==="yes")
    {
        $("#visa_refusals_textarea").css("display","block");
    }
    else if(option==="no")
    {
        $("#visa_refusals_textarea").css("display","none");
    }
}

//medical treatment
function medical_treatment(option)
{
    if(option==="yes")
    {
        $("#medical_textarea").css("display","block");
    }
    else if(option==="no")
    {
        $("#medical_textarea").css("display","none");
    }
}

//UK NINo
function NINo(option)
{
    if(option==="yes")
    {
        $("#uk_nino_textarea").css("display","block");
    }
    else if(option==="no")
    {
        $("#uk_nino_textarea").css("display","none");
    }
}

//armed forces
function armed_forces(option)
{
    if(option==="yes")
    {
        $("#armedforces_textarea").css("display","block");
    }
    else if(option==="no")
    {
        $("#armedforces_textarea").css("display","none");
    }
}

//uk immediate family
function UK_immediate_family(option)
{
    if(option==="yes")
    {
        $("#immediate_family_textarea").css("display","block");
    }
    else if(option==="no")
    {
        $("#immediate_family_textarea").css("display","none");
    }
}


//family_member_travelalong
function family_member_travelalong(option)
{
    if(option==="yes")
    {
        $("#family_member_travelalong_textarea").css("display","block");
    }
    else if(option==="no")
    {
        $("#family_member_travelalong_textarea").css("display","none");
    }
}



function firstchild(option)
{
    if(option==="yes")
    
    {   $("#firstchild_condition").text("	Your Children");  
        $("#childern_details1").css("display","block");
    }
    else if(option==="no")
    {   $("#firstchild_condition").text("4.	Your Children");  
        $("#childern_details1").css("display","none");
      //  $("#children_details2").css("display","none");
        
        $("#child1_f_na").val(""); 
        $("#child1_countryofbirth").val(""); 
        $("#child1_nationality").val("");
        $("#child1_Snationality").val(""); 
        $("#child1_DOB").val(""); 
        Child_options('2');
    }
}

function Child_options(option)
{
    if(option==='1')
    {   
        $("#children_details2").css("display","block");
    }
    else if(option==='2')
    {   $("#children_details2").css("display","none");
        $("#child2_f_na").val(""); 
        $("#child2_countryofbirth").val(""); 
        $("#child2_nationality").val("");
        $("#child2_Snationality").val(""); 
        $("#child2_DOB").val(""); 
    }
}

function visits(option)
{
    if(option==='1')
    {   
        $("#first_visit").css("display","block");
    }
    else if(option==='01')
    {    
        $("#first_visit").css("display","none");
        $("#UK_arrival_date1").val('');
        $("#UK_departure_date1").val('');
        $("#reason_ofvisit1").val('');
        visits('02');
    }
    else if(option==='2')
    {
        $("#second_visit").css("display","block") ;
    }
    else if(option==='02')
    {
        $("#second_visit").css("display","none") ;
        $("#UK_arrival_date2").val('');
        $("#UK_departure_date2").val('');
        $("#reason_ofvisit2").val('');
        visits('03');
    }
    
    else if(option==='3')
    {
        $("#third_visit").css("display","block") ;
    }
    else if(option==='03')
    {
        $("#third_visit").css("display","none") ;
        $("#UK_arrival_date3").val('');
        $("#UK_departure_date3").val('');
        $("#reason_ofvisit3").val('');
        visits('04');
    }
    else if(option==='4')
    {
        $("#fourth_visit").css("display","block") ;
    }
    else if(option==='04')
    {
        $("#fourth_visit").css("display","none") ;
        $("#UK_arrival_date4").val('');
        $("#UK_departure_date4").val('');
        $("#reason_ofvisit4").val('');
        visits('05');
    }
    else if(option==='5')
    {
        $("#fifth_visit").css("display","block") ;
    }
    else if(option==='05')
    {
        $("#fifth_visit").css("display","none") ;
        $("#UK_arrival_date5").val('');
        $("#UK_departure_date5").val('');
        $("#reason_ofvisit5").val('');
    }
}

    
function trips(option)
{
    if(option==='1')
    {   
        $("#first_Trip").css("display","block");
    }
    else if(option==='01')
    {    
        $("#first_Trip").css("display","none");
        $("#country1").val("");
        $("#date_arrival_country1").val("");
        $("#date_departure_country1").val("");
        $("#tripreason_ofvisit1").val("");
        trips('02');
//        $("#second_Trip").css("display","none") ;
//        $("#third_Trip").css("display","none") ;
//        $("#fourth_Trip").css("display","none") ;
//        $("#fifth_Trip").css("display","none") ;
    }
    else if(option==='2')
    {
        $("#second_Trip").css("display","block") ;
    }
    else if(option==='02')
    {
        $("#second_Trip").css("display","none") ;
        $("#country2").val("");
        $("#date_arrival_country2").val("");
        $("#date_departure_country2").val("");
        $("#tripreason_ofvisit2").val("");
        trips('03');
    }
    
    else if(option==='3')
    {
        $("#third_Trip").css("display","block") ;
    }
    else if(option==='03')
    {
        $("#third_Trip").css("display","none") ;
        $("#country3").val("");
        $("#date_arrival_country3").val("");
        $("#date_departure_country3").val("");
        $("#tripreason_ofvisit3").val("");
        trips('04');
    }
    else if(option==='4')
    {
        $("#fourth_Trip").css("display","block") ;
    }
    else if(option==='04')
    {
        $("#fourth_Trip").css("display","none") ;
        $("#country4").val("");
        $("#date_arrival_country4").val("");
        $("#date_departure_country4").val("");
        $("#tripreason_ofvisit4").val("");
        trips('05');
    }
    else if(option==='5')
    {
        $("#fifth_Trip").css("display","block") ;
    }
     else if(option==='05')
    {
        $("#fifth_Trip").css("display","none") ;
        $("#country5").val("");
        $("#date_arrival_country5").val("");
        $("#date_departure_country5").val("");
        $("#tripreason_ofvisit5").val("");
    }
}


function other_trips(option)
{
    if(option==='1')
    {   
        $("#other_first_Trip").css("display","block");
    }
    else if(option==='01')
    {    
        $("#other_first_Trip").css("display","none");
        $("#othertrip_country1").val("");
        $("#othertrip_arrivaldate1").val("");
        $("#othertrip_departuredate1").val("");
        $("#othertripreason_ofvisit1").val("");
        other_trips('02');
    }
    
    else if(option==='2')
    {
        $("#other_second_Trip").css("display","block");
    }
    else if(option==='02')
    {
        $("#other_second_Trip").css("display","none");
        $("#othertrip_country2").val("");
        $("#othertrip_arrivaldate2").val("");
        $("#othertrip_departuredate2").val("");
        $("#othertripreason_ofvisit2").val("");
        other_trips('03');
    }
    
    else if(option==='3')
    {
        $("#other_third_Trip").css("display","block") ;
    }
    else if(option==='03')
    {
        $("#other_third_Trip").css("display","none") ;
        $("#othertrip_country3").val("");
        $("#othertrip_arrivaldate3").val("");
        $("#othertrip_departuredate3").val("");
        $("#othertripreason_ofvisit3").val("");
        other_trips('04');
    }
    else if(option==='4')
    {
        $("#other_fourth_Trip").css("display","block") ;
    }
    else if(option==='04')
    {
        $("#other_fourth_Trip").css("display","none") ;
        $("#othertrip_country4").val("");
        $("#othertrip_arrivaldate4").val("");
        $("#othertrip_departuredate4").val("");
        $("#othertripreason_ofvisit4").val("");
        other_trips('05');
    }
    else if(option==='5')
    {
        $("#other_fifth_Trip").css("display","block") ;
    }
     else if(option==='05')
    {
        $("#other_fifth_Trip").css("display","none") ;
        $("#othertrip_country5").val("");
        $("#othertrip_arrivaldate5").val("");
        $("#othertrip_departuredate5").val("");
        $("#othertripreason_ofvisit5").val("");
        
    }
}

function show_success_toast(message) {
    const Toast = swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000
    });
    
    Toast.fire({
        type: 'success',
        title: message,
    });
}

function doFormAction(form_data, isSubmitted) {
    const url = new URL(window.location.href);
    const formAction = url.searchParams.get('action');
    if (!isSubmitted) {
        if (formAction === 'new') {
            form_data.formAction = 'new';
            $.post({
                url : appLocation + '/form2/save',
                data : form_data,
                success : function(responseJSON) {
                    const formUID = responseJSON.data.formUID;
                    const location = window.location;
                    window.location.href = location.origin + location.pathname + '?action=update&formId=' + formUID;
                    $("#errors").css("display", "none");
                },
                error: function(xhr) {
                    if(xhr.status === 400) {
                        const errors = xhr.responseJSON.details;
                        $("#errors_list").empty();
                        $("#errors").css("display", "block");
                        errors.forEach(error => {
                            $("#errors_list").append('<li>' + error.message + '</li>');
                        });
                        $('html, body').animate({ scrollTop: $('#errors').offset().top }, 'slow');
                    }
                },
            });
        } else if (formAction === 'update') {
            form_data.formAction = 'update';
            const formId = url.searchParams.get('formId');
            form_data.UniqueID = formId;
            $.post({
                url : appLocation + '/form2/save',
                data : form_data,
                success : function(responseJSON) {
                    const formUID = responseJSON.data.formUID;
                    if (formUID) {
                        show_success_toast('Form saved successfully');
                    } else {
                        swal({
                            title: "Server Error",
                            text: "Some error occurred while saving form. Please try again later.",
                            icon: "warning",
                            buttons: true,
                            dangerMode: true,
                        });
                    }
                    $("#errors").css("display", "none");
                },
                error: function(xhr) {
                    if(xhr.status === 400) {
                        const errors = xhr.responseJSON.details;
                        $("#errors_list").empty();
                        $("#errors").css("display", "block");
                        errors.forEach(error => {
                            $("#errors_list").append('<li>' + error.message + '</li>');
                        });
                        $('html, body').animate({ scrollTop: $('#errors').offset().top }, 'slow');
                    }
                },
            });
        }
    } else {
        if (formAction === 'update') {
            const formId = url.searchParams.get('formId');
            form_data.UniqueID = formId;
        }
        form_data.formAction = 'submit';
        $.post({
            url : appLocation + '/form2/submit',
            data : form_data,
            success : function(responseJSON) {
                window.location.href = appLocation + '/user/dashboard';
                $("#errors").css("display", "none");
            },
            error: function(xhr) {
                if(xhr.status === 400) {
                    const errors = xhr.responseJSON.details;
                    $("#errors_list").empty();
                    $("#errors").css("display", "block");
                    errors.forEach(error => {
                        $("#errors_list").append('<li>' + error.message + '</li>');
                    });
                    $('html, body').animate({ scrollTop: $('#errors').offset().top }, 'slow');
                }
            },
        });
    }
}

function getFormInput() {
    var UniqueID                                = $('#Unique_id').val();
    
    var TT_1                                    = document.getElementById("Title");
    var TT_2                                    = TT_1.options[TT_1.selectedIndex];
    var Title                                   = $(TT_2).val();  
    
    var full_name                               = $('#full_name').val(); 
    var mobile_number                           = $('#mobile_number').val();
    var landline_no                             = $('#landline_no').val();
    var email_addr                              = $('#email_addr').val();
    var home_addr                               = $('#home_addr').val();
    var addr_move_indate                        = document.getElementById('addr_move_indate').value;
    
    var OO_1                                    = document.getElementById("house_ownrship");
    var OO_2                                    = OO_1.options[OO_1.selectedIndex];
    var house_ownrship                          = $(OO_2).val();
    
    var addr_while_visa                         = $('#addr_while_visa').val();
    var uk_addr                                 = $("input[name=uk_addr]:checked").val();
    var uk_addr_text_area                       = $('#uk_addr_text_area').val();
    
    var nationalities                           = $('#nationalities').val();
    var national_id                             = $('#national_id').val();
    var _other_names                            = $('#_other_names').val();
    var RS1                                     = document.getElementById("relationship_status");
    var RS2                                     = RS1.options[RS1.selectedIndex];
    var relationship_status                     = $(RS2).val();
    
    var any_convictions                         = $("input[name=any_convictions]:checked").val();
    var conviction_text_area                    = $('#conviction_text_area').val();
    
    var visa_refusals                           = $("input[name=visa_refusals]:checked").val();
    var visa_refusals_textarea                  = $('#visa_refusals_textarea').val();
    
    var medical                                 = $("input[name=medical]:checked").val();
    var medical_textarea                        = $('#medical_textarea').val();
    
    var uk_NINo                                 = $("input[name=uk_NINo]:checked").val();
    var uk_nino_textarea                        = $('#uk_nino_textarea').val();
    
    var anyarmedforces                          = $("input[name=anyarmedforces]:checked").val();
    var armedforces_textarea                    = $('#armedforces_textarea').val();
    
    var immediate_family                        = $("input[name=immediate_family]:checked").val();
    var immediate_family_textarea               = $('#immediate_family_textarea').val();
    
    var Proposaldate_UK_entry                   = document.getElementById('Proposaldate_UK_entry').value;
    
    var familymembertravelalong                 = $("input[name=familymembertravelalong]:checked").val();
    var family_member_travelalong_textarea      = $('#family_member_travelalong_textarea').val();
    
    var any_overseas_travel                     = $('#any_overseas_travel').val();
    
    var Departuredate_UK                        = document.getElementById('Departuredate_UK').value;
    var Returndate_UK                           = document.getElementById('Returndate_UK').value;
   
//family details    
    var fa_frst                                 = $('#fa_frst').val();
    var father_country_of_birth                 = $('#father_country_of_birth').val();
    var father_nationality                      = $('#father_nationality').val();
    var father_Secondnationality                = $('#father_Secondnationality').val();
    var father_DOB                              = document.getElementById('father_DOB').value;
    
    var mothers_f_na                            = $('#mothers_f_na').val();
    var mothersCountryofBirth                   = $('#mothersCountryofBirth').val();
    var mother_nationality                      = $('#mother_nationality').val();
    var mother_Secondnationality                = $('#mother_Secondnationality').val();
    var mother_DOB                              = document.getElementById('mother_DOB').value;
    
    var partner_fna                             = $('#partner_fna').val();
    var partner_countryofbirth                  = $('#partner_countryofbirth').val();
    var partner_nationlity                      = $('#partner_nationlity').val();
    var partner_Snationality                    = $('#partner_Snationality').val();
    var partner_DOB                             = document.getElementById('partner_DOB').value;
    
    var firstchild1                             = $("input[name=firstchild1]:checked").val();
    var child1_f_na                             = $('#child1_f_na').val();
    var child1_countryofbirth                   = $('#child1_countryofbirth').val();
    var child1_nationality                      = $('#child1_nationality').val();
    var child1_Snationality                     = $('#child1_Snationality').val();
    var child1_DOB                              = document.getElementById('child1_DOB').value;
    
    var child2_f_na                             = $('#child2_f_na').val();
    var child2_countryofbirth                   = $('#child2_countryofbirth').val();
    var child2_nationality                      = $('#child2_nationality').val();
    var child2_Snationality                     = $('#child2_Snationality').val();
    var child2_DOB                              = document.getElementById('child2_DOB').value;

//visits
    var visit                                   = $("input[name=visit]:checked").val();
    var UK_arrival_date1                        = document.getElementById('UK_arrival_date1').value;
    var UK_departure_date1                      = document.getElementById('UK_departure_date1').value;
    var RV11                                    = document.getElementById("reason_ofvisit1");
    var RV111                                   = RV11.options[RV11.selectedIndex];
    var reason_ofvisit1                         = $(RV111).val();
    
    var UK_arrival_date2                        = document.getElementById('UK_arrival_date2').value;
    var UK_departure_date2                      = document.getElementById('UK_departure_date2').value;
    var RV22                                    = document.getElementById("reason_ofvisit2");
    var RV222                                   = RV22.options[RV22.selectedIndex];
    var reason_ofvisit2                         = $(RV222).val();
    
    var UK_arrival_date3                        = document.getElementById('UK_arrival_date3').value;
    var UK_departure_date3                      = document.getElementById('UK_departure_date3').value;
    var RV33                                    = document.getElementById("reason_ofvisit3");
    var RV333                                   = RV33.options[RV33.selectedIndex];
    var reason_ofvisit3                         = $(RV333).val();
    
    var UK_arrival_date4                        = document.getElementById('UK_arrival_date4').value;
    var UK_departure_date4                      = document.getElementById('UK_departure_date4').value;
    var RV44                                    = document.getElementById("reason_ofvisit4");
    var RV444                                   = RV44.options[RV44.selectedIndex];
    var reason_ofvisit4                         = $(RV444).val();
    
    var UK_arrival_date5                        = document.getElementById('UK_arrival_date5').value;
    var UK_departure_date5                      = document.getElementById('UK_departure_date5').value;
    var RV55                                    = document.getElementById("reason_ofvisit5");
    var RV555                                   = RV55.options[RV55.selectedIndex];
    var reason_ofvisit5                         = $(RV555).val();
    
//trips    
    var trip                                    = $("input[name=TRIP]:checked").val();
    var country1                                = document.getElementById('country1').value;
    var date_arrival_country1                   = document.getElementById('date_arrival_country1').value;
    var date_departure_country1                 = document.getElementById('date_departure_country1').value;
    var TR11                                    = document.getElementById("tripreason_ofvisit1");
    var TR111                                   = TR11.options[TR11.selectedIndex];
    var tripreason_ofvisit1                     = $(TR111).val();
    
    var country2                                = document.getElementById('country2').value;
    var date_arrival_country2                   = document.getElementById('date_arrival_country2').value;
    var date_departure_country2                 = document.getElementById('date_departure_country2').value;
    var TR22                                    = document.getElementById("tripreason_ofvisit2");
    var TR222                                   = TR22.options[TR22.selectedIndex];
    var tripreason_ofvisit2                     = $(TR222).val();
    
    var country3                                = document.getElementById('country3').value;
    var date_arrival_country3                   = document.getElementById('date_arrival_country3').value;
    var date_departure_country3                 = document.getElementById('date_departure_country3').value;
    var TR33                                    = document.getElementById("tripreason_ofvisit3");
    var TR333                                   = TR33.options[TR33.selectedIndex];
    var tripreason_ofvisit3                     = $(TR333).val();
    
    var country4                                = document.getElementById('country4').value;
    var date_arrival_country4                   = document.getElementById('date_arrival_country4').value;
    var date_departure_country4                 = document.getElementById('date_departure_country4').value;
    var TR44                                    = document.getElementById("tripreason_ofvisit4");
    var TR444                                   = TR44.options[TR44.selectedIndex];
    var tripreason_ofvisit4                     = $(TR444).val();
    
    var country5                                = document.getElementById('country5').value;
    var date_arrival_country5                   = document.getElementById('date_arrival_country5').value;
    var date_departure_country5                 = document.getElementById('date_departure_country5').value;
    var TR55                                    = document.getElementById("tripreason_ofvisit5");
    var TR555                                   = TR55.options[TR55.selectedIndex];
    var tripreason_ofvisit5                     = $(TR555).val();
    
//Other trips
    var OTHER_TRIP                              = $("input[name=OTHER_TRIP]:checked").val();
    var othertrip_country1                      = document.getElementById('othertrip_country1').value;
    var othertrip_arrivaldate1                  = document.getElementById('othertrip_arrivaldate1').value;
    var othertrip_departuredate1                = document.getElementById('othertrip_departuredate1').value;
    var OR11                                    = document.getElementById("othertripreason_ofvisit1");
    var OR111                                   = OR11.options[OR11.selectedIndex];
    var othertripreason_ofvisit1                = $(OR111).val();
    
    var othertrip_country2                      = document.getElementById('othertrip_country2').value;
    var othertrip_arrivaldate2                  = document.getElementById('othertrip_arrivaldate2').value;
    var othertrip_departuredate2                = document.getElementById('othertrip_departuredate2').value;
    var OR22                                    = document.getElementById("othertripreason_ofvisit2");
    var OR222                                   = OR22.options[OR22.selectedIndex];
    var othertripreason_ofvisit2                = $(OR222).val();
    
    var othertrip_country3                      = document.getElementById('othertrip_country3').value;
    var othertrip_arrivaldate3                  = document.getElementById('othertrip_arrivaldate3').value;
    var othertrip_departuredate3                = document.getElementById('othertrip_departuredate3').value;
    var OR33                                    = document.getElementById("othertripreason_ofvisit3");
    var OR333                                   = OR33.options[OR33.selectedIndex];
    var othertripreason_ofvisit3                = $(OR333).val();
    
    var othertrip_country4                      = document.getElementById('othertrip_country4').value;
    var othertrip_arrivaldate4                  = document.getElementById('othertrip_arrivaldate4').value;
    var othertrip_departuredate4                = document.getElementById('othertrip_departuredate4').value;
    var OR44                                    = document.getElementById("othertripreason_ofvisit4");
    var OR444                                   = OR44.options[OR44.selectedIndex];
    var othertripreason_ofvisit4                = $(OR444).val();
    
    var othertrip_country5                      = document.getElementById('othertrip_country5').value;
    var othertrip_arrivaldate5                  = document.getElementById('othertrip_arrivaldate5').value;
    var othertrip_departuredate5                = document.getElementById('othertrip_departuredate5').value;
    var OR55                                    = document.getElementById("othertripreason_ofvisit5");
    var OR555                                   = OR55.options[OR55.selectedIndex];
    var othertripreason_ofvisit5                = $(OR555).val();
    
    //attachments data 
    // i didnt know how to save the file (png, pdf, other format on the server)
    
    var form_data = {
        UniqueID                            : UniqueID,
        Title                               : Title,
        full_name                           : full_name,
        mobile_number                       : mobile_number,
        landline_no                         : landline_no,
        email_addr                          : email_addr,
        home_addr                           : home_addr,
        addr_move_indate                    : addr_move_indate,
        house_ownrship                      : house_ownrship,
        addr_while_visa                     : addr_while_visa,
        uk_addr                             : uk_addr,
        uk_addr_text_area                   : uk_addr_text_area,
        nationalities                       : [nationalities],
        national_id                         : national_id,
        _other_names                        : _other_names,
        relationship_status                 : relationship_status,
        any_convictions                     : any_convictions,
        conviction_text_area                : conviction_text_area,
        visa_refusals                       : visa_refusals,
        visa_refusals_textarea              : visa_refusals_textarea,
        medical                             : medical,
        medical_textarea                    : medical_textarea,
        uk_NINo                             : uk_NINo,
        uk_nino_textarea                    : uk_nino_textarea,
        anyarmedforces                      : anyarmedforces,
        armedforces_textarea                : armedforces_textarea,
        immediate_family                    : immediate_family,
        immediate_family_textarea           : immediate_family_textarea,
        Proposaldate_UK_entry               : Proposaldate_UK_entry,
        familymembertravelalong             : familymembertravelalong,
        family_member_travelalong_textarea  : family_member_travelalong_textarea,
        any_overseas_travel                 : any_overseas_travel,
        Departuredate_UK                    : Departuredate_UK,
        Returndate_UK                       : Returndate_UK,

        fa_frst                             : fa_frst,
        father_country_of_birth             : father_country_of_birth,
        father_nationality                  : [father_nationality],
        father_Secondnationality            : [father_Secondnationality],
        father_DOB                          : father_DOB,
        
        mothers_f_na                        : mothers_f_na,
        mothersCountryofBirth               : mothersCountryofBirth,
        mother_nationality                  : [mother_nationality],
        mother_Secondnationality            : [mother_Secondnationality],
        mother_DOB                          : mother_DOB,

        partner_fna                         : partner_fna,
        partner_countryofbirth              : partner_countryofbirth,
        partner_nationlity                  : [partner_nationlity],
        partner_Snationality                : [partner_Snationality],
        partner_DOB                         : partner_DOB,
        
        firstchild1                         : firstchild1,
        child1_f_na                         : child1_f_na,
        child1_countryofbirth               : child1_countryofbirth,
        child1_nationality                  : [child1_nationality],
        child1_Snationality                 : [child1_Snationality],
        child1_DOB                          : child1_DOB,

        child2_f_na                         : child2_f_na,
        child2_countryofbirth               : child2_countryofbirth,
        child2_nationality                  : [child2_nationality],
        child2_Snationality                 : [child2_Snationality],
        child2_DOB                          : child2_DOB,

        visit                               : visit,
        visitInfo                           : [
                                                {
                                                    country: 'UK',
                                                    arrivalDate: UK_arrival_date1,
                                                    departureDate: UK_departure_date1,
                                                    reasonInfo: reason_ofvisit1,
                                                },
                                                {
                                                    country: 'UK',
                                                    arrivalDate: UK_arrival_date2,
                                                    departureDate: UK_departure_date2,
                                                    reasonInfo: reason_ofvisit2,
                                                },
                                                {
                                                    country: 'UK',
                                                    arrivalDate: UK_arrival_date3,
                                                    departureDate: UK_departure_date3,
                                                    reasonInfo: reason_ofvisit3,
                                                },
                                                {
                                                    country: 'UK',
                                                    arrivalDate: UK_arrival_date4,
                                                    departureDate: UK_departure_date4,
                                                    reasonInfo: reason_ofvisit4,
                                                },
                                                {
                                                    country: 'UK',
                                                    arrivalDate: UK_arrival_date5,
                                                    departureDate: UK_departure_date5,
                                                    reasonInfo: reason_ofvisit5,
                                                },
                                            ],

        trip                                : trip,
        tripInfo                            : [
                                                {
                                                    country: country1,
                                                    arrivalDate: date_arrival_country1,
                                                    departureDate: date_departure_country1,
                                                    reasonInfo: tripreason_ofvisit1,
                                                },
                                                {
                                                    country: country2,
                                                    arrivalDate: date_arrival_country2,
                                                    departureDate: date_departure_country2,
                                                    reasonInfo: tripreason_ofvisit2,
                                                },
                                                {
                                                    country: country3,
                                                    arrivalDate: date_arrival_country3,
                                                    departureDate: date_departure_country3,
                                                    reasonInfo: tripreason_ofvisit3,
                                                },
                                                {
                                                    country: country4,
                                                    arrivalDate: date_arrival_country4,
                                                    departureDate: date_departure_country4,
                                                    reasonInfo: tripreason_ofvisit4,
                                                },
                                                {
                                                    country: country5,
                                                    arrivalDate: date_arrival_country5,
                                                    departureDate: date_departure_country5,
                                                    reasonInfo: tripreason_ofvisit5,
                                                },
                                            ],

        other_trip                          : OTHER_TRIP,
        otherTripInfo                       : [
                                                {
                                                    country: othertrip_country1,
                                                    arrivalDate: othertrip_arrivaldate1,
                                                    departureDate: othertrip_departuredate1,
                                                    reasonInfo: othertripreason_ofvisit1,
                                                },
                                                {
                                                    country: othertrip_country2,
                                                    arrivalDate: othertrip_arrivaldate2,
                                                    departureDate: othertrip_departuredate2,
                                                    reasonInfo: othertripreason_ofvisit2,
                                                },
                                                {
                                                    country: othertrip_country3,
                                                    arrivalDate: othertrip_arrivaldate3,
                                                    departureDate: othertrip_departuredate3,
                                                    reasonInfo: othertripreason_ofvisit3,
                                                },
                                                {
                                                    country: othertrip_country4,
                                                    arrivalDate: othertrip_arrivaldate4,
                                                    departureDate: othertrip_departuredate4,
                                                    reasonInfo: othertripreason_ofvisit4,
                                                },
                                                {
                                                    country: othertrip_country5,
                                                    arrivalDate: othertrip_arrivaldate5,
                                                    departureDate: othertrip_departuredate5,
                                                    reasonInfo: othertripreason_ofvisit5,
                                                },
                                            ],
    };

    /*
    var uk_visa_photo               = $('#uk_visa_photo').prop('files')[0]; 
    var passport_front_page         = $('#passport_front_page').prop('files')[0];  
    var secondpassport_front_page   = $('#secondpassport_front_page').prop('files')[0];  
    var previous_uk_visa            = $('#previous_uk_visa').prop('files')[0];   

    
    form_data.append('UniqueID', UniqueID);
    form_data.append('Title', Title);
    form_data.append('full_name', full_name);
    form_data.append('mobile_number', mobile_number);
    form_data.append('landline_no', landline_no);
    form_data.append('email_addr', email_addr);
    form_data.append('home_addr', home_addr);
    form_data.append('addr_move_indate', addr_move_indate);
    form_data.append('house_ownrship', house_ownrship);
    form_data.append('addr_while_visa', addr_while_visa);
    form_data.append('uk_addr', uk_addr);
    form_data.append('uk_addr_text_area', uk_addr_text_area);    
    form_data.append('nationalities', [nationalities]);
    form_data.append('national_id', national_id); 
    form_data.append('_other_names', _other_names);
    form_data.append('relationship_status', relationship_status);
    form_data.append('any_convictions', any_convictions);
    form_data.append('conviction_text_area', conviction_text_area);
    form_data.append('visa_refusals', visa_refusals);
    form_data.append('visa_refusals_textarea', visa_refusals_textarea);
    form_data.append('medical', medical);
    form_data.append('medical_textarea', medical_textarea);
    form_data.append('uk_NINo', uk_NINo);
    form_data.append('uk_nino_textarea', uk_nino_textarea);
    form_data.append('anyarmedforces', anyarmedforces);
    form_data.append('armedforces_textarea', armedforces_textarea);    
    form_data.append('immediate_family', immediate_family);
    form_data.append('immediate_family_textarea', immediate_family_textarea); 
    form_data.append('Proposaldate_UK_entry', Proposaldate_UK_entry);
    form_data.append('familymembertravelalong', familymembertravelalong);
    form_data.append('family_member_travelalong_textarea', family_member_travelalong_textarea);
    form_data.append('any_overseas_travel', any_overseas_travel);    
    form_data.append('Departuredate_UK', Departuredate_UK);
    form_data.append('Returndate_UK', Returndate_UK); 

    form_data.append('fa_frst', fa_frst);
    form_data.append('father_country_of_birth', father_country_of_birth);
    form_data.append('father_nationality', [father_nationality]);
    form_data.append('father_Secondnationality', [father_Secondnationality]);
    form_data.append('father_DOB', father_DOB);

    form_data.append('mothers_f_na', mothers_f_na);
    form_data.append('mothersCountryofBirth', mothersCountryofBirth);
    form_data.append('mother_nationality', [mother_nationality]);
    form_data.append('mother_Secondnationality', [mother_Secondnationality]);
    form_data.append('mother_DOB', mother_DOB);

    form_data.append('partner_fna', partner_fna);
    form_data.append('partner_countryofbirth', partner_countryofbirth);
    form_data.append('partner_nationlity', [partner_nationlity]);
    form_data.append('partner_Snationality', [partner_Snationality]);
    form_data.append('partner_DOB', partner_DOB);
    
    form_data.append('firstchild1', firstchild1);
    form_data.append('child1_f_na', child1_f_na);
    form_data.append('child1_countryofbirth', child1_countryofbirth);
    form_data.append('child1_nationality', [child1_nationality]);
    form_data.append('child1_Snationality', [child1_Snationality]);
    form_data.append('child1_DOB', child1_DOB);

    form_data.append('child2_f_na', child2_f_na);
    form_data.append('child2_countryofbirth', child2_countryofbirth);
    form_data.append('child2_nationality', [child2_nationality]);
    form_data.append('child2_Snationality', [child2_Snationality]);
    form_data.append('child2_DOB', child2_DOB);

    form_data.append('visit', visit);
    form_data.append('visitInfo', [
                                    {
                                        country: 'UK',
                                        arrivalDate: UK_arrival_date1,
                                        departureDate: UK_departure_date1,
                                        reasonInfo: reason_ofvisit1,
                                    },
                                    {
                                        country: 'UK',
                                        arrivalDate: UK_arrival_date2,
                                        departureDate: UK_departure_date2,
                                        reasonInfo: reason_ofvisit2,
                                    },
                                    {
                                        country: 'UK',
                                        arrivalDate: UK_arrival_date3,
                                        departureDate: UK_departure_date3,
                                        reasonInfo: reason_ofvisit3,
                                    },
                                    {
                                        country: 'UK',
                                        arrivalDate: UK_arrival_date4,
                                        departureDate: UK_departure_date4,
                                        reasonInfo: reason_ofvisit4,
                                    },
                                    {
                                        country: 'UK',
                                        arrivalDate: UK_arrival_date5,
                                        departureDate: UK_departure_date5,
                                        reasonInfo: reason_ofvisit5,
                                    },
                                ] );

    form_data.append('trip', trip);
    form_data.append('tripInfo', [
                                    {
                                        country: country1,
                                        arrivalDate: date_arrival_country1,
                                        departureDate: date_departure_country1,
                                        reasonInfo: tripreason_ofvisit1,
                                    },
                                    {
                                        country: country2,
                                        arrivalDate: date_arrival_country2,
                                        departureDate: date_departure_country2,
                                        reasonInfo: tripreason_ofvisit2,
                                    },
                                    {
                                        country: country3,
                                        arrivalDate: date_arrival_country3,
                                        departureDate: date_departure_country3,
                                        reasonInfo: tripreason_ofvisit3,
                                    },
                                    {
                                        country: country4,
                                        arrivalDate: date_arrival_country4,
                                        departureDate: date_departure_country4,
                                        reasonInfo: tripreason_ofvisit4,
                                    },
                                    {
                                        country: country5,
                                        arrivalDate: date_arrival_country5,
                                        departureDate: date_departure_country5,
                                        reasonInfo: tripreason_ofvisit5,
                                    },
                                ]);

    form_data.append('other_trip', other_trip);
    form_data.append('otherTripInfo', [  
                                    {
                                        country: othertrip_country1,
                                        arrivalDate: othertrip_arrivaldate1,
                                        departureDate: othertrip_departuredate1,
                                        reasonInfo: othertripreason_ofvisit1,
                                    },
                                    {
                                        country: othertrip_country2,
                                        arrivalDate: othertrip_arrivaldate2,
                                        departureDate: othertrip_departuredate2,
                                        reasonInfo: othertripreason_ofvisit2,
                                    },
                                    {
                                        country: othertrip_country3,
                                        arrivalDate: othertrip_arrivaldate3,
                                        departureDate: othertrip_departuredate3,
                                        reasonInfo: othertripreason_ofvisit3,
                                    },
                                    {
                                        country: othertrip_country4,
                                        arrivalDate: othertrip_arrivaldate4,
                                        departureDate: othertrip_departuredate4,
                                        reasonInfo: othertripreason_ofvisit4,
                                    },
                                    {
                                        country: othertrip_country5,
                                        arrivalDate: othertrip_arrivaldate5,
                                        departureDate: othertrip_departuredate5,
                                        reasonInfo: othertripreason_ofvisit5,
                                    },
                                ]);
                                  


    form_data.append('file', uk_visa_photo);
    form_data.append('file', passport_front_page);
    form_data.append('file', secondpassport_front_page);
    form_data.append('file', previous_uk_visa);

    alert(form_data); 

*/
    return form_data;
}

function form_submit()
{
    const form_data = getFormInput();
    console.log('FORM-DATA', form_data);
    doFormAction(form_data, true);

    $.post({
        url : appLocation + '/form2/save',
        data : form_data,
        success : function(responseText) {
            $("#errors").css("display", "none");
            console.log("responseText: "+responseText);
            swal({
                html: 'Success!\n\
                     <br>',
                type: 'success',
                confirmButtonText: 'Dismiss',
                cancelButtonText: "CANCEL"
            });
        },
        error: function(xhr) {
            if(xhr.status === 400) {
                const errors = xhr.responseJSON.details;
                
                $("#errors_list").empty();
                $("#errors").css("display", "block");
                errors.forEach(error => {
                    $("#errors_list").append('<li>' + error.message + '</li>');
                });
                $('html, body').animate({ scrollTop: $('#errors').offset().top }, 'slow');
            }
            console.log(xhr);
        },
    });
}

function form_save()
{
    const form_data = getFormInput();
    doFormAction(form_data, false);    
}
