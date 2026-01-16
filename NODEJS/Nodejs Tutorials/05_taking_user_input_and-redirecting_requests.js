const http = require("http");

const server = http.createServer(function (req, res) {
  if (req.url === "/" || req.url === "/login") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write(`<head> <title>HTTP Routing Request</title>
        <style>
            html,body{
                background-color: black;
                color: white;
            }
        </style>
    </head>`);
    res.write("<body>");
    res.write("<h1>Login Page </h1>");
    res.write(`<form action="/submit-details" method="post">`);
    res.write(
      `<input type='text' name='username' placeholder='enter username' /> <br/> <br/>`
    );
    res.write(
      `<input type='password' name='password' placeholder='enter password' /> <br/> <br/>`
    );
    res.write("<input type='submit' value='Submit' />");
    res.write(`</form>`);
    res.write("</body>");
    res.write("</html>");
    return res.end();
  } else if (req.url === "/submit-details" && req.method == "POST") {
    // or incase of redirection do the following:
    /*
        res.statusCode = 302;
        res.setHeader("Location", "/");
        return res.end()
    */
    res.statusCode = 201;
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write(`<head> <title>HTTP Routing Request</title>
        <style>
            html,body{
                background-color: black;
                color: white;
            }
        </style>
    </head>`);
    res.write("<body>");
    res.write("<h1>We got your response: </h1>");
    res.write(`<h3>username: </h3>`);
    res.write(`<h3>password: </h3>`);
    res.write("</body>");
    res.write("</html>");
    return res.end();
  }
  // home page '/'
  res.statusCode = 404;
  res.setHeader("Content-Type", "text/html");
  res.write("<html>");
  res.write(`<head> <title>HTTP Routing Request</title>
        <style>
            html,body{
                background-color: black;
                color: white;
            }
        </style>
    </head>`);
  res.write("<body>");
  res.write("<h1>404 Page Not Found!</h1>");
  res.write("</body>");
  res.write("</html>");
  return res.end();
});

server.listen(3000, function () {
  console.log("http server is started serving at http://localhost:3000");
});
