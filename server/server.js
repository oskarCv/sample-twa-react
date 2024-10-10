import express, { response } from 'express';
import mysql from 'mysql2/promise'; // Using promises for cleaner async/await handling
import axios from 'axios';
import cors from 'cors';
import dotenv from 'dotenv';
import { getAllSubscriptions } from './db/querys/ALL_SUBSCRIPTIONS.js';

dotenv.config(); // Load environment variables before creating connection

const app = express();
const port = process.env.PORT || 3301; // Use environment variable or default port

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

// Get a specific data item by ID
// app.get('/api/data/:id', async (req, res) => {
//   const id = req.params.id;
//   try {
//     const [results] = await connection.query('SELECT * FROM your_table WHERE id = ?', [id]);
//     if (results.length === 0) {
//       res.status(404).json({ message: 'Data not found' });
//     } else {
//       res.json(results[0]);
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Error fetching data' });
//   }
// });

// Create a new data item
// app.post('/api/data', async (req, res) => {
//   const data = req.body;
//   try {
//     await connection.query('INSERT INTO your_table SET ?', data);
//     res.status(201).json({ message: 'Data created successfully' });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Error creating data' });
//   }
// });

// Update an existing data item
// app.put('/api/data/:id', async (req, res) => {
//   const id = req.params.id;
//   const data = req.body;
//   try {
//     const [results] = await connection.query('UPDATE your_table SET ? WHERE id = ?', [data, id]);
//     if (results.affectedRows === 0) {
//       res.status(404).json({ message: 'Data not found' });
//     } else {
//       res.json({ message: 'Data updated successfully' });
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Error updating data' });
//   }
// });

// Delete an existing data item
// app.delete('/api/data/:id', async (req, res) => {
//   const id = req.params.id;
//   try {
//     const [results] = await connection.query('DELETE FROM your_table WHERE id = ?', [id]);
//     if (results.affectedRows === 0) {
//       res.status(404).json({ message: 'Data not found' });
//     } else {
//       res.json({ message: 'Data deleted successfully' });
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Error deleting data' });
//   }
// });

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

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
