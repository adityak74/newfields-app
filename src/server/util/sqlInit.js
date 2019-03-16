import mysql from 'mysql';

const createMysqlConn = config => {
  const dbConfig = config.get('db');
  const { host, user, password, name } = dbConfig;
  const pool = mysql.createPool({
    host,
    user,
    password,
    database: name,
  });
  return pool;
};

export default appConfig => createMysqlConn(appConfig);



