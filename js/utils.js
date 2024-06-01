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
    const saltCard = document.querySelector(id);

    saltCard.style.backgroundColor = "#FAFAED";


    const image = saltCard.querySelector("img");
    image.src = imgSrc;


    const cardTitle = saltCard.querySelector(".card-title");
    cardTitle.style.color = "#1820EF";

    const cardText = saltCard.querySelector(".card-text");
    cardText.style.color = "#000000";

    const cardPrice = saltCard.querySelector(".card-price");
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
    const brothValue = document.querySelector(broth).getAttribute("data-value");
    const meatValue = document.querySelector(meat).getAttribute("data-value");
    if(brothValue !== "" && meatValue !== "") {
        document.querySelector("#place-order-button").disabled = false;
    }
    else {
        document.querySelector("#place-order-button").disabled = true;
    }
}






