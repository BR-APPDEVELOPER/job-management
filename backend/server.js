const express = require('express');
const dotenv = require('dotenv');
dotenv.config(); // Load .env variables BEFORE using them
const cors = require('cors');
const connectDB = require('./config/db');

const jobRoutes = require('./routes/jobRoutes');

connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/jobs', jobRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
