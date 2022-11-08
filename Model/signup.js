var mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
var uniqueValidator = require('mongoose-unique-validator')

var signUpSchama = mongoose.Schema({
  email: {
    type: String,
    unique: true
  },
  password: {
    type: String
  },
  firstName: {
    type: String
  },
  lastName: {
    type: String
  }
})
// SignUpSchama.plugin(uniqueValidator)

// SignUpSchama.methods.generateAuthToken = function () {
//   const user = this
//   const token = jwt.sign({ id: user._id }, 'qwertyuiop')
//   return token
// }

// SignUpSchama.methods.comparePassword = async function (GivenPassword) {
//   var result = await bcrypt.compare(GivenPassword, this.password)
//   if (result) {
//     return true
//   } else {
//     return false
//   }
// }

// SignUpSchama.pre('save', async function (next) {
//   if (this.password.length >= 6) {
//     this.password = await bcrypt.hash(this.password, 8)
//     next()
//   }
// })


module.exports = mongoose.model('users', signUpSchama);          
