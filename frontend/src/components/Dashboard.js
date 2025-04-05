import React, { useState, useEffect } from 'react';
import '../css/Dashboard.css';
import JobCard from './JobCard';
import axios from 'axios';
import { Range } from 'react-range';
import logo from "../images/logo.jpg"

const Dashboard = () => {
  const [jobs, setJobs] = useState([]);

  const [companyName, setCompanyName] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [location, setLocation] = useState('');
  const [jobType, setJobType] = useState('');
  const [salaryRangeMin, setSalaryRangeMin] = useState('');
  const [salaryRangeMax, setSalaryRangeMax] = useState('');
  const [applicationDeadline, setApplicationDeadline] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [companyLogo, setCompanyLogo] = useState('');

  const [searchRole, setSearchRole] = useState('');
  const [selectedCompany, setSelectedCompany] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedJobType, setSelectedJobType] = useState('');
  const [salaryRange, setSalaryRange] = useState(1200000);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getAllJobs = async () => {
    try {
      
      const res = await axios.get(`${process.env.REACT_APP_WEB_URL}/api/jobs/all`);
      setJobs(res.data);
    } catch (error) {
      console.error('Failed to fetch jobs:', error);
    }
  };

  const createJob = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${process.env.REACT_APP_WEB_URL}/api/jobs/add`, {
        jobTitle,
        companyName,
        location,
        jobType,
        salaryRange: {
          min: salaryRangeMin,
          max: salaryRangeMax
        },
        applicationDeadline,
        jobDescription,
        logo: companyLogo
      });
      getAllJobs();
      setIsModalOpen(false);
      setCompanyName('');
      setJobTitle('');
      setLocation('');
      setJobType('');
      setSalaryRangeMin('');
      setSalaryRangeMax('');
      setApplicationDeadline('');
      setJobDescription('');
      setCompanyLogo('');
    } catch (error) {
      console.error('Failed to create job:', error);
    }
  };

  const closeDialog = () => {
    alert("Draft saved.");
    setIsModalOpen(false);
  }

  const companies = [...new Set(jobs.map(job => job.companyName))];
  const locations = [...new Set(jobs.map(job => job.location))];
  const jobTypes = [...new Set(jobs.map(job => job.jobType))];

  const filteredJobs = jobs.filter(job => {
    const matchesRole = job.jobTitle?.toLowerCase().includes(searchRole.toLowerCase());
    const matchesCompany = selectedCompany ? job.companyName === selectedCompany : true;
    const matchesLocation = selectedLocation ? job.location === selectedLocation : true;
    const matchesJobType = selectedJobType ? job.jobType === selectedJobType : true;
    const matchesSalary = parseInt(job.salaryRange.max) * 100000 <= salaryRange;
    return matchesRole && matchesCompany && matchesLocation && matchesJobType && matchesSalary;
  });

  useEffect(() => {
    getAllJobs();
  }, []);

  return (
    <div className="App">
      {/* Header */}
      <div className="top-header-back">
        <header className="header">
          <div className="logo">
            <img src={logo} alt="Logo" className="logo-img" />
          </div>
          <nav className="nav">
            <a href="#">Home</a>
            <a href="#">Find Jobs</a>
            <a href="#">Find Talents</a>
            <a href="#">About us</a>
            <a href="#">Testimonials</a>
          </nav>
          <button className="create-job-btn" onClick={() => setIsModalOpen(true)}>
            Create Jobs
          </button>
        </header>

        <div className="search-filter">
          <input
            type="text"
            placeholder="Search by Job Title, Role"
            value={searchRole}
            onChange={(e) => setSearchRole(e.target.value)}
          />
          <select value={selectedLocation} onChange={(e) => setSelectedLocation(e.target.value)}>
            <option value="">Preferred Location</option>
            {locations.map((location, idx) => <option key={idx} value={location}>{location}</option>)}
          </select>
          <select value={selectedJobType} onChange={(e) => setSelectedJobType(e.target.value)}>
            <option value="">Job Type</option>
            {jobTypes.map((type, idx) => <option key={idx} value={type}>{type}</option>)}
          </select>
          <select value={selectedCompany} onChange={(e) => setSelectedCompany(e.target.value)}>
            <option value="">Company</option>
            {companies.map((comp, idx) => <option key={idx} value={comp}>{comp}</option>)}
          </select>
          <div className="salary-filter">
            <label>Salary Per Month</label>
            <input
              type="range"
              min="100000"
              max="1200000"
              value={salaryRange}
              onChange={(e) => setSalaryRange(e.target.value)}
            />
            <span>₹100K - ₹{Math.floor(salaryRange / 1000)}K</span>
          </div>

        </div>

      </div>
      <div className="job-listings">
        {filteredJobs.length > 0 ? filteredJobs.map((job, i) => (
          <JobCard key={i} job={job} />
        )) : <p>No jobs match your criteria.</p>}
      </div>

      <head>
        <link href="https://api.fontshare.com/v2/css?f[]=satoshi@300,400,500,700&display=swap" rel="stylesheet"></link>
      </head>

      {/* Modal */}
      {isModalOpen && (

        <div className="modal-overlay">
          <div className="modal">
            <h2>Create Job Opening</h2>
            <form onSubmit={createJob}>
              <div className="form-row">
                <div className="form-group">
                  <label>Job Title</label>
                  <input
                    type="text"
                    name="jobTitle"
                    value={jobTitle} onChange={(e) => setJobTitle(e.target.value)}
                    placeholder="Full Stack Developer"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Company Name</label>
                  <input
                    type="text"
                    name="companyName"
                    value={companyName} onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="Amazon, Microsoft, Swiggy"
                    required
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Location</label>
                  <select
                    name="location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    required
                  >
                    <option value="">Choose Preferred Location</option>
                    <option value="Chennai">Chennai</option>
                    <option value="Coimbatore">Coimbatore</option>
                    <option value="Trivandrum">Trivandrum</option>
                    <option value="Kochi">Kochi</option>
                    <option value="Bengaluru">Bengaluru</option>
                    <option value="Hyderabad">Hyderabad</option>
                    <option value="Pune">Pune</option>
                    <option value="Mumbai">Mumbai</option>
                    <option value="Delhi-NCR">Delhi-NCR</option>
                    <option value="Visakhapatnam">Visakhapatnam</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Job Type</label>
                  <select
                    name="jobType"
                    value={jobType}
                    onChange={(e) => setJobType(e.target.value)}
                    required
                  >
                    <option value="">Choose work type</option>
                    <option value="Fulltime">Fulltime</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Contract">Contract</option>
                    <option value="Internship">Internship</option>
                  </select>
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Salary Range</label>
                  <div className="salary-input-wrapper">
                    <div className="salary-input">
                      <input
                        type="text"
                        name="minSalary"
                        value={salaryRangeMin} onChange={(e) => setSalaryRangeMin(e.target.value)}
                        placeholder="2LPA"
                        required
                      />
                    </div>
                    <div className="salary-input">
                      <input
                        type="text"
                        name="maxSalary"
                        value={salaryRangeMax} onChange={(e) => setSalaryRangeMax(e.target.value)}
                        placeholder="12LPA"
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <label>Application Deadline</label>
                  <input
                    type="date"
                    name="applicationDeadline"
                    value={applicationDeadline}
                    onChange={(e) => setApplicationDeadline(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="form-group">
                <label>Company logo link</label>
                <input
                  type="url"
                  name="url"
                  placeholder='Ex: https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg'
                  value={companyLogo}
                  onChange={(e) => setCompanyLogo(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label className='job-des'>Job Description</label>
                <textarea
                  name="jobDescription"
                  value={jobDescription} onChange={(e) => setJobDescription(e.target.value)}
                  placeholder="Please share a description to let the candidate know more about the job role"
                  required
                />
              </div>
              <div className="form-actions">
                <button type="button" className="save-draft-btn" onClick={closeDialog}>
                  Save Draft
                </button>
                <button type="submit" className="publish-btn">
                  Publish
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Create Job Opening</h2>
            <form onSubmit={createJob}>
              <input name="role" placeholder="Job Title" value={jobTitle} onChange={(e)=>setJobTitle(e.target.value)} required />
              <input name="company" placeholder="Company Name" value={companyName} onChange={(e)=>setCompanyName(e.target.value)} required />
              <select
                name="location"
                value={location}
                onChange={(e)=>setLocation(e.target.value)}
                required
              >
                <option value="">Choose Preferred Location</option>
                <option value="Chennai">Chennai</option>
                <option value="Coimbatore">Coimbatore</option>
                <option value="Trivandrum">Trivandrum</option>
                <option value="Kochi">Kochi</option>
                <option value="Bengaluru">Bengaluru</option>
                <option value="Hyderabad">Hyderabad</option>
                <option value="Pune">Pune</option>
                <option value="Mumbai">Mumbai</option>
                <option value="Delhi-NCR">Delhi-NCR</option>
                <option value="Visakhapatnam">Visakhapatnam</option>
              </select>


              <input name="salaryMin" placeholder="Salary (LPA)" value={salaryRangeMin} onChange={(e)=>setSalaryRangeMin(e.target.value)} required />
              <input name="salaryMax" placeholder="Salary (LPA)" value={salaryRangeMax} onChange={(e)=>setSalaryRangeMax(e.target.value)} required />
              <select
                name="jobType"
                value={jobType}
                onChange={(e)=>setJobType(e.target.value)}
                required
              >
                <option value="">Choose work type</option>
                <option value="Fulltime">Fulltime</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract</option>
                <option value="Internship">Internship</option>
              </select>
              <textarea name="description" placeholder="Job Description" value={jobDescription} onChange={(e)=>setJobDescription(e.target.value)} required />
              <input
                    type="date"
                    name="applicationDeadline"
                    value={applicationDeadline}
                    onChange={(e)=>setApplicationDeadline(e.target.value)}
                    required
                  />
              <div className="form-actions">
                <button type="button" onClick={() => setIsModalOpen(false)}>Cancel</button>
                <button type="submit">Publish</button>
              </div>
            </form>
          </div>
        </div>
      )} */}

    </div>
  );
};

export default Dashboard;
