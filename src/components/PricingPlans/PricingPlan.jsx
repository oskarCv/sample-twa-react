import React, { useState } from 'react';
import PropTypes from 'prop-types';
import IconRadioButton from './IconRadioButton';
import tonIconLight from '../../assets/ton-ico.png';
import tcatIcon from '../../assets/tcat-ico.png';
import { COINS_CONSTANTS } from '../../constants';

const PricingPlan = ({ planType, price, detail, iconSrc, description, discount, buttonText, tonPrice, tcatPrice }) => {
  const [selectedCoin, setSelectedCoin] = useState(COINS_CONSTANTS.TON); // Default TON selected

  const onCoinChangeHandler = (coin) => {
    setSelectedCoin(coin);
  };

  // Calculate discounted price if applicable
  const discountedPrice = (price - (discount / 100 * price)).toFixed(2);
  const finalPrice = discount > 0 ? discountedPrice : price;

  // Ensure the correct calculation happens when state changes
  const equivalentCoinPrice = selectedCoin === COINS_CONSTANTS.TON 
    ? (finalPrice / tonPrice).toFixed(4) 
    : (finalPrice / tcatPrice).toFixed(4);

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
            <div className="new-price">${finalPrice}</div>
            <div className="per-month">per month</div>
          </div>
        </div>
      </div>

      {/* Radio Button Selection for Coin Type */}
      <div className="coin-selection">
        <IconRadioButton
          options={[
            { label: 'TON', value: COINS_CONSTANTS.TON, icon: tonIconLight },
            { label: 'TCAT', value: COINS_CONSTANTS.TCAT, icon: tcatIcon },
          ]}
          selectedCoin={selectedCoin}
          onChange={onCoinChangeHandler}
        />
      </div>

      {/* Display the equivalent price in the selected coin */}
      <div className="equivalence-coin-price">
        <p>
          {selectedCoin}: <strong>{equivalentCoinPrice} {selectedCoin}</strong>
        </p>
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
  price: PropTypes.number.isRequired, // Ensure price is a number
  detail: PropTypes.string.isRequired,
  iconSrc: PropTypes.string.isRequired,
  description: PropTypes.arrayOf(PropTypes.string).isRequired,
  discount: PropTypes.number, // Discount can be null/optional
  buttonText: PropTypes.string.isRequired,
  tonPrice: PropTypes.number.isRequired, // Ensure tonPrice is a number
  tcatPrice: PropTypes.number.isRequired, // Ensure tcatPrice is a number
};

export default PricingPlan;
