// api.js
import axios from 'axios';
import { EXTERNALS_ROUTES } from '../routes';

// const BaseURL = process.env.REACT_APP_BASE_URL;
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

export const getAllWalletTransactions = async(wallet) => {
  try{
    const response = await axios.get(`${BaseUrl}/getTransactions/${wallet}`);
    return response;
  }catch(e){
    console.error('Error while getting the wallet transactions !!!'); 
  }
}

export const getTransactionDetails = async(transactionHash)=>{
  try{
    const response = await axios.get(`${BaseUrl}/getTransactionDetails/${transactionHash}`);
    return response;
  }catch(e){
    console.error('Error while getting the wallet transactions !!!'); 
  }
}
  