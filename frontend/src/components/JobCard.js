import React from 'react';

const JobCard = ({ job }) => {

  const getTimeDifference = (deadline) => {
    const now = new Date();
    const pastDate = new Date(deadline);
    const differenceMs = now - pastDate; // Difference in milliseconds

    const seconds = Math.floor(differenceMs / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
      return `${days}d ago`;
    } else if (hours > 0) {
      return `${hours}h ago`;
    } else if (minutes > 0) {
      return `${minutes}m ago`;
    } else {
      return `${seconds}s ago`;
    }
  };

  return (
    <div className="job-card">
      <div className="job-header">
        <img src={job.logo} alt={`${job.companyName} logo`} className="company-logo" />
        <span className="posted-time">{getTimeDifference(job.createdAt)}</span>
      </div>
      <h3>{job.jobTitle}</h3>
      <div className="job-details">
        <span>🕒 1-3 yr Exp</span>
        <span>📍 {job.location}</span>
        <span>💰 {job.salaryRange.max}</span>
      </div>
      <p>{job.jobDescription}</p>
      <button className="apply-btn">Apply Now</button>
    </div>
  );
};

export default JobCard;