let broth = "";
let meat = "";

function selectCard(id, imgSrc) {
    const selectedCard = document.querySelector(id);

    selectedCard.style.backgroundColor = "#1820EF";

    const image = selectedCard.querySelector("img");
    image.src = imgSrc;

    const cardTitle = selectedCard.querySelector(".card-title");
    cardTitle.style.color = "#FFFFFF";

    const cardText = selectedCard.querySelector(".card-text");
    cardText.style.color = "#FFFFFF";

    const cardPrice = selectedCard.querySelector(".card-price");
    cardPrice.style.color = "#FFC024";
}

function resetCard (id, imgSrc) {
    const card = document.querySelector(id);

    card.style.backgroundColor = "#FAFAED";


    const image = card.querySelector("img");
    image.src = imgSrc;


    const cardTitle = card.querySelector(".card-title");
    cardTitle.style.color = "#1820EF";

    const cardText = card.querySelector(".card-text");
    cardText.style.color = "#000000";

    const cardPrice = card.querySelector(".card-price");
    cardPrice.style.color = "#FF4E42";

}

function selectCardBroth (id,imgSrc){
    clearCardsBroth();
    selectCard(id,imgSrc);
    broth = id;
    handleButton();
}

function clearCardsBroth () {
    resetCard("#salt-option", "./assets/images/inactive_salt.png");
    resetCard("#shoyu-option", "./assets/images/inactive_shoyu.png");
    resetCard("#miso-option", "./assets/images/inactive_miso.png");
}

function selectCardMeat (id,imgSrc){
    clearCardsMeat();
    selectCard(id,imgSrc);
    meat = id;
    handleButton();
}

function clearCardsMeat () {
    resetCard("#pork-option", "./assets/images/inactive_pork.png");
    resetCard("#yasai-option", "./assets/images/inactive_yasai.png");
    resetCard("#chicken-option", "./assets/images/inactive_chicken.png");
}

function handleButton () {
  
    if(broth !== "" && meat !== "") {
        document.querySelector("#place-order-button").disabled = false;
    }
    else {
        document.querySelector("#place-order-button").disabled = true;
    }
}

const submitButton = async() => {
    const brothId = document.querySelector(broth).getAttribute("data-value");
    const meatId = document.querySelector(meat).getAttribute("data-value");

    const response = await postOrder(brothId,meatId);
 
    const params = new URLSearchParams({
        description: response.description,
        image: response.image
    });

    window.location.href = 'success.html?' + params.toString();
}

function populateSucess() {
    const urlParams = new URLSearchParams(window.location.search);

    const description = urlParams.get('description');
    const imageSrc = urlParams.get('image');

    const image = document.querySelector("#image-success");
    const text = document.querySelector("#text-success");
    
    text.textContent = description;
    image.src = imageSrc;
}

document.addEventListener('DOMContentLoaded', populateSucess);

function goHome() {
    return window.location.href = "index.html"
}

function goOrder() {
    return window.location.href = "#broth-section"
}

const populateBroth = async() => {
    const brothList = await getBroths(); 

    for (let i = 0; i < brothList.length; i++) {
        if (brothList[i].name === "Salt") {
            populateCard(brothList[i], "salt");
        } 
        else if (brothList[i].name === "Shoyu"){
            console.log("shoyu", brothList[i])
            populateCard(brothList[i], "shoyu");
        }
        else {
            populateCard(brothList[i], "miso");
        }
        
    }
}

const populateMeat = async() => {
    const meatList = await getProteins(); 

    for (let i = 0; i < meatList.length; i++) {
        if (meatList[i].name === "Chasu") {
            populateCard(meatList[i], "chasu");
        } 
        else if (meatList[i].name === "Yasai Vegetarian"){
            console.log("shoyu", meatList[i])
            populateCard(meatList[i], "yasai");
        }
        else {
            populateCard(meatList[i], "karaague");
        }
        
    }
}

function populateCard(payload,id) {
    console.log(payload)
    const title = document.querySelector(`#${id}-title`);
    const description = document.querySelector(`#${id}-desc`);
    const price = document.querySelector(`#${id}-price`);
    const image = document.querySelector(`#${id}-image`);

    title.textContent = payload.name;
    description.textContent = payload.description;
    price.textContent = `US$${payload.price}`;
    image.src = payload.imageInactive;
}

document.addEventListener('DOMContentLoaded', populateBroth);
document.addEventListener('DOMContentLoaded', populateMeat);