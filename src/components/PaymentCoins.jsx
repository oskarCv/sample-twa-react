import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

export default function PaymentCoins({ paymentCoinHandler }) {
    const handleChange = (event) => {
        paymentCoinHandler(event.target.value);
    };

    return (
        <FormControl>
            <FormLabel id="payment_coins_options">Select the coin you want to use</FormLabel>
            <RadioGroup
                row
                aria-labelledby="payment coin"
                name="payment-coins-group"
                onChange={handleChange}
                defaultValue='TON'
            >
                <FormControlLabel value="TON" control={<Radio />} label="TON" />
                <FormControlLabel value="T_CAT" control={<Radio />} label="T-CAT" />
            </RadioGroup>
        </FormControl>
    );
}
