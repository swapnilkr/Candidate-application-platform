import React, { useState } from 'react';
import './jobCard.css';
import Shimmer from '../CommonUtils/Shimmer';

const JobCard = ({ job, index }) => {
    const [imageLoaded, setImageLoaded] = useState(false);
    const [showFullDescription, setShowFullDescription] = useState(false);

    const toggleDescription = () => {
        setShowFullDescription(!showFullDescription);
    };

    const handleImageLoad = () => {
        setImageLoaded(true);
    }

    return (
        <div key={index} className='job-card'>
            <div style={{ display: "flex", gap: "0.5rem" }}>
                <div className='job-logo'>
                    {job?.logoUrl &&
                        <img
                            src={job?.logoUrl}
                            alt={job?.companyName}
                            onLoad={handleImageLoad}
                            onError={() => setImageLoaded(true)}
                            style={{ display: imageLoaded ? 'block' : 'none' }}
                        />
                    }
                    {!imageLoaded && <Shimmer />}
                </div>
                <div className='job-info-container'>
                    {job.companyName && <p>{job.companyName}</p>}
                    {job.jobRole && <p>{job.jobRole}</p>}
                    {job.location && <p>{job.location}</p>}
                </div>
            </div>

            <div style={{ marginTop: "0.5rem" }}>
                {(job.minJdSalary || job.maxJdSalary) &&
                    <p>
                        Estimated Salary: {job.minJdSalary}{job.minJdSalary && job.maxJdSalary && " - "}{job.maxJdSalary}
                    </p>
                }
                {job.jobDetailsFromCompany && (
                    <div>
                        <p className={!showFullDescription ? 'full-description' : ''}>
                            {job.jobDetailsFromCompany}
                        </p>
                        {!showFullDescription && (
                            <div className="view-more" onClick={toggleDescription}>
                                View More
                            </div>
                        )}
                    </div>
                )}
                {showFullDescription && (
                    <div className="view-less" onClick={toggleDescription}>
                        View Less
                    </div>
                )}
                {job.minExp &&
                    <div>
                        Minimum Experience
                        
                    </div>
                }
            </div>
            <button> Apply</button>
        </div>
    );
}

export default JobCard;