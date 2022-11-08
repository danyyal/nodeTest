// const jwt = require('jsonwebtoken')
var Services = require('../Services/services')

exports.changePassword = async (req, res) => {
try {
  var result = await Services.changePassword(req, res)
  return result
} catch (error) {
  return error
}
}
