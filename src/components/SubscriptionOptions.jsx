import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

export default function SubscriptionOptions({ subscriptionPlanHandler }) {
    const handleChange = (event) => {
        console.log('Change event: ', event.target.value);
        subscriptionPlanHandler(event.target.value);
    };

    return (
        <FormControl>
            <FormLabel id="subscription_options">Select the plan for you</FormLabel>
            <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                onChange={handleChange}
                defaultValue='3_months'
            >
                <FormControlLabel value="3_months" control={<Radio />} label="3 Months" />
                <FormControlLabel value="6_months" control={<Radio />} label="6 Months" />
                <FormControlLabel value="12_months" control={<Radio />} label="12 Months" />
            </RadioGroup>
        </FormControl>
    );
}
