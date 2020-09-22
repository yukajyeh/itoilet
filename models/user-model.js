const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const userSchema = new Schema({
    username: {
      type: String,
      required:['Username is required'],
      unique: true
    },

    email: {
      type: String, 
      unique: true,
      lowercase: true,
      trim: true
    },

    passwordHash:{
      type: String,
      required: ['Password is required']
    }
  },
    {
      timestamps: true
    }
)

module.exports = model('User', userSchema);