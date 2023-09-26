
const path = require('path');
console.log("Before dotenv.config()");
require("dotenv").config({ path: path.resolve(__dirname, '/.env') });


console.log("After dotenv.config()");
console.log("Loaded Environment Variables:", process.env);
console.log("PUBLIC_KEY:", process.env.PUBLIC_KEY);
const express = require('express');

const app = express();
const port = 3000;
const Flutterwave = require('flutterwave-node-v3');



const flw = new Flutterwave(process.env.PUBLIC_KEY, process.env.SECRET_KEY);
console.log("PUBLIC_KEY:", process.env.PUBLIC_KEY);
console.log("Env File Path:", path.resolve(__dirname, '/.env'));

app.use(express.urlencoded({extended: true}));

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
app.post('/processPayment', async (req, res) => {
  // Retrieve payment data from the request body
  const paymentData = req.body;

  const fetch = await import('node-fetch');

  // Handle payment processing using got or any other library you prefer
  try {
    const response = await fetch.default('https://api.flutterwave.com/v3/payments', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.SECRET_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...paymentData, // Include payment data received from the client
        redirect_url: 'https://www.meiwuji.store/download', 
        customizations: {
          title: 'CONSEQUENCES',
          logo: 'https://drive.google.com/file/d/1824LP_tZrHTjMmcINYJ9gB-F4YAhcTxQ/view?usp=sharing',
        },
      }),
    });

    const result = await response.json();

    // Handle the response here and send it back to the client
    res.json(result);
  } catch (error) {
    console.error(error);
    // Handle errors as needed and send an appropriate response
    res.status(500).json({ success: false, message: 'Payment processing error' });
  }
});






  

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
