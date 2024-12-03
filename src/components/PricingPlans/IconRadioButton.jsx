import React from 'react';
import './IconRadioButton.css'; 

const IconRadioButton = ({ options, selectedCoin, onCoinChangeHandler }) => {
  return (
    <div className="icon-radio-group">
      {options.map((option) => (
        <div
          key={option.value}
          className={`icon-radio-button ${selectedCoin === option.value ? 'selected' : ''} ${option.label === 'TCAT' ? 'disabled' : ''}`}
          onClick={
            () => {
              if (option.label !== 'TCAT') {
                onCoinChangeHandler(option.value);
              }
            }
          }
        >
          {/* Always display the icon */}
          <img src={option.icon} alt={option.label} />
          <p>{option.label === 'TCAT' ? `🛠 ${option.label} to come 🛠️`:option.label}</p>
        </div>
      ))}
    </div>
  );
};

export default IconRadioButton;
