import express from 'express';
import multer from 'multer';
import form2Validator from '../validation/validator/form2';
import formUIDValidator from '../validation/validator/formUID';
import isLoggedIn from '../util/getIfAuthenticated';
import userFormModel from '../model/userForms';
import formType from '../constants/formType';
import formNumberIdentifier from '../constants/formNumber';
import userFormReadModel from '../model/userFormsRead';
import getValueIfNotNull from '../model/helpers/getValueIfNotNull';

const actionStringToId = action => formType[action.toUpperCase()];

export default ({ appUrl, sqlConn, awsS3 }) => {
  const router = express.Router();
  const { s3FileUploadService, s3FileDownloadService } = awsS3;

  const buildInputObject = ({ 
    formAction,
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
  }) => ({
    formAction,
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
    nationalities,
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
    nextPlannedDeparture: Departuredate_UK,
    nextDateArrival: Returndate_UK,
    // build objects after here
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
    ifHasChildren: firstchild1,
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
    visits: JSON.parse(visitInfo),
    ifTrip: trip,
    trips: JSON.parse(tripInfo),
    ifOtherTrips: other_trip,
    otherTrips: JSON.parse(otherTripInfo),
  });

  const buildFilesObject = ({
    uk_visa_photo,
    passport_front_page,
    secondpassport_front_page,
    previous_uk_visa,
  }) => ({
    current_visa: getValueIfNotNull(uk_visa_photo) ? uk_visa_photo[0] : null,
    passport_front: getValueIfNotNull(passport_front_page) ? passport_front_page[0]: null,
    passport_front_two: getValueIfNotNull(secondpassport_front_page) ? secondpassport_front_page[0]: null,
    previous_uk_visa: getValueIfNotNull(previous_uk_visa) ? previous_uk_visa[0] : null,
  });
  
  router.post('/submit', (req, res) => {
    const input = req.body;
    const inputObj = buildInputObject(input);
    const inputFiles = buildFilesObject(req.files);
  
    form2Validator(inputObj, {}, (validationErr, sanitizedInput) => {
      if (validationErr) res.status(400).send(validationErr);
      else {
        const userModelSave = userFormModel(req, sanitizedInput, inputFiles, sqlConn, s3FileUploadService, formActionIdentifier, formNumberIdentifier.TWO);
        userModelSave((err, data) => {
          if (err) return res.status(400).send(err);
          console.log('form retval', data);
          const retData = { data };
          res.status(200).send(retData);
        });
      }
    });
  });
  
  router.post('/save', multer().fields([
    { name: 'uk_visa_photo', maxCount: 1 },
    { name: 'passport_front_page', maxCount: 1 },
    { name: 'secondpassport_front_page', maxCount: 1 },
    { name: 'previous_uk_visa', maxCount: 1 },
    ]), isLoggedIn, (req, res) => {
    const input = req.body;
    const inputObj = buildInputObject(input);
    const formActionIdentifier = actionStringToId(inputObj.formAction);
    const inputFiles = buildFilesObject(req.files);

    console.log('input', inputObj);
  
    const userModelSave = userFormModel(req, inputObj, inputFiles, sqlConn, s3FileUploadService, formActionIdentifier, formNumberIdentifier.TWO);

    userModelSave((err, data) => {
      if (err) return res.status(400).send(err);
      console.log('form retval', data);
      const retData = { data };
      res.status(200).send(retData);
    });
  });

  router.get('/show', (req, res) => res.render('pages/form2', { appLocation: appUrl }));

  router.post('/getFormData', isLoggedIn, (req, res) => {
    const { formId } = req.body;
    if (formId) {
      const input = { formUID: formId };
      formUIDValidator(input, {}, (err, sanitizedInput) => {
        if (err) return res.status(400).send('Unknown data');
        const userModelRead = userFormReadModel(req, sanitizedInput, sqlConn, s3FileDownloadService);
        userModelRead((err, data) => {
          if (err) return res.status(400).send(err.message || err);
          res.status(200).send(data);
        });
      });
    } else {
      res.status(400).send('Unknown form identifier');
    }
  });
  
  return router;
};

