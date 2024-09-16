// Subscription.jsx
import React, { useEffect, useState } from "react";
import { getCoinPrice } from "../apis/api";
import { COINS_CONSTANTS } from "../constants";
import { isConnectedMainNet } from "../utils/validations";

import { useTonConnect } from "../hooks/useTonConnect";
import { TonConnectUI, useTonConnectUI } from "@tonconnect/ui-react";

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import SubscriptionOptions from "../components/SubscriptionOptions";
import PaymentCoins from "../components/PaymentCoins";

const Subscription = ({isConnected, network}) => {
    const [selectedPlan, setSelectedPlan] = useState('3_months');
    const [selectedCoin, setSelectedCoin] = useState('ton');
    const [tonPrice, setTonPrice] = useState(null);
    const [tonConnectUI, setOptions] = useTonConnectUI();

    const { sender, wallet } = useTonConnect();

    const shouldDisplayPage = () => isConnectedMainNet(isConnected, network);
    
    const getCoinGekoData = async ()=>{
        try{
            const testCoin = COINS_CONSTANTS.TON;
            const priceData = await getCoinPrice(testCoin);
            console.log('<ocv coingeko response>Ton Cat price: ', priceData[testCoin].usd);
            setTon(priceData[testCoin].usd);
        } catch (error){
            console.error('Failed to fetch Ton cat price ');
        }
    }
    
    useEffect(()=>{
        console.log('<ocv coingeko> ',getCoinGekoData())
    });


    const subscriptionPlanHandler = (value) => {
            setSelectedPlan(value);
            console.log('Selected plan: ', value);
    }

    const paymentCoinHandler = async (value) => {
        setSelectedCoin(value);
        console.log('Selected coin: ', value);
    }

    const transaction = {
        messages:[{
            address: "UQB5diORt6LZ8WT7ZkfigqWUtfWJ1yJTR3TvTG-wXhesveu6",
            amount: "10000000"
        }]
    }

    const subscribeToPlan = async() => {
        console.log('subscrbe !!!!');
        const response = await tonConnectUI.sendTransaction(transaction);
        console.log('respnse >>>> ', response);
    }
  return (
    <>
        {shouldDisplayPage ? (
             <Card sx={{ minWidth: 275, width: '80vw' }}>
             <CardContent>
                <div style={{display:'flex'}}>
                    <div style={{margin:'5px'}}>
                        <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
                            TON/USD
                        </Typography>
                    </div>
                    <div style={{margin:'5px'}}>
                        <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
                            TCAT/USD
                        </Typography>
                    </div>
                </div>
                <div style={{display:'flex', flexDirection:'column'}}>
                     <div style = {{display:'flex', alignItems: 'space-around'}}>
                         <SubscriptionOptions subscriptionPlanHandler={subscriptionPlanHandler}/>
                    </div>
                    <div>
                         <PaymentCoins paymentCoinHandler={paymentCoinHandler}/>
                    </div>
                </div>
                <div>
                    <Button onClick={() => subscribeToPlan()}>subscribe</Button>
                </div>
             </CardContent>
           </Card>
        ):''}
    </>
  )
};

export default Subscription;
