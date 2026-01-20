const router=require("express").Router();
const {signup,login,logout,me}=require("../controllers/AuthController");

router.post("/signup",signup);
router.post("/login",login);
router.get("/logout",logout);
router.get("/me",me);

module.exports=router;
