var express       = require('express')
var path          = require('path')
var mongoose      = require('mongoose')
var multipart     = require('connect-multiparty')
var logger        = require('morgan')
var bodyParser    = require('body-parser')
var cookieParser  = require('cookie-parser');
var session       = require('express-session');
var mongoStore    = require('connect-mongo')(session)
var ejs           = require('ejs')

var port          = process.env.PORT || 3000
var app           = express()
var dbUrl         = 'mongodb://localhost:27017/uestsp'

// mongoose.connect(dbUrl)

// 定义
app.use(express.static(path.join(__dirname, "public")))
app.set('views', path.join(__dirname, "app/views"))
app.engine('.html', require('ejs').renderFile)
app.set('view engine', 'html')

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());
// app.use(multipart())

app.use(cookieParser('uestsp'))
app.use(session({
  secret: 'uestsp',
  // store: new mongoStore({
  //   url: dbUrl,
  //   collection: 'sessions'
  // })
}))

if ('development' === app.use(logger('dev'))) {
  app.set('showStackError', true)
  app.use(logger(':method :url :status'))
  app.locals.pretty = true
  mongoose.set('debug', true)
}

// require('./config/routers')(app)
require('./config/apirouters')(app)
require('./error')(app)
app.locals.dateFormat = require('./utils/dateFormat').dateFormat;

app.listen(port)

console.log('app started on port ' + port)