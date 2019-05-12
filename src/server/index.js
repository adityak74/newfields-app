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
import adminRouteHandler from './routes/admin';
import bodyParser from 'body-parser';
import sqlInit from './util/sqlInit';
import config from './util/conf';
import passportConfig from './util/passport';
import sendMail from './util/sendMail';
import uploadDocument from './util/uploadDocument';
import getS3SignedDocument from './util/getS3SignedDocument';

const app = express();
const appConfig = config(process.env.NODE_ENV);
const sql = sqlInit(appConfig);

const redisClient = redis.createClient({
  host: appConfig.get('redisHost'),
  port: appConfig.get('redisPort'),
});

const redisStore = connectRedis(session);

// redisClient.on("error", function (err) {
//   console.log("Error " + err);
// });

// email init
const emailService = sendMail(appConfig);

// s3 file uploading init
const s3FileUploadService = uploadDocument(appConfig);
const s3FileDownloadService = getS3SignedDocument(appConfig);

const appPort = appConfig.get('port');
const appLocation = appConfig.get('location');
let appUrl = `${appLocation}:${appPort}`;

if (process.env.NODE_ENV === 'production') {
  appUrl = `${appLocation}:443`;
}

const viewsPath = path.join(__dirname, '..', 'views');

app.set('view engine', 'ejs');
app.set('views', viewsPath);

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
  }),
}));

passportConfig(appConfig, emailService, passport, sql);

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
const staticPath = path.join(viewsPath, 'static');
app.use('/js', express.static(path.join(staticPath, 'js')));
app.use('/css', express.static(path.join(staticPath, 'css')));
app.use('/images', express.static(path.join(staticPath, 'images')));

app.use('/admin', adminRouteHandler({ appUrl, emailService, passport, sqlConn: sql }));
app.use('/user', userRouteHandler({ appUrl, appConfig, emailService, passport, sqlConn: sql }));
app.use('/form1', form1RouteHandler({ appUrl, appConfig, emailService, sqlConn: sql, awsS3: { s3FileUploadService, s3FileDownloadService } }));
app.use('/form2', form2RouteHandler({ appUrl, appConfig, emailService, sqlConn: sql, awsS3: { s3FileUploadService, s3FileDownloadService } }));

app.get('/', (req, res) => {
  res.redirect('/user/sign-in');
});

app.get('*', (req, res) => {
  res.redirect('/user/sign-in');
});

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