const router = require("express").Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");

const CLIENT_URL = "http://localhost:3000/";

router.get("/login/success", generateToken, (req, res) => {
  if (req.user) {
    // Save the user information to a cookie
    res.cookie("token", req.token);

    res.redirect(CLIENT_URL);
  }
});

router.get("/login/failed", (req, res) => {
  res.status(401).json({
    success: false,
    message: "failure",
  });
});

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect(CLIENT_URL);
});

router.get(
  "/google",
  passport.authenticate("google", { scope: ["openid", "email", "profile"] })
);

function generateToken(req, res, next) {
  req.token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
  next();
}

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: "http://localhost:5000/auth/login/success",
    failureRedirect: "/login/failed",
  })
);

module.exports = router;
