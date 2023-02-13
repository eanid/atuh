const express = require("express");
const router = express.Router();
const {  AuthController} = require("../controllers/auth");
// const {role} = require('../middlewares/auth')
router.post("/register", AuthController.insert);
router.post("/login", AuthController.login);

module.exports = router;
