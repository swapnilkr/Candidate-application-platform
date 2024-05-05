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
                jobs: [...state.jobs, ...action.payload],
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

        const filteredJobs = state.jobs.filter(job => {

                return (
                    (!action.payload.role || job.jobRole === action.payload.role) &&
                    (!action.payload.employees || job.employees === action.payload.employees) &&
                    (!action.payload.experience || (job.minExp >= action.payload.experience && job.maxExp <= action.payload.experience)) &&
                    (!action.payload.remote || job.location.toLowerCase().includes('remote')) &&
                    (!action.payload.minSalary || job.minJdSalary >= action.payload.minSalary) &&
                    (!action.payload.companyName || job.companyName.toLowerCase().includes(action.payload.companyName.toLowerCase()))
                );
            });

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
