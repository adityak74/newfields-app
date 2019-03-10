/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$(document).ready(function(){
  
    
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