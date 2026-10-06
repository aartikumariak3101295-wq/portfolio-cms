const Message = require("../models/Message");

// CREATE MESSAGE
const createMessage = async (req, res) => {
    try {
        const {
            name,
            email,
            subject,
            message
        } = req.body;

        if (!name || !email || !message) {
            return res.status(400).json({
                success: false,
                message: "Name, email and message are required"
            });
        }

        const newMessage = await Message.create({
            name,
            email,
            subject,
            message
        });

        res.status(201).json({
            success: true,
            message: "Message sent successfully",
            data: newMessage
        });

    } catch (error) {
        console.log("Create message error:", error.message);

        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};


// GET ALL MESSAGES
const getMessages = async (req, res) => {
    try {
        const messages = await Message.find().sort({ createdAt: -1 });

        res.json({
            success: true,
            count: messages.length,
            messages
        });

    } catch (error) {
        console.log("Get messages error:", error.message);

        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};


// GET SINGLE MESSAGE
const getMessage = async (req, res) => {
    try {
        const message = await Message.findById(req.params.id);

        if (!message) {
            return res.status(404).json({
                success: false,
                message: "Message not found"
            });
        }

        res.json({
            success: true,
            message
        });

    } catch (error) {
        console.log("Get message error:", error.message);

        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};


// MARK MESSAGE AS READ
const markMessageAsRead = async (req, res) => {
    try {
        const message = await Message.findByIdAndUpdate(
            req.params.id,
            { status: "read" },
            {
                new: true
            }
        );

        if (!message) {
            return res.status(404).json({
                success: false,
                message: "Message not found"
            });
        }

        res.json({
            success: true,
            message: "Message marked as read",
            data: message
        });

    } catch (error) {
        console.log("Mark message error:", error.message);

        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};


// DELETE MESSAGE
const deleteMessage = async (req, res) => {
    try {
        const message = await Message.findByIdAndDelete(req.params.id);

        if (!message) {
            return res.status(404).json({
                success: false,
                message: "Message not found"
            });
        }

        res.json({
            success: true,
            message: "Message deleted successfully"
        });

    } catch (error) {
        console.log("Delete message error:", error.message);

        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};


module.exports = {
    createMessage,
    getMessages,
    getMessage,
    markMessageAsRead,
    deleteMessage
};