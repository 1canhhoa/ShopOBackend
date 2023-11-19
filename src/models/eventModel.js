const mongoose = require('mongoose')
const eventProduct = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your product name!"],
  },
  description: {
    type: String,
    required: [true, "Please enter your product description!"],
  },
  category: {
    type: String,
    required: [true, "Please enter your product category!111"],
  },
  shopId:{
    type:String,
    ref:'Shop'
  },
  tags: {
    type: String,
  },
  originalPrice: {
    type: Number,
  },
  discountPrice: {
    type: Number,
    required: [true, "Please enter your product price!"],
  },
  stock: {
    type: Number,
    required: [true, "Please enter your product stock!"],
  },
  images: [
    {
        type: String,
    },
  ],
  start_date:{
    type:Date
  },
  end_date:{
    type:Date
  },
  status:{
    type:String,
    default:'running'
  },
  ratings: {
    type: Number,
    default:5
  },
  shop: {
    type: Object,
    required: true,
  },
  sold_out: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },

})

const eventModel = mongoose.model("events",eventProduct)

module.exports = eventModel