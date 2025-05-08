const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');
const serverless = require('serverless-http');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB setup
const client = new MongoClient(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let db, sessions, tutors;

async function connectToMongo() {
  try {
    if (!client.topology?.isConnected()) {
      await client.connect();
    }
    db = client.db('MindForgeDB');
    sessions = db.collection('sessions');
    tutors = db.collection('tutors');
    console.log('✅ MongoDB connected and collections ready');
  } catch (err) {
    console.error('❌ MongoDB connection failed:', err);
  }
}

connectToMongo();

// Routes
app.get('/', (req, res) => {
  res.send('🎉 MindForge backend is live on Vercel (serverless)!');
});

app.get('/sessions', async (req, res) => {
  try {
    const result = await sessions.find().toArray();
    res.send(result);
  } catch (err) {
    res.status(500).send({ error: 'Failed to fetch sessions' });
  }
});

app.get('/tutors', async (req, res) => {
  try {
    const result = await tutors.find().toArray();
    res.send(result);
  } catch (err) {
    res.status(500).send({ error: 'Failed to fetch tutors' });
  }
});

app.post('/tutors/add', async (req, res) => {
  try {
    const newTutor = req.body;
    const result = await tutors.insertOne(newTutor);
    res.status(201).send(result);
  } catch (err) {
    res.status(500).send({ error: 'Failed to add tutor' });
  }
});

// ❗️ This is the export Vercel needs
module.exports = serverless(app);
  