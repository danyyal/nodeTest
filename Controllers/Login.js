var Services = require('../Services/services')

exports.Login = async (req, res) => {
  try {    
    var result = await Services.login(req, res)
    return result
} catch (error) {
  return error
}
}
