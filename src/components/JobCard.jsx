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
                    {/* Shimmer if image takes time to load */}
                    {!imageLoaded && <Shimmer />}
                </div>
                <div className='job-info-container'>
                    {job.companyName && <h3>{job.companyName}</h3>}
                    {job.jobRole && <h2>{job.jobRole}</h2>}
                    {job.location && <p>{job.location}</p>}
                </div>
            </div>

            <div style={{ marginTop: "8px" }}>
                {(job.minJdSalary || job.maxJdSalary) &&
                    <p className='card-salary'>
                        Estimated Salary: ₹{job.minJdSalary}{job.minJdSalary && job.maxJdSalary && " - "}{job.maxJdSalary} LPA
                        <span aria-label="Offered salary range"> ✅</span>
                    </p>
                }
                {job.jobDetailsFromCompany && (
                    <>
                        <div className='job-card-about-company'>
                            About Company:
                        </div>
                        <div className='job-card-about-us'>
                            About us
                        </div>
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
                    </>
                )}
                {showFullDescription && (
                    <div className="view-less" onClick={toggleDescription}>
                        View Less
                    </div>
                )}
                <div className='experience-blog' style={{ height: "3rem" }}>
                    {job.minExp &&
                        <div>
                            <h3>
                                Minimum Experience
                            </h3>
                            <h2>
                                {job.minExp}
                            </h2>
                        </div>
                    }
                </div>
            </div>
            <button className='job-apply-btn'>⚡ Easy Apply</button>
        </div>
    );
}

export default JobCard;