const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },

        description: {
            type: String,
            required: true
        },

        technologies: {
            type: [String],
            default: []
        },

        githubLink: {
            type: String,
            default: ""
        },

        liveLink: {
            type: String,
            default: ""
        },

        image: {
            type: String,
            default: ""
        },

        status: {
            type: String,
            enum: ["completed", "ongoing", "draft"],
            default: "completed"
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Project", projectSchema);