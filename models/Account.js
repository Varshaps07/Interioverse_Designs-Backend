const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema({
  username: String,
  password: String,
  role: String
});

module.exports = mongoose.model("Account", accountSchema, "accounts");
