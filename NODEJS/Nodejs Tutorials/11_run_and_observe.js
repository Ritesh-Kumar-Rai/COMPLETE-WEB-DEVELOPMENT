// Run and observe
const fs = require("fs");

console.log("1. Start of script.");

// Synchronous (Blocking) Operation
console.log("2. Reading file synchronously.");
fs.readFileSync("user-details.txt", "utf-8");
console.log("3. Synchronous file reading completed.");

// Asynchronous (Non-Blocking) Operation
console.log("4. Reading file asynchronously.");
fs.readFile("user-details.txt", "utf-8", (err, dataAsync) => {
  if (err) throw err;
  console.log("6. Asynchronous file reading completed.");
});
console.log("5. End of Script.");
