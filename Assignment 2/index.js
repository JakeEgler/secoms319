// Navbar button to go to the cart view
document.getElementById("cart-tab").addEventListener("click", function () {
  document.getElementById("cart-view").style.display = "block";
  document.getElementById("browse-view").style.display = "none";
  document.getElementById("checkout-view").style.display = "none";
  document.getElementById("thank-view").style.display = "none";
});

// Navbar button to go to the browse view
document.getElementById("browse-tab").addEventListener("click", function () {
  document.getElementById("cart-view").style.display = "none";
  document.getElementById("browse-view").style.display = "block";
  document.getElementById("checkout-view").style.display = "none";
  document.getElementById("thank-view").style.display = "none";
});

// Button to go to the checkout view from the cart view
document.getElementById("checkout-btn").addEventListener("click", function () {
  document.getElementById("cart-view").style.display = "none";
  document.getElementById("browse-view").style.display = "none";
  document.getElementById("checkout-view").style.display = "block";
  document.getElementById("thank-view").style.display = "none";
});

// Button to return to the browse view from the cart view
document.getElementById("browse-btn").addEventListener("click", function () {
  document.getElementById("cart-view").style.display = "none";
  document.getElementById("browse-view").style.display = "block";
  document.getElementById("checkout-view").style.display = "none";
  document.getElementById("thank-view").style.display = "none";
});

// Button to return to the cart view from the checkout view
document.getElementById("cart-btn").addEventListener("click", function () {
  document.getElementById("cart-view").style.display = "block";
  document.getElementById("browse-view").style.display = "none";
  document.getElementById("checkout-view").style.display = "none";
  document.getElementById("thank-view").style.display = "none";
});

// Button to go to the thank view from the checkout view
document.getElementById("thank-btn").addEventListener("click", function () {
  document.getElementById("cart-view").style.display = "none";
  document.getElementById("browse-view").style.display = "none";
  document.getElementById("checkout-view").style.display = "none";
  document.getElementById("thank-view").style.display = "block";
});


// Search functionality
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


// Add an item to the cart
var cartItems = [];
var totalPrice;

var addToCartButtons = document.getElementsByClassName("add-to-cart-btn");
for (var i = 0; i < addToCartButtons.length; i++) {
  addToCartButtons[i].addEventListener("click", function () {
    var present = -1;
    var productCard = this.parentNode;
    var productName = productCard.getElementsByTagName("h3")[0].innerText;
    var productPrice = productCard.getElementsByTagName("p")[0].innerText;
    var productImage = productCard.getElementsByTagName("img")[0].src;
    var cartItem = {
      name: productName,
      price: productPrice,
      image: productImage,
      quantity: Number(1),
    };
    for(j = 0; j < cartItems.length; j++)
    {
      if(cartItems[j].name == cartItem.name)
      {
        cartItems[j].quantity += 1;
        productCard.getElementsByTagName("var")[0].innerText = cartItems[j].quantity;
        var price = Number(cartItems[j].price.substring(1));
        var quantity = cartItems[j].quantity;
        price = (price/(quantity-1)) * quantity;
        cartItems[j].price = "$" + price;
        present++;

      }
    }
    if(present == -1)
    {
      cartItems.push(cartItem);
      productCard.getElementsByTagName("var")[0].innerText = 1;
    }
    
    updateCartView();
  });
}


// Function to update the cart view
function updateCartView() {
  var cartList = document.getElementById("cart-list");
  cartList.innerHTML = "";
  var finalPrice = 0;
  var taxPrice = 0;
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
      cartItem.quantity +
      "</span>" +
      '<span class="ml-auto">' +
      cartItem.price +
      "</span>" +
      '<button id="remove-btn">Remove</button>';
    cartList.appendChild(listItem);
    totalPrice += parseFloat(cartItem.price.replace("$", ""));
    taxPrice = totalPrice * 0.075;
    finalPrice = totalPrice + taxPrice;
  }

  var totalPriceElement = document.createElement("li");
  totalPriceElement.className = "cart-item font-bold";
  totalPriceElement.innerHTML =
    "<span>Subtotal:</span>" +
    '<span class="ml-auto">$' +
    totalPrice.toFixed(2) +
    "</span>";
  cartList.appendChild(totalPriceElement);

  var taxPriceElement = document.createElement("li");
  taxPriceElement.className = "cart-item font-bold";
  taxPriceElement.innerHTML =
    "<span>Tax:</span>" +
    '<span class="ml-auto">$' +
    taxPrice.toFixed(2) +
    "</span>";
  cartList.appendChild(taxPriceElement);

  var finalPriceElement = document.createElement("li");
  finalPriceElement.className = "cart-item font-bold";
  finalPriceElement.innerHTML =
    "<span>Total:</span>" +
    '<span class="ml-auto">$' +
    finalPrice.toFixed(2) +
    "</span>";
  cartList.appendChild(finalPriceElement);
}


// Empty the entire cart
var removeAllButton = document.getElementById("removeAll-btn");
removeAllButton.addEventListener("click", function () {
  cartItems = [];
  updateCartView();
});

// Remove an item from the cart
var removeButton = document.getElementsByClassName("remove-btn");
for (var i = 0; i < addToCartButtons.length; i++) {
  removeButton[i].addEventListener("click", function () {
    var present = -1;
    var productCard = this.parentNode;
    var productName = productCard.getElementsByTagName("h3")[0].innerText;
    var productPrice = productCard.getElementsByTagName("p")[0].innerText;
    var productImage = productCard.getElementsByTagName("img")[0].src;
    var cartItem = {
      name: productName,
      price: productPrice,
      image: productImage,
      quantity: Number(1),
    };
    for(j = 0; j < cartItems.length; j++)
    {
      // If the item being removed has 2 or more of it in the cart
      if(cartItems[j].name == cartItem.name && cartItems[j].quantity > 1)
      {
        cartItems[j].quantity -= 1;
        productCard.getElementsByTagName("var")[0].innerText = cartItems[j].quantity;
        var price = Number(cartItems[j].price.substring(1));
        var quantity = cartItems[j].quantity;
        price = (price/(quantity+1)) * quantity;
        cartItems[j].price = "$" + price;
        present++;
        console.log("Item removed");
      }
      // If the item being removed has 1 or less of it in the cart
      else if(cartItems[j].name == cartItem.name && cartItems[j].quantity <= 1)
      {
        productCard.getElementsByTagName("var")[0].innerText = 0;
        var newCartItems = [];
        for(k = 0; k < cartItems.length; k++)
        {
          if(k != j)
          {
            newCartItems.push(cartItems[k])
          }
        }
        cartItems = newCartItems;
      }
    }
    
    updateCartView();
  });
}


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
