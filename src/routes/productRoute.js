require('module-alias/register')
const express = require('express')
const {upload} = require('~/multer')
const User =require('~/models/userModel')
const Shop = require('~/models/shopModel')
const Product = require('~/models/productModel')
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

dotenv.config()
let router = express.Router()
let productRoute =(app) => {
  router.post('/create-product',upload.array('images'),catchAsyncErrors(async(req,res,next)=>{
    try {
      const {originalPrice,discountPrice,stock,shopId,name,nameOptions,capacities} = req.body
      console.log(nameOptions,capacities);
      const shop = await Shop.findOne({_id:shopId})
      if(!shop) {return next(new ErrorHandler('shop id is invalid',400))}
      const nameProduct = await Product.findOne({name:name})
      if(nameProduct) { return next(new ErrorHandler('Name already exist ',400))}
      else{
        const nameOptionsJs = JSON.parse(nameOptions)
        const capacitiesJs = JSON.parse(capacities)
        const files = req.files
        const fileImages = files.slice(nameOptionsJs.length)
        const arr =nameOptionsJs.map((c,i)=>
            ({
              name:c,
              url :files[i].filename,
              capacity:capacitiesJs[i]
            })
)
        const imagesUrl = fileImages.map((f,i)=>`${f.filename}`)
        const productData =req.body
        productData.shop=shop
        productData.stock=parseInt(stock)
        productData.images=imagesUrl
        productData.capacities = arr
        productData.discountPrice=parseInt(discountPrice)
        productData.originalPrice=parseInt(originalPrice)
        const newProduct =await Product.create(productData)
        res.status(201).json(newProduct)
      }
    } catch (error) {
      return next(new ErrorHandler(error,400))
    }
  }))
  router.get('/get-all-product',isAuthenticated,catchAsyncErrors(async(req,res,next)=>{
    try {
      const products = await Product.find({})
      res.json(products).status(201) 
    } catch (error) {
      return next(new ErrorHandler(error,400))
    }
}))
  router.get('/get-all-product/:shop_id',isAuthenticated,catchAsyncErrors(async(req,res,next)=>{
      try {
        const products = await Product.find({shopId:req.params.shop_id})
        res.json(products).status(201) 
      } catch (error) {
        return next(new ErrorHandler(error,400))
      }
  }))
  router.get('/get-all-product-by-name/:name',isAuthenticated,catchAsyncErrors(async(req,res,next)=>{
    try {
      const shop = await Shop.findOne({name:req.params.name})
      const products = await Product.find({shopId:shop._id})
      res.json({products,shop}).status(201) 
    } catch (error) {
      return next(new ErrorHandler(error,400))
    }
}))
  router.delete('/delete-product/:product_id',isAuthenticated,catchAsyncErrors(async(req,res,next)=>{
    try {
      console.log('req.params.product_id',typeof req.params.product_id);
      const product = await Product.findById({_id:req.params.product_id})
      if(!product){
        return next(new ErrorHandler("cannot found product to delete",400))
      }
      // xóa product đồng thời xóa luôn ảnh
      product.images.forEach((im)=>{
        const filePath = `uploads/${im}`
        fs.unlink(filePath,(error)=>console.log(error))
      })
      product.capacities.map((im)=>{
        const filePath = `uploads/${im.url}`
        fs.unlink(filePath,(error)=>console.log(error))
      })
      await Product.findByIdAndDelete({_id:req.params.product_id})
      res.json({
        success: true,
        message: "Product Deleted successfully!",
      }).status(201)
    } catch (error) {
      return next(new ErrorHandler(error,400))
    }
  }))
  router.get('/replace',async(req,res,next)=>{
    const product = await Product.updateMany(
    // {_id:"652671cba535c6ce272993c5"}
      {
        'shop.email':"96yerin96@gmail.com"
      },
     {
        $set:{ name:"Lamborghini Aventador LP700 4 nội thất sang trọng và động cơ mạnh mẽ ra mắt giới hạn chỉ 600 chiếc"}
      },
    )
    res.json({product,success:true}).status(201)
  })
  app.use("/api/v1",router)
}

module.exports = productRoute