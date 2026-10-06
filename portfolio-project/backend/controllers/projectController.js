const Project = require("../models/Project");

// CREATE PROJECT
const createProject = async (req, res) => {
    try {
        const {
            title,
            description,
            technologies,
            githubLink,
            liveLink,
            image,
            status
        } = req.body;

        if (!title || !description) {
            return res.status(400).json({
                success: false,
                message: "Title and description are required"
            });
        }

        const project = await Project.create({
            title,
            description,
            technologies,
            githubLink,
            liveLink,
            image,
            status
        });

        res.status(201).json({
            success: true,
            message: "Project created successfully",
            project
        });

    } catch (error) {
        console.log("Create project error:", error.message);

        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};


// GET ALL PROJECTS
const getProjects = async (req, res) => {
    try {
        const projects = await Project.find().sort({ createdAt: -1 });

        res.json({
            success: true,
            count: projects.length,
            projects
        });

    } catch (error) {
        console.log("Get projects error:", error.message);

        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};


// GET SINGLE PROJECT
const getProject = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);

        if (!project) {
            return res.status(404).json({
                success: false,
                message: "Project not found"
            });
        }

        res.json({
            success: true,
            project
        });

    } catch (error) {
        console.log("Get project error:", error.message);

        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};


// UPDATE PROJECT
const updateProject = async (req, res) => {
    try {
        const project = await Project.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!project) {
            return res.status(404).json({
                success: false,
                message: "Project not found"
            });
        }

        res.json({
            success: true,
            message: "Project updated successfully",
            project
        });

    } catch (error) {
        console.log("Update project error:", error.message);

        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};


// DELETE PROJECT
const deleteProject = async (req, res) => {
    try {
        const project = await Project.findByIdAndDelete(req.params.id);

        if (!project) {
            return res.status(404).json({
                success: false,
                message: "Project not found"
            });
        }

        res.json({
            success: true,
            message: "Project deleted successfully"
        });

    } catch (error) {
        console.log("Delete project error:", error.message);

        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};


module.exports = {
    createProject,
    getProjects,
    getProject,
    updateProject,
    deleteProject
};