const upgradesdiv = document.querySelector(".upgrades");
const upgradeTemplate = document.querySelector("#templates");

function upgrade(data, i) {
  const e = upgradeTemplate.content.firstElementChild.cloneNode(true);
  e.id = i;
  e.querySelector(".name").textContent = data.name;
  e.querySelector(".image").src = data.image;
  e.querySelector(".price").textContent = data.price;
  const effect = e.querySelector(".effect");
  effect.id = data.effect;
  effect.setAttribute("value", data.value)
  effect.querySelector("p").textContent = `+${data.value} per ${data.effect}`;
  upgradesdiv.appendChild(e);
}

export function addUpgrades(data) {
  for (let i = 0; i < data.length; i++) {
    const d = data[i];
    upgrade(d, i);
  }
}
