var Services = require('../Services/services')

exports.Jobs = async (req, res) => {
  try {    
    var result = await Services.getJobs(req, res)
    return result
} catch (error) {
  return error
}
}
