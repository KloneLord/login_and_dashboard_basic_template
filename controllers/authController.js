// controllers/authController.js

import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { jwtSecret } from '../config/jwtConfig.js';



export const registerUser = async (req, res) => {
    try {
        console.log('Request received at /auth/register'); // Log endpoint access
        console.log('Request body:', req.body); // Log incoming data

        const { username, email, password } = req.body;

        // Validate inputs
        if (!username || !email || !password) {
            console.log('Validation failed: Missing fields');
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Check for existing user
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            console.log(`User already exists with email: ${email}`);
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash the password
        console.log('Hashing password...');
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create and save the user
        console.log('Creating new user...');
        const newUser = new User({ username, email, password: hashedPassword });
        await newUser.save();
        console.log('New user saved:', newUser);

        // Generate a JWT token
        console.log('Generating JWT token...');
        const token = jwt.sign({ id: newUser._id }, jwtSecret, { expiresIn: '1h' });
        console.log('Token generated successfully.');

        // Send response
        console.log('Registration successful, sending response...');
        res.status(201).json({ token });
    } catch (err) {
        console.error('Error during registration:', err.message);
        res.status(500).json({ message: 'Server error' });
    }
};



export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Store user in session
        req.session.user = {
            id: user._id,
            username: user.username,
            email: user.email,
        };
        console.log('User logged in and session created:', req.session.user);

        res.status(200).json({ message: 'Login successful', user: req.session.user });
    } catch (err) {
        console.error('Error during login:', err.message);
        res.status(500).json({ message: 'Server error' });
    }
};


export const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ user });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server error' });
    }
};


export default {
    registerUser,
    loginUser,
    getUserProfile,
};
