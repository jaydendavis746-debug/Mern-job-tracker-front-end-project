import { Link } from 'react-router';

const JobCards = (props) => {
    console.log("Jobs-props:", props);

//! Wrapped a div around the card link to force vertical layout
    return (
        <main>
            {props.jobs.map((job) => (
                <div>
                    <Link key={job._id} to={`/jobs/${job._id}`}>
                        {job.position}
                    </Link>
                </div>
            ))}
        </main>      
    );
};

export default JobCards;