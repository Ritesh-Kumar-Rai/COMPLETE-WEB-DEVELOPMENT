const http = require("http");

const server = http.createServer(function (req, res) {
  res.setHeader("Content-Type", "text/html");
  res.write("<html>");
  res.write(`<head> 
        <title>HTTP RESPONSE</title> 
        <style>
            html,body{
                    background-color: black;
                    color: white;
                }
        </style>    
    </head>`);
  res.write("<body> <h1>Hare Krsna</h1> </body>");
  res.write("</html>");
  res.end();
});

server.listen(3000, function () {
  console.log("http server is started serving at http://localhost:3000");
});
