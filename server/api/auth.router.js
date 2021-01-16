const { registerUser, loginUser } = require("./auth.models");

const router = require("express").Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

module.exports = router;
