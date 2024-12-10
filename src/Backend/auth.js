const jwt = require('jsonwebtoken');

const auth = async (req, res, next) => {
    try {
        // Extract token from the Authorization header
        const token = req.header('Authorization');
        
        if (!token) {
            return res.status(401).json({ message: 'Authorization header is missing' });
        }

        // Remove 'Bearer ' prefix and verify token
        const tokenWithoutBearer = token.replace('Bearer ', '');
        console.log('Received token:', tokenWithoutBearer);  // Log the token

        const decoded = jwt.verify(tokenWithoutBearer, process.env.JWT_SECRET);
        console.log('Decoded token:', decoded);  // Log the decoded token

        // Attach pharmacy ID to the request object
        req.pharmacyId = decoded.id;  
        next();
    } catch (err) {
        console.error('Authentication error:', err);  // Log the error
        res.status(401).json({ message: 'Please authenticate' });
    }
};

module.exports = auth;
