const http = require("http"); // first import http module from node_modules packages

// http module is used to create a http server
const server = http.createServer(function (req, res) {
  console.log(req);
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log("🖥️ Server is started and serving at http://localhost:" + PORT);
});
