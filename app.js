// Use the esm module to enable import syntax in CommonJS
require = require("esm")(module);

// Now you can use import syntax in your CommonJS file

require("dotenv").config();
const express = require("express");
const { default: got } = import("got");
process.env.PUBLIC_KEY = "FLWPUBK_TEST-939acb7e72fe1cc610ea491135e2e4b1-X";
process.env.SECRET_KEY = "FLWSECK_TEST-c5d6862c3d99722f93fba9acee6371e1-X";
process.env.ENCRYPTION_KEY = "FLWSECK_TESTdae0705e3852";

const app = express();

const port = 3000;

app.use(express.urlencoded({ extended: true }));
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

// Define a route for processing payments
app.get("/processPayment/:txRef", async (req, res) => {
  // Retrieve payment data from the request body
  const txRef = req.params.txRef;

  const fetch = await import("node-fetch");

  // Handle payment processing using got or any other library you prefer
  try {
    const response = await fetch.default(
      `https://api.flutterwave.com/v3/transactions/${txRef}/verify`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${process.env.SECRET_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const result = await response.json();
    console.log(result);
    if (result.status == "error") {
      return res.status(400).json({
        success: false,
        message: "No transaction was found for this id",
      });
    }

    res.json(result);
  } catch (error) {
    console.error(error);
    // Handle errors as needed and send an appropriate response
    res
      .status(500)
      .json({ success: false, message: "Payment processing error" });
  }
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
