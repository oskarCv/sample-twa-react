// Subscription.jsx
import React, { useEffect, useState } from "react";
import { getCoinPrice } from "../apis/api";
import { COINS_CONSTANTS } from "../constants";
import { isConnectedMainNet } from "../utils/validations";

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import SubscriptionOptions from "../components/SubscriptionOptions";
import PaymentCoins from "../components/PaymentCoins";

const Subscription = ({isConnected, network}) => {
    const [selectedPlan, setSelectedPlan] = useState('3_months');
    const [selectedCoin, setSelectedCoin] = useState('ton');

    const shouldDisplayPage = () => isConnectedMainNet(isConnected, network);
    
    const getCoinGekoData = async ()=>{
        try{
            const testCoin = COINS_CONSTANTS.TON;
            const priceData = await getCoinPrice(testCoin);
            console.log('<ocv coingeko response>Ton Cat price: ', priceData[testCoin].usd);
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

    const paymentCoinHandler = (value) => {
        setSelectedCoin(value);
        console.log('Selected coin: ', value);
}
  return (
    <>
        {shouldDisplayPage ? (
             <Card sx={{ minWidth: 275, width: '80vw' }}>
             <CardContent>
               <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
                 Select the type of plan you wan to subscribe
               </Typography>
             </CardContent>
             <CardActions>
                <div style={{display:'flex', flexDirection:'column'}}>
                     <div style = {{display:'flex', alignItems: 'space-around'}}>
                         <SubscriptionOptions subscriptionPlanHandler={subscriptionPlanHandler}/>
                    </div>
                    <div>
                         <PaymentCoins />
                    </div>
                </div>
             </CardActions>
           </Card>
        ):''}
    </>
  )
};

export default Subscription;
