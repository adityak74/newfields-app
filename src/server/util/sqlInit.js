import mysql from 'mysql';
import config from '../util/conf';

const createMysqlConn = config => {
  const dbConfig = config.get('db');
  const { host, user, password, name } = dbConfig;
  return mysql.createConnection({
    host,
    user,
    password,
    database: name,
  });
};

export default () => {
  const appConfig = config(process.env.NODE_ENV);
  const connection = createMysqlConn(appConfig);
  connection.connect();
  return connection;
};



