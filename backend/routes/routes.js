import express from 'express';
import { allBooks, getBooks, sendBooks } from '../controllers/controllers.js';
const routes = express.Router();

routes.route('/').get(getBooks).get(allBooks).post(sendBooks);

export default routes;
