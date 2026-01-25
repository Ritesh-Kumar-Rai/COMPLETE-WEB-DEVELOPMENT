function calculateResult(req, res) {
  const datas = [];
  req.on("data", (chunk) => {
    console.log("Buffer Chunk:", chunk);
    datas.push(chunk);
  });

  req.on("end", () => {
    const parsedData = Buffer.concat(datas).toString();
    console.log("Parsed Data:", parsedData);

    // final result
    const prePostObj = new URLSearchParams(parsedData);
    const postPostObj = Object.fromEntries(prePostObj);
    const { num1, num2 } = postPostObj;
    console.log(num1, num2, postPostObj);
    const result = Number(num1) + Number(num2);
    console.log("result of sum:", result);
    res.statusCode = 201;
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
    res.write("<h1>Your Result of 2 no.</h1>");
    res.write(`<h3>Result: ${result} </h3>`);
    res.write("</body>");
    res.write("</html>");
    return res.end();
  });
}

module.exports = calculateResult;
