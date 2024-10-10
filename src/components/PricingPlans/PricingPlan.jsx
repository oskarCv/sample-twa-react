import React, { useState } from 'react';
import { TonConnectUI, useTonConnectUI } from "@tonconnect/ui-react";
import { useTonConnect } from '../../hooks/useTonConnect';
import {getAllWalletTransactions, getTransactionDetails} from '../../apis/api';
import { convertUTime } from '../../utils/timeHelpers';
import PropTypes from 'prop-types';
import IconRadioButton from './IconRadioButton';
import tonIconLight from '../../assets/ton-ico.png';
import tcatIcon from '../../assets/tcat-ico.png';
import { COINS_CONSTANTS } from '../../constants';

const PricingPlan = ({ planType, price,months, detail, iconSrc, description, discount, buttonText, tonPrice, tcatPrice }) => {
  const [tonConnectUI] = useTonConnectUI();
  const [selectedCoin, setSelectedCoin] = useState(COINS_CONSTANTS.TON); // Default TON selected
  const { wallet, sender } = useTonConnect();

  const dollar = 10000000;
  // const playAmount = 0.001;
  console.log('Wallet connected: -> ', wallet);

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

    const transaction = {
      // this should be dolar * equivalent coin price
      messages: [{
          address: "UQB5diORt6LZ8WT7ZkfigqWUtfWJ1yJTR3TvTG-wXhesveu6",
          amount: dollar
      }]
  };

  const paySubscription = async () => await tonConnectUI.sendTransaction(transaction);

  const fetchTransactions = async (wallet) => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 30000)); // Delay for 30 seconds
    
        const response = await getAllWalletTransactions(wallet);
        const lastTransactionUtime = response.data.transactions[0].now;
        const lastTransactionDate = convertUTime(lastTransactionUtime);
        const lastTransactionTraceId = response.data.transactions[0].trace_id;
        const lastTransactionHash = response.data.transactions[0].hash;
    
        console.log('last transaction Fetched utime:', response.data.transactions[0]);
        console.log('last transaction Fetched utime:', lastTransactionUtime);
        console.log('last transaction Fetched date from utime:', lastTransactionDate);
        console.log('last transaction Fetched trace_id:', lastTransactionTraceId);
        console.log('last transaction Fetched hash:', lastTransactionHash);
    
        // const detailsResponse = await getTransactionDetails(lastTransactionHash);
        // console.log('Transaction details >>>>', detailsResponse);
    
        return response.data;
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
  };

  const fetchTransactionDetail = async (transactions) => {
    try {
      // Get the hash of the last transaction
      const lastTransactionHash = transactions.transactions[0].hash;
  
      // Fetch transaction details asynchronously
      const sanitizedTransactionHash = encodeURIComponent(lastTransactionHash);
      const detailsResponse = await getTransactionDetails(sanitizedTransactionHash);
      
      return detailsResponse.data; // Return the transaction details
    } catch (error) {
      console.error('Error fetching transaction details:', error);
    }
  };

  const subscriptionHandler = async() => {
    console.log('>>>> Subscription starts !!!!');
    console.log('amount to transfer >> ', equivalentCoinPrice);
    const subscribed = await paySubscription(); //fix this to handle other coins, for now is only going to ton
    console.log('===> ', subscribed);

    if (wallet) {
      console.log('Calling get Transactions !!!', wallet);
      const transactions = await fetchTransactions(wallet);
      console.log('Transaction >>>>> ',transactions);

      const transactionDetails = await fetchTransactionDetail(transactions);
      console.log('details >>>> ', transactionDetails);
      // Optionally handle the transactions here, e.g., set in state
    }

  }

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
            <div className="per-month">{`${months === 1 ? 'per month' : `${months} months`}`}</div>
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
      <div className='equivalence-coin-container'>
        {selectedCoin === COINS_CONSTANTS.TON ? (
          <img src={tonIconLight} alt="TON" className="coin-icon" />
        ) : (
          <img src={tcatIcon} alt="TCAT" className="coin-icon" />
        )}
        <strong className={`${selectedCoin === COINS_CONSTANTS.TON ? 'equivalence-coin-ton' : 'equivalence-coin-tcat'}`}>{equivalentCoinPrice}</strong>
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
        <button type="submit" onClick={() => subscriptionHandler()}>{buttonText}</button>
      </div>
      <div>
        {/* <TransactionDetails walletAddress={wallet}/> */}
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
