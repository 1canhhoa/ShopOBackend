require('module-alias/register')
const express = require('express')
const {upload} = require('~/multer')
const Event = require('~/models/eventModel')
const User =require('~/models/userModel')
const Shop = require('~/models/shopModel')
const Product = require ('~/models/productModel')
const Cart = require('~/models/cartModel')
const Address = require('~/models/addressModel')
const Coupoun = require('~/models/coupounModel')
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
const { log, error } = require('console')
const { env } = require('process')
const { CONNREFUSED, REFUSED } = require('dns')

dotenv.config()
let router = express.Router()
let addressRoute =(app) => {
  router.post('/create-address',isAuthenticated,catchAsyncErrors(async(req,res,next)=>{
    try {
      const { user, fullName, phoneNumber, valueAddress, streetNameOrOther, homeAndWork } = req.body
      let isDefault = req.body.isDefault
      let addressId = req.body.addressId
      // 1 UPDATE
     if(addressId){
       console.log('tồn tại address Id');
       const findIsDefaultTrue = await Address.findOne({userId:user._id,_id:addressId})
       if(findIsDefaultTrue.default===isDefault){
          const update = {
            name:fullName,phone:phoneNumber,address:valueAddress,addressOther:streetNameOrOther,homeOrWork:homeAndWork
          }
          await Address.updateOne({userId:user._id,_id:addressId},{$set:update})

        }else{
        const update = {
          name:fullName,phone:phoneNumber,address:valueAddress,addressOther:streetNameOrOther,homeOrWork:homeAndWork,
          default:true
        }
        await Address.updateOne({userId:user._id,default:true},{$set:{default:false}})
        await Address.updateOne({userId:user._id,_id:addressId},{$set:update})
      }
           
        // 3 GET ALL SEND TO CLIENT
        const findAllAddress = await Address.find({userId:user._id}) 
        res.json({allAddress:findAllAddress,message:"Update Address Successfully"}).status(201)
     }
      // 2 CREATE
     else{
      console.log('không tồn tại address Id')
       // thay thế default nếu newAddress là true
       if(isDefault){
         await Address.updateOne({userId:user._id,default:true},{$set:{default:false}}) 
       }
       // lần đầu tạo mặc định set true
       const findIsFirstAddress = await Address.find({userId:user._id})
        if(findIsFirstAddress.length===0){
         isDefault = true
        }
        //  tạo
        await Address.create(
            { userId:user._id,name:fullName,phone:phoneNumber, address:valueAddress, 
            addressOther:streetNameOrOther,homeOrWork:homeAndWork, default:isDefault }
          )  
       const findAllAddress = await Address.find({userId:user._id}) 
       res.json({allAddress:findAllAddress,message:"Create Address Successfully"}).status(201)  
     }
    } catch (error) {
        return next(new ErrorHandler(error,401))
    }
  }))
  router.get('/get-all-address/:userId',isAuthenticated,catchAsyncErrors( async(req,res,next)=>{
    try {
        const allAddress = await Address.find({userId:req.params.userId})
        res.json({allAddress}).status(201)
      } catch (error) {
        return next(new ErrorHandler(error,401)) 
      }
  }))
  router.post('/set-default-address',isAuthenticated,catchAsyncErrors( async(req,res,next)=>{
    try {
      const { userId, addressId } = req.body
       await Address.updateOne({userId:userId,default:true},{$set:{default:false}})
       await Address.updateOne({userId:userId,_id:addressId},{$set:{default:true}})
       const allAddress = await Address.find({userId:userId})
        res.json({allAddress,message:"Set default Successfully"}).status(201)
      } catch (error) {
        return next(new ErrorHandler(error,401)) 
      }
  }))
  router.post('/delete-address',isAuthenticated,catchAsyncErrors( async(req,res,next)=>{
    try {
      const {id,userId} = req.body
      console.log({id,userId});
     const deleted = await  Address.deleteMany({ _id: id })
     console.log(deleted);
      const allAddress = await Address.find({userId:userId})
      res.json({allAddress,message:"Delete address Successfully"}).status(201)
      } catch (error) {
        return next(new ErrorHandler(error,401)) 
      }
  }))
  app.use("/api/v1",router)
}
module.exports = addressRoute
