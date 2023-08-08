import express from 'express';
// import { orderItems1 } from '../controllers/controllers.js';

const orderRouter = express.Router();

orderRouter.post('/', orderItems1);

export default orderRouter;
