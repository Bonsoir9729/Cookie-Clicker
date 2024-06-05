import { addUpgrades } from "./upgrades.js";
import { data } from "./data.js";
const clickButton = document.querySelector("#clicker");
const menuButton = document.querySelector(".menu");
const resetButton = document.querySelector("#reset");
const number = document.querySelector("#count");
const upgrades = document.querySelector(".upgrades");

let count = parseInt(localStorage.getItem("points")) || 0;
let perSecond = 0;
let perClick = 1;

function initUpgradesCount() {
  const obj = {};
  Object.keys(data).forEach((key) => (obj[key] = 0));
  return JSON.parse(localStorage.getItem("upgrades")) || obj;
}

const upgradesCount = initUpgradesCount();

function Click() {
  console.log(perClick);
  count += perClick;
  number.textContent = Math.floor(count);
  localStorage.setItem("points", count);
}

function Increment() {
  count += perSecond;
  number.textContent = Math.floor(count);
  localStorage.setItem("points", count);
}

function Upgrades() {
  for (let i = 0; i < upgrades.children.length; i++) {
    const n = upgradesCount[i];
    const upgrade = upgrades.children[i];
    upgrade.querySelector(".count").textContent = n || "";
    upgrade.querySelector(".price").textContent = priceByN(data[i].price, n);
    if (priceByN(data[i].price, n) <= count) {
      upgrade.querySelector(".price").style.color = "green";
    } else {
      upgrade.querySelector(".price").style.color = "red";
    }
  }
}

async function buyUpgrade(e) {
  const i = parseInt(e.currentTarget.id);
  const n = upgradesCount[i];
  if (priceByN(data[i].price, n) <= count) {
    const upgrade = e.currentTarget;
    const id = i;
    const price = priceByN(data[i].price, n);
    count -= price;
    upgradesCount[id] += 1;
    updateStats();
    updatePrice(upgrade, price);
  }
}

addUpgrades(data);
const buyButtons = document.querySelectorAll(".upgrade");
for (let i = 0; i < buyButtons.length; i++) {
  buyButtons[i].addEventListener("click", buyUpgrade);
}

function updateStats() {
  let seconds = 0;
  let clicks = 1;
  Object.entries(upgradesCount).forEach((entry) => {
    const [key, value] = entry;
    const v = data[key].value * value;
    data[key].effect === "second" ? (seconds += v) : (clicks += v);
  });
  perClick = clicks;
  perSecond = seconds;
  document.querySelector(".perClick").textContent = Math.round(perClick * 10) / 10;
  document.querySelector(".perSecond").textContent = Math.round(perSecond * 10) / 10;
  localStorage.setItem("upgrades", JSON.stringify(upgradesCount));
}

const priceByN = (price, n) => Math.ceil(parseInt(price) * 1.05 ** parseInt(n));
const pricing = (price) => Math.ceil(parseInt(price) * 1.05);

function updatePrice(e, price) {
  const newPrice = pricing(price);
  e.querySelector(".price").textContent = newPrice;
  e.querySelector(".effect").setAttribute("value", newPrice);
}

function reset() {
  count = 0;
  perClick = 1;
  perSecond = 0;
  localStorage.removeItem("upgrades");
  localStorage.removeItem("points");
  Object.entries(upgradesCount).forEach((entrie) => {
    const [key, _] = entrie;
    upgradesCount[key] = 0;
  });
  updateStats();
}

function getSiblings(e) {
  const siblings = [];
  let sibling = e.parentNode.firstChild;

  while (sibling) {
    if (sibling.nodeType === 1 && sibling !== e) {
      siblings.push(sibling);
    }
    sibling = sibling.nextSibling;
  }

  return siblings;
}

updateStats();
window.setInterval(Increment, 1 * 1000);
window.setInterval(Upgrades, 10);
window.setInterval(() => {
  number.textContent = Math.floor(count);
}, 10);
clickButton.addEventListener("click", Click);
resetButton.addEventListener("click", reset);
menuButton.addEventListener("click", (e) => {
  const b = e.currentTarget;
  b.classList.toggle("open");
  b.querySelector(".open-menu").classList.toggle("clicked");
  const siblings = getSiblings(b);
  if (b.classList.contains("open")) {
    for (let sibling of siblings) {
      sibling.style.display = "block";
    }
  } else {
    for (let sibling of siblings) {
      sibling.style.display = "none";
    }
  }
});