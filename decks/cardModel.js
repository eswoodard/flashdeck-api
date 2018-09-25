const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({

  deck: {
    type: mongoose.Schema.Types.ObjectId, ref: 'Deck'
  },
  cardTerm: {
    type: String,
    required: true,
  },
  cardDefinition: {
    type: String,
    required: true
  }
}),

const card = mongoose.model('Card', cardSchema);

module.exports = card;