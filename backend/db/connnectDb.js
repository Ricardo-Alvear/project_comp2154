import mongoose from "mongoose";

/**
 * Connects to MongoDB Atlas using the provided connection string.
 * @param {string} connectionString 
 */
export const connectDb = async (connectionString) => {
  try {
    // Options like useNewUrlParser are handled automatically in Mongoose 6+
    const conn = await mongoose.connect(connectionString);

    console.log(`MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error(`Database Connection Error: ${error.message}`);
    // Exit process with failure so the hosting provider knows to restart the container
    process.exit(1);
  }
};
