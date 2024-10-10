import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

export default function SubscriptionOptions({ subscriptionPlanHandler, subscriptionData }) {
    const handleChange = (event) => {
        // Find the selected object based on the value
        const selectedPlan = subscriptionData.find(
            (item) => JSON.stringify(item) === event.target.value
        );
        subscriptionPlanHandler(selectedPlan); // Pass the full object
    };

    return (
        subscriptionData ? (
            <FormControl>
                <FormLabel id="subscription_options">Select the plan for you</FormLabel>
                <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                    onChange={handleChange}
                    defaultValue={JSON.stringify(subscriptionData[0])} // default to the first full object
                >
                    {subscriptionData.map((subscriptionItem) => (
                        <FormControlLabel
                            key={subscriptionItem.months}
                            value={JSON.stringify(subscriptionItem)} // Use the full object as the value
                            control={<Radio />}
                            label={`${subscriptionItem.months} Months`}
                        />
                    ))}
                </RadioGroup>
            </FormControl>
        ) : null
    );
}
