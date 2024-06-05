var pull1 = document.getElementById('pull')
var pull10 = document.getElementById('pull10')
var reward = document.getElementById('reward')
let balance = 100
var ownedItemsDiv = document.getElementById('items')
const ownedItems = {}
function price(ownedItems){
    e = 2.71828;
    ownedItemsNum = 10;
    Object.values(ownedItems).forEach(element => {
        ownedItemsNum += element
    })
    return Math.floor(((ownedItemsNum ** 2)  * (e ** (ownedItemsNum/2)))/100000) + 100;
}
const items = {
    common:["Amogus", "sus","Sunflower"],
    rare:["Mimikyu","Colette_Tatou"],
    epic:["Miku","Goose"],
    legendary:["Ogerpon","Kyougen"]
}
const itemImages = {
    Amogus: 'images/amogus.webp',
    sus: 'images/ticket.png',
    Sunflower: 'images/Sunflowerpvz.webp',
    Mimikyu: 'images/mimikyu.png',
    Colette_Tatou:'images/ColetteTatou.webp',
    Miku: 'images/miku.png',
    Goose: 'images/goofygoose.jpg',
    Ogerpon: 'images/ogerpon.png',
    Kyougen: 'images/kyougen.jpg'
};
Object.values(items).forEach(element => {
    element.forEach(item => {
        ownedItems[item] = 0;
    })
})

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

pull1.addEventListener('click', function () {
    const pulledItem = pull();
    updateRewardDisplay([pulledItem]);
    console.log(price(ownedItems));
});

pull10.addEventListener('click', function () {
    const pulledItems = [];
    for (let i = 0; i < 10; i++) {
        pulledItems.push(pull());
    }
    updateRewardDisplay(pulledItems);
    console.log(price(ownedItems));
});
