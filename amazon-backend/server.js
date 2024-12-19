import express from 'express';
import mysql from 'mysql2';
import cors from 'cors';
import userRouter from './routers/userRouter.js';
import productRouter from './routers/productRouter.js';
import dotenv from 'dotenv';
import orderRouter from './routers/orderRouter.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// MySQL Database Connection
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});


db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err.message);
        process.exit(1); // Exit process if connection fails
    }
    console.log('Connected to MySQL database');
});

// Make `db` globally accessible (optional, for simpler imports)
global.db = db;

app.use(express.json());
app.use(cors());

// Define API Routes
app.use("/api/users", userRouter);
app.use("/api/products", productRouter);
app.use("/api/orders", orderRouter);
app.get('/api/config/paypal', (req, res) => {
    res.send(process.env.PAYPAL_CLIENT_ID || 'sb');
});

// Root Endpoint
app.get('/', (req, res) => res.status(200).send('Hello Debjit here. It is Amazon clone project.'));

// Start Server
app.listen(port, () => console.log(`Listening on localhost:${port}`));
