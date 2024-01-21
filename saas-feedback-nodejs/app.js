require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');
const { MongoClient } = require('mongodb');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
const uri = process.env.MONGODB_URI;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function connectToMongoDB() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('Error connecting to MongoDB', err);
  }
}

// Connect to MongoDB
connectToMongoDB();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
