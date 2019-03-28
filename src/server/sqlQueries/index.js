const FORM_CREATE = {
  CREATE_NEW_FORM_ENTRY: 'INSERT INTO userForms SET ?',
};

const FORM_READ = {
  USERFORMS_SELECT_BY_ROWID: 'SELECT * from userForms where ?',
}

export default {
  FORM_CREATE,
  FORM_READ,
};
