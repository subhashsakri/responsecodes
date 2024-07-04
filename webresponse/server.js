require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./routes/users');
const listRoutes = require('./routes/lists');

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

mongoose.connect('mongodb+srv://subhash1210:sakri@cluster0.qnxezvl.mongodb.net/webresponse?retryWrites=true&w=majority&appName=Cluster0', {
 
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDBmm connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

app.use('/api/users', userRoutes);
app.use('/api/lists', listRoutes);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
