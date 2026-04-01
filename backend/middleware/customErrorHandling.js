/**
 * Global Error Handler
 * Catches all errors passed via next(err) in controllers
 */
export const customErr = (err, req, res, next) => {
  // Log the full error on the server console for debugging
  console.error(`Error Logic: ${err.name} - ${err.message}`);

  // 1. Mongoose Validation Error (e.g., missing a required field)
  if (err.name === "ValidationError") {
    const messages = Object.values(err.errors).map((item) => item.message);
    return res.status(400).json({
      error: "Validation Failed",
      details: messages,
    });
  }

  // 2. Mongoose Cast Error (e.g., searching for an ID that isn't a valid ObjectId)
  if (err.name === "CastError") {
    return res.status(404).json({
      error: "Resource Not Found",
      details: `Invalid format for value: ${err.value}`,
    });
  }

  // 3. JWT Errors (Expired or Malformed)
  if (err.name === "TokenExpiredError") {
    return res
      .status(401)
      .json({ error: "Session expired. Please log in again." });
  }

  if (err.name === "JsonWebTokenError") {
    return res
      .status(401)
      .json({ error: "Invalid token. Authorization denied." });
  }

  // 4. Fallback for all other internal server errors
  const statusCode = err.statusCode || 500;
  const message =
    process.env.NODE_ENV === "production"
      ? "A secure server error occurred. Please try again later."
      : err.message;

  return res.status(statusCode).json({ error: message });
};
