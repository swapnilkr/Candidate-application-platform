import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import fetchJobs from '../services/api';
import JobCard from './JobCard';
import './jobList.css';

const JobList = () => {
    const dispatch = useDispatch();
    const jobs = useSelector(state => state.jobs);
    const filteredJobs = useSelector(state => state.filteredJobs);
    const filters = useSelector(state => state.filters);

    const [offset, setOffset] = useState(0);
    const [loading, setLoading] = useState(false);

    // load more jobs on infinte scroll by maintainig pagination
    const loadMoreJobs = async () => {
        try {
            setLoading(true);
            const data = await fetchJobs(9, offset);
            dispatch({ type: 'FETCH_JOBS_SUCCESS', payload: data?.jdList });
            setOffset(prevOffset => prevOffset + 1);
            setLoading(false);
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };

    const loadMoreTrigger = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            async (entries) => {
                if (entries[0].isIntersecting) {
                    try {
                        loadMoreJobs()
                    } catch (error) {
                        console.error(error);
                    } finally {
                        setLoading(false);
                    }
                }
            },
            { threshold: 0.1 }
        );

        if (loadMoreTrigger.current) {
            observer.observe(loadMoreTrigger.current);
        }

        return () => {
            if (loadMoreTrigger.current) {
                observer.unobserve(loadMoreTrigger.current);
            }
        };
    }, [loading, offset]);

    return (
        <div>
            <div className='job-card-container'>
                {Object.keys(filters)?.length > 0 ? (
                    filteredJobs.map((job, index) => (
                        <JobCard key={job.id} job={job} index={index} />
                    ))
                ) : (
                    jobs.map((job, index) => (
                        <JobCard key={job.id} job={job} index={index} />
                    ))
                )}
            </div>
            <div ref={loadMoreTrigger} style={{visibility:"hidden"}}>Loading</div>
        </div>
    );
};

export default JobList;
