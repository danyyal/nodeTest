var mongoose = require('mongoose')

var PropertiesSchema = mongoose.Schema({
  address: {
    type: String,
    unique: false
  },
  status:{
    type: Number
  },
  id:{
    type: Number
  }
})


var jobs = (module.exports = mongoose.model('properties', PropertiesSchema))
module.exports.get = (callback, limit) => {
  jobs.find(callback).limit(limit)
}