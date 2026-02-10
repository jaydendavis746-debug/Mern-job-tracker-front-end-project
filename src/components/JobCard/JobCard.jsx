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
                    <button onClick="">Edit</button>

{/* <label> used for accessiblity when using a dropdown menu */}
                    <label for="status">Status:</label>
                    <select name="status">
                        <option value="Applied">Applied</option>
                        <option value="Interviewing">Interviewing</option>
                        <option value="Offer">Offer</option>
                        <option value="Rejected">Rejected</option>
                        <option value="Prospective" selected>Prospective</option>
                    </select>

                    <h2>Position: {job.position.toUpperCase()}</h2>
                    <h3 className="subheading">Company: {job.companyName}</h3>
                    <h3 className="subheading">Type: {job.workArrangement}</h3>
                    <h3 className="subheading">Location: {job.workArrangement !== "Remote" ? job.location : "N/A"} </h3>
                    <h3 className="subheading">Salary: £{job.salary}/year, approximately €{job.salary * 1.15}/year</h3>

                    <p>Job Type: {job.jobType}</p>
                    <p>Employer: {job.employer}</p>

                    <textarea placeholder="Add Job Description"></textarea>

                    <button onClick="">Delete</button>
                </header>
            </section>
            {/* Below are Notes */}
            <section>
                <h4>Notes:</h4>
                {!job.notes.length && <p>There are no notes.</p>}
                {job.notes.map((note) => (
                    <article key={note._id}>
                        <div>
                            <p>
                                {`Added on ${new Date(note.createdAt).toLocaleDateString()}`}
                            </p>
                        </div>
                        <p>{note.text}</p>
                    </article>
        ))}
                <textarea placeholder="Add Notes"></textarea>
            </section>
        </main>
    );
};

export default JobCard;