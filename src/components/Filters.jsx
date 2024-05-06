import React, { useState } from 'react';
import CustomDropdown from '../CommonUtils/DropdownComp';
import { useSelector, useDispatch } from 'react-redux';
import { roleOptions } from '../CommonUtils/roleOptions';
import { employeeOptions } from '../CommonUtils/employeeOptions';
import { experienceOptions } from '../CommonUtils/experienceOptions';
import { remoteOptions } from '../CommonUtils/remoteOptions';
import { salaryOptions } from '../CommonUtils/salaryOptions';
import './filters.css'

const Filters = () => {
    const dispatch = useDispatch();
    const filters = useSelector(state => state.filters);
    const [openDropdown, setOpenDropdown] = useState('');

    const toggleDropdown = (dropdownName) => {
        setOpenDropdown(openDropdown === dropdownName ? '' : dropdownName);
    };

    // Dispatching filter on applying
    const handleRoleChange = (select) => {
        dispatch({ type: 'APPLY_FILTERS', payload: { role: select?.value } });
    };

    const handleEmployeeChange = (select) => {
        dispatch({ type: 'APPLY_FILTERS', payload: { employees: select?.value } });
    };

    const handleExperienceChange = (select) => {
        dispatch({ type: 'APPLY_FILTERS', payload: { experience: select?.value } });
    };

    const handleRemoteChange = (select) => {
        dispatch({ type: 'APPLY_FILTERS', payload: { remote: select?.value } });
    };

    const handleSalaryChange = (select) => {
        dispatch({ type: 'APPLY_FILTERS', payload: { minSalary: select?.value } });
    };

    console.log(filters)
    return (
        <div className="filters-container">
            <CustomDropdown
                label="Roles"
                options={roleOptions}
                onSelect={handleRoleChange}
                isOpen={openDropdown === 'Role'}
                toggleDropdown={() => toggleDropdown('Role')}
                initialValue={filters.role} />
            <CustomDropdown
                label="Number of Employees"
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
                label="Minimum Base Pay Salary"
                options={salaryOptions}
                onSelect={handleSalaryChange}
                isOpen={openDropdown === 'Min Salary'}
                toggleDropdown={() => toggleDropdown('Min Salary')}
                initialValue={filters.minSalary} />
            <div className="company-name-container">
                <input
                    type="text"
                    onChange={e => dispatch({ type: 'APPLY_FILTERS', payload: { companyName: e.target.value } })}
                    placeholder='Search Company Name' />
            </div>
        </div>
    );
};

export default Filters;
