const http = require("http");

function navbar() {
  return `
        <html>
            <head>
                <title>Myntra for Practice</title>
                <style>
                    *{
                        padding: 0;
                        margin: 0;
                        box-sizing: border-box;
                    }
                    html,body{
                        background-color: black;
                        color: white;
                    }
                    header{
                        padding: 20px;
                        width: 100%;
                        height: 70px;
                        border-bottom: 2px solid gray;
                    }
                    nav{
                        width: 100%;
                        margin: auto;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        gap: 1rem;
                    }
                    h1{
                        margin-top: 3rem;
                        text-align: center;
                    }
                </style>
            </head>
            <body>
                <header>
                    <nav>
                        <a href='/'>Home</a>
                        <a href='/mens'>Men</a>
                        <a href='/womens'>Women</a>
                        <a href='/kids'>Kids</a>
                        <a href='/cart'>Cart</a>
                    </nav>
                </header>
            </body>
        </html>
        `;
}

const server = http.createServer(function (req, res) {
  console.log(req.method, req.url);
  if (req.url === "/") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/html");
    res.write(navbar());
    res.write("<h1>Home Page</h1>");
    return res.end();
  } else if (req.url === "/mens") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/html");
    res.write(navbar());
    res.write("<h1>Mens page</h1>");
    return res.end();
  } else if (req.url === "/womens") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/html");
    res.write(navbar());
    res.write("<h1>Womens page</h1>");
    return res.end();
  } else if (req.url === "/kids") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/html");
    res.write(navbar());
    res.write("<h1>Kids page</h1>");
    return res.end();
  } else if (req.url === "/cart") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/html");
    res.write(navbar());
    res.write("<h1>Cart page</h1>");
    return res.end();
  }

  res.statusCode = 404;
  res.setHeader("Content-Type", "text/html");
  res.write(navbar());
  res.write("<h1>404 No page</h1>");
  return res.end();
});

console.log("starting server... please wait");

setTimeout(() => {
  const PORT = 3001;
  server.listen(PORT, () => {
    console.log(`📟 Server started serving at http://localhost:${PORT}`);
  });
}, 5000);
