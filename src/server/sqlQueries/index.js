const FORM_CREATE = {
  CREATE_NEW_FORM_ENTRY: 'INSERT INTO userForms SET ?',
  CREATE_NEW_FORM_DATA_ENTRY: 'INSERT INTO formData SET ?',
  CREATE_NEW_FORM_DATA_EXTRA_INFO_ENTRY: 'INSERT INTO formDataExtraInfo SET ?',
};

const FORM_READ = {
  USERFORMS_SELECT_BY_ROWID: 'SELECT * from userForms where ?',
  USERFORMS_SELECT_BY_FORMID_USERID: 'SELECT * from userForms where formUID = ? and userId = ?',
  USERFORMS_SELECT_BY_FORMID_USERID_INCOMPLETE: 'SELECT * FROM `userForms` WHERE formUID = ? and userId = ? and status != 3',
  USERFORMDATA_EXTRAINFO_SELECT_BY_FORMID: 'SELECT fd.*, fdEI.* from formData fd, formDataExtraInfo fdEI where fd.uniqueId = ? and fdEI.formUniqueId = ?',
}

const FORM_UPDATE = {
  UPDATE_NEW_FORM_ENTRY: 'UPDATE userForms SET ? where formUID = ?',
  UPDATE_NEW_FORM_DATA_ENTRY: 'UPDATE formData SET ? where uniqueId = ?',
  UPDATE_NEW_FORM_DATA_EXTRA_INFO_ENTRY: 'UPDATE formDataExtraInfo SET ? where formUniqueId = ?',
  UPDATE_FORM_SUBMIT_BY_FORMID_USERID: 'UPDATE userForms SET ? where formUID = ? and userId = ?',
};

export default {
  FORM_CREATE,
  FORM_READ,
  FORM_UPDATE,
};
