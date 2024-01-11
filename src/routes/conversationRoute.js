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
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
dotenv.config()
let router = express.Router()
let conversationRoute =(app) => {
  router.post("/create-new-conversation",catchAsyncErrors(async (req, res, next) => {
      try {
        const { groupTitle, userId, sellerId } = req.body;
        console.log('reabody',req.body);
        const isConversationExist = await Conversation.findOne({ groupTitle });
        if (isConversationExist) {
          let conversations = await Conversation.find({});
          const abc = conversations.filter(c=>c.groupTitle!==isConversationExist.groupTitle)
          // console.log('abc',abc);
          abc.unshift(isConversationExist)
          res.status(201).json({
            success: true,
            // isConversationExist,
            conversations:abc,
            message:'create conversations success'
          });
        } else {
          const conversation = await Conversation.create({
            members: [userId, sellerId],
            groupTitle: groupTitle,
          });
          let conversations = await Conversation.find({});
          const abc = conversations.filter(c=>c.groupTitle!==conversation.groupTitle)
          // console.log('abc',abc);
          abc.unshift(conversation)
          res.status(201).json({
            success: true,
            conversation,
            conversations:abc,
            message:'create conversations success'
          });
        }
      } catch (error) {
        return next(new ErrorHandler(error.response.message), 500);
      }
    })
  );
  // get seller conversations
  router.get(
    "/get-all-conversation-seller/:id",
    isAuthenticated,
    catchAsyncErrors(async (req, res, next) => {
      try {
        const conversations = await Conversation.find({
          members: {
            $in: [req.params.id],
          },
        }).sort({ updatedAt: -1, createdAt: -1 });

        res.status(201).json({
          success: true,
          conversations,
        });
      } catch (error) {
        return next(new ErrorHandler(error), 500);
      }
    })
  );
  // get user conversations
  router.get(
    "/get-all-conversation-user/:id",
    isAuthenticated,
    catchAsyncErrors(async (req, res, next) => {
      try {
        const conversations = await Conversation.find({
          members: {
            $in: [req.params.id],
          },
        }).sort({ updatedAt: -1, createdAt: -1 });

        res.status(201).json({
          success: true,
          conversations,
        });
      } catch (error) {
        return next(new ErrorHandler(error), 500);
      }
    })
  );
  // update the last message
  router.put(
    "/update-last-message/:id",isAuthenticated,
    catchAsyncErrors(async (req, res, next) => {
      try {
        const { lastMessage, lastMessageId,role } = req.body;
        console.log('req.body',req.body);
        let nameLastMessage = '';
        if (role === 'seller') {
          const shop = await Shop.findOne({ _id: lastMessageId });
          nameLastMessage = shop.name;
          const conversation = await Conversation.findByIdAndUpdate(req.params.id, {
            lastMessage,
            lastMessageId,
            nameLastMessage,
            createdAtLastMessage:Date.now()
          });
          const seller = await Shop.findOne({email:req.user.email})
          const conversations = await Conversation.find({
            members: {
              $in: [seller._id.toString()],
            },
          }).sort({ updatedAt: -1, createdAt: -1 })
          console.log('conversations',conversations);
          res.status(201).json({
            success: true,
            conversation,
            conversations
          });
        } else {
          const user = await User.findOne({ _id: lastMessageId });
          nameLastMessage = user.username;
          const conversation = await Conversation.findByIdAndUpdate(req.params.id, {
            lastMessage,
            lastMessageId,
            nameLastMessage,
            createdAtLastMessage:Date.now()
          });
          const conversations = await Conversation.find({
            members: {
              $in: [req.user._id.toString()],
            },
          }).sort({ updatedAt: -1, createdAt: -1 })
          console.log('conversations',conversations);
          res.status(201).json({
            success: true,
            conversation,
            conversations
          });
        }

      } catch (error) {
        return next(new ErrorHandler(error), 500);
      }
    })
  );
  // find user infoormation with the userId
  router.get(
    "/user-info/:id",
    catchAsyncErrors(async (req, res, next) => {
      try {
        const user = await User.findById(req.params.id);

        res.status(201).json({
          success: true,
          user,
        });
      } catch (error) {
        return next(new ErrorHandler(error.message, 500));
      }
    })
  );
    // find user infoormation with the userId
    router.get(
      "/seller-info/:id",
      catchAsyncErrors(async (req, res, next) => {
        console.log('req.params.id',req.params.id);
        try {

          const seller = await Shop.findById(req.params.id);
  
          res.status(201).json({
            success: true,
            seller,
          });
        } catch (error) {
          return next(new ErrorHandler(error.message, 500));
        }
      })
    );
  app.use("/api/v1",router)
}
module.exports = conversationRoute

