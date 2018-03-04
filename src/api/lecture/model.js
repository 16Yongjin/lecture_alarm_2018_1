const mongoose = require('mongoose')
const { Schema } = mongoose

const UserSchema = new Schema({
  token: {
    type: String,
    required: true
  },
  majors: [String],
  lectures: [String]
})

const User = mongoose.model('User', UserSchema)

module.exports = User
