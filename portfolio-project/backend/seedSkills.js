const mongoose = require("mongoose");
require("dotenv").config();

const Skill = require("./models/Skill");

const skills = [
    {
        name: "HTML5",
        category: "Frontend",
        level: "Intermediate",
        icon: "🌐",
        description: "Building structured and semantic web pages using HTML5."
    },
    {
        name: "CSS3",
        category: "Frontend",
        level: "Intermediate",
        icon: "🎨",
        description: "Creating responsive and attractive user interfaces with CSS3."
    },
    {
        name: "JavaScript",
        category: "Frontend",
        level: "Beginner",
        icon: "⚡",
        description: "Working with JavaScript for interactive web functionality."
    },
    {
        name: "React.js",
        category: "Frontend",
        level: "Beginner",
        icon: "⚛️",
        description: "Building component-based and interactive user interfaces with React.js."
    },
    {
        name: "Node.js",
        category: "Backend",
        level: "Beginner",
        icon: "🟢",
        description: "Developing backend applications and server-side functionality with Node.js."
    },
    {
        name: "Express.js",
        category: "Backend",
        level: "Beginner",
        icon: "🚀",
        description: "Building REST APIs and backend services using Express.js."
    },
    {
        name: "MongoDB",
        category: "Database",
        level: "Beginner",
        icon: "🍃",
        description: "Working with MongoDB for storing and managing application data."
    },
    {
        name: "REST API",
        category: "Backend",
        level: "Beginner",
        icon: "🔗",
        description: "Creating and working with RESTful APIs for frontend-backend communication."
    }
];

async function seedSkills() {

    try {

        await mongoose.connect(process.env.MONGO_URI);

        console.log("MongoDB connected successfully");

        // Remove old skills first
        await Skill.deleteMany({});

        // Insert new skills
        await Skill.insertMany(skills);

        console.log("8 skills added successfully!");

        await mongoose.connection.close();

    } catch (error) {

        console.log("Error:", error.message);

    }
}

seedSkills();