const jwt = require('jsonwebtoken');

// Function to generate a JWT token
function generateToken(payload) {
    // Replace 'your_secret_key' with your actual secret key used for signing the token
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
    return token;
}

module.exports = generateToken;
