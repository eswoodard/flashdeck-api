const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({

cards: [
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

});

const card = mongoose.model('Card', cardSchema);

module.exports = card;