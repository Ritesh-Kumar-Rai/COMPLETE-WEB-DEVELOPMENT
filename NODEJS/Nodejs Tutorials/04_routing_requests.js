const http = require("http");

const server = http.createServer(function (req, res) {
  if (req.url === "/login") {
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("<head> <title>HTTP Routing Request</title> </head>");
    res.write("<body>");
    res.write("<h1>Login Page </h1>");
    res.write("</body>");
    res.write("</html>");
    return res.end();
  } else if (req.url === "/logout") {
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("<head> <title>HTTP Routing Request</title> </head>");
    res.write("<body>");
    res.write("<h1>Logout Page </h1>");
    res.write("</body>");
    res.write("</html>");
    return res.end();
  }
  // home page '/'
  res.setHeader("Content-Type", "text/html");
  res.write("<html>");
  res.write("<head> <title>HTTP Routing Request</title> </head>");
  res.write("<body>");
  res.write("<h1>Home Page </h1>");
  res.write("</body>");
  res.write("</html>");
  return res.end();
});

server.listen(3000, function () {
  console.log("http server is started serving at http://localhost:3000");
});
