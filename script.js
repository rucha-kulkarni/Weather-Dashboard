const api_key = "271aeddd15047558eaa146aacbd858b0";
const baseUrl = `https://api.openweathermap.org/data/2.5`;

const searchInput = document.getElementById("search-input");
const addButton = document.getElementById("btn");
const weatherCards = document.getElementById('weather-cards');
const cityName = [];

//Function to fetch the city weather details
async function getCity(city = "pune") {
    try{
        let url = `${baseUrl}/weather?q=${city}&appid=${api_key}&units=metric`;
        const response = await fetch(url, {method: "GET"});
        const data = await response.json();
        if (data.cod === 200) {
            // console.log(cityName);
            cityName.push({cname:data.name.toLowerCase(), temp:data.main.temp});
            // console.log(data);
            addDataOnToUI(data);
            searchInput.value = "";
        } else {
            console.log("City not found");
          }
    } catch (error) {
          console.error("Error fetching data:", error);
    }
    
}

//Function to display data on to UI
function addDataOnToUI(data) {

    let iconCode = data.weather[0].icon;
    let iconUrl = `http://openweathermap.org/img/w/${iconCode}.png`;
    let description = data.weather[0].description;
    const cardContainer = document.createElement('div');
    cardContainer.className ="cards";
    cardContainer.innerHTML +=`

    <div class="temp-details">
        <p class="temp"> ${Math.floor(data.main.temp)}°</p> 
        <p class="desc"> ${description.charAt(0).toUpperCase() + description.slice(1).toLowerCase()}</p>
        <div class="icon">
            <img src=" ${iconUrl}" width="80px" alt="">
        </div>
        <p class="condition"> ${data.weather[0].main}</p>
        <p class="min-max"> <b> max:</b> ${Math.floor(data.main.temp_min)}° | <b>min:</b> ${Math.floor(data.main.temp_max)}° </p>
        <p class="wind"> ${(3.6*data.wind.speed).toFixed(2)} km/h <span class="material-icons"> air </span> </p>
        <p class="place"> ${data.name}, ${data.sys.country}<span class="material-icons"> location_on </span> </p> 
    </div>   `;

    weatherCards.insertBefore(cardContainer, weatherCards.firstChild);
}

//Function to check the duplicate search
function checkDuplicateCity(city){
    for(let i=0;i<cityName.length;i++){
        if(cityName[i].cname.includes(city)){
            return true;
        }
    }
    return false;
}

// search by click event
addButton.addEventListener("click", () => {
    let city = searchInput.value.toLowerCase().trim();
    if(city === "" || checkDuplicateCity(city)){
        return;
    }
    getCity(city);
});

// search by keydown event 
searchInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        let city = searchInput.value.trim();
        if (city === "" || checkDuplicateCity(city)) {
            return;
        }
        getCity(city);
    }
});
getCity();


