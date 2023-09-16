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
  
  // search section
  function searchBooks() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const bookContainers = document.querySelectorAll('.bookopts');

    bookContainers.forEach(bookDiv => {
        const titleElement = bookDiv.querySelector('.bktitle');
        const title = titleElement.textContent.toLowerCase();

        if (title.includes(searchInput)) {
            bookDiv.style.visibility = 'visible'; // Make matching books visible
        } else {
            bookDiv.style.visibility = 'hidden'; // Hide non-matching books
        }
    });

    // Reorder the displayed books
    const productList = document.getElementById('product-list');
    const displayedBooks = document.querySelectorAll('.bookopts[style="visibility: visible;"]');

    displayedBooks.forEach(bookDiv => {
        productList.insertBefore(bookDiv, productList.firstChild);
    });
}





