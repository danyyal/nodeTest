var Services = require('../Services/services')

exports.fieldTechs = async (req, res) => {
  try {    
    var result = await Services.getFieldTechs(req, res)
    return result
} catch (error) {
  return error
}
}

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

exports.editFieldTech = async (req, res) => {
  try {    
    var result = await Services.editFieldTech(req, res)
    return result
} catch (error) {
  return error
}
}
