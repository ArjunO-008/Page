import 'dotenv/config'
import express from 'express';
import connectDB from './database/database.js';

const app = express();
const port = process.env.PORT || 3000;

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

(async () => {
  try {
    const totalTrial = 5;
    let trialCount = 1;
    let isConnect = await connectDB();

    while (!isConnect && trialCount < totalTrial) {
      console.log(`$Trying to Re-Connect To DataBase: ${trialCount}`);
      trialCount++;
      await delay(2000)
      isConnect = await connectDB();
    }

    if(isConnect) {
      console.log("Database Connected Successfully");
      app.listen(port, () => {
        console.log(`Server Running at Port: ${port}`);
      });
    } else {
      throw new Error(`Failed to connect to the database after ${totalTrial} attempts. Server not started.`);
    }

  } catch (err) {
    console.error("ERROR: ", err.message);
    console.error(err.stack);
    process.exit(1);
  }
})();