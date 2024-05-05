import React, { useState } from 'react';
import CustomDropdown from '../CommonUtils/DropdownComp';
import { useSelector, useDispatch } from 'react-redux';
import './filters.css'

const Filters = () => {
    const dispatch = useDispatch();
    const filters = useSelector(state => state.filters);
    const [openDropdown, setOpenDropdown] = useState('');

    const toggleDropdown = (dropdownName) => {
        setOpenDropdown(openDropdown === dropdownName ? '' : dropdownName);
    };

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

    const handleRoleChange = (value) => {
        dispatch({ type: 'APPLY_FILTERS', payload: { role: value } });
    };

    const handleEmployeeChange = (value) => {
        dispatch({ type: 'APPLY_FILTERS', payload: { employees: value } });
    };

    const handleExperienceChange = (value) => {
        dispatch({ type: 'APPLY_FILTERS', payload: { experience: value } });
    };

    const handleRemoteChange = (value) => {
        dispatch({ type: 'APPLY_FILTERS', payload: { remote: value } });
    };

    const handleSalaryChange = (value) => {
        dispatch({ type: 'APPLY_FILTERS', payload: { minSalary: value } });
    };

    return (
        <div className="filters-container"> {/* Apply container class for styling */}
            <CustomDropdown
                label="Role"
                options={roleOptions}
                onSelect={handleRoleChange}
                isOpen={openDropdown === 'Role'}
                toggleDropdown={() => toggleDropdown('Role')}
                initialValue={filters.role} />
            <CustomDropdown
                label="Employees"
                options={employeeOptions}
                onSelect={handleEmployeeChange}
                isOpen={openDropdown === 'Employees'}
                toggleDropdown={() => toggleDropdown('Employees')}
                initialValue={filters.employees} />
            <CustomDropdown
                label="Experience"
                options={experienceOptions}
                onSelect={handleExperienceChange}
                isOpen={openDropdown === 'Experience'}
                toggleDropdown={() => toggleDropdown('Experience')}
                initialValue={filters.experience} />
            <CustomDropdown
                label="Remote"
                options={remoteOptions}
                onSelect={handleRemoteChange}
                isOpen={openDropdown === 'Remote'}
                toggleDropdown={() => toggleDropdown('Remote')}
                initialValue={filters.remote}
            />
            <CustomDropdown
                label="Min Salary"
                options={salaryOptions}
                onSelect={handleSalaryChange}
                isOpen={openDropdown === 'Min Salary'}
                toggleDropdown={() => toggleDropdown('Min Salary')}
                initialValue={filters.minSalary} />
            <div className="company-name-container"> {/* Apply container class for styling */}
                <label>Search Company Name</label>
                <input type="text" onChange={e => dispatch({ type: 'APPLY_FILTERS', payload: { companyName: e.target.value } })} />
            </div>
        </div>
    );
};

export default Filters;
