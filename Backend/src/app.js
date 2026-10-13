import 'dotenv/config'
import express from 'express';


import connectDB from './DB.js';

const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Hello !');
});

app.listen(port, () => {
    connectDB();
  console.log(`Example app  on port ${port}`);
});