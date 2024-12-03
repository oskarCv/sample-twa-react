// api.js
import axios from 'axios';
import { EXTERNALS_ROUTES } from '../routes';

const BaseUrl ='https://api.tokencompass.info/api';

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

export const postUserSubscription = async(subscriptionInfo) =>{
  try{
    const response = await axios.post(`${BaseUrl}/userSubscription`, subscriptionInfo);
    return response.data;
  } catch(e){
    console.error('Error posting the subscription !!!');
  }
}
//TON
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

export const validateTelegramId = async(telegramId) =>{
  try{
    const response = await axios.post(`${BaseUrl}/validate-telegram-id/${telegramId}`);
  }catch(e){
    console.error('Error while validating telegrem Id !!!');  
  }
}

export const getPlatformUserId = async (walletId) => {
  try {
    const response = await axios.get(`${BaseUrl}/getPlatformUserId/${walletId}`);
    
    if (response.data.found) {
      console.log('Platform User ID found:', response.data.platformUserId);
      return response.data.platformUserId;
    } else {
      console.log('Platform User ID not found for this wallet ID');
      return null;
    }
  } catch (error) {
    console.error('Error while fetching Platform User ID:', error.message || error);
    throw error;
  }
};
  