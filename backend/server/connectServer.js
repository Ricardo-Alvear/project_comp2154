import { connectDb } from "../db/connnectDb.js";

/**
 * Starts the MERN Backend Server
 * @param {number} port - The PORT from process.env (e.g., 5001 or 10000)
 * @param {string} dbconnection - The MONGO_URI from your .env
 * @param {object} server - Your Express app instance
 */
export const start = async (port, dbconnection, server) => {
  try {
    // 1. Validate environment variables before trying to connect
    if (!dbconnection) {
      throw new Error(
        "MONGO_URI is undefined. Check your environment variables.",
      );
    }

    // 2. Await the database connection first
    // We wait for this to finish BEFORE starting the server
    await connectDb(dbconnection);
    console.log("🚀 Database connection established successfully");

    // 3. Start the Express server
    // Using a callback in listen() to confirm the specific port
    return server.listen(port, () => {
      console.log(`Secure Vault Server is listening on port ${port}...`);
    });
  } catch (error) {
    // 4. Critical Error Handling
    console.error("Failed to start the server:");
    console.error(error.message);

    // In production, exiting ensures the host (Render)
    // knows the deployment failed and can try a restart.
    process.exit(1);
  }
};
