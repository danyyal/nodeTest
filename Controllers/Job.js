var Services = require('../Services/services')

exports.Job = async (req, res) => {
  try {    
    var result = await Services.getaJob(req, res)
    return result
} catch (error) {
  return error
}
}
