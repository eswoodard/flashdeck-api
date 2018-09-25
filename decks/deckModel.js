const mongoose = require('mongoose');


const deckSchema = new mongoose.Schema({

  deckCreator: {
    type: mongoose.Schema.Types.ObjectId, ref: 'User'
  },
  deckTitle: {
    type: String,
    required: true,
  },
  deckCard: [{
    type: mongoose.Schema.Types.ObjectId, ref: 'Card'
  }]
})

const deck = mongoose.model('Deck', deckSchema);

module.exports = deck;