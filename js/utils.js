let broth = "";
let meat = "";
let img_success = ""
let text_success = ""

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
    console.log(response)
    img_success = response["image"]
    text_success = response["description"]
    console.log(text_success)
    
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




