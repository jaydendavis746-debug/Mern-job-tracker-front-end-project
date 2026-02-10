


import { Link } from 'react-router';


const JobCards = (props) =>{

    console.log(props)

    return (
            <main>
                {props.jobs.map((job)=>(

                <Link key={job._id} to={`/jobs/${job._id}`}> {job.position} </Link>

                ))
            
                    }
            </main>
                

    )
}


export default JobCards;