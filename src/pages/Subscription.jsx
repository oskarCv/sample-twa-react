import React, { useEffect, useState } from "react";
import { getAllSubscriptions, getCoinPrice } from "../apis/api";
import { COINS_CONSTANTS, SUBSCRIPTION_PLANS } from "../constants";
import { isConnectedMainNet } from "../utils/validations";

import { useTonConnect } from "../hooks/useTonConnect";
import { TonConnectUI, useTonConnectUI } from "@tonconnect/ui-react";

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import SubscriptionOptions from "../components/SubscriptionOptions";
import PaymentCoins from "../components/PaymentCoins";
import Chip from '@mui/material/Chip';
import PricingPlans from "../components/PricingPlans/PricngPlans";
;

const Subscription = ({ isConnected, network }) => {
    const [selectedPlan, setSelectedPlan] = useState(1);
    const [selectedCoin, setSelectedCoin] = useState('TON');
    const [tonPrice, setTonPrice] = useState(null);
    const [tcatPrice, setTcatPrice] = useState(null);
    const [charge, setCharge] = useState(0);
    const [subscriptionCost, setSubscriptionCost] = useState(0);
    const [tonConnectUI] = useTonConnectUI();
    const [subscriptionData, setSubscriptionData] = useState(null);

    const shouldDisplayPage = () => isConnectedMainNet(isConnected, network);

    const dollar = 1000000000;

    const subscriptionPlanHandler = (value) => {
        console.log('Handler >> plan >> ', selectedPlan);
        setSelectedPlan(value);
    };

    const paymentCoinHandler = (value) => {
        setSelectedCoin(value);
    };

    const transaction = {
        messages: [{
            address: "UQB5diORt6LZ8WT7ZkfigqWUtfWJ1yJTR3TvTG-wXhesveu6",
            amount: charge
        }]
    };

    const subscribeToPlan = async () => {
        console.log('subscrbe !!!!');
        console.log('charge = ', charge);
        const response = await tonConnectUI.sendTransaction(transaction);
        console.log('response >>>> ', response);
    };


    const getSelectedCoinPrice = () => {
        return selectedCoin === 'TON' ? tonPrice : tcatPrice;
    };

    // const getTotalCharge = () => {
    //     const planCost = selectedPlan.cost;
    //     const coinPrice = getSelectedCoinPrice();
    //     console.log('getTotalCharge :::: ');
    //     console.log('selectedPlan ', selectedPlan);
    //     console.log('coin price ', coinPrice);
    //     console.warn('==>', (planCost / coinPrice).toFixed(4));
    //     return (planCost / coinPrice).toFixed(4);
    // };

    const fetchCoinPrices = async () => {
        try {
            const tonData = await getCoinPrice(COINS_CONSTANTS.TON);
            const tcatData = await getCoinPrice(COINS_CONSTANTS.T_CAT);

            const fetchedTonPrice = tonData[COINS_CONSTANTS.TON]?.usd || null;
            const fetchedTcatPrice = tcatData[COINS_CONSTANTS.T_CAT]?.usd || null;

            console.warn('fetched ton price ', fetchedTonPrice);
            console.warn('fetched tcat price ', fetchedTcatPrice);

            setTonPrice(fetchedTonPrice);
            setTcatPrice(fetchedTcatPrice);

        } catch (error) {
            console.error('Failed to fetch coin prices', error);
        }
    };

    const fetchSubscriptionPlans = async() => {
        const subscriptionsData = []
        try{
            const subscriptionResponse = await getAllSubscriptions();
            
            subscriptionResponse.data.forEach((subscription) => {
                subscriptionsData.push({
                    plan:subscription.plan_name,
                    months:subscription.duration_in_months, 
                    cost: subscription.price
                });
            });
            setSubscriptionData(subscriptionsData);
        } catch(e){
            console.error('Couldnt get the subscriptioins info')
        }
    }

    useEffect(() => {
        fetchCoinPrices(); // Fetch coin prices on component mount
        fetchSubscriptionPlans();
    }, []);

    useEffect(() => {
        if (tonPrice !== null || tcatPrice !== null) {
            const planCost = selectedPlan.cost;
            const coinPrice = getSelectedCoinPrice();
         
            if (coinPrice > 0) {
                const totalCharge = (planCost / coinPrice).toFixed(4);
                console.log('Calculated total charge:', totalCharge);
                setCharge(totalCharge * dollar);
            }
        }
    }, [selectedPlan, selectedCoin, tonPrice, tcatPrice]);

    return (
        <>
            {shouldDisplayPage ? (
                <div>
                    <PricingPlans />
                    {/* <Card sx={{ minWidth: 275, width: '80vw' }}>
                    <CardContent>
                        <div style={{ display: 'flex' }}>
                            <Chip label= {`TON/USD: ${tonPrice !== null ? tonPrice : 'Loading...'}`} color="primary" />
                            <Chip label= {`T-CAT/USD: ${tcatPrice !== null ? tcatPrice : 'Loading...'}`} color="secondary" />
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <div style={{ display: 'flex', alignItems: 'space-around' }}>
                                {subscriptionData ? <SubscriptionOptions subscriptionPlanHandler={subscriptionPlanHandler} subscriptionData={subscriptionData} /> : 'Loading'}
                            </div>
                            <div>
                                <PaymentCoins paymentCoinHandler={paymentCoinHandler} />
                            </div>
                        </div>
                        <div>
                            <div>Total: {charge}</div>
                        </div>
                        <div>
                            <Button onClick={subscribeToPlan}>subscribe</Button>
                        </div>
                    </CardContent>
                </Card> */}
                </div>
                
            ) : ''}
        </>
    );
};

export default Subscription;
