const http = require("http");
const requestHandler = require("./08_custom_module");

const server = http.createServer(requestHandler);

const PORT = 3001;
server.listen(PORT, () => {
  console.log(`🖥️ Server started serving at http://localhost:${PORT}`);
});
