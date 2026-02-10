import { useParams } from "react-router";
import { useState, useEffect } from "react";
import * as jobService from "../../services/jobService";

const JobCard = () => {
    const { jobId } = useParams();
    const [job, setJob] = useState(null);

    console.log("Job Id:", jobId);

    useEffect(() => {
        
        const fetchJob = async () => {
            const jobData = await jobService.show(jobId);
            setJob(jobData);
        };

        fetchJob();
    }, [jobId]);

    console.log("Job state:", job);
    
    if (!job) return (
        <main>Loading...</main>
    );

    //! Form is a work in progress

    return (
        // <main>Job Card</main>
        <main>
            <section>
                <header>
                    <button>Edit:</button>

                    <select>
                        <option value="Applied">Applied</option>
                        <option value="Interviewing">Interviewing</option>
                        <option value="Offer">Offer</option>
                        <option value="Rejected">Rejected</option>
                        <option value="Prospective">Prospective</option>
                    </select>

                    <h2>{job.position.toUpperCase()}</h2>
                    <h3 className="subheading">Company: {job.companyName}</h3>
                    <h3 className="subheading">Type: {job.workArrangement}</h3>
                    <h3 className="subheading">Location: {job.workArrangement !== "Remote" ? job.location : "N/A"} </h3>
                    <h3 className="subheading">Salary: {job.salary}</h3>

                    <p>Job Type:</p>
                    <p>Employer: </p>

                    <button>Delete: </button>
                </header>
            </section>
            <section>
                <p><textarea>
                    Add Notes:
                </textarea></p>
            </section>
        </main>
    );
};

export default JobCard;