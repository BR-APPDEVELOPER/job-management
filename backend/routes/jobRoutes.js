const express = require('express');
const { createJob, getAllJobs } = require('../controllers/jobController');

const router = express.Router();

// Route: /api/jobs
router.post('/add', createJob);
router.get('/all', getAllJobs);

module.exports = router;