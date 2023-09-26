import { totalPrice } from 'scripts/cart.js';
/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */

function myFunction() { 
    const menu_item = document.querySelector(".menuitems");
    const menu_toggler = document.querySelector(".icimg");
    menu_item.classList.toggle("show");
  }
  
  function hideNav() {
    const main_menu_is_visible = document.querySelector(".show");
    if (main_menu_is_visible) {
      const menu_item = document.querySelector(".menuitems");
      menu_item.classList.remove("show");
    }
  }


  // Define the generateUniqueString function
function generateUniqueString(prefix = '', length = 10) {
    const timestamp = new Date().getTime().toString(36);
    const randomString = Math.random().toString(36).substr(2, length);
  
    return `${prefix}-${timestamp}-${randomString}`;
  }

// Define the payNow function
async function payNow() {

    const name = document.getElementById('flname').value;
  const email = document.getElementById('email').value;
  const phoneNumber = document.getElementById('phone').value;

    // Call the generateUniqueString function to get a unique string
    const uniqueString = generateUniqueString('meiwuji', 10);
  
    try {
      const response = await fetch('/processPayment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: totalPrice, // Replace with the actual payment amount
          tx_ref: uniqueString,
          currency: 'NGN', // Replace with the desired currency
          email: email,
          phonenumber: phoneNumber,
          name: name, // Replace with the customer's name
          // Add other payment data as needed
        }),
      });
  
      const result = await response.json();
  
      // Handle the response here
      console.log(result);
  
      
    } catch (error) {
      console.error(error);
      // Handle network or other errors
    }
  }
  
  // Get a reference to the pay button by its ID (assuming the button has an ID of "payButton")
  const payButton = document.getElementById('payButton');
  
  // Add a click event listener to the pay button
  payButton.addEventListener('click', async () => {
    // Call the payNow function when the button is clicked
    await payNow();
  });
  