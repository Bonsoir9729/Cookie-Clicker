var pull1 = document.getElementById('pull')
var pull10 = document.getElementById('pull10')
var price1 = document.getElementById('price1')
var price10 = document.getElementById('price10')
var reward = document.getElementById('reward')
var balance = document.getElementById('balance')
let points = 10000000
var ownedItemsDiv = document.getElementById('items')
const ownedItems = {}
const items = {
    common:["Amogus", "Sunflower"],
    rare:["Mimikyu","Colette_Tatou"],
    epic:["Miku"],
    legendary:["Ogerpon","Kyougen"]
}
const itemImages = {
    Amogus: 'images/amogus.webp',
    sus: 'images/ticket.png',
    Sunflower: 'images/Sunflowerpvz.webp',
    Mimikyu: 'images/mimikyu.png',
    Colette_Tatou:'images/ColetteTatou.webp',
    Miku: 'images/miku.png',
    Ogerpon: 'images/ogerpon.png',
    Kyougen: 'images/kyougen.jpg'
};
Object.values(items).forEach(element => {
    element.forEach(item => {
        ownedItems[item] = 0;
    })
})

function getNumItems(ownedItems){
    numItems = 0;
    Object.values(ownedItems).forEach(element => {
        numItems += element;
    })
    return numItems;
}

function Price(numItems){
    return 100*(numItems**2) + 100;
}

function displayOwnedItems() {
    ownedItemsDiv.innerHTML = '';
    Object.keys(ownedItems).forEach(key => {
        const itemContainer = document.createElement('div');
        itemContainer.style.display = 'inline-block';
        itemContainer.style.margin = '10px';
        itemContainer.style.textAlign = 'center';

        const img = document.createElement('img');

        img.src = itemImages[key];
        img.alt = key;
        img.style.width = '100px';
        img.style.height = '100px';

        const countText = document.createElement('p');
        countText.textContent = key + ' : ' + ownedItems[key];

        itemContainer.appendChild(img);
        itemContainer.appendChild(countText);

        ownedItemsDiv.appendChild(itemContainer);
    });
    balance.textContent = points
}

displayOwnedItems()
const rarity = {
    common:0.75,
    rare:0.15,
    epic:0.08,
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
    points -= Price(getNumItems(ownedItems))
    item = randomItem(randomRarity());
    ownedItems[item] += 1;
    ownedItemsDiv.textContent = '';
    displayOwnedItems()
    return item
}

function updateRewardDisplay(items) {
    reward.innerHTML = '';
    items.forEach(item => {
        const img = document.createElement('img');
        img.src = itemImages[item];
        img.alt = item;
        img.style.width = '125px';
        img.style.height = '125px';
        reward.appendChild(img);
        localStorage.getItem('ownedItems',ownedItems)
    });
}

function updatePrice(){
    price1.textContent = Price(getNumItems(ownedItems));
    price = 0
    numItems = getNumItems(ownedItems)
    for (let i=0;i<10;i++){
        price += Price(numItems + i)
    }
    price10.textContent = price
}

pull1.addEventListener('click', function () {
    if (price1.textContent > points){
        console.log('not enough money')
        return;
    }
    const pulledItem = pull();
    updateRewardDisplay([pulledItem]);
    updatePrice()
});

pull10.addEventListener('click', function () {
    if (price10.textContent > points){
        console.log('not enough money')
        return;
    }
    const pulledItems = [];
    for (let i = 0; i < 10; i++) {
        pulledItems.push(pull());
    }
    updateRewardDisplay(pulledItems);
    updatePrice()
});
updatePrice()