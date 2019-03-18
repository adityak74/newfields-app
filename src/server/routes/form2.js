import express from 'express';
import form2Validator from '../validation/validator/form2';
import isLoggedIn from '../util/getIfAuthenticated';

export default ({ appUrl, sqlConn }) => {
  const router = express.Router();

  const buildInputObject = input => {
    const { 
      UniqueID,
      Title,
      full_name,
      mobile_number,
      landline_no,
      email_addr,
      home_addr,
      addr_move_indate,
      house_ownrship,
      addr_while_visa,
      uk_addr,
      uk_addr_text_area,
      nationalities,
      national_id,
      _other_names,
      relationship_status,
      any_convictions,
      conviction_text_area,
      visa_refusals,
      visa_refusals_textarea,
      medical,
      medical_textarea,
      uk_NINo,
      uk_nino_textarea,
      anyarmedforces,
      armedforces_textarea,
      immediate_family,
      immediate_family_textarea,
      Proposaldate_UK_entry,
      familymembertravelalong,
      family_member_travelalong_textarea,
      any_overseas_travel,              
      Departuredate_UK,                  
      Returndate_UK,                     
      fa_frst,                           
      father_country_of_birth,           
      father_nationality,                
      father_Secondnationality,          
      father_DOB,                        
      mothers_f_na,                      
      mothersCountryofBirth,             
      mother_nationality,                
      mother_Secondnationality,          
      mother_DOB,                        
      partner_fna,                       
      partner_countryofbirth,            
      partner_nationlity,                
      partner_Snationality,              
      partner_DOB,                       
      firstchild1,                       
      child1_f_na,                       
      child1_countryofbirth,             
      child1_nationality,                
      child1_Snationality,               
      child1_DOB,                        
      child2_f_na,                       
      child2_countryofbirth,             
      child2_nationality,                
      child2_Snationality,               
      child2_DOB,                        
      visit,
      visitInfo,
      trip,
      tripInfo,
      other_trip,
      otherTripInfo,
    } = input;
    return {
      uniqueId: UniqueID,
      title: Title,
      fullName: full_name,
      mobileNumber: mobile_number,
      landlineNumber: landline_no,
      emailAddress: email_addr,
      homeAddress: home_addr,
      homeMoveInDate: addr_move_indate,
      homeOwnership: house_ownrship,
      addressWhileOnVisa: addr_while_visa,
      ifUKaddress: uk_addr,
      UKAddress: uk_addr_text_area,
      nationalities: nationalities,
      nationalIdentityNumber: national_id,
      otherNames: _other_names,
      relationshipStatus: relationship_status,
      anyConvictions: any_convictions,
      convictionText: conviction_text_area,
      visaRefusals: visa_refusals,
      visaRefusalText: visa_refusals_textarea,
      medical,
      medicalInfo: medical_textarea,
      UKNINumber: uk_NINo,
      UKNINumberInfo: uk_nino_textarea,
      ifArmedForces: anyarmedforces,
      armedForcesInfo: armedforces_textarea,
      ifImmediateFamily: immediate_family,
      immediateFamilyInfo: immediate_family_textarea,
      dateUKEntry: Proposaldate_UK_entry,
      familyMemberTravelAlong: familymembertravelalong,
      familyMemberTravelAlongInfo: family_member_travelalong_textarea,
      anyOverseasTravel: any_overseas_travel,
      nextUKPlannedDeparture: Departuredate_UK,
      nextUKDateArrival: Returndate_UK,
      fatherFullName: fa_frst,
      fatherCountryOfBirth: father_country_of_birth,
      fatherNationality: father_nationality,
      fatherAlternateNationality: father_Secondnationality,
      fatherDateOfBirth: father_DOB,
      motherFullName: mothers_f_na,
      motherCountryOfBirth: mothersCountryofBirth,
      motherNationality: mother_nationality,
      motherAlternateNationality: mother_Secondnationality,
      motherDateOfBirth: mother_DOB,
      partnerFullName: partner_fna,
      partnerCountryOfBirth: partner_countryofbirth,
      partnerNationality: partner_nationlity,
      partnerAlternateNationality: partner_Snationality,
      partnerDateOfBirth: partner_DOB,
      ifChildren: firstchild1,
      child1FullName: child1_f_na,
      child1CountryOfBirth: child1_countryofbirth,
      child1Nationality: child1_nationality,
      child1AlternateNationality: child1_Snationality,
      child1DateOfBirth: child1_DOB,
      child2FullName: child2_f_na,
      child2CountryOfBirth: child2_countryofbirth,
      child2Nationality: child2_nationality,
      child2AlternateNationality: child2_Snationality,
      child2DateOfBirth: child2_DOB,
      ifVisit: visit,
      visits: visitInfo,
      ifTrip: trip,
      trips: tripInfo,
      ifOtherTrips: other_trip,
      otherTrips: otherTripInfo,
    };
  };
  
  router.post('/submit', (req, res) => {
    const input = req.body;
    const inputObj = buildInputObject(input);
  
    form2Validator(inputObj, {}, (validationErr, sanitizedInput) => {
      if (validationErr) res.status(400).send(validationErr);
      else res.send(sanitizedInput);
      // Submit final to Database
  
    });
  });
  
  router.post('/save', (req, res) => {
    const input = req.body;
    const inputObj = buildInputObject(input);
  
    form2Validator(inputObj, {}, (validationErr, sanitizedInput) => {
      if (validationErr) res.status(400).send(validationErr);
      else res.send(sanitizedInput);
  
      // Save progress to Database
  
    });
  });

  router.get('/show', (req, res) => res.render('pages/form2', { appLocation: appUrl }));

  router.get('/getFormUID', isLoggedIn, (req, res) => {
    res.send(getFormUIDHandler(2, req.user));
  });
  
  return router;
};

