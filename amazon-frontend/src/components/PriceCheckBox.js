import { FormControlLabel, Radio, RadioGroup } from '@material-ui/core';
import React, { useState } from 'react';
import "../styles/PriceCheckBox.css";

const PriceCheckBox = (props) => {
    const [value, setValue] = useState('0'); // Stores selected value

    const handleToggle = (value) => {
        setValue(value);  // Update selected value
        props.handleFilters(value);  // Pass selected value to parent component
    };

    return (
        <div className="price-range-container">
            {props.list.map((price, index) => (
                <span className="price-range-checkbox" key={index}>
                    <RadioGroup
                        name="customized-radios"
                        value={value}  // Use value to control selected radio button
                        onChange={() => handleToggle(price.id)}  // Handle value change
                    >
                        <FormControlLabel
                            value={price.id}  // Set value to match the selected one
                            control={<Radio />} 
                            label={price.name} 
                        />
                    </RadioGroup>
                </span>
            ))}
        </div>
    );
};

export default PriceCheckBox;
