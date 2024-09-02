import User from "../models/user.js";
import bcryptjs from "bcryptjs"; // Ensure the correct import
import generateTokenAndSetCookie from "../utils/jwt.js";

export const signup = async (req, res) => {
    try {
        const { fullName, username, password, confirmpassword, gender } = req.body;

        // Log the entire request body for debugging
        console.log("Request Body:", req.body);

        // Check if passwords match
        if (password !== confirmpassword) {
            return res.status(400).json({ error: "Passwords do not match" });
        }

        // Check if username already exists
        const user = await User.findOne({ username });
        if (user) {
            return res.status(400).json({ error: "Username already exists" });
        }

        // Hash passwords for better security
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt); // Use bcryptjs here

        // Define profile picture URLs based on gender
        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

        // Create new user
        const newUser = new User({
            fullName,
            username,
            password: hashedPassword, // Store hashed password
            gender,
            profilePic: gender === "male" ? boyProfilePic : girlProfilePic
        });

        // Save the user to the database
        await newUser.save();

        if (newUser) {
            // Generate JWT token and set it as a cookie
            generateTokenAndSetCookie(newUser._id, res);

            return res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                username: newUser.username,
                profilePic: newUser.profilePic,
            });
        } else {
            res.status(400).json({ error: "Invalid user data" });
        }

    } catch (error) {
        console.log("Error in signup controller", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const login = async (req, res) => {  // Add 'async' here
    try {
        const { username, password } = req.body;

        // Find the user by username
        const user = await User.findOne({ username });

        // If user does not exist or password does not match
        if (!user) {
            return res.status(400).json({ error: "Incorrect username or password" });
        }

        // Compare provided password with stored hashed password
        const isPasswordCorrect = await bcryptjs.compare(password, user.password);

        if (!isPasswordCorrect) {
            return res.status(400).json({ error: "Incorrect username or password" });
        }

        // Generate JWT token and set it as a cookie
        generateTokenAndSetCookie(user._id, res);

        // Respond with user details
        return res.status(200).json({
            _id: user._id,  
            fullName: user.fullName,
            username: user.username,
            profilePic: user.profilePic,
        });

    } catch (error) {
        console.log("Error in login controller", error.message);  
        res.status(500).json({ error: "Internal Server Error" });
    }
};


export const logout = (req, res) => {
    try {
        res.cookie("jwt", "", {maxAge:0})
        res.status(200).json({message: "loged out succesfully"})
        
    } catch (error) {
        console.log("Error in logout controller", error.message); 
        res.status(500).json({ error: "Internal Server Error" });
        
    }
    
};
