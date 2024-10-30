import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

const requireAuth = async (req, res, next) => {
    // Check for authorization header
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json({ error: 'Authorization header is required' });
    }

    // Verify token format and extract token
    const token = authorization.split(' ')[1];
    if (!token) {
        return res.status(401).json({ error: 'Authorization token is required' });
    }

    try {
        // Verify token and extract user ID
        const { _id } = jwt.verify(token, process.env.SECRET);
        // Find user by ID and attach to request object
        req.user = await User.findOne({ _id }).select('_id');
        
        if (!req.user) {
            return res.status(401).json({ error: 'User not found' });
        }

        next();
    } catch (error) {
        console.log('Authentication error:', error.message);
        res.status(401).json({ error: 'Unauthorized' });
    }
};

export default requireAuth;
