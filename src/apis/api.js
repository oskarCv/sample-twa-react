// api.js
import axios from 'axios';
import { EXTERNALS_ROUTES } from '../routes';

const BaseUrl = 'http://localhost:3100/api';

export const getCoinPrice = async (coinId) => {
  try {
    const response = await axios.get(
      `${EXTERNALS_ROUTES.COIN_GEKO_BASE_ID}${coinId}${EXTERNALS_ROUTES.COIN_GEKO_USD_PAIR}`
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching coin price:", error);
    throw error;
  }
};

export const getAllSubscriptions = async() =>{
  try{
    const response = await axios.get(`${BaseUrl}/subscriptions`);
    return response;
  } catch(e){
    console.error('Error while getting the subscriptions !!!');
  }
}
  