import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

export default function PaymentCoins({ paimentCoinHandler }) {
    const handleChange = (event) => {
        console.log('Change event: ', event.target.value);
        subscriptionPlanHandler(event.target.value);
    };

    return (
        <FormControl>
            <FormLabel id="payment_coins_options">Select the coin you want to use</FormLabel>
            <RadioGroup
                row
                aria-labelledby="payment coin"
                name="payment-coins-group"
                onChange={handleChange}
                defaultValue='ton'
            >
                <FormControlLabel value="ton" control={<Radio />} label="TON" />
                <FormControlLabel value="tcat" control={<Radio />} label="TCAT" />
                {/* <FormControlLabel value="12_months" control={<Radio />} label="12 Months" /> */}
            </RadioGroup>
        </FormControl>
    );
}
