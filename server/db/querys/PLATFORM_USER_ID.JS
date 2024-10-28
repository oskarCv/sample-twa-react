export const platformUserId = async (connection, walletId) => {
    try {
        // Define the output variables using MySQL session variables
        await connection.query(`SET @input_wallet_id = ?`, [walletId]);
        await connection.query(`SET @output_platform_user_id = NULL`);
        await connection.query(`SET @found = FALSE`);

        // Call the stored procedure
        const [procedureResults] = await connection.query(`
            CALL GetPlatformUserId(@input_wallet_id, @output_platform_user_id, @found);
            SELECT @output_platform_user_id AS platform_user_id, @found AS found;
        `);

        // The second result set contains the output parameters
        const result = procedureResults[1][0];
        const platformUserId = result.platform_user_id;
        const found = result.found;

        // Return the result in a standardized format
        return {
            success: !!found,  // Convert to boolean
            platformUserId: found ? platformUserId : null,
        };

    } catch (error) {
        console.error('Error in GetPlatformUserId procedure:', error.message || error);
        throw error;  // Re-throw to handle in calling function
    }
};