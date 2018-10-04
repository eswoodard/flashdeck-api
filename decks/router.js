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
    .then((deck) => {
      res.status(200).json(deck);
    })
    .catch(err => handleError(res.err));
});


router.get('/deck/:id', jwtAuth, (req, res) => {
  Deck
    .findById(req.params.id)
    .populate('deckCards')
    .then((deck) => {
      res.status(200).json({ deck });
      // console.log('***', {deck})
    })
    .catch(err => res.status(500).json(err));
});


router.post('/create-deck', jwtAuth, (req, res) => {
  console.log('***', req.body);
  cardIds = [];

  let cardCount = (Object.keys(req.body).length - 1)/2;
  // replace with 3 when isStarred added
  // console.log('!!!', cardCount);
  let completed = 0;
  // console.log('***', req.body);
  Object.keys(req.body).forEach(function(key) {
    if(key.indexOf('term')===0){
      var id =key.replace('term', '');
      var term = req.body[key];
      var definition = req.body['definition'+id];
      Card.create({
        cardTerm: term,
        cardDefinition: definition,
        deck: req.body.title
      })
      .then((card) => {
        cardIds.push(card._id);
        checkComplete();
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json
      })
    }
  });
  function checkComplete() {
    completed++;
    if(completed === cardCount) {
      Deck.create({
        deckAuthor: mongoose.Types.ObjectId(req.user.id),
        deckTitle: req.body.title,
        deckCards: cardIds
      })
      .then((deck) => {
        const deckjson = deck.toJSON();
        deckjson.deckAuthor = {username: req.user.username}
        console.log('&&&', deck);
        res.status(201).json({ deck: deckjson });
      })
      .catch((err) => {
        res.status(500).json(err);
      });
    }
  }
});

router.delete('delete/deck/:id', jwtAuth, (req, res) => {
  Deck.findByIdAndRemove(req.params.id)
  .then(() => {
    console.log(`Deleted Deck with id \`${req.params.id}\``);
    res.status(204).json({Message: 'Deck successfully deleted'});
  })
  .catch((err) => {
    res.status(500).json(err);
  });
});

router.delete('/card/:id', jwtAuth, (req, res) => {
  Deck.findOne({deckCards: mongoose.Types.ObjectId(req.params.id)})
  .then((deck) => {
    console.log('***', deck);
    deck.deckCards = deck.deckCards.filter((card) => {
      return card != req.params.id;
    })
    return deck.save();
  })
  .catch((err) => {
    res.status(500).json(err);
  });
  Card.findByIdAndRemove(req.params.id)
    .then(() => {
      console.log(`Deleted Card with id \`${req.params.id}\``);
      res.status(204).json({Message: 'Card successfully deleted'});
     })
     .catch((err) => {
       res.status(500).json(err);
     })
  })





module.exports = {router};
