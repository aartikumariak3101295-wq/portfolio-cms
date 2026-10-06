const express = require("express");

const {
    createSkill,
    getSkills,
    getSkillById,
    updateSkill,
    deleteSkill
} = require("../controllers/skillController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Public APIs

router.get("/", getSkills);

router.get("/:id", getSkillById);

// Protected APIs - Admin only

router.post("/", authMiddleware, createSkill);

router.put("/:id", authMiddleware, updateSkill);

router.delete("/:id", authMiddleware, deleteSkill);

module.exports = router;