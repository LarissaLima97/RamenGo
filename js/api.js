const API_kEY = "ZtVdh8XQ2U8pWI2gmZ7f796Vh8GllXoN7mr0djNf";
const BASE_URL = "https://api.tech.redventures.com.br/";

const options = {
    method: "GET", 
    headers: {
        "x-api-key": `${API_kEY}`,
        "Content-Type": "application/json"
    }
}

const getBroth = async () => {
        const response = await 
        fetch(
            `${BASE_URL}broths`, options
        )
        if (!response.ok) {
            throw new Error ("Deu ruim");
        }
        const data = await response.json();
        console.log(data)
        return data;
}
console.log(getBroth());

const getMeat = async () => {
    const response = await 
    fetch(
        `${BASE_URL}proteins`, options
    )
    if (!response.ok) {
        throw new Error ("Deu ruim");
    }
    const data = await response.json();
    console.log(data);
    return data;
}

console.log(getMeat());

const populateBroth = async() => {
    const brothList = await getBroth(); 

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
    const meatList = await getMeat(); 

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



function mountBody (brothId, meatId) {
    return {
        "brothId": brothId,
        "proteinId": meatId
    }
}

const postOrder = async (brothId,meatId) => {
    const body = mountBody(brothId,meatId);
    const optionsPost = {
        method: "POST", 
        headers: {
            "x-api-key": `${API_kEY}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    }
    const response = await 
    fetch(
        `${BASE_URL}orders`, optionsPost
    )
    if (!response.ok) {
        throw new Error ("Deu ruim");
    }
    const data = await response.json();
    console.log(data)
    return data;
}





