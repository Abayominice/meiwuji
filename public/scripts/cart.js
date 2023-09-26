
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
  renderCartItems();
  renderSubtotal();

  // save cart to local storage
  localStorage.setItem("CART", JSON.stringify(cart));
}

export let totallPrice = 0; // Initialize totallPrice with a default value of 0

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




// render cart items
function renderCartItems() {
  cartItemsEl.innerHTML = ""; // clear cart element
  cart.forEach((item) => {
    cartItemsEl.innerHTML += `
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
}

// remove item from cart
function removeItemFromCart(id) {
  cart = cart.filter((item) => item.id !== id);

  updateCart();
}


