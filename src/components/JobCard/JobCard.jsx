import { Link } from 'react-router';

const JobCard = (props) => {
    console.log("Jobs-props:", props);

    return (
        <main>
            {props.jobs.map((job) => (

                <Link key={job._id} to={`/jobs/${job._id}`}>
                    {job.position}
                </Link>
            ))}
        </main>      
    );
};

export default JobCard;