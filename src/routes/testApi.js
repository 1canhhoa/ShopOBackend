require('module-alias/register')
const express = require('express')
const {upload} = require('~/multer')
const User =require('~/models/userModel')
const Shop = require('~/models/shopModel')
const Test = require('~/models/testApiModel')
let router = express.Router()
// getAllUser/
let testApiRoute =(app) => {

  router.post("/create",async(req,res,next)=>{
    // console.log('okkkk');
    const { Slogan,CompanyName,Domain } = req.body;
    console.log('Slogan,CompanyName,emaDomainil',req.body);
    res.json('dapost')
    // const {name, email,city} = req.body
    // try {
    //   await Test.create({name, email,city})
    //   res.json("create successfully")
      
    // } catch (error) {
    //   res.json("create failure")
    // }
  })
  router.get("/getAllUser",async(req,res,next)=>{
    try {
     const allUser = await Test.find({})
      res.json({allUser:allUser})
    } catch (error) {
      res.json("get all failure")
    }
  })
  app.use("/api",router)
}

module.exports = testApiRoute