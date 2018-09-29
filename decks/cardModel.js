const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({

  cardTerm: {
    type: String,
    required: true,
  },
  cardDefinition: {
    type: String,
    required: true
  },
  isStarred: {
    type: Boolean
  }
});

const card = mongoose.model('Card', cardSchema);

module.exports = card;