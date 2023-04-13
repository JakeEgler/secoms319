// toggle between Cart and Browse views
document.getElementById("cart-tab").addEventListener("click", function () {
  document.getElementById("cart-view").style.display = "block";
  document.getElementById("browse-view").style.display = "none";
});

document.getElementById("browse-tab").addEventListener("click", function () {
  document.getElementById("cart-view").style.display = "none";
  document.getElementById("browse-view").style.display = "block";
});

// search functionality
document
  .getElementById("search-input")
  .addEventListener("input", function (event) {
    var searchValue = event.target.value.toLowerCase();
    var productCards = document.getElementsByClassName("product-card");
    for (var i = 0; i < productCards.length; i++) {
      var productName = productCards[i]
        .getElementsByTagName("h3")[0]
        .innerText.toLowerCase();
      if (productName.indexOf(searchValue) > -1) {
        productCards[i].style.display = "block";
      } else {
        productCards[i].style.display = "none";
      }
    }
  });

// adding products to the cart
var cartItems = [];

var totalPrice;

var addToCartButtons = document.getElementsByClassName("add-to-cart-btn");
for (var i = 0; i < addToCartButtons.length; i++) {
  addToCartButtons[i].addEventListener("click", function () {
    var productCard = this.parentNode;
    var productName = productCard.getElementsByTagName("h3")[0].innerText;
    var productPrice = productCard.getElementsByTagName("p")[0].innerText;
    var productImage = productCard.getElementsByTagName("img")[0].src;
    var cartItem = {
      name: productName,
      price: productPrice,
      image: productImage,
    };
    cartItems.push(cartItem);
    updateCartView();
  });
}

// Function to update the cart view
function updateCartView() {
  var cartList = document.getElementById("cart-list");
  cartList.innerHTML = "";
  var totalPrice = 0;
  for (var i = 0; i < cartItems.length; i++) {
    var cartItem = cartItems[i];
    var listItem = document.createElement("li");
    listItem.className = "cart-item";
    listItem.innerHTML =
      '<img src="' +
      cartItem.image +
      '" width="50" height="50" alt="' +
      cartItem.name +
      '">' +
      "<span>" +
      cartItem.name +
      "</span>" +
      '<span class="ml-auto">' +
      cartItem.price +
      "</span>" +
      '<button id="remove-btn">Remove</button>';
    cartList.appendChild(listItem);
    totalPrice += parseFloat(cartItem.price.replace("$", ""));
  }

  var totalPriceElement = document.createElement("li");
  totalPriceElement.className = "cart-item font-bold";
  totalPriceElement.innerHTML =
    "<span>Total:</span>" +
    '<span class="ml-auto">$' +
    totalPrice.toFixed(2) +
    "</span>";
  cartList.appendChild(totalPriceElement);
}

var removeAllButton = document.getElementById("removeAll-btn");
removeAllButton.addEventListener("click", function () {
  cartItems = [];
  updateCartView();
});

// cart checkout
var checkoutButton = document.getElementById("checkout-btn");
checkoutButton.addEventListener("click", function () {
  if (cartItems.length > 0) {
    alert("Thank you for your purchase!");
    cartItems = [];
    updateCartView();
  } else {
    alert("Your cart is empty. Please add some items before checking out.");
  }
});
