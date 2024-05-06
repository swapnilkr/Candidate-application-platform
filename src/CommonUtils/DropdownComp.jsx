import React, { useState } from 'react';
import './dropdown.css';
import CancelIcon from '@mui/icons-material/Cancel';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

// Common custom dropdown
const CustomDropdown = ({ label, options, onSelect, isOpen, toggleDropdown, initialValue }) => {
    const [selectedOption, setSelectedOption] = useState(initialValue || '');

    const handleOptionClick = (option) => {
        setSelectedOption(option);
        onSelect(option);
        toggleDropdown();
    };

    return (
        <div className="custom-dropdown">
            <div className="selected-option" onClick={toggleDropdown} style={{width : `${label === 'Roles' || label === 'Remote'? '5rem' : ''}`}}>
                {selectedOption?.label || `${label}`}
                {selectedOption ? <span onClick={() => handleOptionClick('')}><CancelIcon /></span> : ''}
                <div><ExpandMoreIcon /></div>
            </div>
            {isOpen && (
                <div className="dropdown-options">
                    {options.map((option, index) => (
                        <div key={index} className="option" onClick={() => handleOptionClick(option)}>
                            {option.label}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CustomDropdown;
