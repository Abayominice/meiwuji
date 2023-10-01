/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */

// function myFunction() {
//   const menu_item = document.querySelector(".menuitems");
//   const menu_toggler = document.querySelector(".icimg");
//   menu_item.classList.toggle("show");
// }

// function hideNav() {
//   const main_menu_is_visible = document.querySelector(".show");
//   if (main_menu_is_visible) {
//     const menu_item = document.querySelector(".menuitems");
//     menu_item.classList.remove("show");
//   }
// }

// Get a reference to the pay button by its ID (assuming the button has an ID of "payButton")
// const payButton = document.getElementById("payButton");

// // Add a click event listener to the pay button
// payButton.addEventListener("click", async () => {
//   // Call the payNow function when the button is clicked
//   await initializePayment();
// });

const emailForm = document.getElementById("payButton");

emailForm &&
  emailForm.addEventListener(
    "click",
    async (event) => {
      event.preventDefault(); // Prevent default form submission behavior

      const email = document.querySelector(".email-input").value;
      const name = document.querySelector(".name-input").value;
      const phone = document.querySelector(".phone-input").value;

      const submitButton = document.querySelector(".email-form-submit");

      const data = {
        email,
        name,
        phone,
      };

      var publicKey = "FLWPUBK_TEST-939acb7e72fe1cc610ea491135e2e4b1-X";
      var txRef = Date.now().toString();
      var amount = 1500; // Amount in the smallest currency unit (e.g., kobo in NGN)
      var currency = "NGN"; // Currency code

      try {
        const onPaymentDone = async (submitButton) => {
          submitButton.textContent = "loading...";

          submitButton.textContent = "Successfull";
          submitButton.style.opacity = "0.5";
          submitButton.disabled = true;
        };

        var paymentData = {
          tx_ref: txRef,
          amount: amount,
          currency: currency,
          // redirect_url: "https://yourwebsite.com/download", // Redirect URL after payment
          payment_type: "card", // Payment type (card, bank_transfer, etc.)
          customer: {
            email,
            name,
            phone,
          },
          meta: {
            email,
            name,
            phone,
          },
          public_key: publicKey,
          callback: async (data) => {
            await verifyPayment(data.transaction_id);
            await onPaymentDone(submitButton);
          },
        };
        FlutterwaveCheckout(paymentData);
      } catch (err) {
        submitButton.textContent = "Error. Try again later";

        submitButton.disabled = true;
        submitButton.style.opacity = "0.5";
      }
    },
    true
  );

const verifyPayment = async (txRef) => {
  try {
    const response = await fetch(`/processPayment/${txRef}`, {
      method: "GET",
    });

    const result = await response.json();
    if (result.status == "success") {
      location.assign("/download");
    }
  } catch (error) {
    // location.assign("/error");
  }
};

const onPaymentDone = async (submitButton) => {
  submitButton.textContent = "loading...";

  submitButton.textContent = "Successfull";
  submitButton.style.opacity = "0.5";
  submitButton.disabled = true;
};
