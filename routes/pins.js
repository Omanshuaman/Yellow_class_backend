const router = require("express").Router();
const Pin = require("../models/pin");
const {
  fetchChats,
  fetchJoined,
  fetchParticpantDetail,
} = require("../controllers/chatControllers");
const { protect } = require("../middleware/authMiddleware");

//create a pin
router.post("/", async (req, res) => {
  const newPin = new Pin(req.body);
  try {
    const savedPin = await newPin.save();
    res.status(200).json(savedPin);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get all pins
router.get("/", async (req, res) => {
  try {
    const pins = await Pin.find();
    res.status(200).json(pins);
  } catch (err) {
    res.status(500).json(err);
  }
});
router.route("/organize").get(protect, fetchChats);
router.route("/participate").get(protect, fetchJoined);
router.route("/:userId").get(protect, fetchParticpantDetail);

module.exports = router;
