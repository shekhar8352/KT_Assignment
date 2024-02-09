const mongoose = require('mongoose');

const deviceSchema = new mongoose.Schema({
  alloted_to_user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  state: {
    light: {
      type: Number,
      default: 0 
    },
    fan: {
      type: Number,
      default: 0 
    },
    mis: {
      type: Number,
      default: 0 
    }
  }
},
{
  timestamps: true,
}
);

module.exports = mongoose.model("Device", deviceSchema);
