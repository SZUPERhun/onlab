import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  name: {
    type: String,
    /*required: true,*/
  },
});

module.exports = mongoose.model('Event', eventSchema);