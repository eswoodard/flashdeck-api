const express = require('express');
const passport = require('passport');

const Deck = require('./deckModel');

const router = express.Router();

const jwtAuth = passport.authenticate('jwt', {session: false});

router.get('/dashboard', jwtAuth, (req, res) => {
  Deck.find({ deckCreator: req.user.id})
    .then((deck) => {
      res.status(200).json({ deck });
    })
    .catch(err => handleError(res.err));
});

// router.post('/create-deck', jwtAuth, (req, res) => {
//   const deckCreator = req.user.id;
//   const deckTitle = req.body.deckTitle;
//   const deckCard =
// })



module.exports = {router};
