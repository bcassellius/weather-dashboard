const submit = document.getElementById("submit")
const userFormEl = document.querySelector("#user-form")
const cityName = document.querySelector("#cityName")
var search = []

// search button clicked
var formSubmitHandler = function(event) {
    event.preventDefault();
    // get value from input element
    var name = cityName.value.trim();
    if (name) {
        getCityData(name);
        name.value = '';
    } else {
        alert("Please enter the name of a city.")
    }
}

function getCityData(city){
    // get the data for the city's name
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=6796d6e231f36d13c2f70ab9e10e8126`)
    .then(response =>{
        return response.json()
    })
    // use the data from the city's name to get the latitude and longitude coordinates
    .then(data =>{
        console.log(data)
        let lat = data.coord.lat
        let lon = data.coord.lon
        var weathercode = data.weather[0].icon
        var icon = document.getElementById("icon")
        icon.setAttribute("src", `http://openweathermap.org/img/wn/${weathercode}@2x.png` )
        // get the data for the city by using the city's latitude and longitude
        fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&exclude=minutely,hourly,alerts&appid=6796d6e231f36d13c2f70ab9e10e8126`)
        .then(response =>{
            return response.json()
        })
        .then(data =>{
            takesOneCallAndRenders5Day(data)
            
            // Create a new JavaScript Date object based on the timestamp
            let unix_timestamp = data.current.dt;
            var date = new Date(unix_timestamp * 1000);
            console.log(date);
            var currentDate = Intl.DateTimeFormat("en-US").format(date);
            console.log(Intl.DateTimeFormat("en-US").format(date));

            let currentUVI = Math.round(data.current.uvi);
            
            if (currentUVI <=2){
                document.querySelector("#inputUvi").classList.remove("moderate", "high")
                document.querySelector("#inputUvi").classList.add("low")
            }else if (currentUVI >=3 && currentUVI <=5 ){
                document.querySelector("#inputUvi").classList.remove("low", "high")
                document.querySelector("#inputUvi").classList.add("moderate")
            }else{
                document.querySelector("#inputUvi").classList.remove("moderate", "low")
                document.querySelector("#inputUvi").classList.add("high")
            };

            // Create Current Weather Display
            document.querySelector("#inputCity").innerHTML = "" + city + " ( " + currentDate +" ) ";
            document.querySelector("#inputTemp").innerHTML = "Temperature: " + data.current.temp + "&#8457";
            document.querySelector("#inputWind").innerHTML = "Wind Speed: " + data.current.wind_speed + "MPH";
            document.querySelector("#inputHumidity").innerHTML = "Humidity: " + data.current.humidity + "%";
            document.querySelector("#inputUvi").innerHTML = "UV Index: " + data.current.uvi ;
            
            // retrieve the list of cities from storage, add to it, save/overwrite with the new list of cities
            save(city)
            loadSavedSearches()
            
        })
    })
}


// save search to localStorage
function save(city){
    var pastSearches = JSON.parse(localStorage.getItem("searches")) || []
    // If there's not any past searches that inclued this city, add it in.
    if (!pastSearches.includes(city)) {
        pastSearches.push(city)       
    }
    localStorage.setItem("searches", JSON.stringify(pastSearches));
}

// get searches from localStorage
function loadSavedSearches(){
    var searches = JSON.parse(localStorage.getItem("searches")) || []
    console.log(searches)
    // empty the buttons before creating new ones
    $(".past-search-container").empty()
    // iterate through searches to put each one on it's own button
    if (searches.length > 0) {
        for (var i = 0; i < searches.length; i++){
            var viewed= $('<button>').attr('class', "btn btn-secondary btn-past-searches").text(searches[i])
            $(".past-search-container").append(viewed)    
        }
    }
}

loadSavedSearches();

function takesOneCallAndRenders5Day(data) {
    // empty 5-day forcast cards
    $('.forecast-container').empty()
    // loop data to create 1 card and duplicate for additional days
    for(let i = 0; i < 5; i++) {
        renderSingleForecast(data.daily[i])
    }
}

// Create a card of 1 day's data for today's forcast
function renderSingleForecast(singleDayOfData) {
    let stamp = singleDayOfData.dt
    const when = new Date(stamp * 1000)
    const forcastdate = Intl.DateTimeFormat("en-US").format(when)
    const look = singleDayOfData.weather[0].icon
    const temp = singleDayOfData.temp.day
    const wind = singleDayOfData.wind_speed
    const humidity = singleDayOfData.humidity

    // create cards for each of the 5-day forcast weather
    const card = `<div class="column col s12 m6 l2">
    <div class= "card">
        <div>
            <ul class="list-group list-group-flush">
                <h5 class="list-group-item date">${forcastdate}</h5>
                <img class="list-group-item weather-icon" src="http://openweathermap.org/img/wn/${look}@2x.png" alt="">
                <li class="list-group-item temp">Temp: ${temp}&#8457</li>
                <li class="list-group-item wind">Wind: ${wind} MPH</li>
                <li class="list-group-item humidity">Humidity: ${humidity}%</li>
            </ul>
        </div>  
    </div>
    </div>`;
    $('.forecast-container').append(card)
}

userFormEl.addEventListener("submit", formSubmitHandler)

// Click on Previous Searched buttons
$(document).on('click', '.btn-past-searches', function(e) {
    e.preventDefault();
    var cityToSearch = this.textContent
    console.log(cityToSearch);
    getCityData(cityToSearch)
})