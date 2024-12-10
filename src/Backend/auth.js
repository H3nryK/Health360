const jwt = require('jsonwebtoken');

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Add pharmacy ID to request object
        req.pharmacyId = decoded.id; // Make sure this matches your JWT payload
        next();
    } catch (err) {
        res.status(401).json({ message: 'Please authenticate' });
    }
};

module.exports = auth;
