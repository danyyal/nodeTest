var users = require('../Model/signup')
var jobs = require('../Model/Jobs')
var fieldTechs = require('../Model/FieldTechs')
var stores = require('../Model/Stores')

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const moment = require('moment')

const Encrypt = {
  cryptPassword: (password) =>
      bcrypt.genSalt(10)
      .then((salt => bcrypt.hash(password, salt)))
      .then(hash => hash),
  
      comparePassword: (password, hashPassword) =>
          bcrypt.compare(password, hashPassword)
          .then(resp => resp)
  
  }

exports.signUp = async data => {
  try {
    const myEncryptPassword = await Encrypt.cryptPassword(data.body.password);
    console.log('here', data.body)
    var new_user = new users({
      email: data.body.email,
      password: myEncryptPassword,
      firstName: data.body.firstName,
      lastName: data.body.lastName
    });
    return Promise.resolve(await new_user.save())
  } catch (error) {
    console.log("heres", error)
    return false
  }
}

exports.login = async (data, res) => {
try {
  var result = await users.findOne({ email: data.body.email })
    if(result === null){
      return res.status(404).send({ message: "User Not found." , status: 404});
    }else{
     const isValid = await Encrypt.comparePassword(data.body.password, result.password);
       if(!isValid){
        return res.json({   
          'message': 'Invalid Password',
          'status': 401
        })
       }else{
        const token = jwt.sign({ id: result._id }, 'qwertyuiop')
        result.password = undefined;
        result.password = data.body.password
        return res.json({
          'message': 'Success',
          'token': token,
          'user': result,
          'status': 200
        })
       }
    }
} catch (error) {
  console.log("err", error)
  return false
} 
}

exports.changePassword = async (data, res) => {
  try {
  var decoded = jwt.verify(data.headers.authorization.split(' ')[1], "qwertyuiop");
  var result = await users.findOne({ _id: decoded.id })
  if(data.body.password){
    const isValid = await Encrypt.comparePassword(data.body.password, result.password);
    if(!isValid){
      return res.json({
        'message': 'Old Password do not match',
        'status': 401
      })
    }else{
     if(data.body.newPassword && data.body.newPassword.length > 6){
      const myEncryptPassword = await Encrypt.cryptPassword(data.body.newPassword);
       try {
        users.updateOne({ "_id": decoded.id },{$set: {"password": myEncryptPassword}})
        res.json({
          'message':'password updated'
        })
       } catch (error) {
        res.json({
          'message': 'here'
        })
       }
     }else{
      return res.json({
        'message': 'New Password Invalid',
        'status': 401
      })
     }
    }
  }else{
    return res.json({
      'message': 'Invalid Password',
      'status': 401
    })
  }
  } catch (error) {
    return res.json({
      status: 'Err',
      message: error
    })
  }
}

exports.updateProfile = async (data, res) => {
  try {
    var decoded = jwt.verify(data.headers.authorization.split(' ')[1], "qwertyuiop");
    let keys = Object.keys(data.body)
    let profileObj = {}
    keys.map((item)=> {
      profileObj[item] = data.body[item]
    })
   await users.updateOne({ "_id": decoded.id },{$set: profileObj})
   var result = await users.findOne({ _id: decoded.id })
  
   return  res.json({
     'message': "profile Updated",
     'user': result
   })
  } catch (error) {
    console.log("errrrrrr", error)
    return res.json({
      'errore': error
    })
  }
}

exports.getUserProfile = async (data, res) => {
  try {
    var decoded = jwt.verify(data.headers.authorization.split(' ')[1], "qwertyuiop");
    var result = await users.findOne({ _id: decoded.id })
  
    return res.json({
      'user': result
    })
  } catch (error) {
    return res.json({
      'error': error
    })
  }
}

exports.getJobs = async (data, res) => {
  try {
    if(data.query.status === ''){
      jobs.get((err, AllJobs) => {
        if (err) {
          res.json({
            status: 'error',
            message: err
          })
        } else {
          res.json({
            status: '200',
            message: 'Jobs retrieved Successfully',
            data: AllJobs
          })
        }
      })
    }else{
      var result = await jobs.find({status: data.query.status})
        res.json({
            status: '200',
            message: 'Jobs retrieved Successfully',
            data: result
          })
    }
  } catch (error) {
    console.log("error", error)
    return res.json({
      'error': error
    })
  }
}

exports.getaJob = async (data, res) => {
  try {
    if(data.query.id === undefined){
      return res.json({   
        'message': 'Invalid Request.',
        'status': 401
      })
    }else{
      var result = await jobs.findOne({ id: data.query.id })
      if(result === null){
        res.json({
          status: '404',
          message: 'Job not found',
          data: null
        })
      }else {
        res.json({
          status: '200',
          message: 'Job retrieved Successfully',
          data: result
        })
      }

    }
  } catch (error) {
    return res.json({
      'error': error
    })
  }
}

exports.getFieldTechs = async (data, res) => {
  try {
    fieldTechs.get((err, AllFieldTechs) => {
      if (err) {
        res.json({
          status: 'error',
          message: err
        })
      } else {
        res.json({
          status: '200',
          message: 'FieldTechs retrieved Successfully',
          data: AllFieldTechs
        })
      }
    })
  } catch (error) {
    return res.json({
      'error': error
    })
  }
}

