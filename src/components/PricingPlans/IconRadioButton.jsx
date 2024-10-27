import React from 'react';
import './IconRadioButton.css'; 

const IconRadioButton = ({ options, selectedCoin, onCoinChangeHandler }) => {
  return (
    <div className="icon-radio-group">
      {options.map((option) => (
        <div
          key={option.value}
          className={`icon-radio-button ${selectedCoin === option.value ? 'selected' : ''}`}
          onClick={
            () => onCoinChangeHandler(option.value)
          }
        >
          {/* Always display the icon */}
          <img src={option.icon} alt={option.label} />
          <p>{option.label}</p>
        </div>
      ))}
    </div>
  );
};

export default IconRadioButton;
