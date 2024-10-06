import React, { useEffect, useState } from 'react';
import { getCoinPrice } from '../apis/api';
import { COINS_CONSTANTS } from '../constants';
import Typography from '@mui/material/Typography';

export default function CoinPrice({ setTonPrice, setTcatPrice }) {
  const [localTonPrice, setLocalTonPrice] = useState(null);
  const [localTcatPrice, setLocalTcatPrice] = useState(null);

  // Function to fetch the coin prices
  const fetchCoinPrices = async () => {
    try {
      console.log("Fetching coin prices...");
      const tonData = await getCoinPrice(COINS_CONSTANTS.TON);
      const tcatData = await getCoinPrice(COINS_CONSTANTS.TCAT); // Assuming TCAT is another coin you want to track

      const fetchedTonPrice = tonData[COINS_CONSTANTS.TON]?.usd || null;
      const fetchedTcatPrice = tcatData[COINS_CONSTANTS.T_CAT]?.usd || null;

      console.log("Fetched TON price:", fetchedTonPrice);
      console.log("Fetched TCAT price:", fetchedTcatPrice);

      setLocalTonPrice(fetchedTonPrice);
      setLocalTcatPrice(fetchedTcatPrice);

      // Update parent state
      setTonPrice(fetchedTonPrice);
      setTcatPrice(fetchedTcatPrice);
    } catch (error) {
      console.error('Failed to fetch coin prices', error);
    }
  };

  // Fetch coin prices on component mount
  useEffect(() => {
    fetchCoinPrices(); // Initial fetch when component mounts
  }, []);

  return (
    <div style={{ display: 'flex' }}>
      <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14, marginRight: '10px' }}>
        TON/USD: {localTonPrice !== null ? localTonPrice : 'Loading...'}
      </Typography>
      <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
        TCAT/USD: {localTcatPrice !== null ? localTcatPrice : 'Loading...'}
      </Typography>
    </div>
  );
}
