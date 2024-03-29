document.onreadystatechange = function () {
  let state = document.readyState;
  if (state == "complete") {
    setTimeout(() => {
      document.getElementById("loader").style.visibility = "hidden";
      document.getElementById("headerMain").style.opacity = "1";
      document.getElementById("navbarMain").style.opacity = "1";
      document.getElementById("carouselMain").style.opacity = "1";
      document.getElementById("next").style.opacity = "1";
      document.getElementById("Video").style.opacity = "1";
      document.getElementById("prev").style.opacity = "1";
      loadCars();
    },1500);
  }
};
function showPass(pass) {
  let pass2 = document.getElementById(pass);
  if (pass2.type === "password") {
    pass2.type = "text";
  } else {
    pass2.type = "password";
  }
}
const containerLoginModal = document.querySelector("#modal-login-container")
const containerSignUpModal = document.querySelector("#modal-signup-container")
function openLogInForm() {
  const loginModal = document.getElementById("login-modal");
  const loginIframe = document.getElementById("login-iframe");
  document.body.style.overflow = "hidden";
  containerLoginModal.style.display = "flex";
  loginModal.style.display = "block";
  loginIframe.src = "login.html";
}

function closeLogInForm() {
  const loginModal = document.getElementById("login-modal");
  const loginIframe = document.getElementById("login-iframe");
  if(menuContainer.classList == "menu-container-open"){
  document.body.style.overflow = "hidden";
  }
  else{
  document.body.style.overflow = "auto";
  }
  loginModal.style.display = "none";
  containerLoginModal.style.display = "none";
  loginIframe.src = "";
  userHello();
}
function openSignUpForm() {
  const signupModal = document.getElementById("signup-modal");
  const signupIframe = document.getElementById("signup-iframe");
  document.body.style.overflow = "hidden";
  containerSignUpModal.style.display = "flex";
  signupModal.style.display = "block";
  signupIframe.src = "signup.html";
}

function closeSignUpForm() {
  const signupModal = document.getElementById("signup-modal");
  const signupIframe = document.getElementById("signup-iframe");
  if(menuContainer.classList = "menu-container-open"){
    document.body.style.overflow = "hidden";
  }
  else{
    document.body.style.overflow = "auto";
  }
  signupModal.style.display = "none";
  containerSignUpModal.style.display = "none";
  signupIframe.src = "";
}
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
}
function userHello() {
  let name = getCookie("username");
  if(name == undefined)
  {
    console.log("undefined name. not loginned yet")
  }
  else{
  document.getElementById("forms").innerHTML = `<div class='container-fluid'>
            <h2 style="font:italic;font-weight:600;color:white;">Hello, ${name}</h2>
        </div>`;
  } 
}
const slides = document.querySelectorAll(".slide");
const next = document.querySelector("#next");
const prev = document.querySelector("#prev");
const burgerMenu = document.querySelector("#menu-for-burger");
const burgerMenuContainer = document.querySelector(".menu-for-burger-container");
const burgerMenuSwitch = document.querySelector("#burger-menu-input");
const menuContainer = document.querySelector("#menu-container");
const navLogo = document.querySelector("#nav__logo");
const auto = true;
const intervalTime = 5000;
let slideInterval;
const nextSlide = () => {
  const current = document.querySelector(".current");
  current.classList.remove("current");
  if (current.nextElementSibling) {
    current.nextElementSibling.classList.add("current");
  } else {
    slides[0].classList.add("current");
  }
  setTimeout(() => current.classList.remove("current"));
};

const prevSlide = () => {
  const current = document.querySelector(".current");
  current.classList.remove("current");
  if (current.previousElementSibling) {
    current.previousElementSibling.classList.add("current");
  } else {
    slides[slides.length - 1].classList.add("current");
  }
  setTimeout(() => current.classList.remove("current"));
};

next.addEventListener("click", (e) => {
  nextSlide();
  if (auto) {
    clearInterval(slideInterval);
    slideInterval = setInterval(nextSlide, intervalTime);
  }
});

prev.addEventListener("click", (e) => {
  prevSlide();
  if (auto) {
    clearInterval(slideInterval);
    slideInterval = setInterval(nextSlide, intervalTime);
  }
});

burgerMenuSwitch.onchange = () => {
  if(burgerMenu.classList == 'menu-for-burger'){
    document.body.style.overflow = "hidden";
    menuContainer.classList = ('menu-container-open');
    burgerMenu.classList.add('open');
    burgerMenuContainer.classList = ("menu-for-burger-container-open");
    navLogo.classList = ('nav__logo-open');
  }
  else{
    document.body.style.overflow = "auto";
    menuContainer.classList = ('menu-container');
    burgerMenu.classList.remove('open');
    burgerMenuContainer.classList = ("menu-for-burger-container");
    navLogo.classList = ('nav__logo');
  }
}

