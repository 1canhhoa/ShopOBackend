require('module-alias/register')
const express = require('express')
const {upload} = require('~/multer')
const Event = require('~/models/eventModel')
const User =require('~/models/userModel')
const Shop = require('~/models/shopModel')
const Product = require ('~/models/productModel')
const Cart = require('~/models/cartModel')
const Address = require('~/models/addressModel')
const Conversation = require('~/models/conversationModel')
const Message = require('~/models/messagesModel')
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
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
dotenv.config()
let router = express.Router()
let messagesRoute =(app) => {
// create new message
router.post(
  "/create-new-message",upload.array('images'),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const messageData = req.body;
      console.log('messageData',messageData);
      // if (req.body.images) {
      //   const myCloud = await cloudinary.v2.uploader.upload(req.body.images, {
      //     folder: "messages",
      //   });
      //   messageData.images = {
      //     public_id: myCloud.public_id,
      //     url: myCloud.url,
      //   };
      // }
      if(req.files){
        const files = req.files
        const imagesUrl = files.map((f,i)=>`${f.filename}`)
        messageData.images = imagesUrl
      }
      messageData.conversationId = req.body.conversationId;
      messageData.sender = req.body.sender;
      messageData.text = req.body.text;

      const message = new Message({
        conversationId: messageData.conversationId,
        text: messageData.text,
        sender: messageData.sender,
        images: messageData.images ? messageData.images : undefined,
      });

      await message.save();

      res.status(201).json({
        success: true,
        message,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message), 500);
    }
  })
);
// get all messages with conversation id
router.get("/get-all-messages/:id",catchAsyncErrors(async (req, res, next) => {
    try {
      const messages = await Message.find({
        conversationId: req.params.id,
      });

      res.status(201).json({
        success: true,
        messages,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message), 500);
    }
  })
);
  app.use("/api/v1",router)
}
module.exports = messagesRoute

