import jwt from "jsonwebtoken";

/**
 * Middleware to authenticate requests using JWT
 * Ensures only authorized users can access sensitive Tax Vault data.
 */
export const authenticateJWT = (req, res, next) => {
  // 1. Get token from the Authorization header
  const authHeader = req.headers.authorization;

  // Standard format: "Bearer <token>"
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      message: "Unauthorized: Access denied. No token provided.",
    });
  }

  const token = authHeader.split(" ")[1];

  // 2. Verify the secret exists before trying to use it
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    console.error(
      "CRITICAL ERROR: JWT_SECRET is not defined in the backend environment.",
    );
    return res.status(500).json({ message: "Server configuration error." });
  }

  // 3. Verify the token
  jwt.verify(token, secret, (err, user) => {
    if (err) {
      console.error("JWT Verification Failed:", err.message);
      return res.status(403).json({
        message: "Forbidden: Your session has expired or the token is invalid.",
      });
    }

    /**
     * 4. Attach user info to the request object.
     * Based on your Login controller, 'user' will contain:
     * { id: "...", email: "...", iat: ..., exp: ... }
     */
    req.user = user;

    // Move to the next middleware or controller
    next();
  });
};
