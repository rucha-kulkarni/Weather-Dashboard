

const api_key = "271aeddd15047558eaa146aacbd858b0";
const searchInput = document.getElementById("search-input");
const addButton = document.getElementById("btn");
const baseUrl = `https://api.openweathermap.org/data/2.5`;

const cityName = [];
const weatherCondition = [];
async function getCity(city = "pune") {
    try{
        let url = `${baseUrl}/weather?q=${city}&appid=${api_key}&units=metric`;
        const response = await fetch(url, {method: "GET"});
        const data = await response.json();
        if (data.cod === 200) {
            cityName.push[data.name.toLowerCase()];
            weatherCondition.push[data.weather[0].main];
            console.log(data);
            addDataOnToUI(data);
        } else {
            console.log("City not found");
          }
    } catch (error) {
          console.error("Error fetching data:", error);
    }
    
}

const weatherCards = document.getElementById('weather-cards');
function addDataOnToUI(data) {
    let iconCode = data.weather[0].icon;
    let iconUrl = `http://openweathermap.org/img/w/${iconCode}.png`;
    const cardContainer = document.createElement('div');
    cardContainer.className ="card";
    cardContainer.innerHTML +=`
        <img class="bgimg" src="./Big/Rectangle 1.png" alt="">
        
        <img class="fimg" src="${iconUrl}" width="190px" alt="Weather icon">
        <div class="text">
            <p class="temp">${data.main.temp}°</p>
            <p class="high-low">H: ${data.main.temp_max}°  L: ${data.main.temp_min}°</p>
            <div class="pc">
                <p class="place">${data.name}, ${data.sys.country}</p>
                <p class="condition">${data.weather[0].main}</p>
            </div>
        </div>
        </div>`;

    weatherCards.appendChild(cardContainer);
}

function checkDuplicateCity(city){
    for(let i=0; i<cityName.length; i++){
        if(cityName[i] === city){
            return true;
        }
    }
    return false;
}
addButton.addEventListener("click", () => {
    let city = searchInput.value.toLowerCase().trim();
    if(city === "" || checkDuplicateCity(city)){
        return;
    }
    getCity(city);
})
getCity();


