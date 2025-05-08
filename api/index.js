const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');
const serverless = require('serverless-http');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

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

// Connect once when the serverless function is initialized
connectToMongo();

// Routes
app.get('/', (req, res) => {
  res.send('🎉 MindForge backend is live on Vercel (serverless)');
});

// GET all sessions
app.get('/sessions', async (req, res) => {
  try {
    const result = await sessions.find().toArray();
    res.send(result);
  } catch (err) {
    res.status(500).send({ error: 'Failed to fetch sessions' });
  }
});

// Insert sample sessions
app.post('/insert-sample-sessions', async (req, res) => {
  const sampleSessions = [
    {
      session_title: 'IELTS Bootcamp',
      description: 'Prepare for your IELTS with expert guidance and mock exams.',
      tutor_name: 'Emily Watson',
      tutor_email: 'emily@mindforge.com',
      reg_fee: 30,
      status: 'Open',
      cover_img: 'https://i.ibb.co/WBncz7M/ielts.jpg',
      reg_start_date: '2025-05-01',
      reg_end_date: '2025-05-15',
      classStart: '2025-05-16',
      classEnd: '2025-06-15',
      session_duration: 20
    },
    {
      session_title: 'Python for Beginners',
      description: 'Start your coding journey with the basics of Python programming.',
      tutor_name: 'John Lee',
      tutor_email: 'john@mindforge.com',
      reg_fee: 20,
      status: 'Open',
      cover_img: 'https://i.ibb.co/VJ6wXkT/python.jpg',
      reg_start_date: '2025-05-03',
      reg_end_date: '2025-05-17',
      classStart: '2025-05-18',
      classEnd: '2025-06-10',
      session_duration: 15
    },
    {
      session_title: 'High School Math Support',
      description: 'Master algebra, geometry, and calculus with expert help.',
      tutor_name: 'Rachel Kim',
      tutor_email: 'rachel@mindforge.com',
      reg_fee: 25,
      status: 'Open',
      cover_img: 'https://i.ibb.co/BgL3ZFc/math.jpg',
      reg_start_date: '2025-05-05',
      reg_end_date: '2025-05-20',
      classStart: '2025-05-21',
      classEnd: '2025-06-30',
      session_duration: 18
    }
    // You can add more sessions as needed...
  ];

  try {
    const result = await sessions.insertMany(sampleSessions);
    res.send({ insertedCount: result.insertedCount });
  } catch (err) {
    res.status(500).send({ error: 'Failed to insert sessions' });
  }
});

// GET all tutors
app.get('/tutors', async (req, res) => {
  try {
    const result = await tutors.find().toArray();
    res.send(result);
  } catch (err) {
    console.error('❌ Failed to fetch tutors:', err);
    res.status(500).send({ error: 'Failed to fetch tutors' });
  }
});

// Add a tutor
app.post('/tutors/add', async (req, res) => {
  try {
    const newTutor = req.body;
    const result = await tutors.insertOne(newTutor);
    res.status(201).send(result);
  } catch (err) {
    console.error('❌ Failed to insert tutor:', err);
    res.status(500).send({ error: 'Failed to add tutor' });
  }
});

// Export for Vercel
module.exports = app;
module.exports.handler = serverless(app);
