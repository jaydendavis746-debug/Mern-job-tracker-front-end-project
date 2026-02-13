// src/components/JobForm/JobForm.jsx

import { useState, useEffect } from "react";
import { useParams } from 'react-router';

import * as jobService from '../../services/jobService';

import styles from './JobForm.module.css'

const JobForm = (props ) => {

  const {jobId} = useParams();
    

  const [formData, setFormData] = useState({
    position: "",
    companyName: "",
    salary: "",
    jobType: "",
    workArrangement: "",
    location: "",
    description: "",
    employer: "",
    status: "",
  });

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value});
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
    <main className={styles.container} >
      <h1>{jobId ? 'Edit Job Card' : 'New Job Card'}</h1>
      <form onSubmit={handleSubmit}>

        <div className={styles.seperation}>
        <input
          required
          type="text"
          name="position"
          id="position"
          placeholder='Position'
          value={formData.position}
          onChange={handleChange}
        />
      </div>
        
        <div className={styles.seperation}>
        <input
          required
          type="text"
          name="companyName"
          id="company"
          placeholder='Company'
          value={formData.companyName}
          onChange={handleChange}
        />
  </div>
       <div className={styles.seperation}>
        <input
          type="number"
          min="0"
          name="salary"
          id="salary"
          placeholder='Salary'
          value={formData.salary}
          onChange={handleChange}
        />
         </div>
       
       <div className={styles.seperation}>
        <select
          required
          name="jobType"
          id="type"
          value={formData.jobType}
          onChange={handleChange}
        >
          <option value='' disabled hidden >Select-Type</option>
          <option value="Full-time">Full-time</option>
          <option value="Part-time">Part-time</option>
          <option value="Contract">Contract</option>
          <option value="Internship">Internship</option>
          <option value="Temporary">Temporary</option>
          <option value="Zero-Hour">Zero-Hour</option>
        </select>
         </div>
        
        <div className={styles.seperation}>
        <select
          required
          name="workArrangement"
          id="arrangement"
          value={formData.workArrangement}
          onChange={handleChange}
        >
          <option value='' disabled hidden >Select-Arrangement</option>
          <option value="Remote">Remote</option>
          <option value="In-person">In-person</option>
          <option value="Hybrid">Hybrid</option>
        </select>
         </div>
       
       <div className={styles.seperation}>
        <input
          type="text"
          name="location"
          id="location"
          placeholder='Location'
          value={formData.location}
          onChange={handleChange}
        />
         </div>

        <div className={styles.seperation}>
        <textarea
          required
          name="description"
          id="description"
          placeholder='Job description'
          value={formData.description}
          onChange={handleChange}
        />
        </div>
       
       <div className={styles.seperation}>
        <input
          required
          type="text"
          name="employer"
          id="employer"
          placeholder='Employer'
          value={formData.employer}
          onChange={handleChange}
        />
         </div>

        <div className={styles.seperation}>
        <select
          name="status"
          id="status"
          value={formData.status}
          onChange={handleChange}
        >
          <option value='' disabled hidden> Select-Status </option>
          <option value="Prospective">Prospective</option>
          <option value="Applied">Applied</option>
          <option value="Interviewing">Interviewing</option>
          <option value="Offer">Offer</option>
          <option value="Rejected">Rejected</option>
        </select>

         </div>

        <button type="submit" className={styles.btn}   >Submit Job</button>
      </form>
    </main>
  );
};

export default JobForm;
