export const convertUTime = (utime) => {
    // Convert the Unix timestamp (seconds) to milliseconds for Date object
    const date = new Date(utime * 1000);
  
    // Extract the day, month, and year
    const day = date.getUTCDate();
    const month = date.getUTCMonth() + 1; // Months are 0-based, so add 1
    const year = date.getUTCFullYear();
  
    // Format the date as "MM/DD/YYYY"
    return `${month}/${day}/${year}`;
  };