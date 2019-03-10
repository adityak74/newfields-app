import express from 'express';
import os from 'os';
import cors from 'cors';
import winston from 'winston';
import expressWinston from 'express-winston';
import form1RouteHandler from './routes/form1';
import bodyParser from 'body-parser';

const app = express();
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
app.get('/api/getUsername', (req, res) => res.send({ platform: os.platform(), username: os.userInfo().username, userDir: os.userInfo().homedir }));
app.use('/form1', form1RouteHandler);

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