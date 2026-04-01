import express from "express";
import cors from "cors";
import "dotenv/config";
import taxRoutes from "./routes/taxRoutes.js";
import authRoutes from "./routes/authroutes.js";
import { start } from "./server/connectServer.js";
import { notFound } from "./middleware/notFound.js";
import { customErr } from "./middleware/customErrorHandling.js";
import routes from "./routes/routes.js";

const server = express();

// 1. Dynamic CORS Configuration
// This ensures both your local machine and your live Netlify site can access the API
const allowedOrigins = [
  "http://localhost:5173", // Local Development
  "https://your-app-name.netlify.app", // Replace with your actual Netlify URL
];

server.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl)
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true, // Required if you decide to use cookies later
  }),
);

server.use(express.json());

// 2. Environment Variables with Fallbacks
const MONGO_URI = process.env.MONGO_URI;
const PORT = process.env.PORT || 5001; // Render will provide its own PORT

// 3. Routes
server.use("/api/v1/auth", authRoutes);
server.use("/api/v1/notifications", routes);
server.use("/api/v1/tax-records", taxRoutes);

// 4. Error Handling (Must be after routes)
server.use(notFound);
server.use(customErr);

// 5. Ignition
start(PORT, MONGO_URI, server);
