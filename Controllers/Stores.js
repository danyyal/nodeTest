var Services = require('../Services/services')

exports.getStores = async (req, res) => {
  try {    
    var result = await Services.getStores(req, res)
    return result
} catch (error) {
  return error
}
}

exports.addStore = async (req, res) => {
  try {    
    var result = await Services.addStore(req, res)
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

exports.editStore = async (req, res) => {
  try {    
    var result = await Services.editStore(req, res)
    return result
} catch (error) {
  return error
}
}