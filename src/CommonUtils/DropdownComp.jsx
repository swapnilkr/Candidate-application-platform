import React, { useState } from 'react';
import './dropdown.css';

const CustomDropdown = ({ label, options, onSelect, isOpen, toggleDropdown, initialValue }) => {
    const [selectedOption, setSelectedOption] = useState(initialValue || '');

    const handleOptionClick = (option) => {
        setSelectedOption(option);
        onSelect(option);
        toggleDropdown();
    };

    return (
        <div className="custom-dropdown">
            <div className="selected-option" onClick={toggleDropdown}>
                {selectedOption || `Select ${label}`}
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
