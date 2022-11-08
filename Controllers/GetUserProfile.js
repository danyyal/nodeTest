// const jwt = require('jsonwebtoken')
var Services = require('../Services/services')

exports.getUserProfile = async (req, res) => {
try {
  var result = await Services.getUserProfile(req, res)
  return result
} catch (error) {
  return error
}
}
