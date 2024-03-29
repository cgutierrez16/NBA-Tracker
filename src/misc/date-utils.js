//Function to format date in the format 'Month DD, YYYY'
export const getFormattedDate = (num) => {
  const today = new Date();
  const adjustedDate = new Date(today);

  // Num changes how many days to go backwards / forwards
  adjustedDate.setDate(today.getDate() - num);

  const year = adjustedDate.getFullYear();
  const monthIndex = adjustedDate.getMonth();
  const day = adjustedDate.getDate();

  const months = [
    'January', 'February', 'March', 'April',
    'May', 'June', 'July', 'August',
    'September', 'October', 'November', 'December'
  ];

  const monthName = months[monthIndex];

  return `${monthName} ${day}, ${year}`;
};

//Function to format game date for api requests (specifically balldontlie) in the format 'YYYY-MM-DD'
export const getFormattedApiDate = (num) => {
  const today = new Date();
  const adjustedDate = new Date(today);

  // Num changes how many days to go backward / forward
  adjustedDate.setDate(today.getDate() - num);

  const year = adjustedDate.getFullYear();
  const monthIndex = adjustedDate.getMonth() + 1; // Adding 1 to convert from 0-based index to 1-based index
  const day = adjustedDate.getDate();

  // Ensure single digits are padded with leading zeros
  const formattedMonth = monthIndex < 10 ? `0${monthIndex}` : `${monthIndex}`;
  const formattedDay = day < 10 ? `0${day}` : `${day}`;

  // Return date in 'YYYY-MM-DD' format
  return `${year}-${formattedMonth}-${formattedDay}`;
};


//Converts isoStrings into readable EST time strings
export const convertToEST = (isoString) => {
  const utcDate = new Date(isoString);
  
  // Adjust the time zone to Eastern Standard Time (EST)
  const estDate = new Date(utcDate.toLocaleString('en-US', { timeZone: 'America/New_York' }));

  // Format the time
  const options = {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true, // Use 12-hour clock format
    timeZoneName: 'short',
  };

  return estDate.toLocaleString('en-US', options);
}

//Function to change "YYYY-DD-MM" to "MM/DD/YYYY"
export const convertDateFormatSlash = (inputDate) => {
  // Split the input string into an array of year, month, and day
  const [year, month, day] = inputDate.split('-');

  // Create the new date string in "MM/DD/YYYY" format
  const outputDate = `${month}/${day}/${year}`;

  return outputDate;
};

//I actually dont remember why this is here, most likely not necessary
export const convertDateFormat = (inputDate) => {
  // Split the input string into an array of year, month, and day
  const [year, month, day] = inputDate.split('-');

  // Create a Date object to get the month name
  const dateObject = new Date(inputDate);
  const monthIndex = dateObject.getMonth();
  const dayOfMonth = dateObject.getDate() + 1;

  const months = [
    'January', 'February', 'March', 'April',
    'May', 'June', 'July', 'August',
    'September', 'October', 'November', 'December'
  ];

  const monthName = months[monthIndex];

  // Create the new date string in "Month DD, YYYY" format
  const outputDate = `${monthName} ${dayOfMonth}, ${year}`;

  return outputDate;
};


//Function to find how many days a date has been since today
export const calculateDaysDifference = (inputDate) => {
  // Replace "/" with "-" in the input date string
  const normalizedDate = inputDate.replace(/\//g, '-');

  // Convert the normalized date string to a Date object
  const inputDateObject = new Date(normalizedDate);
  
  // Get today's date
  const today = new Date();

  // Calculate the difference in milliseconds
  const timeDifference = inputDateObject - today;

  // Convert milliseconds to days
  let daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24)) + 1;
  daysDifference = daysDifference !== 0 ? -daysDifference : 0;

  return daysDifference;
}