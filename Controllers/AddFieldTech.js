var Services = require('../Services/services')

exports.addFieldTechs = async (req, res) => {
  try {    
    var result = await Services.addFieldTech(req, res)
    if (result !== false) {
      res.json({
        message: 'New Store created!',
        data: result
      })
    } 
} catch (error) {
  return error
}
}
