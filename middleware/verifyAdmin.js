// const jwt = require("jsonwebtoken");

// const verifyAdmin = (req, res, next) => {
//   try {
//     const token = req.cookies.token;

//     if (!token)
//       return res.status(401).json({ msg: "Not logged in" });

//     const decoded = jwt.verify(token, "SECRET_KEY");

//     if (decoded.role !== "admin")
//       return res.status(403).json({ msg: "Access denied" });

//     next();
//   } catch (err) {
//     return res.status(401).json({ msg: "Session expired" });
//   }
// };

// module.exports = verifyAdmin;

const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "SECRET_KEY";

const verifyAdmin = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ msg: "Session expired" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    if (decoded.role !== "admin") {
      return res.status(403).json({ msg: "Access denied" });
    }

    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ msg: "Session expired" });
  }
};

module.exports = verifyAdmin;
