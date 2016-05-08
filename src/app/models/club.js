import mongoose from 'mongoose';

const clubSchema = new mongoose.Schema({
  _creator : {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  _events : [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event',
  }],
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  location: {
    type: String,
  },
});

module.exports = mongoose.model('Club', clubSchema);