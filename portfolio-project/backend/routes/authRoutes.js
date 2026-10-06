const express = require("express");

const {
    registerUser,
    loginUser
} = require("../controllers/authController");

const router = express.Router();


// ===============================
// REGISTER
// ===============================
router.post("/register", registerUser);


// ===============================
// LOGIN
// ===============================
router.post("/login", loginUser);


// ===============================
// TEST AUTH ROUTE
// ===============================
router.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Auth route is working!"
    });
});


module.exports = router;