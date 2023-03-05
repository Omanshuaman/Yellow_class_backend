const express = require("express");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const { protect } = require("../middleware/authMiddleware");

const {
  registerUser,
  authUser,
  allUsers,
  getUser,
} = require("../controllers/userControllers");

const router = express.Router();

router.route("/").post(registerUser).get(protect, allUsers); //both are same ways of routing
router.post("/login", authUser);
router.get("/:userId", getUser);

router.post("/change-password/:userId", async (req, res) => {
  try {
    const { password } = req.body;
    const user = await User.findOne({ _id: req.params.userId });

    bcrypt.hash(password, saltRounds, async function (err, hash) {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "Server error" });
      }
      user.password = hash;
      await user.save();

      res.json({ message: "Password updated successfully" });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
