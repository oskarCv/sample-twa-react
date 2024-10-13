import React, { useEffect, useState } from "react";
import { TonConnectUI, useTonConnectUI } from "@tonconnect/ui-react";
import { useTonConnect } from "../../hooks/useTonConnect";
import { toast } from "react-toastify";
import {
  getAllWalletTransactions,
  getTransactionDetails,
  postUserSubscription,
} from "../../apis/api";
import { convertUTime } from "../../utils/timeHelpers";
import PropTypes from "prop-types";
import IconRadioButton from "./IconRadioButton";
import tonIconLight from "../../assets/ton-ico.png";
import tcatIcon from "../../assets/tcat-ico.png";
import { COINS_CONSTANTS } from "../../constants";
import TelegramIdModal from "../TelegramIdModal";

import "react-toastify/dist/ReactToastify.css";

const PricingPlan = ({
  planType,
  price,
  months,
  // detail,
  iconSrc,
  description,
  discount,
  buttonText,
  tonPrice,
  tcatPrice,
  planId,
}) => {
  const [tonConnectUI] = useTonConnectUI();
  const [selectedCoin, setSelectedCoin] = useState(COINS_CONSTANTS.TON);
  const { wallet, sender } = useTonConnect();
  const [isTelegramPromptVisible, setIsTelegramPromptVisible] = useState(false);
  const [manualTelegramId, setManualTelegramId] = useState("");
  const [collectedSubscriptionData, setCollectedSubscriptionData] = useState(null);


  const dollar = 1000000;
  console.log("Wallet connected: -> ", wallet);

  const onCoinChangeHandler = (coin) => {
    setSelectedCoin(coin);
  };

  const discountedPrice = (price - (discount / 100) * price).toFixed(2);
  const finalPrice = discount > 0 ? discountedPrice : price;

  const equivalentCoinPrice =
    selectedCoin === COINS_CONSTANTS.TON
      ? (finalPrice / tonPrice).toFixed(4)
      : (finalPrice / tcatPrice).toFixed(4);

  const transaction = {
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
      toast.info('Validating transaction :)', { autoClose: 5000 });
      await new Promise((resolve) => setTimeout(resolve, 5000));

      const response = await getAllWalletTransactions(wallet);

      return response.data;
    } catch (error) {
      console.error("Error fetching transactions:", error);
      toast.error("Failed to fetch transactions.");
    }
  };

  const fetchTransactionDetail = async (transactions) => {
    try {
      const lastTransactionHash = transactions.transactions[0].hash;
      if (lastTransactionHash) {
        const sanitizedTransactionHash =
          encodeURIComponent(lastTransactionHash);
        const detailsResponse = await getTransactionDetails(
          sanitizedTransactionHash
        );
        return detailsResponse.data;
      }
    } catch (error) {
      console.error("Error fetching transaction details:", error);
      toast.error("Failed to fetch transaction details.");
    }
  };

  const subscriptionHandler = async () => {
    if (wallet) {
      // Step 1: Collect wallet and transaction data first
      const subscribed = await paySubscription();
      const transactions = await fetchTransactions(wallet);
      const transactionDetails = await fetchTransactionDetail(transactions);
  
      // Store the collected data so far (but without the Telegram ID yet)
      const collectedSubscriptionData = {
        wallet_id: wallet,
        subscription_plan_id: planId + 1,
        subscription_date: new Date().toISOString().split("T")[0],
        subscription_utime: transactionDetails.transaction.utime,
        transaction_hash: transactions.transactions[0].hash,
        trace_id: transactions.transactions[0].trace_id,
      };
  
      // Step 2: Check for Telegram ID
      if (!window.Telegram?.WebApp?.initData && !manualTelegramId) {
        // If Telegram ID is missing, open the modal
        setCollectedSubscriptionData(collectedSubscriptionData);
        setIsTelegramPromptVisible(true);
        return; // Stop the flow until Telegram ID is submitted
      }
  
      // Step 3: If Telegram ID is available, proceed to finalize the subscription
      collectedSubscriptionData.telegram_id = window.Telegram?.WebApp?.initData || manualTelegramId;
  
      // Call final step with all the data
      finalizeSubscription(collectedSubscriptionData);
    }
  };

  const handleTelegramIdSubmit = () => {
    if (manualTelegramId.trim()) {
      setIsTelegramPromptVisible(false); // Close the modal after valid input
    } else {
      toast.error("Please enter a valid Telegram ID."); // Show error if input is invalid
    }
  };

  useEffect(() => {
    if (!isTelegramPromptVisible && manualTelegramId.trim()) {
      // When the modal closes and the manualTelegramId is provided, resume the subscription
      // Use the previously collected data
      const subscriptionData = {
        ...collectedSubscriptionData,
        telegram_id: manualTelegramId,
      };
  
      // Call the final subscription step
      finalizeSubscription(subscriptionData);
    }
  }, [isTelegramPromptVisible, manualTelegramId]);
  
  const finalizeSubscription = async (subscriptionData) => {
    // Process the subscription data (e.g., send to backend)
    console.log("Final subscription data:", subscriptionData);
    await postUserSubscription(subscriptionData);
    // Perform further actions like API submission
    // Example: await sendSubscriptionToBackend(subscriptionData);
  };
  

  return (
    <>
      <div className={`${planType.toLowerCase()} box`}>
        <h2 className="title">{planType}</h2>
        <div className="view">
          <div className="icon">
            <img src={iconSrc} alt={`${planType} icon`} />
          </div>

          <div className="cost">
            {discount > 0 && (
              <div className="discount-section">
                <div className="discount-percentage">{discount}% OFF</div>
                <div className="old-price">${price}</div>
              </div>
            )}
            <div className="new-price-section">
              <div className="new-price">${finalPrice}</div>
              <div className="per-month">
                {months === 1 ? "per month" : `${months} months`}
              </div>
            </div>
          </div>
        </div>

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
            className={
              selectedCoin === COINS_CONSTANTS.TON
                ? "equivalence-coin-ton"
                : "equivalence-coin-tcat"
            }
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
          <button type="submit" onClick={subscriptionHandler}>
            {buttonText}
          </button>
        </div>
      </div>

      <TelegramIdModal
        open={isTelegramPromptVisible}
        handleClose={() => {
          if (manualTelegramId.trim()) {
            setIsTelegramPromptVisible(false);
          } else {
            toast.error("Please enter a valid Telegram ID.");
          }
        }}
        disableBackdropClick={true} // Disable closing modal on outside click
        disableEscapeKeyDown={true} // Disable closing modal on escape key
        manualTelegramId={manualTelegramId}
        setManualTelegramId={setManualTelegramId}
        handleTelegramIdSubmit={handleTelegramIdSubmit}
      />
    </>
  );
};

PricingPlan.propTypes = {
  planType: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  detail: PropTypes.string.isRequired,
  iconSrc: PropTypes.string.isRequired,
  description: PropTypes.arrayOf(PropTypes.string).isRequired,
  discount: PropTypes.number,
  buttonText: PropTypes.string.isRequired,
  tonPrice: PropTypes.number.isRequired,
  tcatPrice: PropTypes.number.isRequired,
};

export default PricingPlan;
