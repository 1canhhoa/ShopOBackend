const mongoose = require("mongoose");

const conversationSchema = new mongoose.Schema(
  {
    groupTitle:{
        type: String,
    },
    members: {
      type: Array,
    },
    lastMessage: {
      type: String,
    },
    nameLastMessage:{
      type:String
    },
    lastMessageId: {
      type: String,
    },
    createdAtLastMessage:{
      type: Date,
      default: Date.now(),
  },
  },
  { timestamps: true }
);
const conversationModel = mongoose.model("Conversation", conversationSchema);
module.exports=conversationModel