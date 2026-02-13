import { useParams, Link } from "react-router";
import { useState, useEffect, useContext } from "react";
import * as jobService from "../../services/jobService";
import NoteForm from "../NoteForm/NoteForm"

import { UserContext } from "../../contexts/UserContext";

import styles from './JobCardDetails.module.css'

// className={styles.}
// <> </>

const JobCardDetails = (props) => {
    const { jobId } = useParams();
    const [job, setJob] = useState(null);
    

    useEffect(() => {
        
        const fetchJob = async () => {
            const jobData = await jobService.show(jobId);
            setJob(jobData);
        };

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

  const handleDeleteNote = async (noteId) => {
    console.log('noteId:', noteId);
    const deletedNote = await jobService.deleteNote(jobId, noteId)
    setJob({...job, notes: job.notes.filter((note) => note._id !== noteId),});
  };


    return (
       

        <main className={styles.container} >  
            <section className={styles.info} >
                <header>
                    <button ><Link to={`/jobs/${jobId}/edit`} >Edit Job Card</Link></button>


                    <h2>Position: {job.position.toUpperCase()}</h2>
                    <h3 className="subheading">Company: {job.companyName}</h3>
                    <h3 className="subheading">Type: {job.workArrangement}</h3>
                    <h3 className="subheading">Location: {job.workArrangement !== "Remote" ? job.location : "N/A"} </h3>
                    <h3 className="subheading">Salary: £{job.salary}</h3>

                    <p>Job Type: {job.jobType}</p>
                    <p>Employer: {job.employer}</p>

                    {/* <textarea placeholder="Add Job Description"></textarea> */}
                    <p>Job Description: {job.description}</p>

                    <button onClick={()=> props.handleDeleteJob(jobId)} >Delete Job Card</button>
                </header>
            </section>

            <section className={styles.notes} >
                <NoteForm  handleAddNote={handleAddNote}/>

              {job.notes.length === 0
                     ? (<p>There are no notes.</p>
                ):(
                     job.notes.map((note) => (
                    <article key={note._id}>
                        <div>
                            <button onClick={() => handleDeleteNote(note._id)}> Delete </button>
                            <p>{note.text}</p>
                        <p> {`Added on ${new Date(note.createdAt).toLocaleDateString()}`} </p>
                        </div>
                        
                    </article>
        )))
    }  
            </section>
        </main>
    );
};

export default JobCardDetails;