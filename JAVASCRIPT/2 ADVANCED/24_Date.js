// new Date() Creates a new Date object with the current date and time.

const todaysDate = new Date();
// console.log(todaysDate.toISOString());
console.log(todaysDate); 

// IN node js: time displayed like 2025-02-20T11:50:06.833Z which is by default in ISO 8601 format (UTC) => (Coordinated Universal Time) format
// But in Browser it will be in more redable and shows is in your local time zone (GMT+0530 or India Standard Time)

// In nodejs use .toString() to get time in ISO format
console.log(todaysDate.toString());


// Key Methods: 

/* • getTime(): Milliseconds since Epoch.
 • getFullYear(): 4-digit year
 • getDay(): Day of the week
 • getDate(): Date of the month
 • getMinutes(): Current minute
 • getHours(): Current hour. 
*/
console.log(todaysDate.getTime());
console.log(todaysDate.getFullYear());
console.log(todaysDate.getDay());
console.log(todaysDate.getDate()); 
console.log(todaysDate.getHours()); 
console.log(todaysDate.getMinutes()); 
console.log(todaysDate.getMilliseconds()); 