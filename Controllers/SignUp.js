var Services = require('../Services/services')
var validator = require("email-validator");

exports.Signup = async (req, res) => {
  try {    
   if(validator.validate(req.body.email)){
    if(req.body.password.length < 6){
      return res.json({
       message: 'Password length should be greater then 6',
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
   var result = await Services.signUp(req)
   if (result !== false) {
     res.json({
       message: 'New User created!',
       data: result
     })
   } else {
     res.json({
       message: 'Email Already Exist!',
       status: '400'
     })
   }
   }else{
        return res.json({
        message: 'Invalid Email',
        status: '400'
       })
   }
  
} catch (error) {
  return error
}
}
