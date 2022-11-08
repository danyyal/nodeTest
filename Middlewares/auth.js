const jwt = require('jsonwebtoken')
var users = require('../Model/signup')

const Auth = async (req, res, next) => {
  try {
    // console.log('zxcvbnm', req.header('authorization'))
    if (req.header('authorization') === undefined) {
      res
        .json({
          message: 'Token not provided!'
        })
        .status(500)
    } else {
      const token = req.header('authorization').replace('Bearer ', '')
      const user_id = await jwt.verify(token, 'qwertyuiop')

      var result = await users.findOne({ _id: user_id.id })

      if (result !== 'Invalid signature') {
        if (result !== null) {
          next()
        } else {
          res
            .json({
              message: 'User Not Found'
            })
            .status(500)
        }
      } else {
        res
          .json({
            message: 'Invalid Token'
          })
          .status(500)
      }
    }
  } catch (error) {
    res.status(500)
    res.json({
      data: error
    })
  }
}

module.exports = Auth