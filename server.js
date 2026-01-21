require("dotenv").config();
const express=require("express");
const cors=require("cors");
const cookieParser=require("cookie-parser");
const connectDB=require("./config/db");
const adminRoutes = require("./routes/adminRoutes");
const authRoutes = require("./routes/authRoutes");





const app=express();
connectDB();

app.use(express.json());
app.use(cookieParser());
app.use(cors({origin:true,credentials:true}));app.get("/", (req, res) => {
  res.send("Interioverse Backend is running 🚀");
});

app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
