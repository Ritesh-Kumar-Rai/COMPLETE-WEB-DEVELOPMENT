const calculateResult = require("./09_calculator_result_module");

const requestHandler = (req, res) => {
  if (req.url.toLowerCase() === "/") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write(`<head>
         <title>Calculator - Home Page</title>   
        <style>
            html,body{
                        background-color: black;
                        color: white;
                    }
        </style>
        </head>`);
    res.write("<body>");
    res.write("<h1>Welcome to Home</h1>");
    res.write("</body>");
    res.write("</html>");
    return res.end();
  } else if (req.url.toLowerCase() === "/calculate") {
    res.statusCode = 200;
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
  } else if (
    req.url.toLowerCase() === "/calculate-result" &&
    req.method == "POST"
  ) {
    return calculateResult(req, res);
  }

  res.statusCode = 404;
  res.setHeader("Content-Type", "text/html");
  res.write("<html>");
  res.write(`<head>
         <title>Calculator - 404 Page Not Found</title>   
        <style>
            html,body{
                        background-color: black;
                        color: white;
                    }
        </style>
        </head>`);
  res.write("<body>");
  res.write("<h1>404 Page Not Found</h1>");
  res.write("</body>");
  res.write("</html>");
  return res.end();
};

module.exports = requestHandler;
