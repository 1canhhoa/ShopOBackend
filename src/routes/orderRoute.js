require('module-alias/register')
const express = require('express')
const {upload} = require('~/multer')
const Event = require('~/models/eventModel')
const User =require('~/models/userModel')
const Shop = require('~/models/shopModel')
const Product = require ('~/models/productModel')
const Cart = require('~/models/cartModel')
const Order = require('~/models/orderModel')
const Address = require('~/models/addressModel')
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
const { ObjectId } = require('mongodb');
const { log, error } = require('console')

dotenv.config()
let router = express.Router()
let orderRoute =(app) => {
  const handleAllOrder = (allOrders)=>{
    console.log(3);
    const abc = JSON.parse(allOrders)?.map((a, i) => {
      // sắp xếp từ [1,2,4,2,4] ==> [[1],[2,2],[4,4]]
      let rs = a?.products?.reduce((acc, obj) => {
        let key = obj.product.shopId;
        (acc[key] ? acc[key] : (acc[key] = [])).push(obj);
        return acc;
      }, {});
      rs = Object.values(rs);
      // thay thế giá trị của products thành rs(mảng đã sắp xếp) trong orders
      const arr = { ...a, products: rs }
      return arr
    })
    return abc
  }
  const handleAllOrder1 = (order)=>{
      // sắp xếp từ [1,2,4,2,4] ==> [[1],[2,2],[4,4]]
      let rs = order?.products?.reduce((acc, obj) => {
        let key = obj.product.shopId;
        (acc[key] ? acc[key] : (acc[key] = [])).push({...obj,status:'Completed'});
        return acc;
      }, {});
      rs = Object.values(rs);
      // thay thế giá trị của products thành rs(mảng đã sắp xếp) trong orders
      const arr = { ...order, products: rs }
    return arr
  }
  router.post('/create-order',isAuthenticated,async(req,res,next)=>{
    try {
      const orderNew = req.body
      let allCarts = await Cart.find({email:req.user.email})
      console.log('allCarts',allCarts.length);

      const isIdNeedDelete = orderNew.products.map(a=>a.cartId)
      // lưu ý không được dùng forEach vì nó là hàm BĐB
      for (const a of allCarts) {
        if (isIdNeedDelete.includes(a._id.toString())) {
          await Cart.deleteOne({ _id: a._id });
        }
      }
      // const rs = handleAllOrder(abc)
      const rs1 = handleAllOrder1(orderNew)
      await Order.create(rs1)
      const allOrders = await Order.find({orderBy:req.user._id})
      console.log('rs1',rs1);
      res.json({success:true,message:"You have successfully paid! Congrat",allOrders:allOrders,rs1:rs1})
    } catch (error) {
      return next(new ErrorHandler(error,400))
    }
  })
  router.get('/get-all-orders-by-user',isAuthenticated,async(req,res,next)=>{
    try {
      const allOrders = await Order.find({orderBy:req.user})
      res.json({allOrders:allOrders})
    } catch (error) {
      return next(new ErrorHandler(error,400))
    }
  })
  // get-all-orders-by-user
  router.get('/test11',async(req,res,next)=>{
    try {
     const allOrder= Order.find({})
     const allProducts= Product.find({})
    allOrder.map((a,i)=>{
      a.products.map((b=>{
        allProducts.includes()
      }))
    })
      // res.json({message:"create order success",res:res})
      
    } catch (error) {
      return next(new ErrorHandler(error,400))
    }
  })
  app.use("/api/v1",router)
}
module.exports = orderRoute
