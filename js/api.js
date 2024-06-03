const API_kEY = "ZtVdh8XQ2U8pWI2gmZ7f796Vh8GllXoN7mr0djNf";
const BASE_URL = "https://api.tech.redventures.com.br";

function mountOptions(method, body="") {
    if(body){
        return {
            method: method.toUpperCase(), 
            headers: {
                "x-api-key": `${API_kEY}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        }
    }
    return {
        method: method.toUpperCase(), 
        headers: {
            "x-api-key": `${API_kEY}`,
            "Content-Type": "application/json"
        },
    }
}

function mountBody (brothId, meatId) {
    return {
        "brothId": brothId,
        "proteinId": meatId
    }
}

const getBroths = async () => {
    const options = mountOptions("GET");
    const response = await 
    fetch(
        `${BASE_URL}/broths`, options
    )
    if (!response.ok) {
        throw new Error ("Error when try to get broths");
    }
    const data = await response.json();
    return data;
}

const getProteins = async () => {
    const options = mountOptions("GET");
    const response = await 
    fetch(
        `${BASE_URL}/proteins`, options
    )
    if (!response.ok) {
        throw new Error ("Error when try to get proteins");
    }
    const data = await response.json();
    return data;
}

const postOrder = async (brothId,meatId) => {
    const body = mountBody(brothId,meatId);
    const optionsPost = mountOptions("POST",body);
    const response = await 
    fetch(
        `${BASE_URL}/orders`, optionsPost
    )
    if (!response.ok) {
        throw new Error ("Error when try to make a order");
    }
    const data = await response.json();
    return data;
}
