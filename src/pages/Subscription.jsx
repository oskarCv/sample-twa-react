// Subscription.jsx
import React, { useEffect } from "react";
import { getCoinPrice } from "../apis/api";
import { COINS_CONSTANTS } from "../constants";
import { isConnectedMainNet } from "../utils/validations";

const Subscription = ({isConnected, network}) => {
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
  return (
    <>
        {shouldDisplayPage ? (
            <div>
                <div>
                    display the payments options    
                </div>
                <div>

                </div>
            </div>
        ):''}
    </>
  )
};

export default Subscription;
