import { initializePayment } from '/scripts/cart.js'; 
console.log(initializePayment);
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


  



  
  // Get a reference to the pay button by its ID (assuming the button has an ID of "payButton")
  const payButton = document.getElementById('payButton');
  
  // Add a click event listener to the pay button
  payButton.addEventListener('click', async () => {
    // Call the payNow function when the button is clicked
    await initializePayment();
  });