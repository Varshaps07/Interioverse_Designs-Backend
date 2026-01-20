// const Profile = require("../models/Profile");
// // const User=require("../models/Profile");

// exports.getUsers=async(req,res)=>{
//   const users=await User.find();
//   res.json(users);
// };
// exports.verifyUser = async (req, res) => {
//   try {
//     const user = await Profile.findById(req.params.id);

//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     user.isVerified = !user.isVerified;
//     await user.save();

//     res.status(200).json(user);
//   } catch (err) {
//     res.status(500).json({ message: "Verification failed" });
//   }
// };


// exports.deleteUser = async (req, res) => {
//   await User.findByIdAndDelete(req.params.id);
//   res.json({ message: "User deleted" });
// };
const Profile = require("../models/Profile");
exports.getUsers = async (req, res) => {
  try {
    // const users = await Profile.find().sort({ _id: -1 });   // NEWEST FIRST




    const users = await Profile.find().sort({ createdAt: -1 });

    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch users" });
  }
};


// Verify / Unverify a user
exports.verifyUser = async (req, res) => {
  try {
    const user = await Profile.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.isVerified = !user.isVerified;
    await user.save();

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: "Verification failed" });
  }
};

// Delete a signup profile
exports.deleteUser = async (req, res) => {
  try {
    await Profile.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "User deleted" });
  } catch (err) {
    res.status(500).json({ message: "Delete failed" });
  }
};
