import { totallPrice } from '/scripts/cart.js'; 
console.log(totallPrice);
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



  function makePayment() {
    const name = document.getElementById('flname').value;
  const email = document.getElementById('email').value;
  const phoneNumber = document.getElementById('phone').value;

  // Call the generateUniqueString function to get a unique string
  const uniqueString = generateUniqueString('meiwuji', 10);

    FlutterwaveCheckout({
      public_key: "FLWPUBK_TEST-939acb7e72fe1cc610ea491135e2e4b1-X",
      tx_ref: uniqueString,
      amount: totallPrice,
      currency: "NGN",
      payment_options: "card, banktransfer, ussd",
      redirect_url: "https://www.meiwuji.store/download",
      customer: {
        email: email,
        phone_number: phoneNumber,
        name: name,
      },
      customizations: {
        title: "CONSEQUENCES",
        logo: "https://drive.google.com/file/d/1824LP_tZrHTjMmcINYJ9gB-F4YAhcTxQ/view?usp=sharing",
      },
    });
  }
  // Get a reference to the pay button by its ID (assuming the button has an ID of "payButton")
  const payButton = document.getElementById('payButton');
  
  // Add a click event listener to the pay button
  payButton.addEventListener('click', async () => {
    // Call the payNow function when the button is clicked
    await makePayment();
  });