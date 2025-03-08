const big = document.querySelector(".big__img");
const smallWrapper = document.querySelector(".small");
const imgs = document.querySelector(".small").querySelectorAll("img");
const priceNumb = document.querySelector(".price__num");
const addToCart = document.querySelector(".add__btn");
const inChart = document.querySelector(".product__number");
const clearProduct = document.querySelector(".clearProduct");
const chariot = document.querySelector(".fa-cart-shopping");
const product = document.querySelector(".product");

chariot.addEventListener("click", function (e) {
  product.classList.toggle("hidden");
});

// adding slides with keys =

//
const btnPlus = document.querySelector(".increment");
const btnMinus = document.querySelector(".decrement");
const quantity = document.querySelector(".q-number");
let qNumber = 1;
quantity.textContent = `  ${qNumber}`;
let shoePrice = 125;
let counter = 0;
// calcPrice FUNCTION :
const calcPrice = function (shoePrice, qNumber) {
  return shoePrice * qNumber;
};

// ----
btnPlus.addEventListener("click", function () {
  qNumber++;
  quantity.textContent = `  ${qNumber}`;
  priceNumb.textContent = `€ ${calcPrice(qNumber, shoePrice)}`;
});

btnMinus.addEventListener("click", function () {
  if (qNumber > 0) {
    qNumber--;

    quantity.textContent = `  ${qNumber}`;
    priceNumb.textContent = `€ ${calcPrice(qNumber, shoePrice)}`;
  }
});

document.addEventListener("keypress", function (e) {
  if (e.key === "+") {
    qNumber++;
    quantity.textContent = `${qNumber}`;
    quantity.textContent = `  ${qNumber}`;
    priceNumb.textContent = `€ ${calcPrice(qNumber, shoePrice)}`;
  } else if (e.key === "-" && qNumber > 1) {
    qNumber--;
    quantity.textContent = `${qNumber}`;
    quantity.textContent = `  ${qNumber}`;
    priceNumb.textContent = `$ ${calcPrice(qNumber, shoePrice)}`;
  }
});
addToCart.addEventListener("click", function (e) {
  let productNumbers = qNumber + counter;
  counter += qNumber;
  for (let i = 0; i < qNumber; i++) {
    const big = document
      .querySelector(".big")
      .querySelector("img")
      .getAttribute("src");
    const html = `
  <div class="product__row">
          <div class="product__img">
            <img src="${big}" alt="" />
          </div>
          <div class="product__details">
            <h4>$125</h4>
            <button type="button">buy Now</button>
          </div>
        </div>
  `;
    product.insertAdjacentHTML("afterbegin", html);
  }
  inChart.textContent = counter;
  qNumber = 1;
  priceNumb.textContent = `€ ${calcPrice(qNumber, shoePrice)}`;
  quantity.textContent = `  ${qNumber}`;
});

document.addEventListener("keyup", function (e) {
  if (e.key === "Enter") {
    let productNumbers = qNumber + counter;
    counter += qNumber;
    for (let i = 0; i < qNumber; i++) {
      const big = document
        .querySelector(".big")
        .querySelector("img")
        .getAttribute("src");
      const html = `
    <div class="product__row">
            <div class="product__img">
              <img src="${big}" alt="" />
            </div>
            <div class="product__details">
              <h4>$125</h4>
              <button type="button">buy Now</button>
            </div>
          </div>
    `;
      product.insertAdjacentHTML("afterbegin", html);
    }
    inChart.textContent = counter;
    qNumber = 1;
    priceNumb.textContent = `€ ${calcPrice(qNumber, shoePrice)}`;
    quantity.textContent = `  ${qNumber}`;
  }
});

// clearing product :
clearProduct.addEventListener("click", function (e) {
  counter = 0;
  inChart.textContent = counter;
  product.innerHTML = "";
});
document.addEventListener("keyup", function (e) {
  if (e.key === "Backspace" && counter > 0) {
    counter--;
    product.innerHTML = "";
    for (let i = 0; i < counter; i++) {
      const big = document
        .querySelector(".big")
        .querySelector("img")
        .getAttribute("src");
      const html = `
    <div class="product__row">
            <div class="product__img">
              <img src="${big}" alt="" />
            </div>
            <div class="product__details">
              <h4>$125</h4>
              <button type="button">buy Now</button>
            </div>
          </div>
    `;
      product.insertAdjacentHTML("afterbegin", html);
    }
    inChart.textContent = counter;
  }
});
document.addEventListener("keyup", function (e) {
  if (e.key === "Delete" && counter > 1) {
    product.innerHTML = "";
    counter = 0;
    inChart.textContent = counter;
    qNumber = 1;
    priceNumb.textContent = `€ ${calcPrice(qNumber, shoePrice)}`;
    quantity.textContent = `  ${qNumber}`;
  }
});
document.addEventListener("DOMContentLoaded", function () {
  // Sélectionner le bouton burger et le menu
  const navbarToggler = document.querySelector(".navbar-toggler");
  const navbarCollapse = document.querySelector(".navbar-collapse");

  // Ajouter un écouteur d'événement sur le bouton burger
  navbarToggler.addEventListener("click", function () {
    // Basculer la classe "show" pour afficher ou masquer le menu
    navbarCollapse.classList.toggle("show");
  });
});
// cards events !
// adding the like / Unlike event