if (auto) {
  slideInterval = setInterval(nextSlide, intervalTime);
}

function loadCars() {
  let xhttp = new XMLHttpRequest();
  xhttp.open("GET", "cars.json", true);
  xhttp.setRequestHeader("Content-type", "application/json; charset=utf-8");
  xhttp.send();
  xhttp.onreadystatechange = function () {
    if (xhttp.readyState != 4) return;
    if (xhttp.status != 200) {
      alert(xhttp.status + ": " + xhr.statusText);
    } else {
      let cars = JSON.parse(xhttp.responseText);
      insertCars(cars);
    }
  };
}
function insertCars(cars) {
  var str = `<div class="cars-div"> `;
  for (let i = 0; i < cars.length; i++) {
    str += `<div>`;
    str += `<div id="card" class="card">`;
    str += `<div id="photo" style="display: flex; width: 100%; justify-content:center;">`;
    str += `<img id="dot" src="images/dot.gif" class="fixed3" style="height:200px; width:350px;" data-src="${cars[i].img}">`;
    str += `</div>`;
    str += `<div class="card-body">`;
    str += `<h5 class="card-title">${cars[i].name}</h5>`;
    str += `<h5 class="card-title">${cars[i].price}</h5>`;
    str += `</div>`;
    str += `<div class="card-button">`;
    str += `<button onclick="loadCarsForCart(${i})" class="cars-div__button"> 
    <src class="fas fa-shopping-cart"></src>
    Add to cart</button>`;
    str += `<a href="car-${cars[i].number}.html" class="cars-div__anker"> 
    <src class="fas fa-car"></src>
    See this car</a>`;
    str += `</div>`;
    str += `</div>`;
    str += `</div>`;
  }
  str += `<div id="cartField" class="col col-6 field" style="position:relative; left: 950px; bottom:700px;">`;
  str += `</div>
          </div>`;
  document.getElementById("cars").innerHTML = str;
  let dot = document.getElementById("dot");
  let newImg = dot.getAttribute("data-src");
  function isVisible(elem) {
    let coords = elem.getBoundingClientRect();
    let windowHeight = document.documentElement.clientHeight;
    let topVisible = coords.top > 0 && coords.top < windowHeight;
    let bottomVisible = coords.bottom < windowHeight && coords.bottom > 0;
    return topVisible || bottomVisible;
  }
  function showVisible() {
    for (let img of document.querySelectorAll("img")) {
      let realSrc = img.dataset.src;
      if (!realSrc) continue;
      if (isVisible(img)) {
        img.src = realSrc;
        img.dataset.src = "";
      }
    }
  }
  showVisible();
  window.onscroll = showVisible;
}
function showModal(modal) {
  let div = document.getElementById(modal);
  div.style.display = "flex";
  document.body.style.overflow = "hidden";
}
function closeCart() {
  let div = document.getElementById("cartModal");
  div.style.display = "none";
  document.body.style.overflow = "auto";
}
function loadCarsForCart(id) {
  let xhttp = new XMLHttpRequest();
  xhttp.open("GET", "cars.json", true);
  xhttp.setRequestHeader("Content-type", "application/json; charset=utf-8");
  xhttp.send();
  xhttp.onreadystatechange = function () {
    if (xhttp.readyState != 4) return;
    if (xhttp.status != 200) {
      alert(xhttp.status + ": " + xhr.statusText);
    } else {
      let cars = JSON.parse(xhttp.responseText);
      addCarToCart(cars, id);
    }
  };
}

function cartHasAuto(cart, carNumber, price) {
  for(let i = 0; i < cart.length; i++){
    if(cart[i] && cart[i].firstChild && cart[i].firstChild.id && cart[i].firstChild.id == `cart-element-${carNumber}`){
      cart[i].firstChild.innerHTML = parseInt(cart[i].firstChild.innerHTML) + 1;
      console.log(cart);
      // let priceInt = parseFloat(price[i].firstChild.innerHTML.replace(/[^\d.]/g, '').replace(/\./g, '')) ;
      // price[i].firstChild.innerHTML = priceInt.toLocaleString('en-US', { style: 'currency', currency: 'USD' }).replace(/\.00$/, '');
      var cartHas = true;
      return cartHas;
    }
    else{
      var cartHas = false;
    }
  }
  return cartHas;
}

