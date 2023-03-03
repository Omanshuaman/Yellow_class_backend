const express = require("express");

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

module.exports = router;
