import React, {useEffect, useState} from 'react';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid2';
import PricingPlan from './PricingPlan';
import {fetchCoinPrices} from '../../utils/getCoingekoPrice.js';
import { getAllSubscriptions } from '../../apis/api';
import './PricingPlans.css';

const PricingPlans = () => {
  const [tonPrice, setTonPrice] = useState(null);
  const [tcatPrice, setTcatPrice] = useState(null);
  const [plans, setPlans] = useState([]);
  const [plansCovers, setPlansCovers] = useState(null);

  // Function to fetch coin prices and update state
  const updateCoinPrices = async () => {
    try {
      const { tonPrice, tcatPrice } = await fetchCoinPrices();
      setTonPrice(tonPrice);
      setTcatPrice(tcatPrice);
    } catch (error) {
      console.error('Error updating coin prices', error);
    }
  };

  // Function to fetch subscription plans and update state
  const updateSubscriptionPlans = async () => {
    try{
      const fetchedPlans = await getAllSubscriptions();
      setPlans(fetchedPlans.data);
      console.log('fetchedPlans: ', fetchedPlans);
    } catch (e){
      console.error('There was an error pulling the data!!!');
    } 
  };

  useEffect(() => {
    updateCoinPrices();
    updateSubscriptionPlans();
    setPlansCovers(['entry', 'advance', 'pro']);
    const intervalId = setInterval(() => {
      updateCoinPrices();
    }, 180000); // 3 minutes

    // Clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

  return (
    <Grid container spacing={2}>
      {/* Left column */}
      <Grid item xs={1} />

      {/* Center column */}
      <Grid item xs={10}>
        {/* First row: Chips */}
        <Grid container direction="column" spacing={2}>
          {/* Chip row */}
          <Grid item>
            <div className="chip-container">
              <Chip 
                label={`TON/USD: ${tonPrice !== null ? tonPrice : 'Loading...'}`} 
                color="primary"
              />
            </div>
          </Grid>

          {/* Product row */}
          <Grid item>
            {plans &&<div className="content">
              {plans.map((plan, index) => (
                <PricingPlan
                  key={index}
                  planType={plan.plan_name}
                  price={plan.price}
                  months={plan.months}
                  detail={plan.months === 1 ? 'per month' : `per ${plan.months} months` }
                  iconSrc={plansCovers[index]}
                  description={[`Gives you full access for ${plan.months} months`]}
                  discount={plan.discount}
                  buttonText={'Subscribe Now'}
                  tonPrice={tonPrice}
                  tcatPrice={tcatPrice}
                  planId={index}
                />
              ))}
            </div>}
          </Grid>
        </Grid>
      </Grid>

      {/* Right column */}
      <Grid item xs={1} />
    </Grid>
  );
};

export default PricingPlans;