exports.addFieldTech = async (data, res) => {
  try {
    if(data.body.name === undefined){
      return res.json({
        'message': 'Name not provided',
        'status': 401
      })
    }
    if(data.body.surname === undefined){
      return res.json({
        'message': 'Surname not provided',
        'status': 401
      })
    }
    if(data.body.emailAddress === undefined){
      return res.json({
        'message': 'emailAddress not provided',
        'status': 401
      })
    }
    if(data.body.phoneNumber === undefined){
      return res.json({
        'message': 'phoneNumber not provided',
        'status': 401
      })
    }
    if(data.body.storeId === undefined){
      return res.json({
        'message': 'storeId not provided',
        'status': 401
      })
    }
    var new_fieldtech = new fieldTechs({
      name: data.body.name,
      surname: data.body.surname,
      emailAddress: data.body.emailAddress,
      profileImgUrl: null,
      phoneNumber: data.body.phoneNumber,
      status: 0,
      isDeleted: false,
      companyName: null,
      storeId: data.body.storeId,
      stats:{
        activeJobs: 0,
        completedJobs: 0,
        finishedJobs: 0,
        orderedJobs: 0
      }
      });
      return Promise.resolve(await new_fieldtech.save())
  } catch (error) {
    console.log("abc", error)
    return res.json({
      'error': error
    })
  }
}

exports.addStore = async (data, res) => {
  try {
    if(data.body.name === undefined){
      return res.json({
        'message': 'Name not provided',
        'status': 401
      })
    }
    if(data.body.hasPrice === undefined){
      return res.json({
        'message': 'hasPrice not provided',
        'status': 401
      })
    }
    let date = new Date
    var new_store = new stores({
    name: data.body.name,
    hasPrice: data.body.hasPrice,
    isActive: 0,
    location: null,
    creationTime:moment(date).format("YYYY-MM-DDTHH:mm:ss.SSSSSS")
    });
    return Promise.resolve(await new_store.save())
  } catch (error) {
    return res.json({
      'error': error
    })
  }
}

exports.getStores = async (data, res) => {
  try {
    stores.get((err, AllStores) => {
      if (err) {
        res.json({
          status: 'error',
          message: err
        })
      } else {
        res.json({
          status: '200',
          message: 'Stores retrieved Successfully',
          data: AllStores
        })
      }
    })
  } catch (error) {
    return res.json({
      'error': error
    })
  }
}


exports.editFieldTech = async (data, res) => {
  try {
    if(data.body.fieldTechId === undefined){
      return res.json({
        'message': 'Field Tech Id not provided',
        'status': 401
      })
    }
    var result = await fieldTechs.findOne({ _id: data.body.fieldTechId })
    if(result === null){
      return res.status(404).send({ message: "Field Tech Not found." , status: 404});
    }else {       
      if(data.body.name === undefined){
        return res.json({
          'message': 'Name not provided',
          'status': 401
        })
      }
      if(data.body.surname === undefined){
        return res.json({
          'message': 'Surname not provided',
          'status': 401
        })
      }
      if(data.body.emailAddress === undefined){
        return res.json({
          'message': 'emailAddress not provided',
          'status': 401
        })
      }
      if(data.body.phoneNumber === undefined){
        return res.json({
          'message': 'phoneNumber not provided',
          'status': 401
        })
      }
      if(data.body.storeId === undefined){
        return res.json({
          'message': 'storeId not provided',
          'status': 401
        })
      }
      let keys = Object.keys(data.body)
      let fieldTechObj = {}
      keys.map((item)=> {
        fieldTechObj[item] = data.body[item]
      })
      await fieldTechs.updateOne({ "_id": data.body.fieldTechId },{$set: fieldTechObj})

      var updatedFieldTech = await fieldTechs.findOne({ _id: data.body.fieldTechId })
     
      return res.json({
        status: 200,
        data: updatedFieldTech,
        message: "Field Tech updated"
      })
    }
  } catch (error) {
    console.log(error)
    if(error.name === 'CastError'){
      return res.json({
        'error': "error",
        message: "Field Tech Not found." ,
        status: 404
      })
    }else {
      return res.json({
        'error': error
      })
    }
  }
}

exports.editStore = async (data, res) => {
  try {
    if(data.body.storeId === undefined){
      return res.json({
        'message': 'Store Id not provided',
        'status': 401
      })
    }
    if(data.body.name === undefined){
      return res.json({
        'message': 'Name not provided',
        'status': 401
      })
    }
    if(data.body.hasPrice === undefined){
      return res.json({
        'message': 'hasPrice not provided',
        'status': 401
      })
    }
    let keys = Object.keys(data.body)
    let storeObj = {}
    keys.map((item)=> {
      storeObj[item] = data.body[item]
    })
     await stores.updateOne({ "_id": data.body.storeId },{$set: storeObj})
     var updatedstore = await stores.findOne({ _id: data.body.storeId })

    return res.json({
      'message': updatedstore,
      'status': 200
    })
  } catch (error) {
    console.log("err", error)
    return res.json({
      'error': error
    })
  }
}
