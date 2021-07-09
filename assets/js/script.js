const submit = document.getElementById("submit")
// const input = document.getElementById("input")
const userFormEl = document.querySelector("#user-form")
const cityName = document.querySelector("#cityName")
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
            // Create a new JavaScript Date object based on the timestamp
            let unix_timestamp = data.current.dt
            var date = new Date(unix_timestamp * 1000);
            console.log(date)
            var weathercode = data.current.weather[0].icon
            var icon = document.getElementById("icon")
            icon.setAttribute("src", `http://openweathermap.org/img/wn/${weathercode}@2x.png` )
            document.querySelector("#inputCity").innerHTML = "" + city + date + weathercode;
            document.querySelector("#inputTemp").innerHTML = "Temperature: " + data.current.temp + "&#8457";
            document.querySelector("#inputWind").innerHTML = "Wind Speed: " + data.current.wind_speed + "MPH";
            document.querySelector("#inputHumidity").innerHTML = "Humidity: " + data.current.humidity + "%";
            document.querySelector("#inputUvi").innerHTML = "UV Index: " + data.current.uvi;

            

            // // document.querySelector(".icon").innerHTML = icon.setAttribute("src", `http://openweathermap.org/img/wn/${weathercode}@2x.png` )
            // document.querySelector(".temp").innerHTML = "Temp: " + data.current.temp + "&#8457";
            // document.querySelector(".wind").innerHTML = "Wind Speed: " + data.current.wind_speed + "MPH";
            // document.querySelector(".humidity").innerHTML = "Humidity: " + data.current.humidity + "%";
            // // Name
            // // Date
            // // temp
            // // humidity
            // // wind speed
            // // uv index
           
            console.log(data)
            const saveCity = function() {
                localStorage.setItem(cityName.value, JSON.stringify(data))
            }
            saveCity()
        })
    })
}

// const loadCity = function(){
//     city = JSON.parse(localStorage.getItem(cityName.value));
//     // if (!city){
//     //     city = {
//     //         // what would I load if there's nothing?
//     //     }
//     // }
// }
// // loadCity()

// // var displayWeather = function(weather, searchTerm) {
// //     console.log(weather);
// //     console.log(searchTerm)
// // }

userFormEl.addEventListener("submit", formSubmitHandler)


// getCityData("Dallas")




// 6796d6e231f36d13c2f70ab9e10e8126


// addEventListener
// to display 5 day forcast

// for ( i = 0; i < 6; i++){
    

 



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

