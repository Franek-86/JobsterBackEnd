const express = require("express");
const rateLimiter = require("express-rate-limit");
const router = express.Router();
const { register, login, updateUser } = require("../controllers/auth");
const authUser = require("../middleware/authentication");
const testUser = require("../middleware/testUser");
const apiLimiter = rateLimiter({
  windowsMS: 15 * 60 * 1000,
  max: 10,
  message: {
    msg: "you reached the limit of requests you can make. Please try again in 15 mins",
  },
});
router.post("/register", apiLimiter, register);
router.post("/login", apiLimiter, login);
router.patch("/updateUser", authUser, testUser, updateUser);

module.exports = router;
