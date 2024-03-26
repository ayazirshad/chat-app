const mongoose = require("mongoose");
const { __esModule } = require("validator/lib/isAlpha");

const messageSchema = new mongoose.Schema(
  {
    chatId: String,
    senderId: String,
    text: String,
  },
  {
    timestamps: true,
  }
);

const messageModel = new mongoose.model("Message", messageSchema);

module.exports = messageModel;
