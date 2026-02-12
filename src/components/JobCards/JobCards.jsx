

import { useState, useEffect } from "react";
import { Link } from "react-router";
import styles from "./JobCards.module.css";

import * as jobService from '../../services/jobService';

const statuses = ["Prospective", "Applied", "Interview", "Offer", "Rejected"];

const JobCards = ({ jobs, updateJobStatus }) => {
  const [jobList, setJobList] = useState([]);

  useEffect(() => {
    setJobList(jobs);
  }, [jobs]);

  const handleDragStart = (e, jobId) => {
    e.dataTransfer.setData("jobId", jobId);
  };

  const handleDrop = async (e, newStatus) => {
    const jobId = e.dataTransfer.getData("jobId");

    const updatedJobs = jobList.map((job) =>
      job._id === jobId ? { ...job, status: newStatus } : job
    );

    setJobList(updatedJobs);

    try {
      await jobService.updateJobStatus(jobId, newStatus);
      

    } catch (error) {
      console.error("Failed to update job:", error);
    }
  };

  return (
    <main className={styles.container}>
      {statuses.map((status) => (
        <section
          key={status}
          className={styles.column}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => handleDrop(e, status)}
          onDragEnter={(e) => e.currentTarget.classList.add(styles.activeColumn)}
          onDragLeave={(e) => e.currentTarget.classList.remove(styles.activeColumn)}

        >
          <h2>{status}</h2>

          {jobList
            .filter((job) => job.status === status)
            .map((job) => (
              <div
                key={job._id}
                className={styles.JobCard}
                draggable
                onDragStart={(e) => handleDragStart(e, job._id)}
              >
                <Link to={`/jobs/${job._id}`}>
                  <p>{job.position}</p>
                  <p>{job.employer}</p>
                  <p>£ {job.salary}</p>
                </Link>
              </div>
            ))}
        </section>
      ))}
    </main>
  );
};

export default JobCards;
