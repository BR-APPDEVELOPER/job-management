const Job = require('../models/Job');

const createJob = async (req, res) => {
  try {
    const job = new Job(req.body);
    await job.save();
    res.status(201).json({ success: true, message: 'Job created successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 });
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createJob,
  getAllJobs,
};