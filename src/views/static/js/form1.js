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
    var rs1 = document.getElementById("relationship_status");
    var rs2 = rs1.options[rs1.selectedIndex];
    var selected_status = $(rs2).val();
    
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
        $("#any_visa_refusals").css("display","block");
    }
    else if(option==="no")
    {
        $("#any_visa_refusals").css("display","none");
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

function doFormAction(form_data) {
    const url = new URL(window.location.href);
    const formAction = url.searchParams.get('action');
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
                console.log(xhr);
            },
        });
    } else if (formAction === 'update') {
        form_data.formAction = 'update';
        const formId = url.searchParams.get('formId');

    } else {
        // reditect back to homepage
    }
}
       
function form_submit()
{
    var UniqueID                = $('#Unique_id').val();
    
    var TT_1                    = document.getElementById("Title");
    var TT_2                    = TT_1.options[TT_1.selectedIndex];
    var Title                   = $(TT_2).val();  
    
    var full_name               = $('#full_name').val(); 
    var mobile_number           = $('#mobile_number').val();
    var address_line1           = $('#address_line1').val();
    var address_line2           = $('#address_line2').val();
    var town                    = $('#town').val();
    var county                  = $('#county').val();
    var postcode                = $('#postcode').val();
    var email_address           = $('#email_address').val();
    
    var RS_1                    = document.getElementById("relationship_status");
    var RS_2                    = RS_1.options[RS_1.selectedIndex];
    var relationship_status     = $(RS_2).val();  

    var nationalities           = $('#nationalities').val();
    
    var BB1                     = document.getElementById("date_UK_entry");
    var date_UK_entry           = $(BB1).val();
    
    
    var any_convictions         = $("input[name=any_convictions]:checked").val();
    var conviction_text_area    = $('#conviction_text_area').val();
    
    var visa_refusals           = $("input[name=visa_refusals]:checked").val();
    var visa_refusals_textarea  = $('#visa_refusals_textarea').val();
    
    var pf_1                    = document.getElementById("details_public_funds");
    var pf_2                    = pf_1.options[pf_1.selectedIndex];
    var details_public_funds    = $(pf_2).val();
    
    
    var UK_NINo                 = $('#UK_NINo').val();
    
    var BB2                     = document.getElementById("next_planned_departure");
    var next_planned_departure  = $(BB2).val();

    
    var BB3                     = document.getElementById("UK_date_arrival_back");
    var UK_date_arrival_back    = $(BB3).val();

    var any_children            = $("input[name=any_children]:checked").val();
  
    var PT_1                    = document.getElementById("partner_Title");
    var PT_2                    = PT_1.options[PT_1.selectedIndex];
    var partner_Title           = $(PT_2).val();  
    
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
        partner_nationalities   : [partner_nationalities],

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

    doFormAction(form_data);    
}
