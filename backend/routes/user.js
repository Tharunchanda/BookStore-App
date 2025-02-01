const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {authenticateToken} = require("./userAuth");

// Sign up
router.post("/sign-up", async (req, res) => {
    try {
        const { username, email, password, address } = req.body;

        if (username.length < 4) {
            return res.status(400).json({ message: "Username length should be greater than 3" });
        }

        const existingUsername = await User.findOne({ username: username });
        if (existingUsername) {
            return res.status(400).json({ message: "Username already exists" });
        }

        const existingEmail = await User.findOne({ email: email });
        if (existingEmail) {
            return res.status(400).json({ message: "Email already exists" });
        }

        if (password.length <= 5) {
            return res.status(400).json({ message: "Password length should be greater than 5" });
        }

        const saltRounds = 10;
        const hashPass = await bcrypt.hash(password, saltRounds);

        const newUser = new User({
            username: username,
            email: email,
            password: hashPass,
            address: address,
        });

        await newUser.save();
        return res.status(200).json({ message: "Sign Up Successful" });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// Sign in
router.post("/sign-in", async (req, res) => {
    try {
        const { username, password } = req.body;
        const existingUser = await User.findOne({ username });

        // Check if user exists
        if (!existingUser) {
            return res.status(400).json({ message: "Invalid Credentials" });
        }

        // Compare the entered password with the stored hashed password
        const isPasswordValid = await bcrypt.compare(password, existingUser.password);

        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid Credentials" });
        }

        // Define auth claims
        const authClaims = {
            name: existingUser.username,
            role: existingUser.role,
        };

        // Generate token
        const token = jwt.sign(authClaims, "bookStore123", {
            expiresIn: "30d",
        });

        // Respond with user info and token
        return res.status(200).json({
            id: existingUser._id,
            role: existingUser.role,
            token: token,
        });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
});
//get user info
router.get("/get-user-information", authenticateToken, async (req, res) => {
    try {
        const { id } = req.headers;

        // Check if ID is provided in headers
        if (!id) {
            return res.status(400).json({ message: "User ID is required in headers" });
        }

        const user = await User.findById(id).select('-password');

        // If user is not found, return 404 error
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json(user);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});
//update address
router.put('/update-address', authenticateToken, async (req, res) => {
    try {
        const { id } = req.headers;
        const { address } = req.body;
        await User.findByIdAndUpdate(id, { address: address });
        return res.status(200).json({ message: "Address updated sucessfully" });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
});

module.exports = router;
