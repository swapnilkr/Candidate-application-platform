import React, { useEffect} from 'react';
import DropdownComp from '../CommonUtils/DropdownComp';
import { useSelector, useDispatch } from 'react-redux';
import { applyFilters } from '../redux/actions';

const Filters = () => {
    const roleOptions = [
        { label: 'Engineering: Frontend', value: 'frontend' },
        { label: 'Engineering: Backend', value: 'backend' },
        { label: 'Engineering: iOS Flutter', value: 'ios_flutter' },
        { label: 'Design: UI/UX', value: 'ui_ux' },
        { label: 'HR', value: 'hr' },
    ];

    const employeeOptions = [
        { label: '1-10', value: '1-10' },
        { label: '11-20', value: '11-20' },
        { label: '21-30', value: '21-30' },
    ];

    const experienceOptions = [
        { label: '1 year', value: '1' },
        { label: '2 years', value: '2' },
        { label: '3 years', value: '3' },
    ];

    const remoteOptions = [
        { label: 'Hybrid', value: 'hybrid' },
        { label: 'In-office', value: 'in_office' },
        { label: 'WFH', value: 'wfh' },
    ];

    const salaryOptions = [
        { label: '0L', value: '0' },
        { label: '10L', value: '10' },
        { label: '20L', value: '20' },
    ];

    const dispatch = useDispatch();
    const filters = useSelector(state => state.filters);

    useEffect(() => {
        dispatch(applyFilters(filters));
    }, [dispatch, filters]);

    return (
        <div>
            <DropdownComp label="Role" options={roleOptions} onChange={value => dispatch({ type: 'APPLY_FILTERS', payload: { role: value } })} />
            <DropdownComp label="Employees" options={employeeOptions} onChange={value => dispatch({ type: 'APPLY_FILTERS', payload: { employees: value } })} />
            <DropdownComp label="Experience" options={experienceOptions} onChange={value => dispatch({ type: 'APPLY_FILTERS', payload: { experience: value } })} />
            <DropdownComp label="Remote" options={remoteOptions} onChange={value => dispatch({ type: 'APPLY_FILTERS', payload: { remote: value } })} />
            <DropdownComp label="Min Salary" options={salaryOptions} onChange={value => dispatch({ type: 'APPLY_FILTERS', payload: { minSalary: value } })} />
            <div>
                <label>Search Company Name</label>
                <input type="text" onChange={e => dispatch({ type: 'APPLY_FILTERS', payload: { companyName: e.target.value } })} />
            </div>
        </div>
    );
};

export default Filters;
