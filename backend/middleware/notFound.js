/**
 * 404 Not Found Middleware
 * This triggers when a request is made to a URL that isn't defined in your routes.
 */
export const notFound = (req, res) => {
  // Log the attempted URL so you can see what went wrong in your Render logs
  console.error(`404 - Not Found: ${req.method} ${req.originalUrl}`);

  return res.status(404).json({
    error: "Resource Not Found",
    message: `The path '${req.originalUrl}' does not exist on this secure server.`,
    suggestion: "Verify your API base URL and route definitions.",
  });
};
