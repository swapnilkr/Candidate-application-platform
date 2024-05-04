import * as types from './types';

export const fetchJobsSuccess = (jobs) => ({
    type: types.FETCH_JOBS_SUCCESS,
    payload: jobs,
});

export const fetchJobsFailure = (error) => ({
    type: types.FETCH_JOBS_FAILURE,
    payload: error,
});

export const applyFilters = (filters) => ({
    type: types.APPLY_FILTERS,
    payload: filters,
});

export const clearFilters = () => ({
    type: types.CLEAR_FILTERS,
});

export const loadMoreJobs = () => ({
    type: types.LOAD_MORE_JOBS,
});
