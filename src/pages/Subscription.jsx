import React from "react";
import PricingPlans from "../components/PricingPlans/PricngPlans";
;

const Subscription = ({ isConnected, network }) => {

    const shouldDisplayPage = () => isConnectedMainNet(isConnected, network);

    return (
        <>
            {shouldDisplayPage ? (
                <div>
                    <PricingPlans />
                </div>
                
            ) : ''}
        </>
    );
};

export default Subscription;
