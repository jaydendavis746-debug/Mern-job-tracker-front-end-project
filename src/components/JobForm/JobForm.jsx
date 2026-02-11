// src/components/JobForm/JobForm.jsx

import { useState, useEffect } from "react";
import { useParams } from 'react-router';

import * as jobService from '../../services/jobService';

const JobForm = (props ) => {

    const {jobId} = useParams();
    

  const [formData, setFormData] = useState({
    position: "",
    companyName: "",
    salary: "",
    jobType: "Full-time",
    workArrangement: "In-person",
    location: "",
    description: "",
    employer: "",
    status: "Prospective",
  });

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name] : evt.target.value});
  };

  
  const handleSubmit = (evt) => {
    evt.preventDefault();

    if(jobId){
        props.handleUpdateJob(jobId, formData)
    } else {
        props.handleAddJob(formData);
    }

    

  };




  useEffect(() => {
        
      const fetchJob = async () => {
      const jobData = await jobService.show(jobId);
      setFormData(jobData);
    };
    if (jobId) fetchJob();

    return () => setFormData({
    position: "",
    companyName: "",
    salary: "",
    jobType: "Full-time",
    workArrangement: "In-person",
    location: "",
    description: "",
    employer: "",
    status: "Prospective",
  });

  }, [jobId]);


  return (
    <main>
        <h1>{jobId ? 'Edit Job Card' : 'New Job Card'}</h1>
      <form onSubmit={handleSubmit}>

        
        <label>Position</label>
        <input
          required
          type="text"
          name="position"
          value={formData.position}
          onChange={handleChange}
        />

        
        <label>Company Name</label>
        <input
          required
          type="text"
          name="companyName"
          value={formData.companyName}
          onChange={handleChange}
        />

       
        <label>Salary</label>
        <input
          type="number"
          min="0"
          name="salary"
          value={formData.salary}
          onChange={handleChange}
        />

       
        <label>Job Type</label>
        <select
          required
          name="jobType"
          value={formData.jobType}
          onChange={handleChange}
        >
          <option value="Full-time">Full-time</option>
          <option value="Part-time">Part-time</option>
          <option value="Contract">Contract</option>
          <option value="Internship">Internship</option>
          <option value="Temporary">Temporary</option>
          <option value="Zero-Hour">Zero-Hour</option>
        </select>

        
        <label>Work Arrangement</label>
        <select
          required
          name="workArrangement"
          value={formData.workArrangement}
          onChange={handleChange}
        >
          <option value="Remote">Remote</option>
          <option value="In-person">In-person</option>
          <option value="Hybrid">Hybrid</option>
        </select>

       
        <label>Location</label>
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
        />

        
        <label>Description</label>
        <textarea
          required
          name="description"
          value={formData.description}
          onChange={handleChange}
        />

       
        <label>Employer</label>
        <input
          required
          type="text"
          name="employer"
          value={formData.employer}
          onChange={handleChange}
        />

        
        <label>Status</label>
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
        >
          <option value="Prospective">Prospective</option>
          <option value="Applied">Applied</option>
          <option value="Interviewing">Interviewing</option>
          <option value="Offer">Offer</option>
          <option value="Rejected">Rejected</option>
        </select>

        <button type="submit">Submit Job</button>
      </form>
    </main>
  );
};

export default JobForm;
