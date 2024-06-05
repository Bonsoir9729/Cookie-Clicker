var pull1 = document.getElementById('pull')
var pull10 = document.getElementById('pull10')
var price1 = document.getElementById('price1')
var price10 = document.getElementById('price10')
var reward = document.getElementById('reward')
var clicker = document.getElementById('clicker')
let points = localStorage.getItem('points')
var ownedItemsDiv = document.getElementById('items')
const ownedItems = {}
function price(ownedItems){
    ownedItemsNum = 10;
    Object.values(ownedItems).forEach(element => {
        ownedItemsNum += element
    })
    return 100 * (2 ** ownedItemsNum)
}
function updatePrice(){
    price1.textContent = price()
    price10.textContent = price() * 100
}
const items = {
    prehistoire:["caveman", "bat"],
    antiquite:["roman", "spear"],
    medieval:["knight", "sword"],
    legendary:["regis"]
}
Object.values(items).forEach(element => {
    element.forEach(item => {
        ownedItems[item] = 0;
    })
})

function displayOwnedItems(){
    const br = document.createElement('br');
    Object.keys(ownedItems).forEach(key => {
        const item = document.createElement('h1');
        item.textContent = key + ' : ' + ownedItems[key];
        ownedItemsDiv.appendChild(item);
        ownedItemsDiv.appendChild(br);
    });
}
displayOwnedItems()
const rarity = {
    prehistoire:0.75,
    antiquite:0.15,
    medieval:0.08,
    legendary:0.02
}

function randomRarity(){
    randomNumber = Math.random();
    for (const key of Object.keys(rarity)){
        randomNumber -= rarity[key];
        if (randomNumber < 0){
            return key;
        }
    }
}

function randomItem(rarity){
    itemList = items[rarity]
    return itemList[Math.floor(Math.random() * itemList.length)]
}

function pull(){
    item = randomItem(randomRarity());
    ownedItems[item] += 1;
    ownedItemsDiv.textContent = '';
    displayOwnedItems()
    return item
}
pull1.addEventListener('click', function(){
    reward.textContent = pull()
    updatePrice()
})
pull10.addEventListener('click', function(){
    reward.textContent = ''
    for (let i = 0;i<10;i++){
        reward.textContent += pull() + (i === 9 ? '' : ', ')
    }
    updatePrice()
})
clicker.onclick = function(){
    localStorage.setItem('points', points);
    localStorage.setItem('gachaItems', ownedItems);
}