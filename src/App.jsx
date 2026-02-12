
import { useContext, useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router";

import NavBar from "./components/NavBar/NavBar";
import SignUpForm from "./components/SignUpForm/SignUpForm";
import SignInForm from "./components/SignInForm/SignInForm";
import Landing from "./components/Landing/Landing";
import Dashboard from "./components/Dashboard/Dashboard";
import JobCards from "./components/JobCards/JobCards";
import JobCardDetails from "./components/JobCardDetails/JobCardDetails";
import JobForm from"./components/JobForm/JobForm"; 

import { UserContext } from "./contexts/UserContext";

import * as jobService from './services/jobService';


const App = () => {


  const {user} = useContext(UserContext);

  const [jobs, setJobs] = useState([]);


  const navigate = useNavigate();


  useEffect (() => {
    const fetchAllJobs = async () => {
      const jobsData = await jobService.index();
      // console.log('Jobs Data:', jobsData);
      setJobs(jobsData);
    };

    if (user) fetchAllJobs();
  }, [user]);
  
  const handleAddJob = async (jobFormData)=>{
    const newJob = await jobService.create(jobFormData)
    setJobs([newJob, ...jobs])
    navigate('/jobs')
  }



const handleDeleteJob = async (jobId) => {
  const deletedJob = await jobService.deleteJob(jobId)
  setJobs(jobs.filter((job)=> job._id !== deletedJob._id));
  navigate('/jobs')
};


const handleUpdateJob = async (jobId, jobFormData)=>{
   const updatedJob = await jobService.update(jobId, jobFormData);
   setJobs(jobs.map((job) => (jobId === job._id ? updatedJob : job)));
   navigate(`/jobs/${jobId}`)

}

  return (
    <>
       {user && <NavBar/>  } 
      <Routes>
        <>
        <Route path='/' element={user ? <Dashboard />  : <Landing />} />
        </>
        {user ? (
          <>
          
            <Route path='/jobs' element={< JobCards jobs={jobs} />} />
            <Route path='/jobs/:jobId' element={<JobCardDetails handleDeleteJob={handleDeleteJob} />} />
            <Route path='/jobs/new' element={< JobForm handleAddJob={handleAddJob}  />} />
            <Route path='/jobs/:jobId/edit' element={< JobForm handleUpdateJob={handleUpdateJob} />} />
          </>
        ) : (
          <>
            <Route path='/sign-up' element={<SignUpForm />} />
            <Route path='/sign-in' element={<SignInForm />} />
          </>
        )}
      </Routes>
    </>
  );
};

export default App;