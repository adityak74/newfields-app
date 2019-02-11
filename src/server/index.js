import express from 'express';
import os from 'os';
import winston from 'winston';
import expressWinston from 'express-winston';

const app = express();

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