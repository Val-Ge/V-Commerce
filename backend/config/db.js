// add mongo db connection
const mongoose = require('mongoose'); //import the mongoose library for interacting with mongodb

// Define an asynchronous function to connect to the mongoDB database
const connectDB = async () => {
    try {
        // Attempt to connect to the MongoDB using the connection string from the env variable
        await mongoose.connect(process.env.MONGO_URI, {
            // use the new url parser to avoid deprecation warnings
            useNewUrlParser: true,
            // use the unified topology engine to avoid deprecation warnings
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected');
    } catch (error) {
        console.error('MongoDB connection failed:', error);
        //exit the process with a failure code (1) to indicate an error occurred
        process.exit(1);
    }
};

module.exports = connectDB;