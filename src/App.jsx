
import { useContext, useState, useEffect } from "react";
import { Routes, Route } from "react-router";

import NavBar from "./components/NavBar/NavBar";
import SignUpForm from "./components/SignUpForm/SignUpForm";
import SignInForm from "./components/SignInForm/SignInForm";
import Landing from "./components/Landing/Landing";
import Dashboard from "./components/Dashboard/Dashboard";
import JobCard from "./components/JobCard/JobCard";

import { UserContext } from "./contexts/UserContext";

import * as jobService from './services/jobService';


const App = () => {

  const {user} = useContext(UserContext);

  const [jobs, setJobs] = useState([]);

  useEffect (() => {
    const fetchAllJobs = async () => {
      const jobsData = await jobService.index();
      // console.log('Jobs Data:', jobsData);
      setJobs(jobsData);
    };

    if (user) fetchAllJobs();
  }, [user]);
  
  return (
    <>
      <NavBar/>
      <Routes>
        <Route path='/' element={user ? <Dashboard /> : <Landing />} />
        {user ? (
          <>
            <Route path='/jobs' element={< JobCard jobs={jobs} />} />
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