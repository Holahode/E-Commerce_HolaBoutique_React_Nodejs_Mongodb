import express from 'express';
import { signin } from '../controllers/controllers.js';
import { signup, validateEmail } from '../controllers/controllers.js';
const userRouter = express.Router();

userRouter.post('/signin', signin);
userRouter.post('/signup', validateEmail, signup);

export default userRouter;
