export const getAllSubscriptions = async (connection) => {
  try {
      const [results] = await connection.query('SELECT * FROM subscription_plans');
      console.info('GET ALL SUBSCRIPTIONS_PLANS INFO: ', results);
      return results; // Return the results
  } catch (error) {
      console.error(error);
      throw error; // Re-throw the error to handle it in the calling function
  }
}
