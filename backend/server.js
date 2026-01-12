const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: [
    'https://todo-app-mu-two-88.vercel.app/' ,
    'http://localhost:5173', // local dev
    
  ]
}));

app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB error:', err));

app.use('/api/todos', require('./routes/todos'));

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
