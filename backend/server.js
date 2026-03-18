import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import taxRoutes from './routes/taxRoutes.js';
import authRoutes from './routes/authroutes.js'; // Added
import { start } from './server/connectServer.js';
import { notFound } from './middleware/notFound.js';
import { customErr } from './middleware/customErrorHandling.js';
import routes from './routes/routes.js';

const server = express();

server.use(cors());
server.use(express.json());

const MONGO_URI = process.env.MONGO_URI;
const PORT = process.env.PORT;

// Mount authentication routes
server.use('/api/v1/auth', authRoutes); // Added
server.use('/api/v1/notifications', routes);
server.use('/api/v1/tax-records', taxRoutes);

server.use(notFound);
server.use(customErr);

start(PORT, MONGO_URI, server);
