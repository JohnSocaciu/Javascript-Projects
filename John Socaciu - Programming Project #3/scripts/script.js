const API = new XMLHttpRequest();
let url = 'https://api.api-ninjas.com/v1/historicalfigures?name=' + "Winston Churchill"; // historical figure themed website
API.open('GET', url);

API.setRequestHeader('Content-Type', 'application/json');
API.setRequestHeader('x-api-key', 'v11LLe3D3hrYllam4wOKU28lXB6rPT6PD77AwyxP');
API.send();

API.onload = function () {
    if (API.status === 200) { // once API request is sent properly and Information is actually transmitted back to the web-based software
        const response = JSON.parse(API.responseText);
        console.log(response);
        document.getElementById("info").innerText = JSON.stringify(response).replace(/,/g, "\n\n").replace(/"/g, " ").replace(/{/g, " ").replace(/}}/g, " ");
    } else {
        console.error('Error:', API.status);
    }
};

document.getElementById("churchPicture").addEventListener("mouseover", mouseOverChurch);  // rollover image for Churchill 
document.getElementById("churchPicture").addEventListener("mouseout", mouseOutChurch);

function mouseOutChurch() {
    document.getElementById("churchPicture").style.content = "url('assets/churchill2_asset.webp')";
}

function mouseOverChurch() {
    document.getElementById("churchPicture").style.content = "url('assets/churchill_asset.jpg')";
}

