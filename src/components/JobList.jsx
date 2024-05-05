// src/components/JobList.js

import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import fetchJobs from '../services/api';

const JobList = () => {
    console.log("Qswap1")
    const dispatch = useDispatch();
    const jobs = useSelector(state => state.jobs);
    const filteredJobs = useSelector(state => state.filteredJobs);

    const [offset, setOffset] = useState(0);
    const [loading, setLoading] = useState(false);

    const loadMoreJobs = async () => {
        setLoading(true);
        try {
            console.log("qswap")
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
                {loading && <p>Loading...</p>}
            </div>
        </div>
    );
};

export default JobList;
