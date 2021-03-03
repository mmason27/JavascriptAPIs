//You are the owner of a coffee shop and you want to manage the orders you receive from the customers.

// Create an app which list all the coffee orders on a web page. You can also type in the email address in a textbox and search for a particular coffee order by email address. You should also be able to delete the coffee order. You should also be able to add a new coffee order.

let displayOrdersUl = document.getElementById("displayOrdersUl");
let displayButton = document.getElementById("displayButton");

let addButton = document.getElementById("addButton");
let addOrdersUl = document.getElementById("addOrdersUl");
let addOrdersContainer = document.getElementById("addOrdersContainer");

let emailTextBox = document.getElementById("emailTextBox");
let typeTextBox = document.getElementById("typeTextBox");
let sizeTextBox = document.getElementById("sizeTextBox");
let priceTextBox = document.getElementById("priceTextBox");

let deleteTextBox = document.getElementById("deleteTextBox");
let deleteButton = document.getElementById("deleteButton");

//STEP ONE: Display all coffee orders on the webpage using GET

displayButton.addEventListener("click", function () {
  let request = new XMLHttpRequest();

  request.open("GET", "https://troubled-peaceful-hell.glitch.me/orders");
  request.send();

  request.addEventListener("load", function () {
    let coffeeOrders = JSON.parse(this.responseText);
    console.log(coffeeOrders);

    let orderItem = coffeeOrders.map((order) => {
      return `<li>
                    <p id ="email">Email: ${order.email}</p>
                    <p id="type">Coffee: ${order.type}</p>
                    <p id="size">Size: ${order.size}</p>
                    <p id="price">Price: $${order.price}</p>
                    </li>`;
    });

    displayOrdersUl.innerHTML = orderItem.join("");
  });
});

//STEP TWO: add a new coffee order using POST

addButton.addEventListener("click", function () {
  displayOrdersUl.innerHTML = "";
  emailTextBox.value = "";
  typeTextBox.value = "";
  sizeTextBox.value = "";
  priceTextBox.value = "";

  let email = emailTextBox.value;
  let type = typeTextBox.value;
  let size = sizeTextBox.value;
  let price = priceTextBox.value;

  let requestParams = {
    email: email,
    type: type,
    size: size,
    price: parseFloat(price),
  };

  let addRequest = new XMLHttpRequest();

  addRequest.addEventListener("load", function () {
    console.log(addRequest);
  });

  addRequest.open("POST", "https://troubled-peaceful-hell.glitch.me/orders");
  addRequest.setRequestHeader("Content-Type", "application/json");
  addRequest.send(JSON.stringify(requestParams));
});

//STEP THREE: Delete an order using DELETE

deleteButton.addEventListener("click", function () {
    let email = deleteTextBox.value;
  
    let deleteRequest = new XMLHttpRequest();
    deleteRequest.open(
      "DELETE",
      `https://troubled-peaceful-hell.glitch.me/orders/${email}`
    );
    deleteRequest.send();
  });
