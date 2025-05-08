const express = require('express');
const cors = require('cors');
const { MongoClient, ObjectId } = require('mongodb');
const serverless = require('serverless-http');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB setup
const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let db, sessions, users, bookings;

async function connectDB() {
  try {
    await client.connect();
    db = client.db('MindForgeDB');
    sessions = db.collection('sessions');
    users = db.collection('users');
    bookings = db.collection('bookings');
    console.log('✅ MongoDB Connected and Collections Ready');
  } catch (error) {
    console.error('❌ MongoDB Connection Failed:', error);
  }
}

// Immediately connect (but don't block)
connectDB();

// ✅ ROUTES

app.get('/', (req, res) => {
  res.send('🌐 MindForge API is running (Vercel Serverless)');
});

// 🔹 Get all sessions
app.get('/sessions', async (req, res) => {
  const result = await sessions.find().toArray();
  res.send(result);
});

// 🔹 Get all approved sessions (for homepage)
app.get('/all_session_home', async (req, res) => {
  const result = await sessions.find({ status: 'approved' }).toArray();
  res.send(result);
});

// 🔹 Add a new session
app.post('/sessions', async (req, res) => {
  try {
    const sessionData = req.body;
    const result = await sessions.insertOne(sessionData);
    res.send(result);
  } catch (error) {
    console.error('❌ Failed to add session:', error);
    res.status(500).send({ error: 'Failed to add session' });
  }
});

// 🔹 Create a booking
app.post('/bookings', async (req, res) => {
  try {
    const bookingData = req.body;
    const result = await bookings.insertOne(bookingData);
    res.send(result);
  } catch (error) {
    console.error('❌ Failed to insert booking:', error);
    res.status(500).send({ error: 'Failed to create booking' });
  }
});

// 🔹 Get user by email (for role check)
app.get('/users/:email', async (req, res) => {
  const email = req.params.email;
  const user = await users.findOne({ email });
  res.send(user);
});

// 👇 Vercel handler export
module.exports = serverless(app);
