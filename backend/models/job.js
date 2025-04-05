const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  jobTitle: { type: String, required: true },
  companyName: { type: String, required: true },
  location: { type: String, required: true },
  jobType: {
    type: String,
    enum: ['Fulltime', 'Part-time', 'Contract', 'Internship'],
    required: true,
  },
  salaryRange: {
    min: { type: String, required: true },
    max: { type: String, required: true },
  },
  applicationDeadline: { type: Date, required: true },
  jobDescription: { type: String, required: true },
  logo: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Job', jobSchema);
