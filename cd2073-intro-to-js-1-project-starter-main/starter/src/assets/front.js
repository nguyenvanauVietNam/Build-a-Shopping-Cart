let currencySymbol = '$'; // Initialize the currency symbol for display

// Function to render the list of products in the HTML
function drawProducts() {
    let productList = document.querySelector('.products'); // Select the HTML element where products will be displayed
    let productItems = ''; // Initialize a string to hold the HTML for product items
    
    // Iterate over the products array and create HTML for each product
    products.forEach((element) => {
        productItems += `
            <div data-productId='${element.productId}'>
                <img src='${element.image}' alt='${element.name}'> <!-- Product image -->
                <h3>${element.name}</h3> <!-- Product name -->
                <p>Price: ${currencySymbol}${element.price}</p> <!-- Product price -->
                <button class="add-to-cart">Add to Cart</button> <!-- Button to add product to cart -->
            </div>
        `;
    });
    productList.innerHTML = productItems; // Inject the generated HTML into the product list container
}

// Function to render the cart content in the HTML
function drawCart() {
    let cartList = document.querySelector('.cart'); // Select the HTML element for the cart
    let cartItems = ''; // Initialize a string for cart items
    
    // Iterate over the cart array to create HTML for each item
    cart.forEach((element) => {
        let itemTotal = element.price * element.quantity; // Calculate total for the item
        cartItems += `
            <div data-productId='${element.productId}'>
                <h3>${element.name}</h3> <!-- Product name -->
                <p>Price: ${currencySymbol}${element.price}</p> <!-- Product price -->
                <p>Quantity: ${element.quantity}</p> <!-- Quantity in cart -->
                <p>Total: ${currencySymbol}${itemTotal}</p> <!-- Total price for this item -->
                <button class="qup">+</button> <!-- Button to increase quantity -->
                <button class="qdown">-</button> <!-- Button to decrease quantity -->
                <button class="remove">Remove</button> <!-- Button to remove item -->
            </div>
        `;
    });
    // If cart is empty, display a message; otherwise, display the cart items
    cartList.innerHTML = cart.length ? cartItems : 'Cart Empty';
}

// Function to render the checkout summary
function drawCheckout() {
    let checkout = document.querySelector('.cart-total'); // Select the checkout summary element
    checkout.innerHTML = ''; // Clear previous checkout summary
    let cartSum = cartTotal(); // Calculate the total value of the cart
    let div = document.createElement('div'); // Create a new div for displaying the total
    div.innerHTML = `<p>Cart Total: ${currencySymbol}${cartSum}</p>`; // Set total in the div
    checkout.append(div); // Append the div to the checkout summary
}

// Initialize store display with product list, cart, and checkout
drawProducts(); // Draw the list of products
drawCart(); // Draw the current state of the cart
drawCheckout(); // Draw the checkout summary

// Event listener for adding products to the cart
document.querySelector('.products').addEventListener('click', (e) => {
    if (e.target.classList.contains('add-to-cart')) { // Check if the clicked element is the add-to-cart button
        let productId = parseInt(e.target.parentNode.getAttribute('data-productId')); // Get the productId from the data attribute
        addProductToCart(productId); // Call the function to add the product to the cart
        drawCart(); // Update the cart display
        drawCheckout(); // Update the checkout display
    }
});

// Event listener for managing cart actions (increase, decrease, remove)
document.querySelector('.cart').addEventListener('click', (e) => {
    let productId = parseInt(e.target.parentNode.getAttribute('data-productId')); // Get the productId from the data attribute

    if (e.target.classList.contains('remove')) { // If the remove button is clicked
        removeProductFromCart(productId); // Remove the product from the cart
    } else if (e.target.classList.contains('qup')) { // If the increase button is clicked
        increaseQuantity(productId); // Increase the quantity of the product
    } else if (e.target.classList.contains('qdown')) { // If the decrease button is clicked
        decreaseQuantity(productId); // Decrease the quantity of the product
    }

    drawCart(); // Update the cart display
    drawCheckout(); // Update the checkout display
});

// Event listener for payment actions
document.querySelector('.pay').addEventListener('click', (e) => {
    e.preventDefault(); // Prevent the default form submission
    let amount = parseFloat(document.querySelector('.received').value); // Get the payment amount from input
    let cashReturn = pay(amount); // Process the payment and get the cash return amount
    let paymentSummary = document.querySelector('.pay-summary'); // Select the payment summary element
    let div = document.createElement('div'); // Create a new div for displaying payment results

    // If payment is successful
    if (cashReturn >= 0) {
        div.innerHTML = `
            <p>Cash Received: ${currencySymbol}${amount}</p>
            <p>Cash Returned: ${currencySymbol}${cashReturn}</p>
            <p>Thank you!</p>
        `;
        emptyCart(); // Clear the cart after payment
    } else { // If there is a remaining balance
        document.querySelector('.received').value = ''; // Clear the input field
        div.innerHTML = `
            <p>Cash Received: ${currencySymbol}${amount}</p>
            <p>Remaining Balance: ${currencySymbol}${Math.abs(cashReturn)}</p>
            <p>Please pay additional amount.</p>
            <hr/>
        `;
    }
    paymentSummary.append(div); // Append the result to the payment summary
    drawCart(); // Update the cart display
    drawCheckout(); // Update the checkout display
});

/* Standout suggestions */
/* Begin remove all items from cart */
// Function to create an empty cart button
// function dropCart(){
//     let shoppingCart = document.querySelector('.empty-btn');
//     let div = document.createElement("button");
//     div.classList.add("empty");
//     div.innerHTML =`Empty Cart`;
//     shoppingCart.append(div);
// }
// dropCart();

// Add event listener for emptying the cart
// document.querySelector('.empty-btn').addEventListener('click', (e) => {
//     if (e.target.classList.contains('empty')){
//         emptyCart(); // Clear the cart
//         drawCart(); // Update the cart display
//         drawCheckout(); // Update the checkout display
//     }
// });
/* End all items from cart */

/* Begin currency converter */
// Function to create a currency selection dropdown
// function currencyBuilder(){
//     let currencyPicker = document.querySelector('.currency-selector');
//     let select = document.createElement("select");
//     select.classList.add("currency-select");
//     select.innerHTML = `<option value="USD">USD</option>
//                         <option value="EUR">EUR</option>
//                         <option value="YEN">YEN</option>`;
//     currencyPicker.append(select);
// }
// currencyBuilder();

// Event listener for changing currency selection
// document.querySelector('.currency-select').addEventListener('change', function handleChange(event) {
//     switch(event.target.value){
//         case 'EUR':
//             currencySymbol = '€'; // Change currency symbol to Euro
//             break;
//         case 'YEN':
//             currencySymbol = '¥'; // Change currency symbol to Yen
//             break;
//         default:
//             currencySymbol = '$'; // Default to USD
//             break;
//     }

//     currency(event.target.value); // Call function to handle currency conversion
//     drawProducts(); // Redraw products with the new currency
//     drawCart(); // Redraw cart with the new currency
//     drawCheckout(); // Redraw checkout summary with the new currency
// });
/* End currency converter */
/* End standout suggestions */
