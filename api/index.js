const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');
const serverless = require('serverless-http');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
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

// Immediately connect
connectDB();

// ROUTES
app.get('/', (req, res) => {
  res.send('🌐 MindForge API is running (Vercel Serverless)');
});

app.get('/sessions', async (req, res) => {
  const result = await sessions.find().toArray();
  res.send(result);
});

app.get('/all_session_home', async (req, res) => {
  const result = await sessions.find({ status: 'approved' }).toArray();
  res.send(result);
});

app.post('/bookings', async (req, res) => {
  try {
    const bookingData = req.body;
    const result = await bookings.insertOne(bookingData);
    res.send(result);
  } catch (error) {
    console.error('❌ Booking Failed:', error);
    res.status(500).send({ error: 'Failed to create booking' });
  }
});

app.get('/users/:email', async (req, res) => {
  const email = req.params.email;
  const user = await users.findOne({ email });
  res.send(user);
});

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

// ✅ Export for Vercel
module.exports = app;
module.exports.handler = serverless(app);
