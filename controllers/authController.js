// / const Profile = require("../models/Profile");
// const jwt = require("jsonwebtoken");

// exports.signup = async (req, res) => {
//   try {
//     // Check if username already exists in profiles collection
//     const exists = await Profile.findOne({ username: req.body.username });

//     if (exists) {
//       return res.status(400).json({ msg: "User already exists" });
//     }

//     // Save into PROFILE collection (NOT users)
//     const profile = new Profile(req.body);

//     profile.role = "user";        // default role
//     profile.isVerified = false;   // default verification

//     await profile.save();

//     res.json({ msg: "Signup successful" });

//   } catch (err) {
//     res.status(500).json({ msg: "Signup failed" });
//   }
// };

// exports.login = async (req, res) => {
//   try {
//     const { username, password } = req.body;

//     // Login should happen from ACCOUNTS collection ideally
//     // But if you are logging users from Profile:
//     const user = await Profile.findOne({ username });

//     if (!user || user.password !== password) {
//       return res.status(400).json({ msg: "Invalid credentials" });
//     }

//     const token = jwt.sign(
//       { id: user._id, role: user.role },
//       "SECRET_KEY",
//       { expiresIn: "1d" }
//     );

//     res.cookie("token", token, {
//       httpOnly: true,
//       sameSite: "lax",
//       secure: false,
//       path: "/"
//     });

//     res.json({ role: user.role });

//   } catch (err) {
//     res.status(500).json({ msg: "Login failed" });
//   }
// };

// exports.logout = (req, res) => {
//   res.clearCookie("token", { path: "/" });
//   res.json({ msg: "Logged out" });
// };

// exports.me = (req, res) => {
//   try {
//     const token = req.cookies.token;

//     if (!token) {
//       return res.status(401).json({ msg: "Not logged in" });
//     }

//     const decoded = jwt.verify(token, "SECRET_KEY");

//     res.json(decoded);

//   } catch {
//     res.status(401).json({ msg: "Invalid token" });
//   }
// };
const Profile = require("../models/Profile");
const Account = require("../models/Account");
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;


// SIGNUP → profiles
exports.signup = async (req, res) => {
      res.clearCookie("token", { path: "/" });

  try {
    const { email, phone } = req.body;

    // ❌ Block duplicate EMAIL
    const emailExists = await Profile.findOne({ email });
    if (emailExists) {
      return res.status(400).json({ msg: "Email already registered" });
    }

    // ❌ Block duplicate PHONE
    const phoneExists = await Profile.findOne({ phone });
    if (phoneExists) {
      return res.status(400).json({ msg: "Phone number already registered" });
    }

    // COUNT EXISTING USERS
 // COUNT EXISTING USERS (optional if you still want count logic)
const count = await Profile.countDocuments();

// ----- NEW LOGIC START -----

const fullName = req.body.name || "USR";

const prefix = fullName.substring(0, 3).toUpperCase();

const randomNum = Math.floor(100 + Math.random() * 900);

const autoId = prefix + randomNum;

// ----- NEW LOGIC END -----

    

    // AUTO GENERATE DATE TIME
    const currentDate = new Date();

    const formattedDate = currentDate.toLocaleString("en-IN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      // hour: "2-digit",
      // minute: "2-digit",
      // second: "2-digit"
    });

    // CREATE PROFILE OBJECT
    const profile = new Profile(req.body);

    // 🔥 ASSIGN GENERATED VALUES
    profile.userProfileId = autoId;
    profile.signupDate = formattedDate;

    profile.role = "user";
    profile.isVerified = false;

    await profile.save();

    res.json({ msg: "Signup successful" });

  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Signup failed" });
  }
};

// 🔥 ADD BACK LOGIN FUNCTION
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await Account.findOne({ username });

    if (!user || user.password !== password) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
  JWT_SECRET,
        { expiresIn: "1d" }





    );

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "none",
      secure: true,
      path: "/"
    });

    res.json({ role: user.role });

  } catch (err) {
    console.log("LOGIN ERROR:", err);
    res.status(500).json({ msg: "Login failed" });
  }
}

exports.logout = (req, res) => {
  res.clearCookie("token", { path: "/" ,httpOnly:true,});
  res.json({ msg: "Logged out successfully" });
};



exports.me = (req, res) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ msg: "Not logged in" });
    }

    const decoded = jwt.verify(token, JWT_SECRET);

    res.json(decoded);

  } catch {
    res.status(401).json({ msg: "Invalid token" });
  }
};


// module.exports = {
//   signup,
//   login,
//   logout,
//   me
// };