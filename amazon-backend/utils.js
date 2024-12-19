import jwt from 'jsonwebtoken';

/**
 * Generate a JWT token for a user
 * @param {Object} user - User object containing id, name, email, and isAdmin
 * @returns {string} - JWT token
 */
export const generateToken = (user) => {
    return jwt.sign(
        {
            id: user.id, // Ensure `id` matches your MySQL column
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        },
        process.env.JWT_SECRET || 'somethingsecret', // Use env variable or fallback
        {
            expiresIn: '30d', // Token validity period
        }
    );
};

/**
 * Middleware to verify if the user is authenticated
 * @param {Object} req - HTTP request object
 * @param {Object} res - HTTP response object
 * @param {Function} next - Next middleware function
 */
export const isAuth = (req, res, next) => {
    const authorization = req.headers.authorization;

    if (authorization) {
        // Remove "Bearer " prefix from token
        const token = authorization.slice(7, authorization.length);
        jwt.verify(
            token,
            process.env.JWT_SECRET || 'somethingsecret',
            (err, decode) => {
                if (err) {
                    return res.status(401).send({ message: 'Invalid token' });
                }
                // Attach decoded token data to request object
                req.user = decode;
                next();
            }
        );
    } else {
        return res.status(401).send({ message: 'No token provided' });
    }
};

/**
 * Middleware to check if the user has an admin role
 * @param {Object} req - HTTP request object
 * @param {Object} res - HTTP response object
 * @param {Function} next - Next middleware function
 */
export const isAdmin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next();
    } else {
        return res.status(403).send({ message: 'Access denied: Admin only' });
    }
};
