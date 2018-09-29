const mongoose = require('mongoose');


const deckSchema = new mongoose.Schema({

  deckAuthor: {
    type: mongoose.Schema.Types.ObjectId, ref: 'User'
  },
  deckTitle: {
    type: String,
    required: true,
  },
  deckCards: [{
    type: mongoose.Schema.Types.ObjectId, ref: 'Card'
  }]
})

const deck = mongoose.model('Deck', deckSchema);

module.exports = deck;