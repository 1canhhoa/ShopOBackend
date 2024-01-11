require('module-alias/register')
const express = require('express')
const {upload} = require('~/multer')
const Event = require('~/models/eventModel')
const User =require('~/models/userModel')
const Shop = require('~/models/shopModel')
const Product = require('~/models/productModel')
const Coupoun  = require('~/models/coupounModel')
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

dotenv.config()
let router = express.Router()
let eventRoute =(app) => {
  router.post('/create-event',upload.array('images'),catchAsyncErrors(async(req,res,next)=>{
    try {
      const {shopId,name} = req.body
      const shop = await Shop.findOne({_id:shopId})
      if(!shop) {return next(new ErrorHandler('shop id is invalid',400))}
      const nameEvent = await Event.findOne({name:name})
      if(nameEvent) { return next(new ErrorHandler('Name Event already exist ',400))}
      else{
        const files = req.files
        const imagesUrl = files.map((f,i)=>`${f.filename}`)
        const eventData =req.body
        eventData.shop=shop
        eventData.images=imagesUrl
        const newEvent =await Event.create(eventData)
        res.status(201).json(newEvent)
      }
    } catch (error) {
      return next(new ErrorHandler(error,400))
    }
  }))
  router.get('/get-all-event/:shop_id',isAuthenticated,catchAsyncErrors(async(req,res,next)=>{
      try {
        const events = await Event.find({shopId:req.params.shop_id})
        res.json(events).status(201) 
      } catch (error) {
        return next(new ErrorHandler(error,400))
      }
  }))
  router.get('/get-all-events',isAuthenticated,catchAsyncErrors(async(req,res,next)=>{
    try {
      const events = await Event.find({})
      res.json(events).status(201) 
    } catch (error) {
      return next(new ErrorHandler(error,400))
    }
}))
  router.delete('/delete-event/:event_id',isAuthenticated,catchAsyncErrors(async(req,res,next)=>{
    try {
      const event = await Event.findById({_id:req.params.event_id})
      if(!event){
        return next(new ErrorHandler("cannot found event to delete",400))
      }
      event.images.forEach((im)=>{
        const filePath = `uploads/${im}`
        fs.unlink(filePath,(error)=>console.log(error))
      })
      await Event.findByIdAndDelete({_id:req.params.event_id})
      res.json({
        success: true,
        message: "event Deleted successfully!",
      }).status(201)
    } catch (error) {
      return next(new ErrorHandler(error,400))
    }
  }))
  app.use("/api/v1",router)
}

module.exports = eventRoute



// 23 +23 => 46
// 0 + 23=>23 - 7 => 1