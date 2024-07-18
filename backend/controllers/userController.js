//import express-async-handler to handle exceptions in async functions
const asyncHandler = require('express-async-handler');

const User = require('../models/userModel');

//import the generateToken utility to create JSON Web Tokens for authentication
const generateToken = require('../utils/generateToken');

//define the authUser function to handle user authentication
const authUser = asyncHandler(async (req, res) => {
    //extract { email, password } from the request body
    const { email, password } = req.body;

    //find a user by email in the db
    const user = await User.findOne({ email });

    //if user is found and the password matches
    if (user && (await user.matchPassword(password))) {
        //respond with user details and a JWT token
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
        });
    } else {
        //if auth fails, respond with a 401 status and error message
        res.status(401);
        throw new Error('Invalid Email or Password');
    }
});

// define the registerUser function to handle user registration
const registerUser = asyncHandler(async (req, res) => {
    //extract name, email and password from the request body
    const { name, email, password } = req.body;
    //check if the user witht he given email already exists
    const userExists = await User.findOne({ email });

    //if user already exists, respond with a 400 status and error message
    if (userExists) {
        res.status(400);
        throw new Error('User already exists');
    }

    //create a new user in the db with the provided details
    const user = await User.create({
        name,
        email,
        password
    });

    //if user creattion is successfull, respond with user details and a jwt token
    if (user) {
        res.status(201).json({
            _id: user._is,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
        });
    } else {
        //if user creation fails, 400 status, err message
        res.status(400);
        throw new error('invalid user data');
    }
});

module.exports = { authUser, registerUser };