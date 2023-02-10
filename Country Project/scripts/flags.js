document.getElementById("firstH1").addEventListener("mouseover", mouseOverUS);
document.getElementById("firstH1").addEventListener("mouseover", mouseOverRO);
document.getElementById("firstH1").addEventListener("mouseover", mouseOverPO);
document.getElementById("firstH1").addEventListener("mouseout", mouseOutUS);
document.getElementById("firstH1").addEventListener("mouseout", mouseOutRO);
document.getElementById("firstH1").addEventListener("mouseout", mouseOutPO);

function mouseOverUS() {
    document.getElementById("firstH1").innerHTML = "United States";
    document.getElementById("usFlag").style.content = "url('images/mapUnitedStates.jpg')";
}

function mouseOverRO() {
    document.getElementById("firstH1").innerHTML = "Romania";
    document.getElementById("roFlag").style.content = "url('images/romanianMap.jpg')";
}

function mouseOverPO() {
    document.getElementById("firstH1").innerHTML = "Poland";
    document.getElementById("polishFlag").style.content = "url('images/polandMap.jpg')";
}

function mouseOutUS() {
    document.getElementById("firstH1").innerHTML = "Countries and Flags";
    document.getElementById("usFlag").style.content = "url('images/unitedStatesFlag.webp')";
}

function mouseOutRO() {
    document.getElementById("firstH1").innerHTML = "Countries and Flags";
    document.getElementById("roFlag").style.content = "url('images/romanianFlag.gif')";
}

function mouseOutPO() {
    document.getElementById("firstH1").innerHTML = "Countries and Flags";
    document.getElementById("polishFlag").style.content = "url('images/polishFlag.png')";
}
