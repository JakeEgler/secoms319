// toggle between Cart and Browse views
document.getElementById("cart-tab").addEventListener("click", function () {
  document.getElementById("cart-view").style.display = "block";
  document.getElementById("browse-view").style.display = "none";
});

document.getElementById("browse-tab").addEventListener("click", function () {
  document.getElementById("cart-view").style.display = "none";
  document.getElementById("browse-view").style.display = "block";
});

document.getElementById("checkout-btn").addEventListener("click", function () {
  document.getElementById("cart-view").style.display = "none";
  document.getElementById("browse-view").style.display = "none";
  document.getElementById("checkout-view").style.display = "block";
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

// adding items to the cart
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
  var finalPrice = 0;
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
    finalPrice = totalPrice * 1.075;
  }

  var totalPriceElement = document.createElement("li");
  totalPriceElement.className = "cart-item font-bold";
  totalPriceElement.innerHTML =
    "<span>Subtotal:</span>" +
    '<span class="ml-auto">$' +
    totalPrice.toFixed(2) +
    "</span>";
  cartList.appendChild(totalPriceElement);

  var finalPriceElement = document.createElement("li");
  finalPriceElement.className = "cart-item font-bold";
  finalPriceElement.innerHTML =
    "<span>Total:</span>" +
    '<span class="ml-auto">$' +
    finalPrice.toFixed(2) +
    "</span>";
  cartList.appendChild(finalPriceElement);
}

var removeAllButton = document.getElementById("removeAll-btn");
removeAllButton.addEventListener("click", function () {
  cartItems = [];
  updateCartView();
});

//This is the checkout page
document
  .getElementById("checkout-form-inner")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    var address = document.getElementById("address").value;
    var cardNumber = document.getElementById("card-number").value;
    var cardHolder = document.getElementById("card-holder").value;
    var expiryDate = document.getElementById("expiry-date").value;
    var cvv = document.getElementById("cvv").value;
    document.getElementById("checkout-view").style.display = "none";
    document.getElementById("thank-view").style.display = "block";

    //This is an attempt at making the confirmation page work.
    var cartList = document.getElementById("cart-list");
    cartList.innerHTML = "";
    var listItem = document.createElement("li");
    listItem.className = "cart-item";
    listItem.innerHTML =
      "<span>" + cardHolder + "</span>" + "<span>" + address + "</span>";
    cartList.appendChild(listItem);

    cartItems = [];
    updateCartView();
  });
