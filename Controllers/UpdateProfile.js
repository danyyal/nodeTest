// const jwt = require('jsonwebtoken')
var Services = require('../Services/services')

exports.updateProfile = async (req, res) => {
try {
  if(req.body.password === undefined || req.body.password.length < 6){
    return res.json({
     message: 'Password length should be greater then 6',
     status: '400'
    })
 }
 if(req.body.confirmPassword === undefined){
  return res.json({
   message: 'Password (confirmPassword) length should be greater then 6',
   status: '400'
  })
}
 if(req.body.password !== req.body.confirmPassword){
   return res.json({
     message: 'Passwords do not match',
     status: '400'
    })
 }
 if(req.body.firstName === ''){
  return res.json({
    message: 'Invalid firstName',
    status: '400'
   })
}
if(req.body.lastName === ''){
 return res.json({
   message: 'Invalid lastName',
   status: '400'
  })
}
  var result = await Services.updateProfile(req, res)
  return result
} catch (error) {
  return error
}
}
