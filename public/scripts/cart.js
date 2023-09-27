let totallPrice = 0; // Initialize totallPrice with a default value of 0
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


  const cartItemsEl = document.querySelector(".cartlist");
  const subtotalEl = document.querySelector(".btnn2");

  // cart array
let cart = JSON.parse(localStorage.getItem("CART")) || [];
updateCart();


// update cart
function updateCart() {
  try {
    renderCartItems();
    renderSubtotal();
  } catch (error) {
    console.error('Error updating cart:', error);
  }
  // save cart to local storage
  localStorage.setItem("CART", JSON.stringify(cart));
}



// calculate and render subtotal
function renderSubtotal() {
  let totalPrice = 0;
  let totalItems = 0;

  cart.forEach((item) => {
    totalPrice += item.price * item.numberOfUnits;
    totalItems += item.numberOfUnits;
  });

  subtotalEl.innerHTML = `Subtotal (${totalItems} items): NGN${totalPrice.toFixed(2)}`;
  totallPrice = totalPrice.toFixed(2); // Assign the calculated value to totallPrice
}

// Define the generateUniqueString function
function generateUniqueString(prefix = '', length = 10) {
  const timestamp = new Date().getTime().toString(36);
  const randomString = Math.random().toString(36).substr(2, length);

  return `${prefix}-${timestamp}-${randomString}`;
}

// cart.js
async function initializePayment() {
  // Your existing code for initializing the Flutterwave payment
  const name = document.getElementById('flname').value;
  const email = document.getElementById('email').value;
  const phoneNumber = document.getElementById('phone').value;

  const uniqueString = generateUniqueString('meiwuji', 10);

  try {
    const got = (await import('got')).default;
    const response = await got.post('/processPayment', {
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: totallPrice, // Replace with the actual payment amount
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
  /*FlutterwaveCheckout({
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
  });*/


  module.exports = { initializePayment }; // Export the function


// render cart items
function renderCartItems() {
  // Check if cartItemsEl exists
  if (cartItemsEl) {
    cartItemsEl.innerHTML = ''; // clear cart element
    cart.forEach((item) => {
      cartItemsEl.innerHTML +=  `
        <div class="cartopts">
        <div class= "covsect">
            <div class="coviconsresize">
                <img src="${item.imgSrc}" alt="${item.name}" id="covicresize">
            </div>
             
        </div>
        <div id="hscttxt" class="menul menu all">
            <div class="fsect">
                <div class="frow">
                    <h2 class="ftext bktitle">${item.name}</h2>
                    <h2 class="authname" style="font-weight: lighter;">M&nbsp;&nbsp; M&nbsp;&nbsp; E&nbsp;&nbsp; S&nbsp;&nbsp; O&nbsp;&nbsp; M&nbsp;&nbsp; A&nbsp;&nbsp; .&nbsp;&nbsp; E&nbsp;&nbsp; .&nbsp;&nbsp; I&nbsp;&nbsp; W&nbsp;&nbsp; U&nbsp;&nbsp; J&nbsp;&nbsp; I</h2>
 
                </div>
                <div class="srow">
                    <div class="deliconsresize">
                        <div class="extra"></div>
                        <img src="Images/icons8-delete-1000.png" style="cursor: pointer;" onclick="removeItemFromCart(${item.id})" alt="Blazonshots" id="delicresize">
                    </div>
                    <div class="r2c2"></div>
                </div>
                
            </div>
            <div class="ssect">
                <div class="ftype"><h3>FILE TYPE</h3></div>
                <div class="price">
                    <div class="btnn"><h3>PRICE</h3></div>
                </div>
            </div>
            <div class="ssect">
                <div class="ftype">PDF</div>
                <div class="price">
                    <div class="carticonsresize">
                    <img src="Images/nigeria-naira-currency-symbol_32974.png" alt="Blazonshots" id="carticresize">
                    </div>
                    <div class="btn2">${item.price}</div>
                </div>
            </div>
        </div>
      </div>
    </div>
      `;
  }); 
}else {
  console.warn('cartItemsEl is null or undefined');
}
}


window.removeItemFromCart = function (id) {
  cart = cart.filter((item) => item.id !== id);
  updateCart();
};