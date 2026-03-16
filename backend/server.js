import express from 'express';
import 'dotenv/config';
import { start } from './server/connectServer.js';
import { notFound } from './middleware/notFound.js';
import { customErr } from './middleware/customErrorHandling.js';
import routes from './routes/routes.js';

const server = express();
server.use(express.json());

const MONGO_URI = process.env.MONGO_URI;
const PORT = process.env.PORT;

server.use('/api/v1/books', routes);

server.use(notFound);
server.use(customErr);

start(PORT, MONGO_URI, server);