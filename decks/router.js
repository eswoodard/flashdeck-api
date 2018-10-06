const express = require('express');
const passport = require('passport');
const mongoose = require('mongoose');
const Deck = require('./deckModel');
const Card = require('./cardModel');


const router = express.Router();

const jwtAuth = passport.authenticate('jwt', {session: false});

router.get('/dashboard', jwtAuth, (req, res) => {
  Deck
    .find()
    .populate('deckAuthor', 'username')
    // .populate('deckCards')
    .then((deck) => {
      res.status(200).json(deck);
    })
    .catch(err => handleError(res.err));
});


router.get('/deck/:id', jwtAuth, (req, res) => {
  Deck
    .findById(req.params.id)
    // .populate('deckCards')
    .then((deck) => {
      res.status(200).json({ deck });
      console.log('***', {deck})
    })
    .catch(err => res.status(500).json(err));
});


router.post('/create-deck', jwtAuth, (req, res) => {
  console.log('***',req.body)

  const deckCards = req.body.deckCards.map((card) => (
    {
      cardTerm: card.cardTerm,
      cardDefinition: card.cardDefinition
    }
  ))
    Deck.create({
      deckAuthor: mongoose.Types.ObjectId(req.user.id),
      deckTitle: req.body.deckTitle,
      deckCards
    })
    .then((deck) => {
      const deckjson = deck.toJSON();
      deckjson.deckAuthor = {username: req.user.username}
      console.log('&&&', deck);
      res.status(201).json({ deck: deckjson });
    })
    .catch((err) => {
      res.status(500).json(err);
  })

});

router.delete('/deck/:id', jwtAuth, (req, res) => {
  console.log(req.params);
  Deck.findByIdAndRemove(req.params.id)
  .then(() => {
    Deck
    .find()
    .populate('deckAuthor', 'username')
    .then((deck) => {
      res.status(200).json(deck);
    })
    .catch(err => handleError(res.err));
  })
});

router.put('/deck/:id', jwtAuth, (req, res) => {
  console.log('zzz',req.body)
  deckCards = req.body.deckCards.map((card) => (
    {
      cardTerm: card.cardTerm,
      cardDefinition: card.cardDefinition
    }
  ))
    Deck.findByIdAndUpdate(req.params.id, { $set:
      {
      deckTitle: req.body.deckTitle,
      deckCards
    }
    }, {new: true})
    .then(() => {
      Deck
      .find()
      .populate('deckAuthor', 'username')
      .then((deck) => {
        res.status(200).json(deck);
      })
      .catch(err => handleError(res.err));
    })
});





module.exports = {router};
