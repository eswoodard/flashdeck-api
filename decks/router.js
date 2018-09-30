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
      res.status(200).json({ deck });
      // console.log('***', {deck});
    })
    .catch(err => handleError(res.err));
});


router.get('/deck/:id', jwtAuth, (req, res) => {
  console.log('!!!');
  Deck
    .findById(req.params.id)
    .populate('deckCards')
    .then((deck) => {
      res.status(200).json({ deck });
      console.log('***', {deck})
    })
    .catch(err => res.status(500).json(err));
});


router.post('/create-deck', jwtAuth, (req, res) => {
  cardIds = [];
  // console.log('!!!', cardIds);
  // console.log('***', req.body);
  // console.log('$$$', req.user.id);


  let cardCount = (Object.keys(req.body).length - 1)/2;
  // replace with 3 when isStarred added
  console.log(cardCount);
  let completed = 0;
  // console.log(req.body);
  Object.keys(req.body).forEach(function(key) {
    if(key.indexOf('term')===0){
      // console.log('inside if statement');
      var id =key.replace('term', '');
      var term = req.body[key];
      var definition = req.body['definition'+id];
      Card.create({
        cardTerm: term,
        cardDefinition: definition,
      })
      .then((card) => {
        // console.log('###', card);
        cardIds.push(card._id);
        checkComplete();
        // console.log('%%%', cardIds);
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
        // console.log("&&&", cardIds);
        res.status(201).json({ deck });
      })
      .catch((err) => {
        res.status(500).json(err);
      });
    }
  }

});



module.exports = {router};
