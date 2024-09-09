// Subscription.jsx
import React from "react";
import { CONSTANTS_PROPERTIES } from "../constants";
import { isConnectedMainNet } from "../utils/validations";

const Subscription = ({isConnected, network}) => {
    const shouldDisplayPage = () => isConnectedMainNet(isConnected, network);
  return (
    <>
        {shouldDisplayPage ? (
            <div>display the payments options</div>
        ):''}
    </>
  )
};

export default Subscription;
