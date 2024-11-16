import jwt from 'jsonwebtoken';
import { jwtSecret } from '../config/jwtConfig.js';

export const authMiddleware = (req, res, next) => {
    console.log('Authenticating user for protected route...');

    // Check for session user
    if (!req.session || !req.session.user) {
        console.log('No active session found');
        return res.status(401).json({ message: 'Unauthorized: No active session' });
    }

    // Log session details for debugging
    console.log('Session found for user:', req.session.user);

    // Attach session user to request
    try {
        req.user = req.session.user;
        next(); // Proceed to next middleware or route
    } catch (err) {
        console.error('Error processing session user:', err.message);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Default export
export default authMiddleware;
