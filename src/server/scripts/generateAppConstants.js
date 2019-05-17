import { join } from 'path';
import sqlConstants from 'sql-constants';
import config from '../util/conf';

const appConfig = config(process.env.NODE_ENV);
const dbConfig = appConfig.get('db');
const {
  host,
  user,
  password,
  name,
} = dbConfig;

sqlConstants.createConstantFiles(
  {
    // SQL details, required to query tables
    database: name,
    dialect: 'mysql',
    password,
    server: host,
    user,
  },
  // Directory to write constants into
  join(__dirname, '..', 'constants'),
  [
    // Each table definition corresponds to a constant file
    // If multiple value columns are specified, the file will export a dictionary of enums
    // If just one value column is specified, the file will export the enum directly
    sqlConstants.tableDefinition({
      file: 'relationTypes',
      table: 'relationTypes',
      keyColumn: 'name',
      valueColumns: ['id'],
    }),
    sqlConstants.tableDefinition({
      file: 'tripTypes',
      table: 'tripTypes',
      keyColumn: 'name',
      valueColumns: ['id'],
    }),
    sqlConstants.tableDefinition({
      file: 'formType',
      table: 'formStatus',
      keyColumn: 'status',
      valueColumns: ['id'],
    }),
    sqlConstants.tableDefinition({
      file: 'formNumber',
      table: 'formNumber',
      keyColumn: 'number',
      valueColumns: ['id'],
    }),
    sqlConstants.tableDefinition({
      file: 'formProcessingStatus',
      table: 'formProcessingStatus',
      keyColumn: 'status',
      valueColumns: ['id'],
    }),
    sqlConstants.tableDefinition({
      file: 'documentType',
      table: 'documentType',
      keyColumn: 'type',
      valueColumns: ['id'],
    }),
  ],
  (err) => {
    if (err) {
      console.warn(err);
      return process.exit(1);
    }
    return process.exit(0);
  }
);
