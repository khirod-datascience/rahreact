const { Schema, model } = require('mongoose');

const feedbackSchema = new Schema({
  rating: String,
  category: String,
  message: String,
});

module.exports = model('feedback', feedbackSchema);