function addCarToCart(cars, id) {
  const cartQuantity = document.querySelector("#cart__column__quantity");
  const cartPrice = document.querySelector("#cart__column__price");
  var isCarInside = cartHasAuto(cartQuantity.childNodes, cars[id].number, cartPrice.childNodes);
  if(cartQuantity.childNodes[3] && isCarInside){
    return
  }
  else{
  const cartItem = document.querySelector("#cart__column__item");
  const cartName = document.querySelector("#cart__column__name");
  const cartRemove = document.querySelector("#cart__column__remove");
  let strItem = document.createElement("div");
  let strName = document.createElement("div");
  let strQuantity = document.createElement("div");
  let strPrice = document.createElement("div");
  let strRemove = document.createElement("div");
  strItem.innerHTML += `<div class="image" id="cart-element-${cars[id].number}"><img style="width:190px; height:100px;" src="${cars[id].img}"></div>`;
  strName.innerHTML += `<p class="cart__element" id="cart-element-${cars[id].number}">${cars[id].name}</p>`;
  strQuantity.innerHTML += `<p class="cart__element" data-name="${id}" id="cart-element-${cars[id].number}" class="count">1</p>`;
  strPrice.innerHTML += `<p class="cart__element" id="cart-element-${cars[id].number}">${cars[id].price}</p>`;   
  strRemove.innerHTML += `<div class="cart__element__button" id="cart-element-${cars[id].number}"><button class="remove-item btn btn-danger">Remove</button></div>`;
  cartItem.appendChild(strItem);
  cartName.appendChild(strName);
  cartQuantity.appendChild(strQuantity);
  cartPrice.appendChild(strPrice);
  cartRemove.appendChild(strRemove);
  const removeButton = strRemove.querySelector(".remove-item");
  removeButton.addEventListener("click", removeItem);
  }
}
function removeItem(event) {
  const row = event.target.parentNode;
  let auto = document.querySelectorAll(`#${row.id}`);
  for(let i = 0; i < auto.length; i++){
    auto[i].parentElement.remove();
    auto[i].remove();
  }
}
$(function () {
  const phrases = [
    "Hello! How can we help you today?",
    "Welcome to our auto shop! Is there anything we can assist you with?",
    "Good day! Are you in need of any car maintenance services?",
    "Hi there! Is there anything we can do to make your vehicle run smoother?",
    "Greetings! Do you have any questions about our services or pricing?",
    "Hello and welcome! How can we make your visit to our auto shop a great one?",
    "Hi! Is there anything we can do to help you get your vehicle back on the road?",
    "Hello and thanks for stopping by! How can we assist you with your car?",
    "Good afternoon! Are you in need of any maintenance or repair services for your vehicle?",
    "Hi there! What brings you to our auto shop today?"
  ];

  const autoPhrases = [
    "What kind of service do you need for your vehicle?",
    "We offer a wide range of services including oil changes, tire rotations, and brake inspections.",
    "Please provide us with the make and model of your car.",
    "Our team of experienced technicians will take care of your vehicle.",
    "You can trust us to provide high-quality service at an affordable price.",
    "We offer a satisfaction guarantee on all of our work.",
    "Would you like to schedule an appointment for your vehicle?",
    "We also offer towing services in case of emergency."
  ];
  const bebra = [
    "Of course we sell Bebra, we are happy to provide you it. 1kg of Bebra will be 100 Euro.",
    "Sorry! Our competitors - Bebreny, so we don’t sell it! But we have other options"
  ]
  const hello = "Welcome to our auto shop! How can we assist you today?";
  const goodbye = "Thank you for choosing our auto shop! We look forward to serving you.";

  $("#chatbot").click(function () {
    $(this).toggleClass("show");
  });
  $("#answers").append(`<div class="bot_answ">${hello}</div>`);
  $("#answers").click(function () {
    return false;
  });
  $("#ok").click(function () {
    let q = $("#question").val().trim();
    if (q != "") {
      $("#answers").append(`<div class="human_answ">${q}</div>`);
      setTimeout(function () {
        if (
          q.toLowerCase().includes("bye") ||
          q.toLowerCase().includes("goodbye")
        ) {
          $("#answers").append(`<div class="bot_answ">${goodbye}</div>`);
        } else if (
          q.toLowerCase().includes("hello")
        ) {
          $("#answers").append(`<div class="bot_answ">${hello}</div>`);
        }
        else if (
          q.toLowerCase().includes("bebra")
        ) {
          $("#answers").append(`<div class="bot_answ">${bebra[Math.floor(Math.random() * bebra.length)]}</div>`);
        } else if (
          q.toLowerCase().includes("auto") ||
          q.toLowerCase().includes("about")
        ) {
          $("#answers").append(
            `<div class="bot_answ">${
              autoPhrases[Math.floor(Math.random() * autoPhrases.length)]
            }</div>`
          );
        } else {
          $("#answers").append(
            `<div class="bot_answ">${
              phrases[Math.floor(Math.random() * phrases.length)]
            }</div>`
          );
        }

        let chatbot = document.getElementById("chatbot");
        $("#chatbot").animate(
          { scrollTop: chatbot.scrollHeight - chatbot.clientHeight },
          500
        );
      }, 1000);
    }

    $("#question").val("");
    return false;
  });
  function enterKey(event) {
    if (event.keyCode == 13) {
      $("#ok").click();
      return false;
    }
  }
  $("#question").keypress("keyup", enterKey);
  $("#question").click(function () {
    return false;
  });
});
