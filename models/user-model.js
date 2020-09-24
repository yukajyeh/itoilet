const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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

const User = mongoose.model('User',userSchema)
module.exports = User