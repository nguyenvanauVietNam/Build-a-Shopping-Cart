let currencySymbol = '$';

// Function to render the list of products in the HTML
function drawProducts() {
    let productList = document.querySelector('.products');
    let productItems = '';
    products.forEach((element) => {
        productItems += `
            <div data-productId='${element.productId}'>
                <img src='${element.image}' alt='${element.name}'>
                <h3>${element.name}</h3>
                <p>Price: ${currencySymbol}${element.price}</p>
                <button class="add-to-cart">Add to Cart</button>
            </div>
        `;
    });
    productList.innerHTML = productItems;
}

// Function to render the cart content in the HTML
function drawCart() {
    let cartList = document.querySelector('.cart');
    let cartItems = '';
    cart.forEach((element) => {
        let itemTotal = element.price * element.quantity;
        cartItems += `
            <div data-productId='${element.productId}'>
                <h3>${element.name}</h3>
                <p>Price: ${currencySymbol}${element.price}</p>
                <p>Quantity: ${element.quantity}</p>
                <p>Total: ${currencySymbol}${itemTotal}</p>
                <button class="qup">+</button>
                <button class="qdown">-</button>
                <button class="remove">Remove</button>
            </div>
        `;
    });
    cartList.innerHTML = cart.length ? cartItems : 'Cart Empty';
}

// Function to render the checkout summary
function drawCheckout() {
    let checkout = document.querySelector('.cart-total');
    checkout.innerHTML = '';
    let cartSum = cartTotal();
    let div = document.createElement('div');
    div.innerHTML = `<p>Cart Total: ${currencySymbol}${cartSum}</p>`;
    checkout.append(div);
}

// Initialize store display with product list, cart, and checkout
drawProducts();
drawCart();
drawCheckout();

// Event listener for adding products to the cart
document.querySelector('.products').addEventListener('click', (e) => {
    if (e.target.classList.contains('add-to-cart')) {
        let productId = parseInt(e.target.parentNode.getAttribute('data-productId'));
        addProductToCart(productId);
        drawCart();
        drawCheckout();
    }
});

// Event listener for managing cart actions (increase, decrease, remove)
document.querySelector('.cart').addEventListener('click', (e) => {
    let productId = parseInt(e.target.parentNode.getAttribute('data-productId'));

    if (e.target.classList.contains('remove')) {
        removeProductFromCart(productId);
    } else if (e.target.classList.contains('qup')) {
        increaseQuantity(productId);
    } else if (e.target.classList.contains('qdown')) {
        decreaseQuantity(productId);
    }

    drawCart();
    drawCheckout();
});

// Event listener for payment actions
document.querySelector('.pay').addEventListener('click', (e) => {
    e.preventDefault();
    let amount = parseFloat(document.querySelector('.received').value);
    let cashReturn = pay(amount);
    let paymentSummary = document.querySelector('.pay-summary');
    let div = document.createElement('div');

    if (cashReturn >= 0) {
        div.innerHTML = `
            <p>Cash Received: ${currencySymbol}${amount}</p>
            <p>Cash Returned: ${currencySymbol}${cashReturn}</p>
            <p>Thank you!</p>
        `;
        emptyCart();
    } else {
        document.querySelector('.received').value = '';
        div.innerHTML = `
            <p>Cash Received: ${currencySymbol}${amount}</p>
            <p>Remaining Balance: ${currencySymbol}${Math.abs(cashReturn)}</p>
            <p>Please pay additional amount.</p>
            <hr/>
        `;
    }
    paymentSummary.append(div);
    drawCart();
    drawCheckout();
});


/* Standout suggestions */
/* Begin remove all items from cart */
// function dropCart(){
//     let shoppingCart = document.querySelector('.empty-btn');
//     let div = document.createElement("button");
//     div.classList.add("empty");
//     div.innerHTML =`Empty Cart`;
//     shoppingCart.append(div);
// }
// dropCart();

// document.querySelector('.empty-btn').addEventListener('click', (e) => {
//     if (e.target.classList.contains('empty')){
//         emptyCart();
//         drawCart();
//         drawCheckout();
//     }
// })
/* End all items from cart */

/* Begin currency converter */
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

// document.querySelector('.currency-select').addEventListener('change', function handleChange(event) {
//     switch(event.target.value){
//         case 'EUR':
//             currencySymbol = '€';
//             break;
//         case 'YEN':
//             currencySymbol = '¥';
//             break;
//         default:
//             currencySymbol = '$';
//             break;
//      }

//     currency(event.target.value);
//     drawProducts();
//     drawCart();
//     drawCheckout();
// });
/* End currency converter */
/* End standout suggestions */
