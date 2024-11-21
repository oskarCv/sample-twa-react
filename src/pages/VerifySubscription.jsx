import React, { useState } from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import "./VerifySubscription.css";
import { getPlatformUserId } from "../apis/api";

const StyledButton = styled(Button)({
  margin: "0.5rem",
});

const VerifySubscription = ({ isConnected, wallet }) => {
  const [shouldDisplayLinks, setShouldDisplayLinks] = useState(false);
  const telegramBotLink = `https://t.me/compass_gatekeeper_bot`;

  if (!isConnected) {
    return <span>You are not connected.</span>;
  }

  const validateRegister = async () => {
    console.log("Validate by wallet: ", wallet);
    try {
      const response = await getPlatformUserId(wallet);
      if (response && response != "") {
        setShouldDisplayLinks(true);
      }
      console.log(response);
    } catch (e) {
      console.error(
        "There was an error calling validating the registration !!!"
      );
    }
  };

  return (
    <div className="columns">
      <div className="column main">
        <div className="success-extras">
          <CheckCircleIcon
            color="success"
            style={{ fontSize: "6em", margin: "0 0 30px" }}
          />
          <p>Thanks for your order!</p>
          <p className="success-lrg">Just a few more steps</p>
          <p>
            For confidentiality, go to the Telegram app and use the bot command{" "}
            <strong>/addme</strong>.
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
            Once the bot says "User and subscription status updated
            successfully," you can validate here:
          </p>
          {shouldDisplayLinks ? (
            <div
              style={{
                margin: "5px",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "10px",
              }}
            >
              <a
                href="https://t.me/+fpnBaxj7EmY0YWNh"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  textDecoration: "none",
                  color: "#007BFF",
                  fontSize: "16px",
                  padding: "10px 15px",
                  border: "1px solid #007BFF",
                  borderRadius: "5px",
                  backgroundColor: "#f9f9f9",
                  display: "inline-block",
                  transition: "background-color 0.3s, color 0.3s",
                }}
                onMouseOver={(e) => {
                  e.target.style.backgroundColor = "#007BFF";
                  e.target.style.color = "#fff";
                }}
                onMouseOut={(e) => {
                  e.target.style.backgroundColor = "#f9f9f9";
                  e.target.style.color = "#007BFF";
                }}
              >
                Token Compass Core Scalping
              </a>

              <a
                href="https://t.me/+zltHuFHrS0I1Y2Yx"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  textDecoration: "none",
                  color: "#007BFF",
                  fontSize: "16px",
                  padding: "10px 15px",
                  border: "1px solid #007BFF",
                  borderRadius: "5px",
                  backgroundColor: "#f9f9f9",
                  display: "inline-block",
                  transition: "background-color 0.3s, color 0.3s",
                }}
                onMouseOver={(e) => {
                  e.target.style.backgroundColor = "#007BFF";
                  e.target.style.color = "#fff";
                }}
                onMouseOut={(e) => {
                  e.target.style.backgroundColor = "#f9f9f9";
                  e.target.style.color = "#007BFF";
                }}
              >
                Token Compass Day Trade Signals
              </a>

              <a
                href="https://t.me/+08chKGd4dkAwNjUx"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  textDecoration: "none",
                  color: "#007BFF",
                  fontSize: "16px",
                  padding: "10px 15px",
                  border: "1px solid #007BFF",
                  borderRadius: "5px",
                  backgroundColor: "#f9f9f9",
                  display: "inline-block",
                  transition: "background-color 0.3s, color 0.3s",
                }}
                onMouseOver={(e) => {
                  e.target.style.backgroundColor = "#007BFF";
                  e.target.style.color = "#fff";
                }}
                onMouseOut={(e) => {
                  e.target.style.backgroundColor = "#f9f9f9";
                  e.target.style.color = "#007BFF";
                }}
              >
                Token Compass General Signals and Analysis
              </a>

              <a
                href="https://t.me/+YpWDRi6qiHM1ZjYx"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  textDecoration: "none",
                  color: "#007BFF",
                  fontSize: "16px",
                  padding: "10px 15px",
                  border: "1px solid #007BFF",
                  borderRadius: "5px",
                  backgroundColor: "#f9f9f9",
                  display: "inline-block",
                  transition: "background-color 0.3s, color 0.3s",
                }}
                onMouseOver={(e) => {
                  e.target.style.backgroundColor = "#007BFF";
                  e.target.style.color = "#fff";
                }}
                onMouseOut={(e) => {
                  e.target.style.backgroundColor = "#f9f9f9";
                  e.target.style.color = "#007BFF";
                }}
              >
                Token Compass VIP Lounge
              </a>
            </div>
          ) : (
            <div style={{ margin: "5px" }}>
              Here will be listed the telegram groups to join once validate
            </div>
          )}
          {shouldDisplayLinks ? (
            <div></div>
          ) : (
            <StyledButton
              variant="contained"
              color="primary"
              onClick={validateRegister}
              aria-label="Validate Subscription"
            >
              Validate
            </StyledButton>
          )}
        </div>
      </div>
    </div>
  );
};

export default VerifySubscription;
