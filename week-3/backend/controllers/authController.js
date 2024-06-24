const bcrypt = require('bcrypt');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
require('dotenv').config();

let refreshTokens = [];
const authController = {
    registerUser: async (req, res) => {
        try {
            // Generate salt and hash password
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(req.body.password, salt);

            // Create new user
            const newUser = new User({
                username: req.body.username,
                email: req.body.email,
                password: hashedPassword,
            });

            // Save user to database
            const user = await newUser.save();

            // Send success response
            res.status(201).json({ message: "User registered successfully", user });
        } catch (error) {
            // Log error and send error response
            console.error("Error registering user:", error);
            res.status(500).json({ message: "Something went wrong" });
        }
    },
    loginUser: async (req, res) => {
        try {
            const user = await User.findOne({ username: req.body.username });
            if (!user) {
                return res.status(400).json({ message: "Username or password is incorrect" });
            }
            const validPassword = await bcrypt.compare(req.body.password, user.password);
            if (!validPassword) {
                return res.status(400).json({ message: "Username or password is incorrect" });
            }
            if (user && validPassword) {
                const accessToken = authController.generateAccessToken(user);
                const refreshToken = authController.generateFreshToken(user);
                refreshTokens.push(refreshToken)
                // Save refresh token in cookie
                res.cookie("refreshToken", refreshToken, {
                    httpOnly: true,
                    path: "/",
                    sameSite: "strict",
                    secure: false, // Set to true in production
                });

                const { password, ...others } = user._doc;
                return res.status(200).json({ message: "Login successful", ...others, accessToken, refreshToken});
            }
        } catch (error) {
            console.error("Error logging in user:", error);
            res.status(500).json({ message: "Something went wrong" });
        }
    },
    logoutUser: async (req, res) => {
        // Remove refresh token from cookies
        res.clearCookie("refreshToken");
        refreshTokens = refreshTokens.filter( (token) => token !== req.cookies.refreshToken);
        res.status(200).json({ message: "User logged out" });
    },
    generateAccessToken: (user) => {
        return jwt.sign({
            id: user.id,
            admin: user.admin,
        },
        process.env.JWT_SECRET, { expiresIn: '30m' });
    },

    // Generate refresh token
    generateFreshToken: (user) => {
        return jwt.sign({
            id: user.id,
            admin: user.admin,
        },
        process.env.JWT_REFRESH, { expiresIn: '7d' });
    },

    // Refresh token
    requestRefreshToken: async (req, res)=> {
        const refreshToken = req.cookies.refreshToken;
        if ( !refreshToken ) {
            return res.status(403).json({message: 'User not authenticated'})
        }
        if (!refreshTokens.includes(refreshToken)) {
            return res.status(403).json({message: 'User not authenticated'})
        }
        jwt.verify(refreshToken, process.env.JWT_REFRESH, (err, user) => {
            if (err) {
                return res.status(403).json({message: 'User not authenticated'})
            }
            refreshTokens = refreshTokens.filter((token) => token !== refreshToken)
            //create new access token
            const newAcessToken = authController.generateAccessToken(user);
            const newFreshToken = authController.generateFreshToken(user);

            refreshTokens.push(newFreshToken)
            res.cookie("refreshToken", newFreshToken, {
                httpOnly: true,
                sameSite: "strict",
                secure: false,
                path: "/",
            })
            res.status(200).json({ accessToken: newAcessToken});
        })
    }
}


module.exports = authController;