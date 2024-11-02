/* Create an array named products which you will use to add all of your product object literals that you create in the next step. */

/* Create 3 or more product objects using object literal notation 
   Each product should include five properties
   - name: name of product (string)
   - price: price of product (number)
   - quantity: quantity in cart should start at zero (number)
   - productId: unique id for the product (number)
   - image: picture of product (url string)
*/

/* Images provided in /images folder. All images from Unsplash.com
   - cherry.jpg by Mae Mu
   - orange.jpg by Mae Mu
   - strawberry.jpg by Allec Gomes
*/

/* Declare an empty array named cart to hold the items in the cart */

/* Create a function named addProductToCart that takes in the product productId as an argument
  - addProductToCart should get the correct product based on the productId
  - addProductToCart should then increase the product's quantity
  - if the product is not already in the cart, add it to the cart
*/

/* Create a function named increaseQuantity that takes in the productId as an argument
  - increaseQuantity should get the correct product based on the productId
  - increaseQuantity should then increase the product's quantity
*/

/* Create a function named decreaseQuantity that takes in the productId as an argument
  - decreaseQuantity should get the correct product based on the productId
  - decreaseQuantity should decrease the quantity of the product
  - if the function decreases the quantity to 0, the product is removed from the cart
*/

/* Create a function named removeProductFromCart that takes in the productId as an argument
  - removeProductFromCart should get the correct product based on the productId
  - removeProductFromCart should update the product quantity to 0
  - removeProductFromCart should remove the product from the cart
*/

/* Create a function named cartTotal that has no parameters
  - cartTotal should iterate through the cart to get the total of all products
  - cartTotal should return the sum of the products in the cart
*/

/* Create a function called emptyCart that empties the products from the cart */

/* Create a function named pay that takes in an amount as an argument
  - pay will return a negative number if there is a remaining balance
  - pay will return a positive number if money should be returned to customer
*/

/* Place stand out suggestions here (stand out suggestions can be found at the bottom of the project rubric.)*/


/* The following is for running unit tests. 
   To fully complete this project, it is expected that all tests pass.
   Run the following command in terminal to run tests
   npm run test
*/
const products = [
  { productId: 1, name: "Apple", price: 2, quantity: 0, image: "./images/apple.jpg" },
  { productId: 2, name: "Orange", price: 3, quantity: 0, image: "./images/orange.jpg" },
  { productId: 3, name: "Banana", price: 1.5, quantity: 0, image: "./images/banana.jpg" }
];

let cart = [];

// Thêm sản phẩm vào giỏ hàng
function addProductToCart(productId) {
  const product = products.find(p => p.productId === productId);
  if (product) {
      product.quantity += 1; // Tăng số lượng sản phẩm
      const existingProduct = cart.find(p => p.productId === productId);
      if (!existingProduct) {
          cart.push(product); // Thêm sản phẩm vào giỏ hàng nếu chưa có
      }
  }
}

// Tăng số lượng sản phẩm trong giỏ hàng
function increaseQuantity(productId) {
  const product = products.find(p => p.productId === productId);
  if (product) {
      product.quantity += 1; // Tăng số lượng
  }
}

// Giảm số lượng sản phẩm trong giỏ hàng
function decreaseQuantity(productId) {
  const product = products.find(p => p.productId === productId);
  if (product && product.quantity > 0) {
      product.quantity -= 1; // Giảm số lượng
      if (product.quantity === 0) {
          removeProductFromCart(productId); // Nếu số lượng về 0 thì loại bỏ
      }
  }
}

// Xóa sản phẩm khỏi giỏ hàng
function removeProductFromCart(productId) {
  const productIndex = cart.findIndex(p => p.productId === productId);
  if (productIndex !== -1) {
      cart[productIndex].quantity = 0; // Đặt số lượng về 0
      cart.splice(productIndex, 1); // Xóa sản phẩm khỏi giỏ hàng
  }
}

/**
 * Thanh toán giỏ hàng
 * @param {number} amount - Số tiền thanh toán
 * @returns {number} - Số tiền còn lại sau khi thanh toán
 */
function pay(amount) {
  const total = cartTotal();
  if (amount >= total) {
    cart = []; // Clear the cart
    return amount - total; // Return the remaining amount
  } else {
    return -1; // Indicate that the payment was insufficient
  }
}

// Tính tổng giá trị giỏ hàng
function cartTotal() {
  return cart.reduce((total, product) => total + (product.price * product.quantity), 0);
}

// Xuất ra các hàm và biến cần thiết
module.exports = {
  products,
  cart,
  addProductToCart,
  increaseQuantity,
  decreaseQuantity,
  removeProductFromCart,
  cartTotal,
  pay
};
