//create a web server with express
const express = require('express');

const dotenv = require('dotenv');

const connectDB = require('./config/db');

const userRoutes = require('./routes/userRoutes');

const generateToken = require('./utils/generateToken');


//load env variable into process.env
dotenv.config();

connectDB();

const app = express();

//use the express json middleware to parse json bodies of incoming requests
app.use(express.json());

//mount the user routes on the '/api/users' path
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
