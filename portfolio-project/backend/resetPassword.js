const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const User = require("./user");

async function resetPassword() {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        const newPassword = "Admin@123";

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        const user = await User.findOneAndUpdate(
            { email: "aarti.admin@gmail.com" },
            { password: hashedPassword },
            { new: true }
        );

        if (!user) {
            console.log("User not found");
        } else {
            console.log("Password reset successfully!");
            console.log("Email: aarti.admin@gmail.com");
            console.log("New Password: Admin@123");
        }

        await mongoose.connection.close();

    } catch (error) {
        console.log("Error:", error.message);
    }
}

resetPassword();