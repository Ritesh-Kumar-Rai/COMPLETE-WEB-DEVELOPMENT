const http = require("http");

const server = http.createServer((req, res) => {
  console.log(req.url, req.method, req.headers); // the url, the method (like GET/POST/etc) and the http headers
  process.exit(); // this will manually stops and exits the server
});

setTimeout(() => {
  // starting the http server
  server.listen(3000, () => {
    console.log("🖥️ Server is started and serving at http://localhost:3000");
  });
}, 5000);
