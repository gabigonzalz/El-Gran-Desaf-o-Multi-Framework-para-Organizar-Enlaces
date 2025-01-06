const mongoose = require('mongoose');

const LinkSchema = new mongoose.Schema({
  title: { type: String, required: true },
  url: { type: String, required: true },
  tags: [String],
  votes: { type: Number, default: 0 },
  comments: [
    {
      text: String,
      date: { type: Date, default: Date.now },
    },
  ],
});

module.exports = mongoose.model('Link', LinkSchema);