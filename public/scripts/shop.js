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


// SELECT ELEMENTS
const productsEl = document.querySelector(".booklist");


// Fetch the products data from the JSON file
fetch('path/to/products.json')
  .then((response) => response.json())
  .then((data) => {
    // Now you can use the 'products' array from the data
    const products = data;
    renderProdcuts(); // Call your render function here
  })
  .catch((error) => {
    console.error('Error fetching products:', error);
  });

// Define your renderProducts function
function renderProducts(products) {
  // Render the products as you did before
  // ...
}

// RENDER PRODUCTS
function renderProdcuts() {
  products.forEach((product) => {
    productsEl.innerHTML += `
            <div class="bookopts">
        <div class= "covsect">
            <div class="coviconsresize">
                <img src="${product.imgSrc}" alt="${product.name}" id="covicresize">
            </div>
             
        </div>
        <div id="hscttxt" class="menul menu all">
            <h2 class="ftext bktitle">${product.name}</h2>
            <h3 class="desc">In these dark days of rebellious youths, an interesting book like</br> 
                CONSEQUENCES that helps remind young people about the consequences of </br> their actions and inactions in today's world
                is a welcomed development.</br></br>
                Written by a well-mannered young child for young minds, this book is a </br> must-have for children in the formative years
                of 6-18, as well as for children's libraries across Nigeria.</br></br>
                This three-books-in-one teaches morals in an entertaining way and it's plots </br>
                and scenes are carefully crafted to catch and sustain the interest of today's youths, </br>
                even those suffering from short attention span.</br></br> 
                <b>Price: NGN</b></h3>
            <div id="hscbtns">
              <div id="hsbtn1" class="hscta">
                <a><div class="btn1">PDF</div></a>
              </div>
              <div id="hsbtn2" class="hscta">
                <a href="" onclick="addToCart(${product.id})">
                  <div class="carticonsresize">
                    <img src="Images/add_shopping_cart.png"  id="carticresize">
                </div>
                  <div class="btn2">ADD TO CART</div></a>
              </div>
            </div>
            <h3 id="lsh3">Hard copies are printed upon request, please call the numbers below to request for your hardcopy. Thank you!</h3>
        </div>
      </div>
        `;
        console.log("Hi");
  });
}


