var mongoose = require('mongoose')

var FieldTechsSchema = mongoose.Schema({
  name: {
    type: String,
  },
  surname:{
    type: String
  },
  emailAddress:{
    type: String,
    unique: true
  },
  profileImgUrl:{
    type: String | null
  },
  phoneNumber: {
    type: String
  },
  status:{
    type: Number
  },
  isDeleted:{
    type: Boolean
  },
  companyName:{
    type: Boolean
  },
  storeId:{
    type: String
  },
  stats:{
    activeJobs:{
      type: Number
    },
    completedJobs:{
      type: Number
    },
    finishedJobs:{
      type: Number
    },
    orderedJobs:{
    type: Number
    }
  }
})


var fieldtechs = (module.exports = mongoose.model('fieldtechs', FieldTechsSchema))
module.exports.get = (callback, limit) => {
  fieldtechs.find(callback).limit(limit)
}