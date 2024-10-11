import React, { useState } from "react";
import { TonConnectUI, useTonConnectUI } from "@tonconnect/ui-react";
import { useTonConnect } from "../../hooks/useTonConnect";
import { ToastContainer, toast } from "react-toastify"; // Importing toast components
import {
  getAllWalletTransactions,
  getTransactionDetails,
} from "../../apis/api";
import { convertUTime } from "../../utils/timeHelpers";
import PropTypes from "prop-types";
import IconRadioButton from "./IconRadioButton";
import tonIconLight from "../../assets/ton-ico.png";
import tcatIcon from "../../assets/tcat-ico.png";
import { COINS_CONSTANTS } from "../../constants";
import TelegramIdModal from "../TelegramIdModal";

import "react-toastify/dist/ReactToastify.css"; // Importing styles for toast notifications


const PricingPlan = ({
  planType,
  price,
  months,
  detail,
  iconSrc,
  description,
  discount,
  buttonText,
  tonPrice,
  tcatPrice,
}) => {
  const [tonConnectUI] = useTonConnectUI();
  const [selectedCoin, setSelectedCoin] = useState(COINS_CONSTANTS.TON); // Default TON selected
  const { wallet, sender } = useTonConnect();
  const [isTelegramPromptVisible, setIsTelegramPromptVisible] = useState(false);
  const [manualTelegramId, setManualTelegramId] = useState("");

  const dollar = 10000000;
  // const playAmount = 0.01;
  console.log("Wallet connected: -> ", wallet);

  const onCoinChangeHandler = (coin) => {
    setSelectedCoin(coin);
  };

  // Calculate discounted price if applicable
  const discountedPrice = (price - (discount / 100) * price).toFixed(2);
  const finalPrice = discount > 0 ? discountedPrice : price;

  // Ensures the correct calculation happens when state changes
  const equivalentCoinPrice =
    selectedCoin === COINS_CONSTANTS.TON
      ? (finalPrice / tonPrice).toFixed(4)
      : (finalPrice / tcatPrice).toFixed(4);

  const transaction = {
    // this should be dolar * equivalent coin price
    messages: [
      {
        address: "UQB5diORt6LZ8WT7ZkfigqWUtfWJ1yJTR3TvTG-wXhesveu6",
        amount: dollar,
      },
    ],
  };

  const paySubscription = async () =>
    await tonConnectUI.sendTransaction(transaction);

  const fetchTransactions = async (wallet) => {
    try {
      toast.info('Validating transaction :)', {autoClose:5000});
      // 5 seconds Delay to confirm transaction at ton chain
      await new Promise((resolve) => setTimeout(resolve, 5000)); 

      const response = await getAllWalletTransactions(wallet);
      const lastTransactionUtime = response.data.transactions[0].now;
      const lastTransactionDate = convertUTime(lastTransactionUtime);
      const lastTransactionTraceId = response.data.transactions[0].trace_id;
      const lastTransactionHash = response.data.transactions[0].hash;

      console.log(
        "last transaction Fetched utime:",
        response.data.transactions[0]
      );
      console.log("last transaction Fetched utime:", lastTransactionUtime);
      console.log(
        "last transaction Fetched date from utime:",
        lastTransactionDate
      );
      console.log("last transaction Fetched trace_id:", lastTransactionTraceId);
      console.log("last transaction Fetched hash:", lastTransactionHash);

      return response.data;
    } catch (error) {
      console.error("Error fetching transactions:", error);
      toast.error("Failed to fetch transactions.");
    }
  };

  const fetchTransactionDetail = async (transactions) => {
    try {
      // Get the hash of the last transaction
      const lastTransactionHash = transactions.transactions[0].hash;
      if (lastTransactionHash) {
        const sanitizedTransactionHash =
          encodeURIComponent(lastTransactionHash);
        const detailsResponse = await getTransactionDetails(
          sanitizedTransactionHash
        );
        return detailsResponse.data; // Return the transaction details
      }
    } catch (error) {
      console.error("Error fetching transaction details:", error);
      toast.error("Failed to fetch transaction details.");
    }
  };

  const subscriptionHandler = async () => {
    console.log(">>>> Subscription starts !!!!");
    console.log("amount to transfer >> ", equivalentCoinPrice);
    const subscribed = await paySubscription(); //fix this to handle other coins, for now is only going to ton
    console.log("===> ", subscribed);

    if (wallet) {
      console.log("Calling get Transactions !!!", wallet);
      const transactions = await fetchTransactions(wallet);
      console.log("Transaction >>>>> ", transactions.transactions[0]);

      const transactionDetails = await fetchTransactionDetail(transactions);
      console.log("details >>>> ", transactionDetails.transaction);
      // Optionally handle the transactions here, e.g., set in state
      if (!window.Telegram?.WebApp?.initData) {
        setIsTelegramPromptVisible(true); // Show modal if not booted from Telegram
      }
    }
  };

  const handleTelegramIdSubmit = () => {
    console.log('Submitted Telegram ID: ', manualTelegramId);
    setIsTelegramPromptVisible(false); // Close modal after submitting
  };

  return (
    <>
      <div className={`${planType.toLowerCase()} box`}>
        <h2 className="title">{planType}</h2>
        <div className="view">
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
              <div className="per-month">{`${
                months === 1 ? "per month" : `${months} months`
              }`}</div>
            </div>
          </div>
        </div>

        {/* Radio Button Selection for Coin Type */}
        <div className="coin-selection">
          <IconRadioButton
            options={[
              { label: "TON", value: COINS_CONSTANTS.TON, icon: tonIconLight },
              { label: "TCAT", value: COINS_CONSTANTS.TCAT, icon: tcatIcon },
            ]}
            selectedCoin={selectedCoin}
            onChange={onCoinChangeHandler}
          />
        </div>
        <div className="equivalence-coin-container">
          {selectedCoin === COINS_CONSTANTS.TON ? (
            <img src={tonIconLight} alt="TON" className="coin-icon" />
          ) : (
            <img src={tcatIcon} alt="TCAT" className="coin-icon" />
          )}
          <strong
            className={`${
              selectedCoin === COINS_CONSTANTS.TON
                ? "equivalence-coin-ton"
                : "equivalence-coin-tcat"
            }`}
          >
            {equivalentCoinPrice}
          </strong>
        </div>
        <div className="description">
          <ul>
            {description.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
        <div className="button">
          <button type="submit" onClick={() => subscriptionHandler()}>
            {buttonText}
          </button>
        </div>
      </div>
      <ToastContainer />
      <TelegramIdModal
        open={isTelegramPromptVisible}
        handleClose={() => setIsTelegramPromptVisible(false)}
        manualTelegramId={manualTelegramId}
        setManualTelegramId={setManualTelegramId}
        handleTelegramIdSubmit={handleTelegramIdSubmit}
      />
    </>
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
