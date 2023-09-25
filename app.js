const express = require ('express');
const app = express();
const port = 3000;

app.use(express.static("public"));

// Routes for specific pages
app.get("/", (req, res) => {
	res.sendFile(__dirname + "/public/index.html");
  });
  
  app.get("/books", (req, res) => {
	res.sendFile(__dirname + "/public/books.html");
  });
  app.get("/checkout", (req, res) => {
	res.sendFile(__dirname + "/public/checkout.html");
  });
  app.get("/conseqshppg", (req, res) => {
	res.sendFile(__dirname + "/public/conseqshppg.html");
  });
  app.get("/download", (req, res) => {
	res.sendFile(__dirname + "/public/download.html");
  });
  app.get("/preview", (req, res) => {
	res.sendFile(__dirname + "/public/preview.html");
  });
  app.get("/shop", (req, res) => {
	res.sendFile(__dirname + "/public/shop.html");
  });
  app.get("/cart", (req, res) => {
    res.sendFile(__dirname + "/public/cart.html");
    });

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
