var express = require("express");
var router = express.Router();
var controller = require("../controller/auth");


router.get("/login", controller.login);
router.post("/login", controller.postlogin);

module.exports = router;
