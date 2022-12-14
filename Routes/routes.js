var routes = require('express').Router()
var HelloWorld = require('../Controllers/HelloWorld')
var SignUp = require('../Controllers/SignUp')
var Login = require('../Controllers/Login')
var ChangePassword = require('../Controllers/ChangePassword')
var UpdateProfile = require('../Controllers/UpdateProfile')
var GetUserProfile = require('../Controllers/GetUserProfile')
var Jobs = require('../Controllers/Jobs')
var Job = require('../Controllers/Job')
var auth = require('../Middlewares/auth')
var FieldTech = require('../Controllers/FieldTechs')
var addFieldTech = require('../Controllers/FieldTechs')
var stores = require('../Controllers/Stores')

routes.route('/HelloWorld').get(HelloWorld.helloWorld)

routes.route('/SignUp').post(SignUp.Signup)
routes.route('/Login').post(Login.Login)
routes.route('/ChangePassword').post(auth,ChangePassword.changePassword)
routes.route('/UpdateProfile').post(auth,UpdateProfile.updateProfile)
routes.route('/GetUserProfile').get(auth,GetUserProfile.getUserProfile)
routes.route('/GetJobs').get(auth,Jobs.Jobs)
routes.route('/GetaJob').get(auth,Job.Job)
routes.route('/GetFieldTechs').get(auth,FieldTech.fieldTechs)
routes.route('/AddFieldTech').post(auth,addFieldTech.addFieldTechs)
routes.route('/GetStores').get(auth,stores.getStores)
routes.route('/AddStore').post(auth,stores.addStore)
routes.route('/EditFieldTech').post(auth, FieldTech.editFieldTech)
routes.route('/EditStore').post(auth, stores.editStore)

module.exports = routes
