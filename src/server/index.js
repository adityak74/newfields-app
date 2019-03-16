import express from 'express';
import cors from 'cors';
import winston from 'winston';
import expressWinston from 'express-winston';
import form1RouteHandler from './routes/form1';
import form2RouteHandler from './routes/form2';
import userRouteHandler from './routes/user';
import bodyParser from 'body-parser';
import sqlInit from './util/sqlInit';

const app = express();
const sql = sqlInit();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

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

app.use(express.static('dist'));
app.use('/user', userRouteHandler({ sqlConn: sql }));
app.use('/form1', form1RouteHandler({ sqlConn: sql }));
app.use('/form2', form2RouteHandler({ sqlConn: sql }));

// Error logger makes sense after the router
app.use(expressWinston.errorLogger({
  transports: [
    new winston.transports.Console({
      json: true,
      colorize: true
    })
  ]
}))

app.listen(8080, () => console.log('Listening on port 8080!'));

process.on('SIGINT', function() {
  sql.end();
  process.exit();
});