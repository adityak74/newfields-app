import convict from 'convict';
import dotenv from 'dotenv';
import path from 'path';

export default (env = 'development') => {
  const configFile = path.join(__dirname, '..', '..', '..', `.env.${env}`);

  dotenv.config({
    path: configFile,
    silent: true,
  });

  const conf = convict({
    db: {
      host: {
        default: 'localhost',
        env: 'SQL_HOST'
      },
      name: {
        default: 'sample',
        env: 'SQL_DB'
      },
      password: {
        default: '',
        env: 'SQL_PASSWORD'
      },
      user: {
        default: '',
        env: 'SQL_USER'
      },
    },
    secret: {
      default: 'tempsecret',
      env: 'APP_SECRET',
    },
    location: {
      default: 'http://localhost',
      env: 'LOCATION_URL',
    },
    port: {
      default: '3000',
      env: 'PORT',
    },
  });

  return conf;
};