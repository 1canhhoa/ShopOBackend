const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const mongodb = require('./configs/mongodb')
const cookieParser = require("cookie-parser")
const bodyParser = require('body-parser')
const fileupload = require("express-fileupload")
const userRoute = require('./routes/userRoute')
const shopRoute = require('./routes/shopRoute')
const eventRoute = require('./routes/eventRoute')
const productRoute = require('./routes/productRoute')
const coupounRoute = require('./routes/coupounRoute')
const messagesRoute = require('./routes/messagesRoute')
const cartRoute = require('./routes/cartRoute')
const addressRoute =require('./routes/addressRoute')
const orderRoute = require('./routes/orderRoute')
const ErrorHandler = require('./utils/ErrorHandle')
const conversationRoute = require('./routes/conversationRoute')
require('module-alias/register')

const app = express()
const corsConfig = {
  origin: true,
  credentials: true,
};
mongodb()

dotenv.config()
app.use(express.json())
app.use(cookieParser())

app.use('/',express.static("uploads"))
app.use(bodyParser.urlencoded({extended:true,limit:"200mb"}))

app.use(cors(corsConfig));
app.options('*', cors(corsConfig));

userRoute(app)
shopRoute(app)
eventRoute(app)
productRoute(app)
coupounRoute(app)
cartRoute(app)
addressRoute(app)
orderRoute(app)
conversationRoute(app)
messagesRoute(app)
app.use(function (err, req, res, next) {
  console.error(err);
  res.status(err.statusCode || 500).json(err.message);
});

const server = app.listen(process.env.PORT)

// unhandled promise rejection
process.on("",(err)=>{
  console.log("shutting downthe server for",err.message);
  console.log("shutting downthe server for unhandled promise rejection");
  server.close(()=>{
    process.exit(1)
  })
})