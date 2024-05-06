import * as types from './types';

const initialState = {
    jobs: [], // Storing all fetched jobs
    filteredJobs: [], // Storing jobs after applying filters
    loading: false,
    error: null,
    filters: {}, // Storing applied filters
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case types.FETCH_JOBS_SUCCESS:
            console.log(action)
            return {
                ...state,
                jobs: [...state.jobs, ...action?.payload],
                loading: false,
                error: null,
            };
        case types.FETCH_JOBS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case types.APPLY_FILTERS:

            let filteredJobs = state.jobs.filter(job => {
                return (
                    (!action.payload.role || job.jobRole === action.payload.role) &&
                    (!action.payload.employees || job.employees === action.payload.employees) &&
                    (!action.payload.experience || (job.minExp <= action.payload.experience)) &&
                    (!action.payload.minSalary || job.minJdSalary >= action.payload.minSalary) &&
                    (!action.payload.companyName || job.companyName.toLowerCase().includes(action.payload.companyName.toLowerCase()))
                );
            });

            if (action.payload.remote) {
                if (action.payload.remote === 'hybrid') {
                    filteredJobs = filteredJobs.filter(job => job.location.toLowerCase().includes('hybrid'));
                } else if (action.payload.remote === 'in_office') {
                    filteredJobs = filteredJobs.filter(job => !job.location.toLowerCase().includes('remote') && !job.location.toLowerCase().includes('hybrid'));
                } else if (action.payload.remote === 'remote') {
                    filteredJobs = filteredJobs.filter(job => job.location.toLowerCase().includes('remote') && !job.location.toLowerCase().includes('hybrid'));
                }
            }

            return {
                ...state,
                filteredJobs,
                filters: action.payload,
            };

        default:
            return state;
    }
};

export default reducer;
