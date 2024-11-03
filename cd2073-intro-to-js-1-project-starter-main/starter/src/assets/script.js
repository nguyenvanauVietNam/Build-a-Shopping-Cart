//Remove comment for mentor Udacity
// This comment => "Please remove all these starter instructions commments"

/* The following is for running unit tests. 
   To fully complete this project, it is expected that all tests pass.
   Run the following command in terminal to run tests
   npm run test
*/
/* Create an array named products which you will use to add all of your product object literals that you create in the next step. */
const products = [
  /* Create 3 or more product objects using object literal notation 
     Each product should include five properties
     - name: name of product (string)
     - price: price of product (number)
     - quantity: quantity in cart should start at zero (number)
     - productId: unique id for the product (number)
     - image: picture of product (url string) */
  { productId: 1, name: "Apple", price: 2, quantity: 0, image: "./images/apple.jpg" },
  { productId: 2, name: "Orange", price: 3, quantity: 0, image: "./images/orange.jpg" },
  { productId: 3, name: "Banana", price: 1.5, quantity: 0, image: "./images/banana.jpg" }
];

/* Declare an empty array named cart to hold the items in the cart */
let cart = [];

/* Create a function named addProductToCart that takes in the product productId as an argument
  - addProductToCart should get the correct product based on the productId
  - addProductToCart should then increase the product's quantity
  - if the product is not already in the cart, add it to the cart */
function addProductToCart(productId) {
  const product = products.find(p => p.productId === productId);
  if (product) {
      product.quantity += 1; // Increase product quantity
      const existingProduct = cart.find(p => p.productId === productId);
      if (!existingProduct) {
          cart.push(product); // Add product to cart if it's not already there
      }
  }
}

/* Create a function named increaseQuantity that takes in the productId as an argument
  - increaseQuantity should get the correct product based on the productId
  - increaseQuantity should then increase the product's quantity */
function increaseQuantity(productId) {
  const product = products.find(p => p.productId === productId);
  if (product) {
      product.quantity += 1; // Increase quantity
  }
}


/*
Fix comment for mentor Udacity
Did Not Pass
Line 123
Your code lacks comments. Comments Plays very important Role in making the code more understandable.
Please add Descriptive comments to your code to describe how the functions work and what specific lines do.
you can read more about how to write better comments from the following resources:
• http://stackoverflow.com/questions/6815903/what-is-the-
correct-way-of-code-comments-in-javascript
Udacity Javascript Style-Guide Comments section.
*/ 
/* Function to decrease the quantity of a product in the cart
   - This function takes `productId` as an argument to identify the correct product
   - It decreases the quantity of the specified product by 1
   - If the quantity reaches 0 after decrement, the product is removed from the cart */
   function decreaseQuantity(productId) {
    // Find the product in the products array based on the provided productId
    const product = products.find(p => p.productId === productId);
  
    // Check if the product exists and has a quantity greater than 0
    if (product && product.quantity > 0) {
        product.quantity -= 1; // Decrease the product quantity by 1
  
        // If the quantity reaches 0, remove the product from the cart
        if (product.quantity === 0) {
            removeProductFromCart(productId); // Remove product from cart if quantity is 0
        }
    }
  }
  

/* Create a function named removeProductFromCart that takes in the productId as an argument
  - removeProductFromCart should get the correct product based on the productId
  - removeProductFromCart should update the product quantity to 0
  - removeProductFromCart should remove the product from the cart */
function removeProductFromCart(productId) {
  const productIndex = cart.findIndex(p => p.productId === productId);
  if (productIndex !== -1) {
      cart[productIndex].quantity = 0; // Set quantity to 0
      cart.splice(productIndex, 1); // Remove product from cart
  }
}

/* Create a function named cartTotal that has no parameters
  - cartTotal should iterate through the cart to get the total of all products
  - cartTotal should return the sum of the products in the cart */
function cartTotal() {
  return cart.reduce((total, product) => total + (product.price * product.quantity), 0);
}

/* Create a function called emptyCart that empties the products from the cart */
function emptyCart() {
  cart = []; // Clear the cart
}

/* Comment for mentor Udacity 
Mentor comment:
Did Not Pass
Line 152
you need to add this amount to totalPaid and then calculate the remaining balance from the difference of totalPaid and cartTotal and return the remaining balance and also empty the cart and reset totalPaid variable to 0 if remaining >= (i.e totalPaid is more than cartTotal).
Mentor suggestions:
function pay (amount) {
// Add the current payment amount to the total Paid varia totalPaid + .....;
// Calculate the difference between the totalPaid and th let remaining =
...
// Check if the remaining amount is greater than or equa if (remaining >= 0) {
}
// If so, reset the total Paid to zero to prepare i // payment, as the current payment is enough to cove totalPaid = ...;
emptyCart()
// Return the remaining (negative if payment is less tha return
;
}
*/
/* Create a function named pay that takes in an amount as an argument
  - pay will return a negative number if there is a remaining balance
  - pay will return a positive number if money should be returned to customer */
/* Function to handle the payment process
   - Takes in `amount` as an argument, representing the payment amount
   - Adds `amount` to `totalPaid`
   - Calculates the remaining balance by finding the difference between `totalPaid` and `cartTotal`
   - If `totalPaid` covers or exceeds `cartTotal`, it resets `totalPaid` to zero, clears the cart, and returns the remaining balance
   - If payment is insufficient, it returns the remaining balance as a negative number */
   let totalPaid = 0;

   function pay(amount) {
    // Add the current payment amount to the running total of totalPaid
    totalPaid += amount;
  
    // Calculate the remaining balance by subtracting the cart total from totalPaid
    const remaining = totalPaid - cartTotal();
  
    // Check if the remaining balance is enough to cover the cart total
    if (remaining >= 0) {
      totalPaid = 0; // Reset totalPaid to zero for future payments
      emptyCart(); // Empty the cart since the payment is sufficient
    }
  
    // Return the remaining balance: positive if overpaid, negative if balance is still due
    return remaining;
  }

/* The following is for running unit tests. 
   To fully complete this project, it is expected that all tests pass.
   Run the following command in terminal to run tests
   npm run test */

module.exports = {
  products,
  cart,
  addProductToCart,
  increaseQuantity,
  decreaseQuantity,
  removeProductFromCart,
  cartTotal,
  pay,
  emptyCart
};
