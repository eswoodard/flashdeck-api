'use strict'

const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');
const passport = require('passport');

const { router: usersRouter } = require('./users');
const { router: authRouter, localStrategy, jwtStrategy } = require('./auth');

mongoose.Promise = global.Promise;

const {
  PORT, DATABASE_URL,
} = require('./config');

const app = express();

app.use(cors());

app.use(morgan('common'));

passport.use(localStrategy);
passport.use(jwtStrategy);

app.use('/flashdeck', usersRouter);
app.use('/flashdeck', authRouter);

const jwtAuth = passport.authenticate('jwt', {session: false});

app.get('/flashdeck/protected', jwtAuth, (req, res) => {
  res.json({
    data: 'rosebud'
  });
});

let server;

function runServer(databaseUrl, port = PORT) {
  return new Promise((resolve, reject) => {
    mongoose.connect(databaseUrl, err => {
      if (err) {
        return reject(err);
      }
      server = app.listen(port, () => {
        console.log(`Your app is listening on port ${port}`);
        resolve();
      })
      .on('error', err => {
        mongoose.disconnect();
        reject(err);
      });
    });
  });
}

function closeServer() {
  return mongoose.disconnect().then(() => {
    return new Promise((resolve, reject) => {
      console.log('closing server');
      server.close(err => {
        if (err) {
          return reject(err);
        }
        resolve();
      });
    });
  });
}

if (require.main === module) {
  runServer(DATABASE_URL).catch(err => console.error(err));
};



module.exports = {app, runServer, closeServer};