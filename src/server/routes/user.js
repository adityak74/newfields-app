import express from 'express';
import validateSignIn from '../validation/validator/signIn';
import validateSignUp from '../validation/validator/signUp';


export default ({ sqlConn }) => {
  const router = express.Router();
  
  router.post('/sign-up', (req, res) => {
    const input = req.body;
    console.log('INPUT->', input);
  
    validateSignUp(input, {}, (validationErr, sanitizedInput) => {
      if (validationErr) res.status(400).send(validationErr);
      else res.send(sanitizedInput);
      // Submit final to Database
  
    });
  });
  
  router.post('/sign-in', (req, res) => {
    const input = req.body;
    console.log('INPUT->', input);
  
    validateSignIn(input, {}, (validationErr, sanitizedInput) => {
      if (validationErr) res.status(400).send(validationErr);
      else res.send(sanitizedInput);
      // Submit final to Database
  
    });
  });
  
  return router;
};

