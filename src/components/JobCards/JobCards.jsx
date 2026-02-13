

import { useState, useEffect,  } from "react";
import { Link, useLocation } from "react-router";
import styles from "./JobCards.module.css";

import * as jobService from '../../services/jobService';

const statuses = ["Prospective", "Applied", "Interviewing", "Offer", "Rejected"];

const JobCards = ({ jobs}) => {

const location = useLocation()

const [jobList, setJobList] = useState([]);

const [draggingId, setDraggingId] = useState(null);


  useEffect(() => {
    setJobList(jobs);
  }, [jobs]);

  const handleDragStart = (e, jobId) => {
  e.dataTransfer.setData("jobId", jobId);
  setDraggingId(jobId);

  const card = e.currentTarget.closest(`.${styles.JobCard}`);
  if (card) {
    e.dataTransfer.setDragImage(
      card,
      card.offsetWidth / 2,
      card.offsetHeight / 2
    );
  }
};

const handleDragEnd = () => {
  setDraggingId(null);
};


  const handleDrop = async (e, newStatus) => {
    const jobId = e.dataTransfer.getData("jobId");

    const updatedJobs = jobList.map((job) =>
      job._id === jobId ? { ...job, status: newStatus } : job
    );

    setJobList(updatedJobs);

    try {
      await jobService.updateJobStatus(jobId, newStatus );
      

    } catch (error) {

      console.error("Failed to update job:", error);
    }
  };

  return (
    <main className={styles.container}>
      {statuses.map((status) => (
        <section
          key={status}
          className={`${styles.column } ${styles[status]} ${styles.dragover}`}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => handleDrop(e, status)}
          onDragEnter={(e) => e.currentTarget.classList.add(styles.activeColumn)}
          onDragLeave={(e) => e.currentTarget.classList.remove(styles.activeColumn)}

        >
          <h2 >{status}</h2>

          {jobList
            .filter((job) => job.status === status)
            .map((job) => (
              <div
                key={job._id}
                className={`${styles.JobCard} ${draggingId === job._id ? styles.dragging : ""} `}
              >
                 <div
                    className={styles.dragHandle}
                    draggable
                    onDragStart={(e) => handleDragStart(e, job._id)}
                    onDragEnd={handleDragEnd}
                  >
                    ⠿
                </div>
                  <Link to={`/jobs/${job._id}`} state={{ backgroundLocation: location }} >
                    <p className={styles.position}>{job.position}</p>
                    <p className={styles.employer}>{job.employer}</p>
                    <p className={styles.salary}>£ {job.salary}</p>

                  </Link>
                </div>
            ))}
        </section>
      ))}
    </main>
  );
};

export default JobCards;
