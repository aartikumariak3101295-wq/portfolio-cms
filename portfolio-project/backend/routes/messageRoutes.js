const express = require("express");

const {
    createMessage,
    getMessages,
    getMessage,
    markMessageAsRead,
    deleteMessage
} = require("../controllers/messageController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Public API - Portfolio visitors can send messages
router.post("/", createMessage);

// Protected APIs - Admin only
router.get("/", authMiddleware, getMessages);
router.get("/:id", authMiddleware, getMessage);
router.put("/:id/read", authMiddleware, markMessageAsRead);
router.delete("/:id", authMiddleware, deleteMessage);

module.exports = router;