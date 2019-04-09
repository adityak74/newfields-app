/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
const appLocation = window.location.origin;

$(document).ready(function() {
    
    $("#email_address").on("change", validate);
    $("#demo").submit(function(){
        $('#myModal').modal('show');
           return false;
    });
//     $('#js-date').datepicker();
    
    $("#relationship_status").on('input', relationship_status);
    $("#add_children").on('click', add_children);
    $("#remove_children").on('click', remove_children);
    
//    $( ".datepicker" ).datepicker({
//        format: 'yyyy-mm-dd'
//     });
    
    // $("#Unique_id").val(md5(Date.now()));
    $("#date_UK_entry").datepicker({format: 'dd/mm/yyyy'});
    $("#next_planned_departure").datepicker({format: 'dd/mm/yyyy'});
    $("#UK_date_arrival_back").datepicker({format: 'dd/mm/yyyy'});
    $("#partner_dob").datepicker({format: 'dd/mm/yyyy'});
    $("#child1_dob").datepicker({format: 'dd/mm/yyyy'});
    $("#child2_dob").datepicker({format: 'dd/mm/yyyy'});

    const url = new URL(window.location.href);
    if (url.searchParams.get('formId')) {
        const formId = url.searchParams.get('formId');
        $.post({
            url : appLocation + '/form1/getFormData',
            data : { formId: formId },
            success : function(response) {
                $("#errors").css("display", "none");
                console.log(response);
          
                $('#Unique_id').val();
                $('#Title').val(response.title);
    
                $('#full_name').val(response.fullName); 
                $('#mobile_number').val(response.mobile);
                $('#address_line1').val(response.addressLine1);
                $('#address_line2').val(response.addressLine2);
                $('#town').val(response.town);
                $('#county').val(response.county);
                $('#postcode').val(response.postcode);
                $('#email_address').val(response.email);

                $('#relationship_status').val(response.relationship); 

                $('#nationalities').val(response.nationalities);
                $('#date_UK_entry').val(response.ukEntryDate);
                $('#conviction_text_area').val(response.conviction);
    
                $('#visa_refusals_textarea').val(response.visaRefusal);
    
                $('#details_public_funds').val(response.publicFunds); 
    
    
                $('#UK_NINo').val(response.nationalInsuranceNumber);
                $('#next_planned_departure').val(response.ukNextDepartureDate);
                $('#UK_date_arrival_back').val(response.ukNextArrivalDate);

                $('#partner_Title').val(response.partnerTitle);  
                
                $('#partner_full_name').val(response.partnerFullName); 
                $('#partner_mobile_number').val(response.partnerMobile);
                $('#partner_uk_home_address').val(response.partnerUKHomeAddress);
                $('#partner_nationalities').val(response.partnerNationalities);
                $('#partner_dob').val(response.partnerDateOfBirth);
                $('#partner_placeofbirth').val(response.partnerPlaceOfBirth);
            
                // commenting until I get data in
                // $('#child1_full_name').val(response.); 
                // $('#child1_nationalities').val(response.);
                // $('#child1_dob').val(response.);
                // $('#child1_placeofbirth').val(response.);
                
                // $('#child2_full_name').val(response.); 
                // $('#child2_nationalities').val(response.);
                // $('#child2_dob').val(response.);
                // $('#child2_placeofbirth').val(response.);
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

function show_date(option)
{
    if(option==="0")
    {   
        $("#date_UK_entry").datepicker('show');
    }
    else if(option==="1")
    {   
        $("#next_planned_departure").datepicker('show');
    }
    else if(option==="2")
    {   
        $("#UK_date_arrival_back").datepicker('show');
    }
    else if(option==="3")
    {   
        $("#partner_dob").datepicker('show');
    }
    else if(option==="4")
    {  
        $("#child1_dob").datepicker('show');
    }
    else if(option==="5")
    {   
        $("#child2_dob").datepicker('show');
    }
}

function relationship_status()
{
    var selected_status =$('#relationship_status :selected').text();
    
    if(selected_status==="Single")
    {
        $("#partner_details").css("display","none");
    }
    else{
        $("#partner_details").css("display","block");
    }
}

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

function radio_option(option)
{
    if(option==="yes")
    {
        $("#childern_details").css("display","block");
    }
    else if(option==="no")
    {
        $("#childern_details").css("display","none");
        $("#childern_details2").css("display","none");
    }
    
}

function add_children()
{
   // $("#remove_children").css("display","block"); 
    $("#childern_details2").css("display","block"); 
}

function remove_children()
{
    $("#childern_details2").css("display","none");
    //$("#remove_children").css("display","none"); 
    //value of input boxes should be null now
}



function radio_option1(option)
{
    if(option==="yes")
    {
        $("#radio_option_display1").css("display","block");
    }
    else if(option==="no")
    {
        $("#radio_option_display1").css("display","none");
    }
    
}

$(function () {
  $('[data-toggle="tooltip"]').tooltip();
});


function validate() 
{
    var email = $("#email_address").val();
    
    if (validateEmail(email)) 
    {
        $("#emailvalid0").css("display","block");
        $("#emailinvalid0").css("display","none");
    } 
    else 
    {
        $("#emailvalid0").css("display","none");
        $("#emailinvalid0").css("display","block");
    }
       
    return false;
}

function validateEmail(email) {
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
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
                url : appLocation + '/form1/save',
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
                url : appLocation + '/form1/save',
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
            url : appLocation + '/form1/submit',
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
    var UniqueID                = $('#Unique_id').val();
    var Title                   = $('#Title :selected').text();
    
    var full_name               = $('#full_name').val(); 
    var mobile_number           = $('#mobile_number').val();
    var address_line1           = $('#address_line1').val();
    var address_line2           = $('#address_line2').val();
    var town                    = $('#town').val();
    var county                  = $('#county').val();
    var postcode                = $('#postcode').val();
    var email_address           = $('#email_address').val();
    
    var relationship_status     = $('#relationship_status :selected').text(); 

    var nationalities           = $('#nationalities').val();
    
    var BB1                     = document.getElementById("date_UK_entry");
    var date_UK_entry           = $(BB1).val();
    
    
    var any_convictions         = $("input[name=any_convictions]:checked").val();
    var conviction_text_area    = $('#conviction_text_area').val();
    
    var visa_refusals           = $("input[name=visa_refusals]:checked").val();
    var visa_refusals_textarea  = $('#visa_refusals_textarea').val();
    
    var details_public_funds    = $('#details_public_funds :selected').text(); 
    
    
    var UK_NINo                 = $('#UK_NINo').val();
    
    var BB2                     = document.getElementById("next_planned_departure");
    var next_planned_departure  = $(BB2).val();

    
    var BB3                     = document.getElementById("UK_date_arrival_back");
    var UK_date_arrival_back    = $(BB3).val();

    var any_children            = $("input[name=any_children]:checked").val();
  
    var partner_Title           = $('#partner_Title :selected').text();  
    
    var partner_full_name       = $('#partner_full_name').val(); 
    var partner_mobile_number   = $('#partner_mobile_number').val();
    var partner_uk_home_address = $('#partner_uk_home_address').val();
    var partner_nationalities   = $('#partner_nationalities').val();
    var partner_dob             = $('#partner_dob').val();
    var partner_placeofbirth    = $('#partner_placeofbirth').val();
   
    var child1_full_name        = $('#child1_full_name').val(); 
    var child1_nationalities    = $('#child1_nationalities').val();
    var child1_dob              = $('#child1_dob').val();
    var child1_placeofbirth     = $('#child1_placeofbirth').val();
    
    var child2_full_name        = $('#child2_full_name').val(); 
    var child2_nationalities    = $('#child2_nationalities').val();
    var child2_dob              = $('#child2_dob').val();
    var child2_placeofbirth     = $('#child2_placeofbirth').val();
    
    // attachments data 
    // i didnt know how to save the file (png, pdf, other format on the server)
    
    var form_data = {
        UniqueID                : UniqueID,
        Title                   : Title,
        full_name               : full_name,
        mobile_number           : mobile_number,
        address_line1           : address_line1,
        address_line2           : address_line2,
        town                    : town,
        county                  : county,
        postcode                : postcode,
        email_address           : email_address,
        relationship_status     : relationship_status,
        nationalities           : [nationalities],
        date_UK_entry           : date_UK_entry,
        any_convictions         : any_convictions,
        conviction_text_area    : conviction_text_area,

        visa_refusals           : visa_refusals,
        visa_refusals_textarea  : visa_refusals_textarea,
        details_public_funds    : details_public_funds,

        UK_NINo                 : UK_NINo,
        next_planned_departure  : next_planned_departure,
        UK_date_arrival_back    : UK_date_arrival_back,

        any_children            : any_children,
        partner_Title           : partner_Title,
        partner_full_name       : partner_full_name,

        partner_mobile_number   : partner_mobile_number,
        partner_uk_home_address : partner_uk_home_address,
        partner_nationalities   : partner_nationalities === '' ? '' : [partnerNationalities],

        partner_dob             : partner_dob,
        partner_placeofbirth    : partner_placeofbirth,
        child1_full_name        : child1_full_name,

        child1_nationalities    : child1_nationalities,
        child1_dob              : child1_dob,
        child1_placeofbirth     : child1_placeofbirth,

        child2_full_name        : child2_full_name,
        child2_nationalities    : child2_nationalities,
        child2_dob              : child2_dob,
        child2_placeofbirth     : child2_placeofbirth
    };

/*
    var uk_visa_photo       = $('#uk_visa_photo').prop('files')[0]; 
    var passport_front_page = $('#passport_front_page').prop('files')[0];  
    var BRP_front_page      = $('#BRP_front_page').prop('files')[0];  
    var BRP_back_page       = $('#BRP_back_page').prop('files')[0];   
    
    form_data.append('UniqueID', UniqueID);
    form_data.append('Title', Title);
    form_data.append('full_name', full_name);
    form_data.append('mobile_number', mobile_number);
    form_data.append('address_line1', address_line1);
    form_data.append('address_line2', address_line2);
    form_data.append('town', town);
    form_data.append('county', county);

    form_data.append('postcode', postcode);
    form_data.append('email_address', email_address);
    form_data.append('relationship_status', relationship_status);
    form_data.append('nationalities', [nationalities]);
    form_data.append('date_UK_entry', date_UK_entry);
    form_data.append('any_convictions', any_convictions);
    form_data.append('conviction_text_area', conviction_text_area);
    form_data.append('visa_refusals', visa_refusals);

    form_data.append('visa_refusals_textarea', visa_refusals_textarea);
    form_data.append('details_public_funds', details_public_funds);
    form_data.append('UK_NINo', UK_NINo);
    form_data.append('next_planned_departure', next_planned_departure);
    form_data.append('UK_date_arrival_back', UK_date_arrival_back);
    form_data.append('any_children', any_children);
    form_data.append('partner_Title', partner_Title);
    form_data.append('partner_full_name', partner_full_name);

    form_data.append('partner_mobile_number', partner_mobile_number);
    form_data.append('partner_uk_home_address', partner_uk_home_address);
    form_data.append('partner_nationalities', partner_nationalities);
    form_data.append('partner_dob', partner_dob);
    form_data.append('partner_placeofbirth', partner_placeofbirth);
    
    form_data.append('child1_full_name', child1_full_name);
    form_data.append('child1_nationalities', child1_nationalities);
    form_data.append('child1_dob', child1_dob);
    form_data.append('child1_placeofbirth', child1_placeofbirth);
    
    form_data.append('child2_full_name', child2_full_name);
    form_data.append('child2_nationalities', child2_nationalities);
    form_data.append('child2_dob', child2_dob);
    form_data.append('child2_placeofbirth', child2_placeofbirth);
       
    form_data.append('file', uk_visa_photo);
    form_data.append('file', passport_front_page);
    form_data.append('file', BRP_front_page);
    form_data.append('file', BRP_back_page);

    alert(form_data); 

*/
    return form_data;
}

function form_submit() {
    const form_data = getFormInput();
    doFormAction(form_data, true);
}
       
function form_save()
{
    const form_data = getFormInput();
    doFormAction(form_data, false);    
}

