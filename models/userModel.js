const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const findOrCreate = require("mongoose-findorcreate");

const userSchema = mongoose.Schema(
  {
    name: { type: "String" },
    email: { type: "String", unique: true },
    password: { type: "String" },
    googleId: { type: "String" },

    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestaps: true }
);
userSchema.plugin(findOrCreate);

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
