import jwt from 'jsonwebtoken';

/**
 * Middleware to authenticate requests using JWT
 * Protected B data requires strictly authorized access [cite: 8, 73]
 */
export const authenticateJWT = (req, res, next) => {
	// Look for the token in the Authorization header
	const authHeader = req.headers.authorization;

	if (authHeader && authHeader.startsWith('Bearer ')) {
		// Expected format: "Bearer <token>"
		const token = authHeader.split(' ')[1];

		jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
			if (err) {
				return res.status(403).json({
					message: 'Forbidden: Invalid or expired token',
				});
			}

			// Attach user info to the request object for use in controllers
			req.user = user;
			next();
		});
	} else {
		res.status(401).json({
			message: 'Unauthorized: No token provided',
		});
	}
};
