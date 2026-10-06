const express = require("express");
const authMiddleware = require("../authmiddleware");

const router = express.Router();

// Protected Admin Route
router.get("/dashboard", authMiddleware, (req, res) => {
    res.json({
        success: true,
        message: "Welcome to Admin Dashboard",
        user: req.user
    });
});

module.exports = router;