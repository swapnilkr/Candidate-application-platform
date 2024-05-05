import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import fetchJobs from '../services/api';
import JobCard from './JobCard';
import './jobList.css';

const JobList = () => {
    const dispatch = useDispatch();
    const jobs = useSelector(state => state.jobs);
    const filteredJobs = useSelector(state => state.filteredJobs);

    const [offset, setOffset] = useState(0);

    const loadMoreJobs = async () => {
        try {
            const data = await fetchJobs(9, offset + 1);
            dispatch({ type: 'FETCH_JOBS_SUCCESS', payload: data.jobs });
            setOffset(prevOffset => prevOffset + 1);
        } catch (error) {
            console.error(error);
        }
    };

    const loadMoreTrigger = useRef(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await fetchJobs(9, offset);
                dispatch({ type: 'FETCH_JOBS_SUCCESS', payload: data?.jdList });
                setOffset(prevOffset => prevOffset + 1);
            } catch (error) {
                console.error(error);
            }
        }
        fetchData();
    }, []);

    return (
        <div>
            <div className='job-card-container'>
                {filteredJobs.length > 0 ? (
                    filteredJobs.map((job, index) => (
                        <JobCard key={job.id} job={job} index={index} />
                    ))
                ) : (
                    jobs.map((job, index) => (
                        <JobCard key={job.id} job={job} index={index} />
                    ))
                )}
            </div>
        </div>
    );
};

export default JobList;
