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
const {isAuthenticated,isAuthenticatedSeller} = require('~/middleware/auth')
const { log } = require('console')

dotenv.config()
let router = express.Router()

let shopRoute =(app) => {
  const encodedShopToken = (payload) => {return jwt.sign({iss:"tohien",sub:payload,},process.env.JWT_SHOPTK_SECRET,{expiresIn:"60m"})}
  const encodedAccessToken = (payload) => {return jwt.sign({iss:"tohien",sub:payload,},process.env.JWT_ACCESSTK_SECRET,{expiresIn:"60m"})}
  router.post("/shop/create-shop",upload.single("file") ,catchAsyncErrors(async (req, res, next) => {
    try {
      const { emailShop,nameShop,zipcode,phoneNumber,arrPickupAddress,city } = req.body;
      console.log('city',city);
    // console.log({ emailShop,nameShop,password,zipcode,phoneNumber,arrPickupAddress});
      const sellerEmail = await Shop.findOne({ email:emailShop });
      const sellerName = await Shop.findOne({ name:nameShop });
      const user = await User.findOne({email:emailShop})
      if (sellerEmail||sellerName) {
        const filename = req.file.filename
        const filePath = `uploads/${filename}`
        fs.unlink(filePath,()=>{})
        if(sellerName)    {return next(new ErrorHandler("User already exist", 400))} 
        if(sellerEmail)   {return next(new ErrorHandler("Email already exist", 400))} 
      }
      const filename = req.file.filename
      const avatar = path.join(filename)
      const seller = {
        city:city,
        name: nameShop,
        avatar: avatar,
        zipcode:zipcode,
        email: emailShop,
        password: user.password,
        phoneNumber: phoneNumber,
        pickupAddress:JSON.parse(arrPickupAddress)
      };
      const shopToken = encodedShopToken(seller)
      const shopTokenReplace = shopToken.replaceAll('.','*')
      const shopTokenUrl = `http://localhost:5001/shop-activation/${shopTokenReplace}`;
      try {
        await sendMail({
          email: seller.email,
          subject: "Activate your Shop",
          message: `Hello ${seller.name}, please click on the link to activate your shop: ${shopTokenUrl}`,
        });
        res.status(201).json({
          success: true,
          message: `please check your email:- ${seller.email} to activate your shop!`,
        });
      } catch (error) {
        return next(new ErrorHandler(error.message, 500));
      }
    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    }
  }));
  router.post("/shop/activation",catchAsyncErrors(async(req, res, next) => {
    try {        
      const { shopToken } = req.body;
      const newShop =jwt.verify(shopToken,process.env.JWT_SHOPTK_SECRET);
      console.log('newShop',newShop);
      // đảm bảo link email chỉ đc click 1 lần 
      const findShop = await Shop.findOne({email:newShop.sub.email})
      if(findShop) {return next(new ErrorHandler('jwt expired', 500))}
      //
      if (!newShop.sub) { return next(new ErrorHandler("Invalid token", 400))}
      const { email,avatar,name,password,zipcode,phoneNumber,pickupAddress,city}= newShop.sub
      const salt = await bcrypt.genSalt(10) 
      const passwordHash = await bcrypt.hash(password,salt)
      const shop = await Shop.create({email,name,city,password:passwordHash,zipcode,avatar,phoneNumber,pickupAddress});
      sendShopToken(shop,encodedShopToken(shop),201,res)
    } catch (error) {
      return next(new ErrorHandler('jwt expired123', 500));
    }
  })
  );
  router.post('/login-shop',async(req,res,next)=>{
    try {
      const {email,password} =req.body
      const shop = await Shop.findOne({ email });
      if(!shop)               {return next(new ErrorHandler("email doesnt exit in the system",400))}
      const valid = bcrypt.compare(password , shop.password)
      if(!valid)              {return next (new ErrorHandler("your password incorrect",400))}
      const user = await User.findOne({email})
      sendAccessToken(user,encodedAccessToken(user),201,res)
    } catch (error) {
      return next(new ErrorHandler(error.message,500))
    }
  })
  router.get("/profile-seller", isAuthenticated,async(req,res,next)=>{
    try {
      // return next(new ErrorHandler("error profile okokok",200))
      const shop = await Shop.findOne({email:req.user.email})
      if(!shop){return next(new ErrorHandler("seller doesnt exit!",400))}
      res.json(shop)
    } catch (error) {
      console.log(error.message);
      return next(new ErrorHandler(error.message,400))
    }
  })
  // router.get('/logout-shop',isAuthenticatedSeller,async(req,res,next)=>{
  //   try {
  //     res.cookie('shopToken',null,{
  //       expires:new Date(Date.now()),
  //       path:"/",httpOnly: true,sameSite: "none",secure: true
  //     })
  //     res.status(201).json({
  //       success:true,
  //       message:"log out shop successfull"
  //     })
  //   } catch (error) {
  //     return  next (new ErrorHandler(error.message,500))
  //   }
  // })
  router.post("/test",async(req,res,next)=>{
    const {email,password} =req.body
    const shop= await Shop.findOne({email})
  })
  app.use("/api/v1",router)
}

module.exports = shopRoute