var mongoose = require('mongoose')

var storesSchema = mongoose.Schema({
  name: {
    type: String,
  },
  location:{
    type: String | null
  },
  hasPrice:{
    type: Boolean
  },
  creationTime:{
   type: String
  },
  isActive:{
    type: Number
  },
})


var stores = (module.exports = mongoose.model('stores', storesSchema))
module.exports.get = (callback, limit) => {
  stores.find(callback).limit(limit)
}