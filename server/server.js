import express, { response } from 'express';
import mysql from 'mysql2/promise'; // Using promises for cleaner async/await handling
import axios from 'axios';
import cors from 'cors';
import dotenv from 'dotenv';
import { getAllSubscriptions } from './db/querys/ALL_SUBSCRIPTIONS.js';
import { registerSubscription } from './db/querys/SUBSCRIPTION.js';
import { platformUserId } from './db/querys/PLATFORM_USER_ID.js';


dotenv.config(); // Load environment variables before creating connection

const app = express();
const port = process.env.PORT || 3301; // Use environment variable or default port

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;

let connection; // Declare connection variable

// Establish the database connection
async function initializeDBConnection() {
  try {
    console.log('database host ', process.env.DATABASE_HOST);
    connection = await mysql.createConnection({
      host: process.env.DATABASE_HOST,
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASS,
      database: process.env.DATABASE_NAME
    });
    console.log('Connected to the database successfully!');
  } catch (error) {
    console.error('Error connecting to the database:', error);
    process.exit(1); // Exit the process with an error
  }
}

// Initialize database connection before the server starts
initializeDBConnection();

// Enable CORS for cross-origin requests (if necessary)
app.use(cors());
app.use(express.json()); // Parse incoming JSON requests

// Define API endpoints

// Get all subscriptions
app.get('/api/subscriptions/', async (req, res) => {
  try {
      const responseData = await getAllSubscriptions(connection); // Call without res
      console.warn('Info gotten');
      console.log(responseData); // This will now print the results
      res.json(responseData); // Send the results back to the client
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error fetching data' }); // Handle error here
  }
});

app.post('/api/userSubscription/', async (req, res) => {
  try {
      const {
          wallet_id,
          telegram_id,
          subscription_plan_id,
          subscription_date,
          subscription_utime,
          transaction_hash,
          trace_id
      } = req.body;

      console.warn('Body req>>> ', req.body);
      console.warn('>>> ', wallet_id);
      console.warn('>>> ', telegram_id);
      console.warn('>>> ', subscription_plan_id);
      console.warn('>>> ', subscription_date);
      console.warn('>>> ', subscription_utime);
      console.warn('>>> ', transaction_hash);
      console.warn('>>> ', trace_id);
      
      const responseData = await registerSubscription(connection, {
          wallet_id,
          telegram_id,
          subscription_plan_id,
          subscription_date,
          subscription_utime,
          transaction_hash,
          trace_id
      });

      console.warn('Info gotten');
      console.log(responseData); // This will now print the results
      res.json(responseData); // Send the results back to the client
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error fetching data' }); // Handle error here
  }
});

app.get('/api/getTransactions/:wallet', async (req, res) => {
  const { wallet } = req.params;
  const url = `https://toncenter.com/api/v3/transactions?account=${wallet}`;

  try {
    const response = await axios.get(url);
    console.log('Transactions: ', response.data);
    res.json(response.data); // Return the transactions data directly
  } catch (error) {
    console.error('Error fetching transactions:', error.message);
    res.status(500).json({ message: 'Error fetching transactions' });
  }
});

app.get('/api/getTransactionDetails/:transactionHash', async (req, res) => {
  const { transactionHash } = req.params;
  const url = `https://tonapi.io/v2/traces/${transactionHash}`;

  try {
    const response = await axios.get(url);
    console.log(response.data);
    res.json(response.data); // Return the transactions data directly
  } catch (error) {
    console.error('Error fetching transactions:', error.message);
    res.status(500).json({ message: 'Error fetching transactions' });
  }
});

app.post('/api/validate-telegram-id', async (req, res) => {
  const { telegramId } = req.body;

  try {
    const response = await axios.get(
      `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/getChat`,
      {
        params: { chat_id: telegramId },
      }
    );

    if (response.data.ok) {
      res.json({ exists: true, chat: response.data.result });
    } else {
      res.json({ exists: false });
    }
  } catch (error) {
    console.error('Error validating Telegram ID:', error.message || error);
    res.status(500).json({ exists: false });
  }
});
app.get('/api/getPlatformUserId/:walletId', async (req, res) => {
  const { walletId } = req.params;

  try {
    const [results] = await connection.query(`CALL GetPlatformUserId(?, @platformUserId, @found);`, [walletId]);
    const [[{ platformUserId, found }]] = await connection.query(`SELECT @platformUserId AS platformUserId, @found AS found;`);

    if (found) {
      res.json({ platformUserId, found: true });
    } else {
      res.json({ platformUserId: null, found: false });
    }
  } catch (error) {
    console.error('Error fetching Platform User ID:', error.message || error);
    res.status(500).json({ message: 'Error fetching Platform User ID' });
  }
});



// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
