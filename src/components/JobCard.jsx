


const JobCard = ({ jobs }) => {

    return (
        <>
            <div>
                {jobs.map(job => (
                    <div key={job.jdUid}>
                        <h3>{job.jobRole}</h3>
                        <p>{job.companyName}</p>
                        <p>{job.location}</p>
                        <p>{job.jobDetailsFromCompany}</p>
                        <button>Apply</button>
                    </div>
                ))}
            </div>
        </>
    )
}

export default JobCard;