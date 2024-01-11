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
const testApiRoute = require('./routes/testApi')
const ErrorHandler = require('./utils/ErrorHandle')
const conversationRoute = require('./routes/conversationRoute')
const path = require('path')
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
app.use('/public', express.static(path.join(__dirname, '/public')));
console.log('__dirname',__dirname);
app.use('/',express.static("uploads"))
app.use(bodyParser.urlencoded({extended:true,limit:"200mb"}))
app.use(cors(corsConfig));
app.options('*', cors(corsConfig));
express.static.mime.define({ 'application/javascript': ['js'] });
app.use(express.static(path.join(__dirname,'../frontend/dist')));
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
testApiRoute(app)

app.use(function (err, req, res, next) {
  console.error(err);
  res.status(err.statusCode || 500).json(err.message);
});
app.get("/", (req, res) => {
  res.send("Hello world from backend server!");
});

const server = app.listen(process.env.PORT,() => {
  console.log(`server is running on port ${process.env.PORT}`);
})

// unhandled promise rejection
process.on("",(err)=>{
  console.log("shutting downthe server for",err.message);
  console.log("shutting downthe server for unhandled promise rejection");
  server.close(()=>{
    process.exit(1)
  })
})