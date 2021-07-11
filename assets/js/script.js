const submit = document.getElementById("submit")
// const input = document.getElementById("input")
const userFormEl = document.querySelector("#user-form")
const cityName = document.querySelector("#cityName")
var search = []
console.log(userFormEl)
console.log(cityName)

// search button clicked
var formSubmitHandler = function(event) {
    event.preventDefault();
    // get value from input element
    var name = cityName.value.trim();
    if (name) {
        getCityData(name);
        name.value = "";
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
            let unix_timestamp = data.current.dt
            var date = new Date(unix_timestamp * 1000);
            console.log(date)
            var currentDate = Intl.DateTimeFormat("en-US").format(date)
            console.log(Intl.DateTimeFormat("en-US").format(date))
            
            // Create Current Weather Display
            document.querySelector("#inputCity").innerHTML = "" + city + " ( " + currentDate +" ) ";
            document.querySelector("#inputTemp").innerHTML = "Temperature: " + data.current.temp + "&#8457";
            document.querySelector("#inputWind").innerHTML = "Wind Speed: " + data.current.wind_speed + "MPH";
            document.querySelector("#inputHumidity").innerHTML = "Humidity: " + data.current.humidity + "%";
            document.querySelector("#inputUvi").innerHTML = "UV Index: " + data.current.uvi;
            
            // retrieve the list of cities from storage, add to it, save/overwrite with the new list of cities
            function save(){
                var pastSearches = JSON.parse(localStorage.getItem("searches"));
                if (!pastSearches) search = [];
                // add a city because there was a new search done
                const entrySearch = cityName.value.trim();
                localStorage.setItem("entry", JSON.stringify(entrySearch));
                // Save all entries to localStorage
                search.push(entrySearch);
                localStorage.setItem("searches", JSON.stringify(search));
            }
            save()
            
        })
    })
}

function load(){
    JSON.parse(localStorage.getItem("searches"))
    // for loop to run the buttons through the city names
    // addEventListner to the buttons to recall data
}

function takesOneCallAndRenders5Day(data) {
    // empty 5-day forcast cards
    $('.forecast-container').empty()
    // loop data to create 1 card and duplicate for additional days
    for(let i = 0; i < 5; i++) {
        renderSingleForecast(data.daily[i])
    }
}
function renderSingleForecast(singleDayOfData) {
    let stamp = singleDayOfData.dt
    const when = new Date(stamp * 1000)
    const forcastdate = Intl.DateTimeFormat("en-US").format(when)
    const look = singleDayOfData.weather[0].icon
     const temp = singleDayOfData.temp.day
    const wind = singleDayOfData.wind_speed
    const humidity = singleDayOfData.humidity

    const card = `<div class="column col s12 m6 l2">
    <div class= "card">
        <div>
            <ul id="day1" class="list-group list-group-flush">
                <h5 class="list-group-item date">${forcastdate}</h5>
                <a class="list-group-item icon" src="" alt="">${look}</a>
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

// 6796d6e231f36d13c2f70ab9e10e8126

// GIVEN a weather dashboard with form inputs
// WHEN I search for a city
// THEN I am presented with current and future conditions for that city and that city is added to the search history
// WHEN I view current weather conditions for that city
// THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
// WHEN I view the UV index
// THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
// WHEN I view future weather conditions for that city
// THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions for that city