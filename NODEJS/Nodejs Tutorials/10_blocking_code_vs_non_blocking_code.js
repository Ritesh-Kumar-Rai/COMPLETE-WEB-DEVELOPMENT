const http = require("http");
const fs = require("fs");

const server = http.createServer(function (req, res) {
  if (req.url === "/") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/html");
    res.write(`<html>
            <head>
                <title>Nodejs program 10: Async Code (Non-Blocking IO)</title>
            </head>
            <body>
                <h1>Welcome to Blocking vs Non-Blocking Async I/O part of Nodejs</h1>
            </body>
            </html>`);
    return res.end();
  } else if (req.url.toLowerCase() === "/calculate") {
    res.statusCode = 404;
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write(`<head>
         <title>Calculator - Calculate</title>   
        <style>
            html,body{
                        background-color: black;
                        color: white;
                    }
        </style>
        </head>`);
    res.write("<body>");
    res.write("<h1>Calulate Sum of 2 no.</h1>");
    res.write("<form action='/calculate-result' method='post'>");
    res.write("<input type='number' name='num1' placeholder='enter no. 1' />");
    res.write("<input type='number' name='num2' placeholder='enter no. 2' />");
    res.write("<br><br>");
    res.write("<input type='submit' value='Calculate' />");
    res.write("</form>");
    res.write("</body>");
    res.write("</html>");
    return res.end();
  } else if (req.url.toLowerCase() === "/calculate-result") {
    const body = [];
    req.on("data", (chunk) => body.push(chunk));

    req.on("end", () => {
      const parsedData = Buffer.concat(body).toString();
      const finalObj = new URLSearchParams(parsedData);
      const processedData = Object.fromEntries(finalObj);
      const sum = Number(processedData.num1) + Number(processedData.num2);
      console.log(sum);
      //   no Blocking code
      //   fs.writeFileSync("user-result-program10.txt", `Sum result: ${sum}`);
      // try async non-blocking one
      fs.writeFile("user-result-program10.txt", `Sum result: ${sum}`, (err) => {
        console.log("file written successfully.");
        res.statusCode = 302;
        res.setHeader("Location", "/");
        return res.end();
      });
    });
  }
});

const PORT = 3001;
server.listen(PORT, function () {
  console.log("Server is started serving at http://localhost:" + PORT);
});

/**
 * Under 40,000
 * 1. Oneplus 13R
 * 2. IQOO Neo 10
 * 3. Realme GT6
 *
 * Under 30,000
 * 1. Motorolla Edge 60 pro
 * 2. Oneplus 11R
 * 3. Nothing phone (3a) pro
 */
