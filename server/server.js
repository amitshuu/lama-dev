import 'express-async-errors';
import express from 'express';
import dotenv from 'dotenv/config';

//DB

import { connectDB } from './db/connect.js';

//Middlewares

import { notFoundMiddleware } from './middlewares/notFoundMiddleware.js';
import { errorHandler } from './middlewares/errorHandler.js';

const app = express();

app.get('/', (req, res) => {
  res.send('Api....');
});

//Middlewares
app.use(notFoundMiddleware);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  connectDB();
  console.log(`Server is up with the port ${PORT}`);
});
