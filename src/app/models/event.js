import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  _creator : {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
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
  created: {
    type: Date,
    default: Date.now
  },
});

module.exports = mongoose.model('Event', eventSchema);