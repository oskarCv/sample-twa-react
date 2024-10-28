import React from "react";
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import './VerifySubscription.css';
import { getPlatformUserId } from "../apis/api";

const StyledButton = styled(Button)({
  margin: '0.5rem',
});

const VerifySubscription = ({ isConnected, wallet }) => {
  const telegramBotLink = `https://t.me/compass_gatekeeper_bot`;

  if (!isConnected) {
    return <span>You are not connected.</span>;
  }

  const validateRegister = async() => {
    console.log('Validate by wallet: ', wallet);
    try{
      const response = await getPlatformUserId(wallet);
      console.log(response);
    } catch (e){
      console.error("There was an error calling validating the registration !!!");
    }

  }

  return (
    <div className="columns">
      <div className="column main">
        <div className="success-extras">
          <CheckCircleIcon color="success" style={{ fontSize: '6em', margin: '0 0 30px' }} />
          <p>Thanks for your order!</p>
          <p className="success-lrg">Just a few more steps</p>
          <p>
            For confidentiality, go to the Telegram app and use the bot command <strong>/addme</strong>.
          </p>
          <div className="actions-toolbar">
            <StyledButton
              variant="contained"
              color="primary"
              href={telegramBotLink}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Go to Telegram Bot"
            >
              Go to Telegram
            </StyledButton>
          </div>
          <p>
            Once the bot says "User and subscription status updated successfully," you can validate here:
          </p>
          <StyledButton
            variant="contained"
            color="primary"
            onClick={validateRegister}
            aria-label="Validate Subscription"
          >
            Validate
          </StyledButton>
        </div>
      </div>
    </div>
  );
};

export default VerifySubscription;