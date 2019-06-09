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
import bodyParser from 'body-parser';
import fetch from 'node-fetch';
import ApolloClient from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createHttpLink } from 'apollo-link-http';
import { ApolloServer, gql } from 'apollo-server-express';

import form1RouteHandler from './routes/form1';
import form2RouteHandler from './routes/form2';
import userRouteHandler from './routes/user';
import adminRouteHandler from './routes/admin';
import sqlInit from './util/sqlInit';
import config from './util/conf';
import passportConfig from './util/passport';
import sendMail from './util/sendMail';
import uploadDocument from './util/uploadDocument';
import getS3SignedDocument from './util/getS3SignedDocument';
import typeDefs from './graphql/schema';
import resolvers from './graphql/resolvers';

const app = express();
const appConfig = config(process.env.NODE_ENV);
const sql = sqlInit(appConfig);

const redisClient = redis.createClient({
  host: appConfig.get('redisHost'),
  port: appConfig.get('redisPort'),
});

const RedisStore = connectRedis(session);

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
  store: new RedisStore({
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

// GraphQL setup
// const myGqlSchema = makeExecutableSchema({ typeDefs, resolvers });
// app.use(
//   '/graphql',
//   (req, res, next) => {
//     console.log('mygqlschema---->>', req.session);
//     return graphqlExpress({
//       schema: myGqlSchema,
//       context: {
//         emailService,
//         passport,
//         req,
//         res,
//         sql,
//       },
//       graphiql: true,
//       tracing: true,
//       cacheControl: true,
//     })(req, res, next);
//   }
// );

// app.use('/graphql', bodyParser.json(), graphqlExpress({ schema: myGqlSchema }));

app.use((req, res, next) => {
  const apolloClient = new ApolloClient({
    link: createHttpLink({
      uri: `${appUrl}/graphql`,
      credentials: 'same-origin',
      fetch,
      headers: { cookie: req.header('Cookie') || null },
    }),
    cache: new InMemoryCache(),
    ssrMode: true,
  });
  req.apolloClient = apolloClient;
  next();
});

const apolloServer = new ApolloServer({
  typeDefs: gql(typeDefs),
  resolvers,
  context: ({ req, res }) => ({
    emailService,
    passport,
    req,
    res,
    sql,
  }),
  playground: { settings: { 'request.credentials': 'include' } },
});
apolloServer.applyMiddleware({ app, cors: { origin: appUrl, credentials: true } });

// Website static stuff
const staticPath = path.join(viewsPath, 'static');
app.use('/js', express.static(path.join(staticPath, 'js')));
app.use('/css', express.static(path.join(staticPath, 'css')));
app.use('/images', express.static(path.join(staticPath, 'images')));

app.use('/admin', adminRouteHandler({
  appUrl,
  emailService,
  passport,
  sqlConn: sql,
}));

app.use('/user', userRouteHandler({
  appUrl,
  appConfig,
  emailService,
  passport,
  sqlConn: sql,
}));

app.use('/form1', form1RouteHandler({
  appUrl,
  appConfig,
  awsS3: {
    s3FileUploadService,
    s3FileDownloadService,
  },
  emailService,
  sqlConn: sql,
}));

app.use('/form2', form2RouteHandler({
  appUrl,
  appConfig,
  awsS3: {
    s3FileUploadService,
    s3FileDownloadService,
  },
  emailService,
  sqlConn: sql,
}));

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
}));

app.listen(appPort, () => console.log(`Listening on port ${appPort}!`));

process.on('SIGINT', () => {
  sql.end();
  process.exit();
});
