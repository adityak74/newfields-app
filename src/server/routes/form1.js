import express from 'express';
import form1Validator from '../validation/validator/form1';
import formUIDValidator from '../validation/validator/formUID';
import isLoggedIn from '../util/getIfAuthenticated';
import userFormModel from '../model/userForms';
import formType from '../constants/formType';
import formNumberIdentifier from '../constants/formNumber';
import userFormReadModel from '../model/userFormsRead';

const actionStringToId = action => formType[action.toUpperCase()];

export default ({ appUrl, sqlConn }) => {
  const router = express.Router();

  const buildInputObject = input => {
    const {
      formAction,
      UniqueID,
      Title,
      full_name,
      mobile_number,
      address_line1,
      address_line2,
      town,
      county,
      postcode,
      email_address,
      relationship_status,
      nationalities,
      date_UK_entry,
      any_convictions,
      conviction_text_area,
      visa_refusals,
      visa_refusals_textarea,
      details_public_funds,
      UK_NINo,
      next_planned_departure,
      UK_date_arrival_back,
      any_children,
      partner_Title,
      partner_full_name,
      partner_mobile_number,
      partner_uk_home_address,
      partner_nationalities,
      partner_dob,
      partner_placeofbirth,
      child1_full_name,
      child1_nationalities,
      child1_dob,
      child1_placeofbirth,
      child2_full_name,
      child2_nationalities,
      child2_dob,
      child2_placeofbirth,
    } = input;
    return {
      formAction,
      uniqueId: UniqueID,
      title: Title,
      fullName: full_name,
      mobileNumber: mobile_number,
      addressLine1: address_line1,
      addressLine2: address_line2,
      town,
      county,
      postcode,
      emailAddress: email_address,
      relationshipStatus: relationship_status,
      nationalities,
      dateUKEntry: date_UK_entry,
      anyConvictions: any_convictions,
      convictionText: conviction_text_area,
      visaRefusals: visa_refusals,
      visaRefusalText: visa_refusals_textarea,
      detailsPublicFund: details_public_funds,
      UKNINumber: UK_NINo,
      nextPlannedDeparture: next_planned_departure,
      nextDateArrival: UK_date_arrival_back,
      ifHasChildren: any_children,
      partnerTitle: partner_Title,
      partnerFullName: partner_full_name,
      partnerMobileNumber: partner_mobile_number,
      partnerHomeAddress: partner_uk_home_address,
      partnerNationalities: partner_nationalities,
      partnerDateOfBirth: partner_dob,
      partnerPlaceOfBirth: partner_placeofbirth,
      child1FullName: child1_full_name,
      child1Nationalitites: child1_nationalities,
      child1DateOfBirth: child1_dob,
      child1PlaceOfBirth: child1_placeofbirth,
      child2FullName: child2_full_name,
      child2Nationalitites: child2_nationalities,
      child2DateOfBirth: child2_dob,
      child2PlaceOfBirth: child2_placeofbirth,
    };
  };
  
  router.post('/submit', isLoggedIn, (req, res) => {
    const input = req.body;
    const inputObj = buildInputObject(input);
    const formActionIdentifier = actionStringToId(inputObj.formAction);
    form1Validator(inputObj, {}, (validationErr, sanitizedInput) => {
      if (validationErr) res.status(400).send(validationErr);
      else {
        const userModelSave = userFormModel(req, sanitizedInput, sqlConn, formActionIdentifier, formNumberIdentifier.ONE);
        userModelSave((err, data) => {
          if (err) return res.status(400).send(err);
          console.log('form retval', data);
          const retData = { data };
          res.status(200).send(retData);
        });
      }
    });
  });
  
  router.post('/save', isLoggedIn, (req, res) => {
    const input = req.body;
    const inputObj = buildInputObject(input);
    const formActionIdentifier = actionStringToId(inputObj.formAction);

    const userModelSave = userFormModel(req, inputObj, sqlConn, formActionIdentifier, formNumberIdentifier.ONE);
    userModelSave((err, data) => {
      if (err) return res.status(400).send(err);
      console.log('form retval', data);
      const retData = { data };
      res.status(200).send(retData);
    });
  });
  
  router.get('/show', isLoggedIn, (req, res) => res.render('pages/form1', { appLocation: appUrl }));

  router.post('/getFormData', isLoggedIn, (req, res) => {
    const { formId } = req.body;
    if (formId) {
      const input = { formUID: formId };
      formUIDValidator(input, {}, (err, sanitizedInput) => {
        if (err) return res.status(400).send('Unknown data');
        const userModelRead = userFormReadModel(req, sanitizedInput, sqlConn);
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

