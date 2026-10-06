const About = require("../models/About");

// GET About
const getAbout = async (req, res) => {
    try {
        const about = await About.findOne();

        res.json({
            success: true,
            data: about
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// CREATE / UPDATE About
const updateAbout = async (req, res) => {
    try {
        const {
            title,
            description,
            profileImage,
            education
        } = req.body;

        let about = await About.findOne();

        if (about) {
            about.title = title;
            about.description = description;
            about.profileImage = profileImage || "";
            about.education = education || "";

            await about.save();
        } else {
            about = await About.create({
                title,
                description,
                profileImage,
                education
            });
        }

        res.json({
            success: true,
            message: "About information saved successfully",
            data: about
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


module.exports = {
    getAbout,
    updateAbout
};