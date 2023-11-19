require('module-alias/register')
const express = require('express')
const {upload} = require('~/multer')
const Event = require('~/models/eventModel')
const User =require('~/models/userModel')
const Shop = require('~/models/shopModel')
const Product = require ('~/models/productModel')
const {verifyAccessToken} = require('~/controller/userController')
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
const { CONNREFUSED } = require('dns')

dotenv.config()
let router = express.Router()
let coupounRoute =(app) => {
  router.post('/create-coupoun',catchAsyncErrors(async(req,res,next)=>{
    try {
      console.log('req.body',req.body);
      const {shopId,name} = req.body
      const shop = await Shop.findOne({_id:shopId})
      if(!shop) {return next(new ErrorHandler('shop id is invalid',400))}
      const nameCoupoun = await Coupoun.findOne({name:name})
      if(nameCoupoun) { return next(new ErrorHandler('Name Coupoun already exist ',400))}
      const coupounData =req.body
      const newCoupoun =await Coupoun.create(coupounData)
      res.status(201).json(newCoupoun)
    } catch (error) {
      return next(new ErrorHandler(error,400))
    }
  }))
  router.get('/get-all-coupoun/:shop_id',isAuthenticated,catchAsyncErrors(async(req,res,next)=>{
      try {
        const coupouns = await Coupoun.find({shopId:req.params.shop_id})
        res.json(coupouns).status(201) 
      } catch (error) {
        return next(new ErrorHandler(error,400))
      }
  }))
  router.delete('/delete-coupoun/:coupoun_id',isAuthenticated,catchAsyncErrors(async(req,res,next)=>{
    try {
      const coupoun = await Coupoun.findByIdAndDelete({_id:req.params.coupoun_id})
      if(!coupoun){
        return next(new ErrorHandler("cannot found coupoun to delete",400))
      }
      res.json({
        success: true,
        message: "coupoun Deleted successfully!",
      }).status(201)
    } catch (error) {
      return next(new ErrorHandler(error,400))
    }
  }))
  app.use("/api/v1",router)
}

module.exports = coupounRoute



// 23 +23 => 46
// 0 + 23=>23 - 7 => 1