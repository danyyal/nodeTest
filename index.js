var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var mongoose = require('mongoose')
var routes = require('./Routes/routes')

var port = process.env.PORT || 8080
const cors = require('cors');

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

mongoose.connect('mongodb+srv://saadnaveed94:saadabad9797@cluster0.kvqan.mongodb.net/test')
var db = mongoose.connection
app.use(cors());
app.use('/', routes)
app.listen(port, () => {
  console.log('Running RestHub on port ' + port)
})
