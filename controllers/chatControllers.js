const asyncHandler = require("express-async-handler");
const Pin = require("../models/pin");
const JoinPin = require("../models/joinpins");

const renameGroup = asyncHandler(async (req, res) => {
  const { chatId, chatName } = req.body;

  const updatedChat = await Pin.findByIdAndUpdate(
    chatId,
    {
      pic: chatName,
    },
    {
      new: true,
    }
  );

  if (!updatedChat) {
    res.status(404);
    throw new Error("Chat Not Found");
  } else {
    res.json(updatedChat);
  }
});

const renameGroupLink = asyncHandler(async (req, res) => {
  const { chatId, chatName } = req.body;

  const updatedChat = await Pin.findByIdAndUpdate(
    chatId,
    {
      groupLink: chatName,
    },
    {
      new: true,
    }
  );

  if (!updatedChat) {
    res.status(404);
    throw new Error("Chat Not Found");
  } else {
    res.json(updatedChat);
  }
});

const renameTournament = asyncHandler(async (req, res) => {
  const { chatId, chatName, nameUser, noOfTeam, address } = req.body;

  const updatedChat = await Pin.findByIdAndUpdate(
    chatId,
    {
      tournamentName: chatName,
      organizerName: nameUser,
      noOfTeam: noOfTeam,
      address: address,
    },
    {
      new: true,
    }
  );

  if (!updatedChat) {
    res.status(404);
    throw new Error("Chat Not Found");
  } else {
    res.json(updatedChat);
  }
});

const fetchChats = asyncHandler(async (req, res) => {
  try {
    Pin.find({ createdBy: { $eq: req.user._id } }).then((results) => {
      res.send(results);
    });
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

//@description     Fetch all chats for a user
//@route           GET /api/chat/
//@access          Protected
const fetchJoined = asyncHandler(async (req, res) => {
  try {
    Pin.find({ joinedBy: { $elemMatch: { $eq: req.user._id } } }).then(
      (results) => {
        res.send(results);
      }
    );
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

//@description     Fetch all chats for a user
//@route           GET /api/chat/
//@access          Protected
const fetchParticpantDetail = asyncHandler(async (req, res) => {
  // const { userId } = req.body;

  // if (!userId) {
  //   console.log("UserId param not sent with request");
  //   return res.sendStatus(400);
  // }
  try {
    JoinPin.find({
      $and: [
        { joinedBy: { $eq: req.user._id } },
        { pinId: { $eq: req.params.userId } },
      ],
    }).then((results) => {
      res.send(results);
    });
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

//@description     Get all Messages
//@route           GET /api/Message/:chatId
//@access          Protected
const allMessages = asyncHandler(async (req, res) => {
  try {
    const messages = await Pin.find({ _id: req.params.chatId });

    res.json(messages);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

module.exports = {
  renameGroup,
  fetchChats,
  renameGroupLink,
  fetchJoined,
  allMessages,
  renameTournament,
  fetchParticpantDetail,
};
