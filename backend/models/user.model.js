const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
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
      default: 'user',
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
