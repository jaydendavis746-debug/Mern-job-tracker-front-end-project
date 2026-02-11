import { useParams, Link } from "react-router";
import { useState, useEffect, useContext } from "react";
import * as jobService from "../../services/jobService";
import NoteForm from "../NoteForm/NoteForm"
import NotesList from "../NotesList/NotesList"

import { UserContext } from "../../contexts/UserContext";

const JobCardDetails = (props) => {
    const { jobId } = useParams();
    const [job, setJob] = useState(null);
    //console.log("Job Id:", jobId);


    

    useEffect(() => {
        
        const fetchJob = async () => {
            const jobData = await jobService.show(jobId);
            setJob(jobData);
        };+

        fetchJob();
    }, [jobId]);

    //console.log("Job state:", job);
    
    if (!job) return (
        <main>Loading...</main>
    );

  

  const handleAddNote = async (noteFormData) => {
    const newNote = await jobService.createNote(jobId, noteFormData)
    setJob({...job, notes: [...job.notes, newNote]})
  };

  const handleUpdateNote = (noteId, updatedData) => {
  setJob(prev => ({
    ...prev,
    notes: prev.notes.map(note =>
      note._id === noteId ? { ...note, ...updatedData } : note
    )
  }));
};


    return (
        // <main>Job Card</main>
        <main>
            <section>
                <header>
                    <button ><Link to={`/jobs/${jobId}/edit`} >Edit</Link></button>

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
                    <h3 className="subheading">Salary: £{job.salary} </h3>

                    <p>Job Type: {job.jobType}</p>
                    <p>Employer: {job.employer}</p>

                    <textarea placeholder="Add Job Description"></textarea>

                    <button onClick={()=> props.handleDeleteJob(jobId)} >Delete</button>
                </header>
            </section>
            {/* Below are Notes */}
            <section>
                <h4>Notes:</h4>
                <NoteForm  handleAddNote={handleAddNote}/>
                <NotesList notes={job.notes} handleUpdateNote={handleUpdateNote}/>

              {/* {job.notes.length === 0
                     ? (<p>There are no notes.</p>
                ):(
                     job.notes.map((note) => (
                    <article key={note._id}>
                        <div>
                            <p>
                                {`Added on ${new Date(note.createdAt).toLocaleDateString()}`}
                            </p>
                        </div>
                        <p>{note.text}</p>
                    </article>
        )))
    }   */}
            </section>
        </main>
    );
};

export default JobCardDetails;