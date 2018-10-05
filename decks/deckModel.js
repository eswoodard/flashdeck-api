const mongoose = require('mongoose');


const deckSchema = new mongoose.Schema({

  deckAuthor: {
    type: mongoose.Schema.Types.ObjectId, ref: 'User'
  },
  deckTitle: {
    type: String,
    required: true,
  },
  deckCards: [
    {
      cardTerm: {
          type: String,
          required: true,
        },
        cardDefinition: {
          type: String,
          required: true
        }
      }
    ]

})


const deck = mongoose.model('Deck', deckSchema);

module.exports = deck;