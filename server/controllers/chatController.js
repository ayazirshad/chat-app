const chatModel = require("../models/chatModel");

const createChat = async (req, res) => {
  try {
    const { firstId, secondId } = req.body;
    const chat = await chatModel.findOne({
      members: { $all: { firstId, secondId } },
    });

    if (chat) return res.status(200).json(chat);

    const newChat = new chatModel({ members: [firstId, secondId] });

    const createdChat = await newChat.save();
    res.status(200).json(createdChat);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const findUserChats = async (req, res) => {
  try {
    const userId = req.params.userId;
    const chats = await chatModel.find({
      members: { $in: [userId] },
    });
    res.status(200).json(chats);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const findChat = async (req, res) => {
  try {
    const { firstId, secondId } = req.params;
    const chat = await chatModel.find({
      members: { $all: [firstId, secondId] },
    });
    res.status(200).json(chat);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

module.exports = { createChat, findUserChats, findChat };
