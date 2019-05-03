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
        $('#overlay1').show();
        $('#img').show();
        const formId = url.searchParams.get('formId');
        
        $.post({
            url : appLocation + '/form2/getFormData',
            data : { formId: formId },
            success : function(response) {
                const currentFormStatus = response.formStatus;
                $("#errors").css("display", "none");
                console.log(response);

                $('#Unique_id').val();
                $('#Title').val(response.title);
                $('#formRefNumber').text("Reference number: "+'#'.concat(response.formReferenceNumber));
    
                $('#full_name').val(response.fullName); 
                $('#mobile_number').val(response.mobile);
                $('#landline_no').val(response.landline);
                $('#email_addr').val(response.email);
                $('#home_addr').val(response.homeAddress);
                $('#addr_move_indate').val(response.moveInDate);
                $('#house_ownrship').val(response.homeOwnership);

                $('#addr_while_visa').val(response.addressOnVisa);

// for ukAddressInfo--- enter ukAddressInfo text-area value by default, show text area on condition
                $('#uk_addr_text_area').val(response.ukAddressInfo);
                var $radios = $('input:radio[name=uk_addr]');
                if($radios.is(':checked') === false) {
                    $radios.filter('[value='+ response.ifUKaddress +']').prop('checked', true);
                }
                if(response.ifUKaddress==='Yes')
                {   $('#uk_addr_text_area').css("display","block");
                }else{
                    $('#uk_addr_text_area').css("display","none");
                }
                
                $('#nationalities').val(response.nationalities);
                $('#national_id').val(response.nationalIdentityNumber); 
                $('#_other_names').val(response.otherNames);
                $('#relationship_status').val(response.relationship);
                $('#Proposaldate_UK_entry').val(response.ukEntryDate);

// for convictions--- enter conviction text-area value by default, show text area on condition
                $('#conviction_text_area').val(response.convictionText);
                var $radios = $('input:radio[name=any_convictions]');
                if($radios.is(':checked') === false) {
                    $radios.filter('[value='+ response.conviction +']').prop('checked', true);
                }
                if(response.conviction==='Yes')
                {   $("#conviction_text_area").css("display","block");
                }else{
                    $("#conviction_text_area").css("display","none");
                }

// for visa refusal--- enter visal refusal text-area value by default, show text area on condition
                $('#visa_refusals_textarea').val(response.visaRefusalText);
                var $radios = $('input:radio[name=visa_refusals]');
                if($radios.is(':checked') === false) {
                    $radios.filter('[value='+ response.visaRefusal +']').prop('checked', true);
                }
                if (response.visaRefusal === 'Yes')
                {
                    $("#visa_refusals_textarea").css("display","block");
                }
                else{
                    $("#visa_refusals_textarea").css("display","none");
                }

// for Medical treatment--- enter visa refusal text-area value by default, show text area on condition
                $('#medical_textarea').val(response.medicalText);
                var $radios = $('input:radio[name=medical]');
                if($radios.is(':checked') === false) {
                    $radios.filter('[value='+ response.medical +']').prop('checked', true);
                }
                if (response.medical === 'Yes')
                {
                    $("#medical_textarea").css("display","block");
                }
                else{
                    $("#medical_textarea").css("display","none");
                }

// for UK nino--- enter UK nino text-area value by default, show text area on condition
                $('#uk_nino_textarea').val(response.nationalInsuranceNumber);
                var $radios = $('input:radio[name=uk_NINo]');
                if($radios.is(':checked') === false) {
                    $radios.filter('[value='+ response.ukNino +']').prop('checked', true);
                }
                if (response.ukNino === 'Yes')
                {
                    $("#uk_nino_textarea").css("display","block");
                }
                else{
                    $("#uk_nino_textarea").css("display","none");
                }

// for Armed forces--- enter Armed forces text-area value by default, show text area on condition
                $('#armedforces_textarea').val(response.armedForcesText);
                var $radios = $('input:radio[name=anyarmedforces]');
                if($radios.is(':checked') === false) {
                    $radios.filter('[value='+ response.armedForces +']').prop('checked', true);
                }
                if (response.armedForces === 'Yes')
                {
                    $("#armedforces_textarea").css("display","block");
                }
                else{
                    $("#armedforces_textarea").css("display","none");
                }

// for immediate family--- enter immediate family text-area value by default, show text area on condition
                $('#immediate_family_textarea').val(response.immediateFamilyText);
                var $radios = $('input:radio[name=immediate_family]');
                if($radios.is(':checked') === false) {
                    $radios.filter('[value='+ response.immediateFamily +']').prop('checked', true);
                }
                if (response.immediateFamily === 'Yes')
                {
                    $("#immediate_family_textarea").css("display","block");
                }
                else{
                    $("#immediate_family_textarea").css("display","none");
                }

// for any travelalong family--- enter any travelalong family text-area value by default, show text area on condition
                $('#family_member_travelalong_textarea').val(response.familyMemberTravelAlongText);
                var $radios = $('input:radio[name=familymembertravelalong]');
                if($radios.is(':checked') === false) {
                    $radios.filter('[value='+ response.familyMemberTravelAlong +']').prop('checked', true);
                }
                if (response.familyMemberTravelAlong === 'Yes')
                {
                    $("#family_member_travelalong_textarea").css("display","block");
                }
                else{
                    $("#family_member_travelalong_textarea").css("display","none");
                }                


                $('#any_overseas_travel').val(response.overseasTravel);
                $('#Departuredate_UK').val(response.ukNextDepartureDate);
                $('#Returndate_UK').val(response.ukNextArrivalDate);

              
                $('#fa_frst').val(response.fatherFullName);  
                $('#father_country_of_birth').val(response.fatherCountryOfBirth); 
                $('#father_nationality').val(response.fatherNationality);
                $('#father_Secondnationality').val(response.fatherAlternateNationality);
                $('#father_DOB').val(response.fatherDateOfBirth);

                $('#mothers_f_na').val(response.motherFullName);
                $('#mothersCountryofBirth').val(response.motherCountryOfBirth); 
                $('#mother_nationality').val(response.motherNationality);
                $('#mother_Secondnationality').val(response.motherAlternateNationality);
                $('#mother_DOB').val(response.motherDateOfBirth);

                $('#partner_fna').val(response.partnerFullName);
                $('#partner_countryofbirth').val(response.partnerPlaceOfBirth); 
                $('#partner_nationlity').val(response.partnerNationalities);
                $('#partner_Snationality').val(response.partnerAlternateNationality);
                $('#partner_DOB').val(response.partnerDateOfBirth);

// for children
                $('#child1_f_na').val(response.child1FullName); 
                $('#child1_countryofbirth').val(response.child1CountryOfBirth);
                $('#child1_nationality').val(response.child1Nationalitites);
                $('#child1_Snationality').val(response.child1AlternateNationality);
                $('#child1_DOB').val(response.child1DateOfBirth);

                $('#child2_f_na').val(response.child2FullName); 
                $('#child2_countryofbirth').val(response.child2CountryOfBirth);
                $('#child2_nationality').val(response.child2Nationalitites);
                $('#child2_Snationality').val(response.child2AlternateNationality);
                $('#child2_DOB').val(response.child2DateOfBirth);

                var $radios = $('input:radio[name=firstchild1]');
                if($radios.is(':checked') === false) {
                    $radios.filter('[value='+ response.anyChildren +']').prop('checked', true);
                }
                if (response.anyChildren === 'Yes') {
                    $("#firstchild_condition").text("	Your Children"); 
                    $("#childern_details1").css("display","block");
                } else {
                    $("#firstchild_condition").text("4.	Your Children"); 
                    $("#childern_details1").css("display","none");
                }

                if (response.child2FullName) {
                    $("#children_details2").css("display","block");
                } else {
                    $("#children_details2").css("display","none");
                }

// visits

                $("#UK_arrival_date1").val(response.visitInfo[0].arrivalDate); 
                $("#UK_departure_date1").val(response.visitInfo[0].departureDate); 
                $("#reason_ofvisit1").val(response.visitInfo[0].reasonInfo); 
                if(response.visitInfo[0].arrivalDate || response.visitInfo[0].departureDate ){
                    $("input[name='visit'][value='Yes']").prop('checked', true);
                    $("#first_visit").css("display","block");
                }else{
                    $("input[name='visit'][value='No']").prop('checked', true);
                    $("#first_visit").css("display","none");
                }

                $("#UK_arrival_date2").val(response.visitInfo[1].arrivalDate); 
                $("#UK_departure_date2").val(response.visitInfo[1].departureDate); 
                $("#reason_ofvisit2").val(response.visitInfo[1].reasonInfo); 
                if(response.visitInfo[1].arrivalDate || response.visitInfo[1].departureDate ){
                    $("#second_visit").css("display","block");
                }else{
                    $("#second_visit").css("display","none");
                }

                $("#UK_arrival_date3").val(response.visitInfo[2].arrivalDate); 
                $("#UK_departure_date3").val(response.visitInfo[2].departureDate); 
                $("#reason_ofvisit3").val(response.visitInfo[2].reasonInfo); 
                if(response.visitInfo[2].arrivalDate || response.visitInfo[2].departureDate ){
                    $("#third_visit").css("display","block");
                }else{
                    $("#third_visit").css("display","none");
                }

                $("#UK_arrival_date4").val(response.visitInfo[3].arrivalDate); 
                $("#UK_departure_date4").val(response.visitInfo[3].departureDate); 
                $("#reason_ofvisit4").val(response.visitInfo[3].reasonInfo); 
                if(response.visitInfo[3].arrivalDate || response.visitInfo[3].departureDate ){
                    $("#fourth_visit").css("display","block");
                }else{
                    $("#fourth_visit").css("display","none");
                }

                $("#UK_arrival_date5").val(response.visitInfo[4].arrivalDate); 
                $("#UK_departure_date5").val(response.visitInfo[4].departureDate); 
                $("#reason_ofvisit5").val(response.visitInfo[4].reasonInfo); 
                if(response.visitInfo[4].arrivalDate || response.visitInfo[4].departureDate ){
                    $("#fifth_visit").css("display","block");
                }else{
                    $("#fifth_visit").css("display","none");
                }

//trips

                $("#country1").val(response.tripInfo[0].country);
                $("#date_arrival_country1").val(response.tripInfo[0].arrivalDate);
                $("#date_departure_country1").val(response.tripInfo[0].departureDate);
                $("#tripreason_ofvisit1").val(response.tripInfo[0].reasonInfo);

                if(response.tripInfo[0].arrivalDate || response.tripInfo[0].departureDate ){
                    $("input[name='TRIP'][value='Yes']").prop('checked', true);
                    $("#first_Trip").css("display","block");
                }else{
                    $("input[name='TRIP'][value='No']").prop('checked', true);
                    $("#first_Trip").css("display","none");
                }

                $("#country2").val(response.tripInfo[1].country);
                $("#date_arrival_country2").val(response.tripInfo[1].arrivalDate);
                $("#date_departure_country2").val(response.tripInfo[1].departureDate);
                $("#tripreason_ofvisit2").val(response.tripInfo[1].reasonInfo);
                
                if(response.tripInfo[1].arrivalDate || response.tripInfo[1].departureDate ){
                    $("#second_Trip").css("display","block");
                }else{
                    $("#second_Trip").css("display","none");
                }

                $("#country3").val(response.tripInfo[2].country);
                $("#date_arrival_country3").val(response.tripInfo[2].arrivalDate);
                $("#date_departure_country3").val(response.tripInfo[2].departureDate);
                $("#tripreason_ofvisit3").val(response.tripInfo[2].reasonInfo);
                
                if(response.tripInfo[2].arrivalDate || response.tripInfo[2].departureDate ){
                    $("#third_Trip").css("display","block");
                }else{
                    $("#third_Trip").css("display","none");
                }

                $("#country4").val(response.tripInfo[3].country);
                $("#date_arrival_country4").val(response.tripInfo[3].arrivalDate);
                $("#date_departure_country4").val(response.tripInfo[3].departureDate);
                $("#tripreason_ofvisit4").val(response.tripInfo[3].reasonInfo);
                
                if(response.tripInfo[3].arrivalDate || response.tripInfo[3].departureDate ){
                    $("#fourth_Trip").css("display","block");
                }else{
                    $("#fourth_Trip").css("display","none");
                }

                $("#country5").val(response.tripInfo[4].country);
                $("#date_arrival_country5").val(response.tripInfo[4].arrivalDate);
                $("#date_departure_country5").val(response.tripInfo[4].departureDate);
                $("#tripreason_ofvisit5").val(response.tripInfo[4].reasonInfo);
                
                if(response.tripInfo[4].arrivalDate || response.tripInfo[4].departureDate ){
                    $("#fifth_Trip").css("display","block");
                }else{
                    $("#fifth_Trip").css("display","none");
                }


//other trips

                $("#othertrip_country1").val(response.otherTripInfo[0].country);
                $("#othertrip_arrivaldate1").val(response.otherTripInfo[0].arrivalDate);
                $("#othertrip_departuredate1").val(response.otherTripInfo[0].departureDate);
                $("#othertripreason_ofvisit1").val(response.otherTripInfo[0].reasonInfo);

                if(response.otherTripInfo[0].arrivalDate || response.otherTripInfo[0].departureDate ){
                    $("input[name='OTHER_TRIP'][value='Yes']").prop('checked', true);
                    $("#other_first_Trip").css("display","block");
                }else{
                    $("input[name='OTHER_TRIP'][value='No']").prop('checked', true);
                    $("#other_first_Trip").css("display","none");
                }

                $("#othertrip_country2").val(response.otherTripInfo[1].country);
                $("#othertrip_arrivaldate2").val(response.otherTripInfo[1].arrivalDate);
                $("#othertrip_departuredate2").val(response.otherTripInfo[1].departureDate);
                $("#othertripreason_ofvisit2").val(response.otherTripInfo[1].reasonInfo);

                if(response.otherTripInfo[1].arrivalDate || response.otherTripInfo[1].departureDate ){
                    $("#other_second_Trip").css("display","block");
                }else{
                    $("#other_second_Trip").css("display","none");
                }

                $("#othertrip_country3").val(response.otherTripInfo[2].country);
                $("#othertrip_arrivaldate3").val(response.otherTripInfo[2].arrivalDate);
                $("#othertrip_departuredate3").val(response.otherTripInfo[2].departureDate);
                $("#othertripreason_ofvisit3").val(response.otherTripInfo[2].reasonInfo);

                if(response.otherTripInfo[2].arrivalDate || response.otherTripInfo[2].departureDate ){
                    $("#other_third_Trip").css("display","block");
                }else{
                    $("#other_third_Trip").css("display","none");
                }

                $("#othertrip_country4").val(response.otherTripInfo[3].country);
                $("#othertrip_arrivaldate4").val(response.otherTripInfo[3].arrivalDate);
                $("#othertrip_departuredate4").val(response.otherTripInfo[3].departureDate);
                $("#othertripreason_ofvisit4").val(response.otherTripInfo[3].reasonInfo);

                if(response.otherTripInfo[3].arrivalDate || response.otherTripInfo[3].departureDate ){
                    $("#other_fourth_Trip").css("display","block");
                }else{
                    $("#other_fourth_Trip").css("display","none");
                }

                $("#othertrip_country5").val(response.otherTripInfo[4].country);
                $("#othertrip_arrivaldate5").val(response.otherTripInfo[4].arrivalDate);
                $("#othertrip_departuredate5").val(response.otherTripInfo[4].departureDate);
                $("#othertripreason_ofvisit5").val(response.otherTripInfo[4].reasonInfo);

                if(response.otherTripInfo[4].arrivalDate || response.otherTripInfo[4].departureDate ){
                    $("#other_fifth_Trip").css("display","block");
                }else{
                    $("#other_fifth_Trip").css("display","none");
                }

//documents
                if(response.previous_uk_visa) {
                    $("#upload_div1").css("display","block");
                    $("#current_country_permit_photo_link").attr("href",response.current_visa_link);
                    $("#uploaded_current_country_permit_photo").val(response.current_visa);
                } else {
                    $("#upload_div1").css("display","none");
                }

                if(response.passport_front_link) {
                    $("#upload_div2").css("display","block");
                    $("#uploaded_passport_front_page_link").attr("href", response.passport_front_link);
                    $("#uploaded_passport_front_page").val(response.passport_front);
                } else {
                    $("#upload_div2").css("display","none");
                }

                if(response.passport_front_two_link) {
                    $("#upload_div3").css("display","block");
                    $("#uploaded_secondpassport_front_page_link").attr("href", response.passport_front_two_link);
                    $("#uploaded_secondpassport_front_page").val(response.passport_front_two);
                } else {
                    $("#upload_div3").css("display","none");
                }

                if(response.previous_uk_visa_link) {
                    $("#upload_div4").css("display","block");
                    $("#uploaded_previous_uk_visa_link").attr("href", response.previous_uk_visa_link);
                    $("#uploaded_previous_uk_visa").val(response.previous_uk_visa);
                } else {
                    $("#upload_div4").css("display","none");
                }

                if(currentFormStatus===3)
                {
                    formreadonly(); //hide submit and save option and make all fields readonly
                }

                $('#img').hide();
                $('#overlay1').hide();
    
            },
            error: function(xhr) {
                $('#img').hide();
                $('#overlay1').hide();
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
        $("#uk_addr_text_area").attr("required", "required");
    }
    else if(option==="no")
    {
        $("#uk_addr_text_area").css("display","none");
        $("#uk_addr_text_area").removeAttr("required", "required");
        $("#uk_addr_text_area").val("");
    }
}

//Convictions
function convictions(option)
{
    if(option==="yes")
    {
        $("#conviction_text_area").css("display","block");
        $("#conviction_text_area").attr("required", "required");
    }
    else if(option==="no")
    {
        $("#conviction_text_area").css("display","none");
        $("#conviction_text_area").removeAttr("required", "required");
        $("#conviction_text_area").val("");
    }
}

//visa refusals
function visa(option)
{
    if(option==="yes")
    {
        $("#visa_refusals_textarea").css("display","block");
        $("#visa_refusals_textarea").attr("required", "required");
    }
    else if(option==="no")
    {
        $("#visa_refusals_textarea").css("display","none");
        $("#visa_refusals_textarea").removeAttr("required", "required");
        $("#visa_refusals_textarea").val("");
    }
}

//medical treatment
function medical_treatment(option)
{
    if(option==="yes")
    {
        $("#medical_textarea").css("display","block");
        $("#medical_textarea").attr("required", "required");
    }
    else if(option==="no")
    {
        $("#medical_textarea").css("display","none");
        $("#medical_textarea").removeAttr("required", "required");
        $("#medical_textarea").val("");
    }
}

//UK NINo
function NINo(option)
{
    if(option==="yes")
    {
        $("#uk_nino_textarea").css("display","block");
        $("#uk_nino_textarea").attr("required", "required");
    }
    else if(option==="no")
    {
        $("#uk_nino_textarea").css("display","none");
        $("#uk_nino_textarea").removeAttr("required", "required");
        $("#uk_nino_textarea").val("");
    }
}

//armed forces
function armed_forces(option)
{
    if(option==="yes")
    {
        $("#armedforces_textarea").css("display","block");
        $("#armedforces_textarea").attr("required", "required");
    }
    else if(option==="no")
    {
        $("#armedforces_textarea").css("display","none");
        $("#armedforces_textarea").removeAttr("required", "required");
        $("#armedforces_textarea").val("");
    }
}

//uk immediate family
function UK_immediate_family(option)
{
    if(option==="yes")
    {
        $("#immediate_family_textarea").css("display","block");
        $("#immediate_family_textarea").attr("required", "required");
    }
    else if(option==="no")
    {
        $("#immediate_family_textarea").css("display","none");
        $("#immediate_family_textarea").removeAttr("required", "required");
        $("#immediate_family_textarea").val("");
    }
}


//family_member_travelalong
function family_member_travelalong(option)
{
    if(option==="yes")
    {
        $("#family_member_travelalong_textarea").css("display","block");
        $("#family_member_travelalong_textarea").attr("required", "required");
    }
    else if(option==="no")
    {
        $("#family_member_travelalong_textarea").css("display","none");
        $("#family_member_travelalong_textarea").removeAttr("required", "required");
        $("#family_member_travelalong_textarea").val("");
    }
}

function Child_options(option)
{
    if(option==='1')
    {
        $("#firstchild_condition").text("	Your Children");  
        $("#childern_details1").css("display","block");
        $("#child1_f_na").attr("required", "required"); 
        $("#child1_countryofbirth").attr("required", "required"); 
        $("#child1_nationality").attr("required", "required");
        $("#child1_Snationality").attr("required", "required"); 
        $("#child1_DOB").attr("required", "required");
    }
    else if(option==='01')
    {
        $("input[name='firstchild1'][value='No']").prop('checked', true);
        $("#firstchild_condition").text("4.	Your Children");  
        $("#childern_details1").css("display","none");
        $("#child1_f_na").val(""); 
        $("#child1_countryofbirth").val(""); 
        $("#child1_nationality").val("");
        $("#child1_Snationality").val(""); 
        $("#child1_DOB").val(""); 

        $("#child1_f_na").removeAttr("required", "required"); 
        $("#child1_countryofbirth").removeAttr("required", "required"); 
        $("#child1_nationality").removeAttr("required", "required");
        $("#child1_Snationality").removeAttr("required", "required"); 
        $("#child1_DOB").removeAttr("required", "required");

        Child_options('02');
    }
    else if(option==='2')
    {   
        $("#children_details2").css("display","block");
        $("#child2_f_na").attr("required", "required");
        $("#child2_countryofbirth").attr("required", "required"); 
        $("#child2_nationality").attr("required", "required");
        $("#child2_Snationality").attr("required", "required"); 
        $("#child2_DOB").attr("required", "required"); 
    }
    else if(option==='02')
    {   $("#children_details2").css("display","none");
        $("#child2_f_na").val(""); 
        $("#child2_countryofbirth").val(""); 
        $("#child2_nationality").val("");
        $("#child2_Snationality").val(""); 
        $("#child2_DOB").val(""); 

        $("#child2_f_na").removeAttr("required", "required"); 
        $("#child2_countryofbirth").removeAttr("required", "required"); 
        $("#child2_nationality").removeAttr("required", "required");
        $("#child2_Snationality").removeAttr("required", "required"); 
        $("#child2_DOB").removeAttr("required", "required");
    }
}

function visits(option)
{
    if(option==='1')
    {   
        $("#first_visit").css("display","block");
        $("#UK_arrival_date1").attr("required", "required"); 
        $("#UK_departure_date1").attr("required", "required"); 
        $("#reason_ofvisit1").attr("required", "required"); 
    }
    else if(option==='01')
    {    
        $("input[name='visit'][value='No']").prop('checked', true);

        $("#first_visit").css("display","none");
        $("#UK_arrival_date1").val('');
        $("#UK_departure_date1").val('');
        $("#reason_ofvisit1").val('');

        $("#UK_arrival_date1").removeAttr("required", "required");
        $("#UK_departure_date1").removeAttr("required", "required");
        $("#reason_ofvisit1").removeAttr("required", "required");

        visits('02');
    }
    else if(option==='2')
    {
        $("#second_visit").css("display","block");
        $("#UK_arrival_date2").attr("required", "required");
        $("#UK_departure_date2").attr("required", "required");
        $("#reason_ofvisit2").attr("required", "required");
    }
    else if(option==='02')
    {
        $("#second_visit").css("display","none");
        $("#UK_arrival_date2").val('');
        $("#UK_departure_date2").val('');
        $("#reason_ofvisit2").val('');

        $("#UK_arrival_date2").removeAttr("required", "required");
        $("#UK_departure_date2").removeAttr("required", "required");
        $("#reason_ofvisit2").removeAttr("required", "required");
        visits('03');
    }
    
    else if(option==='3')
    {
        $("#third_visit").css("display","block") ;
        $("#UK_arrival_date3").attr("required", "required");
        $("#UK_departure_date3").attr("required", "required");
        $("#reason_ofvisit3").attr("required", "required");
    }
    else if(option==='03')
    {
        $("#third_visit").css("display","none") ;
        $("#UK_arrival_date3").val('');
        $("#UK_departure_date3").val('');
        $("#reason_ofvisit3").val('');

        $("#UK_arrival_date3").removeAttr("required", "required");
        $("#UK_departure_date3").removeAttr("required", "required");
        $("#reason_ofvisit3").removeAttr("required", "required");
        visits('04');
    }
    else if(option==='4')
    {
        $("#fourth_visit").css("display","block");
        $("#UK_arrival_date4").attr("required", "required");
        $("#UK_departure_date4").attr("required", "required");
        $("#reason_ofvisit4").attr("required", "required");
    }
    else if(option==='04')
    {
        $("#fourth_visit").css("display","none") ;
        $("#UK_arrival_date4").val('');
        $("#UK_departure_date4").val('');
        $("#reason_ofvisit4").val('');

        $("#UK_arrival_date4").removeAttr("required", "required");
        $("#UK_departure_date4").removeAttr("required", "required");
        $("#reason_ofvisit4").removeAttr("required", "required");
        visits('05');
    }
    else if(option==='5')
    {
        $("#fifth_visit").css("display","block") ;
        $("#UK_arrival_date5").attr("required", "required");
        $("#UK_departure_date5").attr("required", "required");
        $("#reason_ofvisit5").attr("required", "required");
    }
    else if(option==='05')
    {
        $("#fifth_visit").css("display","none") ;
        $("#UK_arrival_date5").val('');
        $("#UK_departure_date5").val('');
        $("#reason_ofvisit5").val('');

        $("#UK_arrival_date5").removeAttr("required", "required");
        $("#UK_departure_date5").removeAttr("required", "required");
        $("#reason_ofvisit5").removeAttr("required", "required");
    }
}

    
function trips(option)
{
    if(option==='1')
    {   
        $("#first_Trip").css("display","block");
        $("#country1").attr("required", "required");
        $("#date_arrival_country1").attr("required", "required");
        $("#date_departure_country1").attr("required", "required");
        $("#tripreason_ofvisit1").attr("required", "required");

    }
    else if(option==='01')
    {    
        $("input[name='TRIP'][value='No']").prop('checked', true);

        $("#first_Trip").css("display","none");
        $("#country1").val("");
        $("#date_arrival_country1").val("");
        $("#date_departure_country1").val("");
        $("#tripreason_ofvisit1").val("");

        $("#country1").removeAttr("required", "required");
        $("#date_arrival_country1").removeAttr("required", "required");
        $("#date_departure_country1").removeAttr("required", "required");
        $("#tripreason_ofvisit1").removeAttr("required", "required");

        trips('02');

    }
    else if(option==='2')
    {
        $("#second_Trip").css("display","block");
        $("#country2").attr("required", "required");;
        $("#date_arrival_country2").attr("required", "required");
        $("#date_departure_country2").attr("required", "required");
        $("#tripreason_ofvisit2").attr("required", "required");
    }
    else if(option==='02')
    {
        $("#second_Trip").css("display","none") ;
        $("#country2").val("");
        $("#date_arrival_country2").val("");
        $("#date_departure_country2").val("");
        $("#tripreason_ofvisit2").val("");

        $("#country2").removeAttr("required", "required");
        $("#date_arrival_country2").removeAttr("required", "required");
        $("#date_departure_country2").removeAttr("required", "required");
        $("#tripreason_ofvisit2").removeAttr("required", "required");
        trips('03');
    }
    
    else if(option==='3')
    {
        $("#third_Trip").css("display","block");
        $("#country3").attr("required", "required");
        $("#date_arrival_country3").attr("required", "required");
        $("#date_departure_country3").attr("required", "required");
        $("#tripreason_ofvisit3").attr("required", "required");
    }
    else if(option==='03')
    {
        $("#third_Trip").css("display","none") ;
        $("#country3").val("");
        $("#date_arrival_country3").val("");
        $("#date_departure_country3").val("");
        $("#tripreason_ofvisit3").val("");

        $("#country3").removeAttr("required", "required");
        $("#date_arrival_country3").removeAttr("required", "required");
        $("#date_departure_country3").removeAttr("required", "required");
        $("#tripreason_ofvisit3").removeAttr("required", "required");
        trips('04');
    }
    else if(option==='4')
    {
        $("#fourth_Trip").css("display","block");
        $("#country4").attr("required", "required");
        $("#date_arrival_country4").attr("required", "required");
        $("#date_departure_country4").attr("required", "required");
        $("#tripreason_ofvisit4").attr("required", "required");
    }
    else if(option==='04')
    {
        $("#fourth_Trip").css("display","none") ;
        $("#country4").val("");
        $("#date_arrival_country4").val("");
        $("#date_departure_country4").val("");
        $("#tripreason_ofvisit4").val("");

        $("#country4").removeAttr("required", "required");
        $("#date_arrival_country4").removeAttr("required", "required");
        $("#date_departure_country4").removeAttr("required", "required");
        $("#tripreason_ofvisit4").removeAttr("required", "required");

        trips('05');
    }
    else if(option==='5')
    {
        $("#fifth_Trip").css("display","block");
        $("#country5").attr("required", "required");
        $("#date_arrival_country5").attr("required", "required");
        $("#date_departure_country5").attr("required", "required");
        $("#tripreason_ofvisit5").attr("required", "required");
    }
     else if(option==='05')
    {
        $("#fifth_Trip").css("display","none") ;
        $("#country5").val("");
        $("#date_arrival_country5").val("");
        $("#date_departure_country5").val("");
        $("#tripreason_ofvisit5").val("");

        $("#country5").removeAttr("required", "required");
        $("#date_arrival_country5").removeAttr("required", "required");
        $("#date_departure_country5").removeAttr("required", "required");
        $("#tripreason_ofvisit5").removeAttr("required", "required");
    }
}


function other_trips(option)
{
    if(option==='1')
    {   
        $("#other_first_Trip").css("display","block");
        $("#othertrip_country1").attr("required", "required");
        $("#othertrip_arrivaldate1").attr("required", "required");
        $("#othertrip_departuredate1").attr("required", "required");
        $("#othertripreason_ofvisit1").attr("required", "required");
    }
    else if(option==='01')
    {    
        $("input[name='OTHER_TRIP'][value='No']").prop('checked', true);

        $("#other_first_Trip").css("display","none");
        $("#othertrip_country1").val("");
        $("#othertrip_arrivaldate1").val("");
        $("#othertrip_departuredate1").val("");
        $("#othertripreason_ofvisit1").val("");

        $("#othertrip_country1").removeAttr("required", "required");
        $("#othertrip_arrivaldate1").removeAttr("required", "required");
        $("#othertrip_departuredate1").removeAttr("required", "required");
        $("#othertripreason_ofvisit1").removeAttr("required", "required");
        other_trips('02');
    }
    
    else if(option==='2')
    {
        $("#other_second_Trip").css("display","block");
        $("#othertrip_country2").attr("required", "required");
        $("#othertrip_arrivaldate2").attr("required", "required");
        $("#othertrip_departuredate2").attr("required", "required");
        $("#othertripreason_ofvisit2").attr("required", "required");
    }
    else if(option==='02')
    {
        $("#other_second_Trip").css("display","none");
        $("#othertrip_country2").val("");
        $("#othertrip_arrivaldate2").val("");
        $("#othertrip_departuredate2").val("");
        $("#othertripreason_ofvisit2").val("");

        $("#othertrip_country2").removeAttr("required", "required");
        $("#othertrip_arrivaldate2").removeAttr("required", "required");
        $("#othertrip_departuredate2").removeAttr("required", "required");
        $("#othertripreason_ofvisit2").removeAttr("required", "required");
        other_trips('03');
    }
    
    else if(option==='3')
    {
        $("#other_third_Trip").css("display","block");
        $("#othertrip_country3").attr("required", "required");
        $("#othertrip_arrivaldate3").attr("required", "required");
        $("#othertrip_departuredate3").attr("required", "required");
        $("#othertripreason_ofvisit3").attr("required", "required");
    }
    else if(option==='03')
    {
        $("#other_third_Trip").css("display","none") ;
        $("#othertrip_country3").val("");
        $("#othertrip_arrivaldate3").val("");
        $("#othertrip_departuredate3").val("");
        $("#othertripreason_ofvisit3").val("");

        $("#othertrip_country3").removeAttr("required", "required");
        $("#othertrip_arrivaldate3").removeAttr("required", "required");;
        $("#othertrip_departuredate3").removeAttr("required", "required");
        $("#othertripreason_ofvisit3").removeAttr("required", "required");
        other_trips('04');
    }
    else if(option==='4')
    {
        $("#other_fourth_Trip").css("display","block");
        $("#othertrip_country4").attr("required", "required");
        $("#othertrip_arrivaldate4").attr("required", "required");
        $("#othertrip_departuredate4").attr("required", "required");
        $("#othertripreason_ofvisit4").attr("required", "required");
    }
    else if(option==='04')
    {
        $("#other_fourth_Trip").css("display","none") ;
        $("#othertrip_country4").val("");
        $("#othertrip_arrivaldate4").val("");
        $("#othertrip_departuredate4").val("");
        $("#othertripreason_ofvisit4").val("");

        $("#othertrip_country4").removeAttr("required", "required");
        $("#othertrip_arrivaldate4").removeAttr("required", "required");
        $("#othertrip_departuredate4").removeAttr("required", "required");
        $("#othertripreason_ofvisit4").removeAttr("required", "required");
        other_trips('05');
    }
    else if(option==='5')
    {
        $("#other_fifth_Trip").css("display","block");
        $("#othertrip_country5").attr("required", "required");
        $("#othertrip_arrivaldate5").attr("required", "required");
        $("#othertrip_departuredate5").attr("required", "required");
        $("#othertripreason_ofvisit5").attr("required", "required");
    }
     else if(option==='05')
    {
        $("#other_fifth_Trip").css("display","none");
        $("#othertrip_country5").val("");
        $("#othertrip_arrivaldate5").val("");
        $("#othertrip_departuredate5").val("");
        $("#othertripreason_ofvisit5").val("");

        $("#othertrip_country5").removeAttr("required", "required");
        $("#othertrip_arrivaldate5").removeAttr("required", "required");
        $("#othertrip_departuredate5").removeAttr("required", "required");
        $("#othertripreason_ofvisit5").removeAttr("required", "required");
        
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
    $('#overlay1').show();
    $('#img').show();
    if (!isSubmitted) {
        if (formAction === 'new') {
            form_data.set('formAction', 'new');
            $.post({
                url : appLocation + '/form2/save',
                data : form_data,
                contentType: false,
                processData: false,
                success : function(responseJSON) {
                    const formUID = responseJSON.data.formUID;
                    const location = window.location;
                    window.location.href = location.origin + location.pathname + '?action=update&formId=' + formUID;
                    $("#errors").css("display", "none");
                    $('#img').hide();
                    $('#overlay1').hide();
                },
                error: function(xhr) {
                    if(xhr.status === 400) {
                        $('#img').hide();
                        $('#overlay1').hide();
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
            form_data.set('formAction', 'update');
            const formId = url.searchParams.get('formId');
            form_data.set('UniqueID', formId);
            $.post({
                url : appLocation + '/form2/save',
                data : form_data,
                contentType: false,
                processData: false,
                success : function(responseJSON) {
                    $('#img').hide();
                    $('#overlay1').hide();
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
                    $('#img').hide();
                    $('#overlay1').hide();
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
            form_data.set('UniqueID', formId);   
        }
        form_data.set('formAction', 'submit');
        $.post({
            url : appLocation + '/form2/submit',
            data : form_data,
            contentType: false,
            processData: false,
            success : function(responseJSON) {
                $('#img').hide();
                $('#overlay1').hide();
                window.location.href = appLocation + '/user/dashboard';
                $("#errors").css("display", "none");

                Swal.fire({
                    title: "Application submitted",
                    text: "Application has been formwarded to Newfields for futher process",
                    type: 'success',
                    confirmButtonText: 'Click to close window!'
                }).then((result) => {
                    if (result.value) {
                        close();    }
                    else{
                        formreadonly();
                    }
                });

            },
            error: function(xhr) {
                $('#img').hide();
                $('#overlay1').hide();
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

    var current_country_permit_photo               = $('#current_country_permit_photo').prop('files')[0]; 
    var passport_front_page         = $('#passport_front_page').prop('files')[0];  
    var secondpassport_front_page   = $('#secondpassport_front_page').prop('files')[0];  
    var previous_uk_visa            = $('#previous_uk_visa').prop('files')[0];

    var form_data = new FormData();
    
    form_data.set('UniqueID', UniqueID);
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
    form_data.append('visitInfo', JSON.stringify([
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
                                ]));

    form_data.append('trip', trip);
    form_data.append('tripInfo', JSON.stringify([
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
                                ]));

    form_data.append('other_trip', OTHER_TRIP);
    form_data.append('otherTripInfo', JSON.stringify([  
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
                                ]));
                                  


    form_data.append('current_country_permit_photo', current_country_permit_photo);
    form_data.append('passport_front_page', passport_front_page);
    form_data.append('secondpassport_front_page', secondpassport_front_page);
    form_data.append('previous_uk_visa', previous_uk_visa);


    return form_data;
}

function form_submit()
{
    $('#overlay1').show();
    $('#img').show();
    const form_data = getFormInput();
    console.log('FORM-DATA', form_data);
    doFormAction(form_data, true);
    
    $.post({
        url : appLocation + '/form2/save',
        data : form_data,
        success : function(responseText) {
            $('#img').hide();
            $('#overlay1').hide();
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
            $('#img').hide();
            $('#overlay1').hide();
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
    // // Display the key/value pairs
    // for(var pair of form_data.entries()) {
    //     console.log(pair[0]+ ', '+ pair[1]); 
    // }
    doFormAction(form_data, false);    
}


function formreadonly()
{
    $('#save_form').hide();
    $('#save_form1').hide();
    $('#submit_details').hide();

    $('#Title').prop('disabled', true);
    $('#full_name').prop('disabled', true);
    $('#mobile_number').prop('disabled', true);
    $('#landline_no').prop('disabled', true);
    $('#email_addr').prop('disabled', true);
    $('#home_addr').prop('disabled', true);
    $('#addr_move_indate').prop('disabled', true);
    $('#house_ownrship').prop('disabled', true);

    $('#addr_while_visa').prop('disabled', true);


    $('#uk_addr_text_area').prop('disabled', true);
    $('input:radio[name=uk_addr]').prop('disabled', true);;
   
    $('#nationalities').prop('disabled', true);
    $('#national_id').prop('disabled', true); 
    $('#_other_names').prop('disabled', true);
    $('#relationship_status').prop('disabled', true);
    $('#Proposaldate_UK_entry').prop('disabled', true);

    $('#conviction_text_area').prop('disabled', true);
    $('input:radio[name=any_convictions]').prop('disabled', true);
    
    $('#visa_refusals_textarea').prop('disabled', true);
    $('input:radio[name=visa_refusals]').prop('disabled', true);
    
    $('#medical_textarea').prop('disabled', true);
    $('input:radio[name=medical]').prop('disabled', true);

    $('#uk_nino_textarea').prop('disabled', true);
    $('input:radio[name=uk_NINo]').prop('disabled', true);


    $('#armedforces_textarea').prop('disabled', true);
    $('input:radio[name=anyarmedforces]').prop('disabled', true);

    $('#immediate_family_textarea').prop('disabled', true);
    $('input:radio[name=immediate_family]').prop('disabled', true);

    $('#family_member_travelalong_textarea').prop('disabled', true);
    $('input:radio[name=familymembertravelalong]').prop('disabled', true);
    
    $('#any_overseas_travel').prop('disabled', true);
    $('#Departuredate_UK').prop('disabled', true);
    $('#Returndate_UK').prop('disabled', true);

  
    $('#fa_frst').prop('disabled', true);
    $('#father_country_of_birth').prop('disabled', true);
    $('#father_nationality').prop('disabled', true);
    $('#father_Secondnationality').prop('disabled', true);
    $('#father_DOB').prop('disabled', true);

    $('#mothers_f_na').prop('disabled', true);
    $('#mothersCountryofBirth').prop('disabled', true);
    $('#mother_nationality').prop('disabled', true);
    $('#mother_Secondnationality').prop('disabled', true);
    $('#mother_DOB').prop('disabled', true);

    $('#partner_fna').prop('disabled', true);
    $('#partner_countryofbirth').prop('disabled', true);
    $('#partner_nationlity').prop('disabled', true);
    $('#partner_Snationality').prop('disabled', true);
    $('#partner_DOB').prop('disabled', true);

// for children
    $('input:radio[name=firstchild1]').prop('disabled', true);
    $('#child1_f_na').prop('disabled', true);
    $('#child1_countryofbirth').prop('disabled', true);
    $('#child1_nationality').prop('disabled', true);
    $('#child1_Snationality').prop('disabled', true);
    $('#child1_DOB').prop('disabled', true);

    $('#child2_f_na').prop('disabled', true);
    $('#child2_countryofbirth').prop('disabled', true);
    $('#child2_nationality').prop('disabled', true);
    $('#child2_Snationality').prop('disabled', true);
    $('#child2_DOB').prop('disabled', true);

    $("#childern_details1 :button").hide();
    $("#children_details2 :button").hide();


    

// visits
    $("input[name='visit']").prop('disabled', true);
    $("input[name='TRIP']").prop('disabled', true);
    $("input[name='OTHER_TRIP']").prop('disabled', true);

    $("#UK_arrival_date1").prop('disabled', true);
    $("#UK_departure_date1").prop('disabled', true); 
    $("#reason_ofvisit1").prop('disabled', true);
    
    $("#UK_arrival_date2").prop('disabled', true); 
    $("#UK_departure_date2").prop('disabled', true);
    $("#reason_ofvisit2").prop('disabled', true); 
    
    $("#UK_arrival_date3").prop('disabled', true);
    $("#UK_departure_date3").prop('disabled', true);
    $("#reason_ofvisit3").prop('disabled', true);
    
    $("#UK_arrival_date4").prop('disabled', true);
    $("#UK_departure_date4").prop('disabled', true);
    $("#reason_ofvisit4").prop('disabled', true);

    $("#UK_arrival_date5").prop('disabled', true);
    $("#UK_departure_date5").prop('disabled', true);
    $("#reason_ofvisit5").prop('disabled', true);

//trips

    $("#country1").prop('disabled', true);
    $("#date_arrival_country1").prop('disabled', true);
    $("#date_departure_country1").prop('disabled', true);
    $("#tripreason_ofvisit1").prop('disabled', true);

    $("#country2").prop('disabled', true);
    $("#date_arrival_country2").prop('disabled', true);
    $("#date_departure_country2").prop('disabled', true);
    $("#tripreason_ofvisit2").prop('disabled', true);
    
    $("#country3").prop('disabled', true);
    $("#date_arrival_country3").prop('disabled', true);
    $("#date_departure_country3").prop('disabled', true);
    $("#tripreason_ofvisit3").prop('disabled', true);
   
    $("#country4").prop('disabled', true);
    $("#date_arrival_country4").prop('disabled', true);
    $("#date_departure_country4").prop('disabled', true);
    $("#tripreason_ofvisit4").prop('disabled', true);
  
    $("#country5").prop('disabled', true);
    $("#date_arrival_country5").prop('disabled', true);
    $("#date_departure_country5").prop('disabled', true);
    $("#tripreason_ofvisit5").prop('disabled', true);
   
//other trips

    $("#othertrip_country1").prop('disabled', true);
    $("#othertrip_arrivaldate1").prop('disabled', true);
    $("#othertrip_departuredate1").prop('disabled', true);
    $("#othertripreason_ofvisit1").prop('disabled', true);

    $("#othertrip_country2").prop('disabled', true);
    $("#othertrip_arrivaldate2").prop('disabled', true);
    $("#othertrip_departuredate2").prop('disabled', true);
    $("#othertripreason_ofvisit2").prop('disabled', true);

    $("#othertrip_country3").prop('disabled', true);
    $("#othertrip_arrivaldate3").prop('disabled', true);
    $("#othertrip_departuredate3").prop('disabled', true);
    $("#othertripreason_ofvisit3").prop('disabled', true);

    $("#othertrip_country4").prop('disabled', true);
    $("#othertrip_arrivaldate4").prop('disabled', true);
    $("#othertrip_departuredate4").prop('disabled', true);
    $("#othertripreason_ofvisit4").prop('disabled', true);

    $("#othertrip_country5").prop('disabled', true);
    $("#othertrip_arrivaldate5").prop('disabled', true);
    $("#othertrip_departuredate5").prop('disabled', true);
    $("#othertripreason_ofvisit5").prop('disabled', true);

//disabling all visits, trips and other trips buttons

    $("#first_visit :button").hide();
    $("#second_visit :button").hide();
    $("#third_visit :button").hide();
    $("#fourth_visit :button").hide();
    $("#fifth_visit :button").hide();

    $("#first_Trip :button").hide();
    $("#second_Trip :button").hide();
    $("#third_Trip :button").hide();
    $("#fourth_Trip :button").hide();
    $("#fifth_Trip :button").hide();

    $("#other_first_Trip :button").hide();
    $("#other_second_Trip :button").hide();
    $("#other_third_Trip :button").hide();
    $("#other_fourth_Trip :button").hide();
    $("#other_fifth_Trip :button").hide();


//documents

    $('#current_country_permit_photo').hide(); 
    $('#passport_front_page').hide();
    $('#secondpassport_front_page').hide();
    $('#previous_uk_visa').hide();

    $("#uploaded_current_country_permit_photo").prop('disabled', true);;
    $("#uploaded_passport_front_page").prop('disabled', true);
    $("#uploaded_secondpassport_front_page").prop('disabled', true);
    $("#uploaded_previous_uk_visa").prop('disabled', true);
    
}