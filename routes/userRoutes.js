const express = require("express")
const { loginUser, signupUser, getUsers } = require("../controller/userController")

// router
const router = express.Router()

// login
router.post("/login", loginUser)

// signup
router.post("/signup", signupUser)

// get all user
router.get("/users", getUsers)


module.exports = router
