import * as types from './types';

const initialState = {
    jobs: [],
    filteredJobs: [],
    loading: false,
    error: null,
    filters: {},
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case types.FETCH_JOBS_SUCCESS:
            const newJobs = action.payload || [];
            const updatedJobs = [...state.jobs, ...newJobs];
            const filteredJobs = applyFilters(updatedJobs, state.filters);
            return { ...state, jobs: updatedJobs, filteredJobs, loading: false, error: null };

        case types.FETCH_JOBS_FAILURE:
            return { ...state, loading: false, error: action.payload };

        case types.APPLY_FILTERS:
            const newFilteredJobs = applyFilters(state.jobs, action.payload);
            return { ...state, filteredJobs: newFilteredJobs, filters: action.payload };

        default:
            return state;
    }
};

const applyFilters = (jobs, filters) => {
    return jobs.filter(job => {
        return (
            (!filters.role || job.jobRole === filters.role) &&
            (!filters.employees || job.employees === filters.employees) &&
            (!filters.experience || job.minExp <= filters.experience) &&
            (!filters.minSalary || job.minJdSalary >= filters.minSalary) &&
            (!filters.companyName || job.companyName.toLowerCase().includes(filters.companyName.toLowerCase())) &&
            (!filters.remote ||
                (filters.remote === 'hybrid' && job.location.toLowerCase().includes('hybrid')) ||
                (filters.remote === 'in_office' && !job.location.toLowerCase().includes('remote') && !job.location.toLowerCase().includes('hybrid')) ||
                (filters.remote === 'remote' && job.location.toLowerCase().includes('remote') && !job.location.toLowerCase().includes('hybrid')))
        );
    });
};

export default reducer;
