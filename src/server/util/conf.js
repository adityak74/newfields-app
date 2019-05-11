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
    aws: {
      accessId: {
        default: '',
        env: 'AWS_ACCESS_ID',
      },
      secret: {
        default: '',
        env: 'AWS_SECRET'
      }
    },
    formLimits: {
      one: {
        default: 10,
        env: 'FORM_ONE_PER_USER',
      },
      two: {
        default: 10,
        env: 'FORM_TWO_PER_USER',
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
    redisHost: {
      default: 'localhost',
      env: 'REDIS_HOST',
    },
    redisPort: {
      default: 6379,
      env: 'REDIS_PORT',
    },
    supportEmail: {
      default: 'admin@admin.com',
      env: 'SUPPORT_EMAIL',
    },
  });

  return conf;
};