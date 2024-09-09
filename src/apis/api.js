// api.js
import axios from 'axios';
import { EXTERNALS_ROUTES } from '../routes';

export const getCoinPrice = async (coinId) => {
  try {
    const response = await axios.get(
      `${EXTERNALS_ROUTES.COIN_GEKO_BASE_ID}${coinId}${EXTERNALS_ROUTES.COIN_GEKO_USD_PAIR}`
    );
    
    // Assuming the response structure includes the coin price in USD
    return response.data;
  } catch (error) {
    console.error("Error fetching coin price:", error);
    throw error;
  }
};
