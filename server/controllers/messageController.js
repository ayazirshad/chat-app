const messageModel = require("../models/messageModel.");

const createMessage = async (req, res) => {
  try {
    const { chatId, senderId, text } = req.body;
    const message = new messageModel({
      chatId,
      senderId,
      text,
    });
    const createdMessage = await message.save();
    res.status(200).json(createdMessage);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const getMessages = async (req, res) => {
  try {
    const { chatId } = req.params;
    const messages = await messageModel.find({ chatId });
    res.status(200).json(messages);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

module.exports = { createMessage, getMessages };
