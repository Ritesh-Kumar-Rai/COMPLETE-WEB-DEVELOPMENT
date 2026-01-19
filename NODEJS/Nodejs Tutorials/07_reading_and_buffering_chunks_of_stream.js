const http = require("http");
const fs = require("fs");

const server = http.createServer(function (req, res) {
  if (req.url.toLowerCase() === "/login") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("<body>");
    res.write("<h1>Login Page</h1>");
    res.write(`<form action="/submit-details" method="post">`);
    res.write(
      `<input type='text' name='username' placeholder='enter username' /> <br/> <br/>`,
    );
    res.write(
      `<label for='male'>Male</label><input type='radio' id='male' name='gender' value='male' />`,
    );
    res.write(
      `<label for='female'>Female</label><input type='radio' id='female' name='gender' value='female' /> <br/> <br/>`,
    );
    res.write("<input type='submit' value='Submit' />");
    res.write(`</form>`);
    res.write("</body>");
    res.write("</html>");
    return res.end();
  } else if (req.url.toLowerCase() === "/submit-details") {
    // reading chunks
    const data = [];
    req.on("data", (chunk) => {
      console.log(chunk);
      data.push(chunk);
    });

    // buffering chunks (parsing chunks)
    req.on("end", () => {
      const parsedBody = Buffer.concat(data).toString();
      console.log(parsedBody);
      // parsing request into final result
      const params = new URLSearchParams(parsedBody);
      console.log(params, typeof params, params.username); // params.username will return undefined because it is not in actual object format, we need to convert it
      const obj = {};
      for (const [key, value] of params) {
        obj[key] = value;
      }
      //   or
      const finalObj = Object.fromEntries(params); // same but in one line
      console.log(obj, obj.username); // we can access username
      console.log(finalObj, finalObj.gender);

      fs.writeFileSync("user_for_program7.txt", JSON.stringify(finalObj)); // will will inject the data to new file
    });

    res.statusCode = 302;
    res.setHeader("Location", "/");
    return res.end();
  }

  // home page
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/html");
  res.write("<html>");
  res.write("<body>");
  res.write("<h1>Home Page</h1>");
  res.write("</body>");
  res.write("</html>");
  return res.end();
});

const PORT = 3001;
server.listen(PORT, () => {
  console.log(`🖥️ Server started serving at http://localhost:${PORT}`);
});
