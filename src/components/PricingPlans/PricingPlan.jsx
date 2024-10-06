import React, { useState } from 'react';
import PropTypes from 'prop-types';
import IconRadioButton from './IconRadioButton';
import tonIconLight from '../../assets/ton-ico.png';
import tcatIcon from '../../assets/tcat-ico.png';

const PricingPlan = ({ planType, price, detail, iconSrc, description, discount, buttonText }) => {
  const [selectedCoin, setSelectedCoin] = useState('TON');

  const onCoinChangeHandler = (coin) => {
    setSelectedCoin(coin);
  };

  const discountedPrice = (price - (discount / 100 * price)).toFixed(2);

  return (
    <div className={`${planType.toLowerCase()} box`}>
      <h2 className="title">{planType}</h2>
      
      <div className="view">
        {/* Icon Section */}
        <div className="icon">
          <img src={iconSrc} alt={`${planType} icon`} />
        </div>

        {/* Pricing Section */}
        <div className="cost">
          {discount > 0 && (
            <div className="discount-section">
              <div className="discount-percentage">{discount}% OFF</div>
              <div className="old-price">${price}</div>
            </div>
          )}
          <div className="new-price-section">
            <div className="new-price">${discount > 0 ? discountedPrice : price}</div>
            <div className="per-month">per month</div>
          </div>
        </div>
      </div>

      {/* Radio Button Selection for Coin Type */}
      <div className="coin-selection">
        <IconRadioButton
          options={[
            { label: 'TON', value: 'TON', icon: tonIconLight },
            { label: 'TCAT', value: 'TCAT', icon: tcatIcon },
          ]}
          selectedCoin={selectedCoin}
          onChange={onCoinChangeHandler}
        />
      </div>

      {/* Plan Description */}
      <div className="description">
        <ul>
          {description.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>

      {/* Button */}
      <div className="button">
        <button type="submit">{buttonText}</button>
      </div>
    </div>
  );
};

PricingPlan.propTypes = {
  planType: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  detail: PropTypes.string.isRequired,
  iconSrc: PropTypes.string.isRequired,
  description: PropTypes.arrayOf(PropTypes.string).isRequired,
  discount: PropTypes.number, // Discount can be null/optional
  buttonText: PropTypes.string.isRequired,
};

export default PricingPlan;
