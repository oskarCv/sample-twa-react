import { COINS_CONSTANTS } from "../constants";
import { getCoinPrice } from "../apis/api";
export const fetchCoinPrices = async () => {
    try {
        const tonData = await getCoinPrice(COINS_CONSTANTS.TON);
        const tcatData = await getCoinPrice(COINS_CONSTANTS.T_CAT);

        const fetchedTonPrice = tonData[COINS_CONSTANTS.TON]?.usd || null;
        const fetchedTcatPrice = tcatData[COINS_CONSTANTS.T_CAT]?.usd || null;

        console.warn('fetched ton price ', fetchedTonPrice);
        console.warn('fetched tcat price ', fetchedTcatPrice);

        return {tonPrice: fetchedTonPrice, tcatPrice: fetchedTcatPrice}

    } catch (error) {
        console.error('Failed to fetch coin prices', error);
    }
};