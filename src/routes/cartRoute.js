require('module-alias/register')
const express = require('express')
const {upload} = require('~/multer')
const Event = require('~/models/eventModel')
const User =require('~/models/userModel')
const Shop = require('~/models/shopModel')
const Product = require ('~/models/productModel')
const Cart = require('~/models/cartModel')
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
const sendCheckedProductsToken = require("~/utils/sendCheckedProducts")
const sendAccessToken = require("~/utils/sendAccessToken")
const sendShopToken = require("~/utils/sendShopToken")
const {isAuthenticated,isAuthenticatedSeller} = require('~/middleware/auth')
const { log, error } = require('console')
const { env } = require('process')
const { CONNREFUSED } = require('dns')

dotenv.config()
let router = express.Router()
let cartRoute =(app) => {
  router.post('/add-to-cart',isAuthenticated,catchAsyncErrors(async(req,res,next)=>{
    try {      
      const {product,emailUser,count,selectColor,selectCapacity} = req.body
      const findCheckProductInCart = await Cart.findOne({productId:product._id,email:emailUser,class:selectColor,capa:selectCapacity})
      // console.log('findCheckProductInCart',findCheckProductInCart);
      if(findCheckProductInCart){
        await Cart.updateOne({productId:product._id,email:emailUser,class:selectColor,capa:selectCapacity},{$inc:{quanti:count}})
        const cartUpdate = await Cart.findOne({productId:product._id,email:emailUser,class:selectColor,capa:selectCapacity})
      console.log('cartUpdate',cartUpdate);
        const allCarts = await Cart.find({email:emailUser})
        res.json({allCarts,newCard: cartUpdate ,message: "Add to cart successfully"}).status(201) 
      }else{
       const newCard = await Cart.create({
         product,
         quanti:count,
         email:emailUser,
         class:selectColor,
         capa:selectCapacity,
         productId:product._id,
        })
        const allCarts = await Cart.find({email:emailUser})
        res.json({allCarts,newCard:newCard  ,message: "Add to cart successfully"}).status(201) 
      }
    } catch (error) {
      return next(new ErrorHandler(error,400))
    }
  }))
  router.get('/get-all-cart-by-email/:emailUser',isAuthenticated,catchAsyncErrors(async(req,res,next)=>{
      try {
        const allCarts = await Cart.find({email:req.params.emailUser})
        const products = await Product.find({})
        const productsInCart = products.filter(A => {
          return allCarts.some(B =>JSON.stringify(A._id) ===JSON.stringify(B.productId) );
        });
        res.json({allCarts,productsInCart}).status(201) 
      } catch (error) {
        return next(new ErrorHandler(error,400))
      }
  }))
  router.post('/delete-cart',isAuthenticated,catchAsyncErrors(async(req,res,next)=>{
        try {
          const {cartId, userEmail} = req.body
         await Cart.deleteOne({_id:cartId})
         const allCarts = await Cart.find({email:userEmail})
        //  const products = await Product.find({})
        //  const productsInCart = products.filter(A => {
        //    return allCarts.some(B =>JSON.stringify(A._id) ===JSON.stringify(B.productId) );
        //   });
        res.json({allCarts,message:"delete cart successfully"}).status(201)
        } catch (error) {
          return next(new ErrorHandler(error,401))
        }
  }))
  router.post('/update-increase-quanti',isAuthenticated,catchAsyncErrors(async(req,res,next)=>{
    try {
      const {cartId, userEmail} = req.body
      await Cart.updateOne({_id:cartId,email:userEmail}, { $inc: { quanti:1 } })
      const allCarts = await Cart.find({email:userEmail})
     res.json({allCarts}).status(201)
    } catch (error) {
      return next(new ErrorHandler(error,401))
    }
  }))
  router.post('/update-decrease-quanti',isAuthenticated,catchAsyncErrors(async(req,res,next)=>{
    try {
      const {cartId, userEmail} = req.body
      await Cart.updateOne({_id:cartId}, { $inc: { quanti:-1 } })
      const allCarts = await Cart.find({email:userEmail})
     res.json({allCarts}).status(201)
    } catch (error) {
      return next(new ErrorHandler(error,401))
    }
  }))
  router.post('/confirm-variation',isAuthenticated,catchAsyncErrors(async(req,res,next)=>{
    try {
      const {classify,capacity,cartId,emailShop} = req.body
      await Cart.updateOne(
        {_id:cartId}, 
        { 
          $set: {
          class: classify,
          capa: capacity
          }
        }
      )
      const allCarts = await Cart.find({email:emailShop})
     res.json({allCarts,message:"confirm success"}).status(201)
    } catch (error) {
      return next(new ErrorHandler(error,401))
    }
  }))

  const encodedCheckedProducts = (payload) => {return jwt.sign({iss:"tohien",sub:payload,},process.env.JWT_CHECKED_PRODUCTS,{expiresIn:"60m"})}

  router.post('/checked-products',isAuthenticated,(req,res,next)=>{
    console.log(req.body)
    const checkedProducts = req.body
    console.log('encodedCheckedProducts',encodedCheckedProducts(checkedProducts));
    sendCheckedProductsToken(checkedProducts,encodedCheckedProducts(checkedProducts),201,res)
  })
  app.use("/api/v1",router)
}

module.exports = cartRoute
