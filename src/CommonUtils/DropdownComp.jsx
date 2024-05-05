import React from 'react';

const DropdownComp = ({ label, options, onChange }) => {
    return (
        <div>
            <label>{label}</label>
            <select onChange={onChange}>
                <option value="">Select {label}</option>
                {options.map((option, index) => (
                    <option key={index} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default DropdownComp;
