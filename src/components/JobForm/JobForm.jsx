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
    setFormData({ ...formData, [evt.target.name]: evt.target.value});
  };

  
  const handleSubmit = (evt) => {
    evt.preventDefault();
    // console.log("Form Data:", formData);

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

        
        <label htmlFor="position">Position</label>
        <input
          required
          type="text"
          name="position"
          id="position"
          value={formData.position}
          onChange={handleChange}
        />

        
        <label htmlFor="company">Company Name</label>
        <input
          required
          type="text"
          name="companyName"
          id="company"
          value={formData.companyName}
          onChange={handleChange}
        />

       
        <label htmlFor="salary">Salary</label>
        <input
          type="number"
          min="0"
          name="salary"
          id="salary"
          value={formData.salary}
          onChange={handleChange}
        />

       
        <label htmlFor="type">Job Type</label>
        <select
          required
          name="jobType"
          id="type"
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

        
        <label htmlFor="arrangement">Work Arrangement</label>
        <select
          required
          name="workArrangement"
          id="arrangement"
          value={formData.workArrangement}
          onChange={handleChange}
        >
          <option value="Remote">Remote</option>
          <option value="In-person">In-person</option>
          <option value="Hybrid">Hybrid</option>
        </select>

       
        <label htmlFor="location">Location</label>
        <input
          type="text"
          name="location"
          id="location"
          value={formData.location}
          onChange={handleChange}
        />

        
        <label htmlFor="description">Description</label>
        <textarea
          required
          name="description"
          id="description"
          value={formData.description}
          onChange={handleChange}
        />

       
        <label htmlFor="employer">Employer</label>
        <input
          required
          type="text"
          name="employer"
          id="employer"
          value={formData.employer}
          onChange={handleChange}
        />

        
        <label htmlFor="status">Status</label>
        <select
          name="status"
          id="status"
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
