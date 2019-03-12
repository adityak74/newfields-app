import mysql from 'mysql';
import config from '../util/conf';

const createMysqlConn = config => {
  const dbConfig = config.get('db');
  const { host, user, password, name } = dbConfig;
  const pool = mysql.createPool({
    host,
    user,
    password,
    database: name,
  });
  pool.on('connection', function (connection) {
    connection.query('SET SESSION auto_increment_increment=1')
  });
  return pool;
};

export default () => {
  const appConfig = config(process.env.NODE_ENV);
  const connection = createMysqlConn(appConfig);
  return connection;
};



