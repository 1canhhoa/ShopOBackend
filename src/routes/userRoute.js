require('module-alias/register')
const express = require('express')
const {upload} = require('~/multer')
const User =require('~/models/userModel')
const Shop = require('~/models/shopModel')
const catchAsyncErrors = require("~/middleware/catchAsyncErrors");
const ErrorHandler = require('~/utils/ErrorHandle')
const path = require("path")
const fs = require ('fs')
const jwt = require('jsonwebtoken')
const dotenv = require("dotenv")
const bcrypt = require("bcryptjs")
const sendMail = require("~/utils/sendMail")
const sendAccessToken = require("~/utils/sendAccessToken")
const sendShopToken = require("~/utils/sendShopToken")
const {isAuthenticated} = require('~/middleware/auth')
const { log } = require('console')
const data = require("~/data/data")
dotenv.config()
let router = express.Router()

let userRoute =(app) => {
  const encodedAccessToken = (payload) => {return jwt.sign({iss:"tohien",sub:payload,},process.env.JWT_ACCESSTK_SECRET,{expiresIn:"30m"})}
  router.post("/create-user" , upload.single("file") ,async (req, res, next) => {
    try { 
      const { username,password,email } = req.body;
      console.log(req.body);
      const checkUsername = await User.findOne({ username });
      const checkEmail = await User.findOne({ email });
      if(!username) {return next(new ErrorHandler("Please fill in your username", 400))}
      if(!password) {return next(new ErrorHandler("Please fill in your password", 400))}
      if(!email)    {return next(new ErrorHandler("Please fill in your email", 400))}
      if (checkEmail || checkUsername) {
        const filename = req.file.filename
        const filePath = `uploads/${filename}`
        fs.unlink(filePath,()=>{})
        if(checkUsername){return next(new ErrorHandler("User already exist", 400))} 
        if(checkEmail)   {return next(new ErrorHandler("Email already exist", 400))} 
      }
      const filename = req.file.filename
      const avatar = path.join(filename)
      const accessToken = encodedAccessToken({username,email,password,avatar})
      // url ko chấp nhận dấu chấm => thay  thế bằng dấu sao trong token
      const accessTokenReplace = accessToken.replaceAll('.','*')
      const accessTokenUrl = `http://localhost:5001/activation/${accessTokenReplace}`;
      try {
        await sendMail({
          email:  email,
          subject: "Activate your account",
          message: `Hello ${username}, please click on the link to activate your account: ${accessTokenUrl}`,
        });
       return res.status(201).json({
          success: true,
          message: `please check your email:- ${email} to activate your account!`,
        });
      } catch (error) {return next(new ErrorHandler(error.message, 500))}
    }catch (error) {return next(new ErrorHandler(error.message, 400))}
  })
  // khi người dùng click vào link trong email, thì mới tạo người dùng trong database
  router.post("/user/activation",async(req, res, next) => {
      try {        
        const { accessToken } = req.body;
        const newUser = jwt.verify(accessToken,process.env.JWT_ACCESSTK_SECRET);
        // đảm bảo link email chỉ đc click 1 lần 
        console.log('newUser0',newUser);
        const findUser = await User.findOne({email:newUser.sub.email})
        console.log('finduser1',findUser);
        if(findUser) {return next(new ErrorHandler('jwt expired', 500))}
        if (!newUser.sub) { return next(new ErrorHandler("Invalid token", 400))}
        const {email,username,password,avatar} = newUser.sub
        const salt = await bcrypt.genSalt(10) 
        const passwordHash = await bcrypt.hash(password,salt)
        const user = await User.create({email,username,password:passwordHash,avatar});
        sendAccessToken(user,encodedAccessToken(user),201,res)
      } catch (error) {
        return next(new ErrorHandler('jwt expired', 500));
      }
    })
  router.post('/login-user',async(req,res,next)=>{
    try {
      const {email,password} = req.body
      if(!email || !password) {return next(new ErrorHandler("Please provide complete information",400))}
      const user = await User.findOne({ email });
      if(!user)               {return next(new ErrorHandler("email doesnt exit in the system",400))}
      const valid = bcrypt.compareSync(password , user.password)
      if(!valid)              {return next (new ErrorHandler("your password incorrect",400))}
      sendAccessToken(user,encodedAccessToken(user),201,res)
    } catch (error) {
      return next(new ErrorHandler(error.message,500))
    }
  })
  router.get("/profile", isAuthenticated,async(req,res,next)=>{
    try {
      // return next(new ErrorHandler("error profile okokok",200))
      const user = await User.findById(req.user._id)
      if(!user){return next(new ErrorHandler("user doesnt exit!",400))}
      res.json(user)
    } catch (error) {
      return next(new ErrorHandler(error.message,400))
    }
  })
  router.get('/logout',isAuthenticated,async(req,res,next)=>{
    try {
      res.cookie('accessToken',null,{
        expires:new Date(Date.now()),
        path:"/",httpOnly: true,sameSite: "none",secure: true
      })
      res.status(201).json({
        success:true,
        message:"log out successfull"
      })
    } catch (error) {
      return  next (new ErrorHandler(error.message,500))
    }
  })
  router.get('/test',async(req,res,next)=>{
    const user = await User.find({})
    res.json({user:user[0]}).status(200)
  })
  app.use("/api/v1",router)
}

module.exports = userRoute