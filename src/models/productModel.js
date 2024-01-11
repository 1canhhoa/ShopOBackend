const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
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
  // reviews: [
  //   {
  //     user: {
  //       type: Object,
  //     },
  //     rating: {
  //       type: Number,
  //     },
  //     comment: {
  //       type: String,
  //     },
  //     productId: {
  //       type: String,
  //     },
  //     createdAt:{
  //       type: Date,
  //       default: Date.now(),
  //     }
  //   },
  // ],
  capacities:[
      {
        name:{type:String},
        url:{type:String},
        capacity:[
          {capacity:{type:String},priceCapacity:{type:Number}}
        ]
      }
  ],
  ratings: {
    type: Number,
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

const ProductModel = mongoose.model("product",productSchema)

module.exports = ProductModel