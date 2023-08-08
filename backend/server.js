import express from 'express';
import dotenv from 'dotenv';
import userRouter from './routes/userRoute.js';
// import orderRouter from './routes/orderRoute.js';
import productRouter from './routes/productRoute.js';
import cors from 'cors';
const app = express();
const port = process.env.PORT || 4000;
dotenv.config();
import { run } from './controllers/controllers.js';
run();

app.use(express.json());
app.use(cors());

// app.use('/api/orders', orderRouter);
app.use('/api/products', productRouter);
app.use('/api/users', userRouter);

app.use((error, req, res, next) => {
  if (error || error.message) {
    return res.send(error.message);
  }
  res.send('Backend error');
});

app.use((req, res) => {
  res.status(500).send('API is not responding');
});

app.listen(port, () => {
  console.log(`Serve at http://localhost:${port}`);
});
