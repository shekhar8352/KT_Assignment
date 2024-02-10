const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String, 
      required: true,
      enum: ['user', 'admin'], 
      default: 'admin',
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Admin", adminSchema);
