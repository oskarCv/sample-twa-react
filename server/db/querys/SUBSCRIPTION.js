export const registerSubscription = async (connection, {
    wallet_id,
    telegram_id,
    subscription_plan_id,
    subscription_date,
    subscription_utime,
    transaction_hash,
    trace_id
}) => {
    try {
        // Start a transaction
        await connection.beginTransaction();

        // Execute the stored procedure
        const [results] = await connection.query(`
            CALL RegisterSubscription(?, ?, ?, ?, ?, ?, ?)
        `, [
            wallet_id,
            telegram_id,
            subscription_plan_id,
            subscription_date,
            subscription_utime,
            transaction_hash,
            trace_id
        ]);

        // Log results to check the result structure
        console.log('Stored procedure results:', results);

        // Check if the first result set exists and has data
        if (results && results[0] && results[0][0]) {
            const subscriptionId = results[0][0].subscription_id;
            console.info('Registered Subscription ID:', subscriptionId);

            // Commit the transaction
            await connection.commit();
            
            return subscriptionId;
        } else {
            throw new Error('No subscription ID returned from the stored procedure');
        }
    } catch (error) {
        // Rollback the transaction on error
        await connection.rollback();
        console.error('Error in RegisterSubscription procedure:', error.message || error);
        throw error; // Re-throw to handle it in the calling function
    }
};
