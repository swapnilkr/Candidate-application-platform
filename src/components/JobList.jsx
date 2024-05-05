import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import fetchJobs from '../services/api';
import JobCard from './JobCard';
import './jobList.css'

const JobList = () => {

    const dispatch = useDispatch();
    const jobs = useSelector(state => state.jobs);
    const filteredJobs = useSelector(state => state.filteredJobs);

    const [offset, setOffset] = useState(0);
    const [loading, setLoading] = useState(false);

    const loadMoreJobs = async () => {
        setLoading(true);
        try {

            const data = await fetchJobs(10, offset);
            dispatch({ type: 'FETCH_JOBS_SUCCESS', payload: data.jobs });
            setOffset(prevOffset => prevOffset + 10);

        } catch (error) {
            console.error(error);
        }
        setLoading(false);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleScroll = () => {
        if (
            window.innerHeight + document.documentElement.scrollTop ===
            document.documentElement.offsetHeight
        ) {
            loadMoreJobs();
        }
    };

    useEffect(() => {
        async function abc() {
            const data = await fetchJobs(10, 0);
            console.log(data)
            dispatch({ type: 'FETCH_JOBS_SUCCESS', payload: data.jdList });
            setOffset(prevOffset => prevOffset + 10);
        }
        abc()
    }, [])
    return (
        <div>
            <h2>Job Listings</h2>
            <div className='job-card-container'>
                {jobs.map((job, index) => (
                    <JobCard job={job} index={index} />
                ))}
            </div>
            {loading && <p>Loading...</p>}
        </div>
    );
};

export default JobList;
