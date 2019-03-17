import express from 'express';
import cors from 'cors';
import path from 'path';
import winston from 'winston';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import connectRedis from 'connect-redis';
import expressWinston from 'express-winston';
import redis from 'redis';
import form1RouteHandler from './routes/form1';
import form2RouteHandler from './routes/form2';
import userRouteHandler from './routes/user';
import bodyParser from 'body-parser';
import sqlInit from './util/sqlInit';
import config from './util/conf';
import passportConfig from './util/passport';
import sendMail from './util/sendMail';

const app = express();
const appConfig = config(process.env.NODE_ENV);
const sql = sqlInit(appConfig);

const redisClient = redis.createClient();

const redisStore = connectRedis(session);

// email test
const emailService = sendMail(appConfig);

const appPort = appConfig.get('port');
const appLocation = appConfig.get('location');
const appUrl = `${appLocation}:${appPort}`;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '..', '/views'));

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cookieParser(appConfig.get('secret')));
// passport auth config stuff
app.use(session({
  secret: appConfig.get('secret'),
  resave: false,
  saveUninitialized: false,
  store: new redisStore({
    host: appConfig.get('redisHost'),
    port: appConfig.get('redisPort'),
    client: redisClient,
    ttl: 260,
  }),
}));

passportConfig(passport, sql);

app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

// Log the whole request and response body
expressWinston.requestWhitelist.push('body');
expressWinston.responseWhitelist.push('body');

// Logger makes sense before the router
app.use(expressWinston.logger({
  transports: [
    new winston.transports.Console({
      json: true,
      colorize: true
    })
  ]
}));

// Website static stuff
app.use('/js', express.static(path.join(__dirname, '..', '..', 'web', 'JS_files')));
app.use('/css', express.static(path.join(__dirname, '..', '..', 'web', 'CSS')));
app.use('/images', express.static(path.join(__dirname, '..', '..', 'web', 'Images')));

app.use('/user', userRouteHandler({ appUrl, passport, sqlConn: sql }));
app.use('/form1', form1RouteHandler({ appUrl, sqlConn: sql }));
app.use('/form2', form2RouteHandler({ appUrl, sqlConn: sql }));

// Error logger makes sense after the router
app.use(expressWinston.errorLogger({
  transports: [
    new winston.transports.Console({
      json: true,
      colorize: true
    })
  ]
}))

app.listen(appPort, () => console.log(`Listening on port ${appPort}!`));

process.on('SIGINT', function() {
  sql.end();
  process.exit();
});