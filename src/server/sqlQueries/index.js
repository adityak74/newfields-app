import { SUBMIT } from '../constants/formType';

const FORM_CREATE = {
  CREATE_NEW_FORM_ENTRY: 'INSERT INTO userForms SET ?',
  CREATE_NEW_FORM_DATA_ENTRY: 'INSERT INTO formData SET ?',
  CREATE_NEW_FORM_DATA_EXTRA_INFO_ENTRY: 'INSERT INTO formDataExtraInfo SET ?',
};

const FORM_READ = {
  USERFORMS_SELECT_ALL: 'SELECT uF.*, u.name, u.email FROM userForms uF, users u where uF.userId = u.id',
  USERFORMS_SELECT_ALL_INCOMPLETE: `SELECT uF.*, u.name, u.email FROM userForms uF, users u where uF.userId = u.id and status != ${SUBMIT}`,
  USERFORMS_SELECT_BY_ROWID: 'SELECT * from userForms where ?',
  USERFORMS_SELECT_BY_USERID_ALL: 'SELECT * from userForms where userId = ?',
  USERFORMS_SELECT_BY_USERID_INCOMPLETE: `SELECT * from userForms where userId = ? and status != ${SUBMIT}`,
  USERFORMS_SELECT_BY_FORMID_USERID: 'SELECT * from userForms where formUID = ? and userId = ?',
  USERFORMS_SELECT_BY_FORMID_USERID_INCOMPLETE: `SELECT * FROM userForms WHERE formUID = ? and userId = ? and status != ${SUBMIT}`,
  USERFORMS_SELECT_BY_FORMID_INCOMPLETE: `SELECT * FROM userForms WHERE formUID = ? and status != ${SUBMIT}`,
  USERFORMS_SELECT_BY_FORMID_ALL: `SELECT * FROM userForms WHERE formUID = ?`,
  USERFORMDATA_EXTRAINFO_SELECT_BY_FORMID: 'SELECT fd.*, fdEI.* from formData fd, formDataExtraInfo fdEI where fd.uniqueId = ? and fdEI.formUniqueId = ?',
}

const FORM_UPDATE = {
  UPDATE_NEW_FORM_ENTRY: 'UPDATE userForms SET ? where formUID = ?',
  UPDATE_NEW_FORM_DATA_ENTRY: 'UPDATE formData SET ? where uniqueId = ?',
  UPDATE_NEW_FORM_DATA_EXTRA_INFO_ENTRY: 'UPDATE formDataExtraInfo SET ? where formUniqueId = ?',
  UPDATE_FORM_SUBMIT_BY_FORMID_USERID: 'UPDATE userForms SET ? where formUID = ? and userId = ?',
};

const FORM_RELATIONS = {
  CREATE_NEW_FORM_RELATIONS_ENTRY: 'INSERT INTO formRelationships SET ?',
  FORM_RELATIONS_SELECT_BY_FORM_ID: 'SELECT * from formRelationships where formId = ?',
};

const FORM_TRIPS = {
  CREATE_NEW_FORM_TRIPS_ENTRY: 'INSERT INTO formTrips SET ?',
  FORM_TRIPS_SELECT_BY_FORM_ID: 'SELECT * from formTrips where formId = ?',
};

const RELATIONSHIP_INFO = {
  CREATE_NEW_RELATION_ENTRY: 'INSERT INTO relationshipInfo SET ?',
  RELATIONSHIP_INFO_SELECT_BY_ID: 'SELECT * from relationshipInfo where id = ?',
  UPDATE_RELATION_ENTRY_BY_ID: 'UPDATE relationshipInfo SET ? WHERE id = ?',
};

const TRIPS = {
  CREATE_NEW_TRIPS_ENTRY: 'INSERT INTO trips SET ?',
  TRIPS_SELECT_BY_ID: 'SELECT * from trips where id = ?',
  UPDATE_TRIPS_ENTRY_BY_ID: 'UPDATE trips SET ? WHERE id = ?',
};


export default {
  FORM_CREATE,
  FORM_READ,
  FORM_UPDATE,
  RELATIONSHIP_INFO,
  FORM_RELATIONS,
  FORM_TRIPS,
  TRIPS,
};
