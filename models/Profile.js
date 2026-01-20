// const mongoose = require("mongoose");

// const userSchema = new mongoose.Schema({
//   // userProfileId: String,
//   username: String,
//   email: String,
//   phone: String,
//   type: String,
//   isVerified: { type: Boolean, default: false },
//   projects: Array,
//   address: String,
//   location: String,
//   instagram: String,
//   linkedin: String,
//   experience: String,
//   projects: String,
//   referralCount: String,
//   specialization: String,
//   projectVolume: String,
//   registeredName: String,
//   tagline: String,
//   signupDate: String,
//   pincode: String,
//   brand: String,
//   // date: String,
//   // password: String,
//   role: String
// });

// module.exports = mongoose.model("Profile", userSchema, "profiles");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

   userProfileId: { type: String },   // 🔥 UNCOMMENT THIS


  username: String,
  email: String,
  phone: String,
  type: String,

  isVerified: { type: Boolean, default: false },

  address: String,
  location: String,
  instagram: String,
  linkedin: String,
  experience: String,

  referralCount: String,
  specialization: String,
  projectVolume: String,

  tagline: String,
  brand: String,

  pincode: String,

  signupDate: String,

  role: String

},
 { timestamps: true }   
);

module.exports = mongoose.model("Profile", userSchema, "profiles");
