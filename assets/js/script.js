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
            
        })
    })
}
/**
 * key to localStorage should be something like pastSearches
 * if we parse the localStorage.pastSearches bit we should get
 * ["chicago", "paris"]
 * 
 * when we add to localstorage
 * first get all thats in there (parse localstoarge to get array)
 * array.push(newCity)
 * 
 * overwrite localstorage with the new array of cities
 */

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

// addEventListener to display 5 day forcast
// load1.addEventListener("submit", loadForcast)

// getCityData("Dallas")




// 6796d6e231f36d13c2f70ab9e10e8126



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











// // Create 5-day Forcast Display
// for (let i = 0; i < 6; i++){
//     let stamp = data.daily[i].dt
//     const when = new Date(stamp * 1000)
//     const forcastdate = Intl.DateTimeFormat("en-US").format(when)
//     let d = document.querySelectorAll(".date").innerHTML = forcastdate
//     console.log(forcastdate)
//     let p = document.querySelectorAll(".icon").innerHTML = data.daily[i].weather[0].icon;
//     console.log(data.daily[i].weather[0].icon)
//     let t = document.querySelectorAll(".temp").innerHTML = "Temp. " + data.daily[i].temp.day + "&#8457";
//     console.log(data.daily[i].temp.day)
//     let w = document.querySelectorAll(".wind").innerHTML = "Wind: " + data.daily[i].wind_speed + "MPH";
//     console.log(data.daily[i].wind_speed)
//     let h = document.querySelectorAll(".humidity").innerHTML = "Humidity: " + data.daily[i].humidity + "%";
//     console.log(data.daily[i].humidity)
    
//     // Make an array to save 5-day forcast data in localStorage
//     var arr = []
//     arr.push(d, p, t, w, h)
//     console.log(arr)

//     const saveforcast= function (){
//         // this is where we are setting the localstorage name to the cityname searched + i
//         localStorage.setItem(cityName.value + [i], JSON.stringify(arr))
//     }
//     loadforcast = function (){
//         JSON.parse(localStorage.getItem(cityName.value + [i]));
//     }

//     console.log(forcast)
    
//     saveforcast()   
// }




// // console.log(data)







    // // our data should hopefully be an array of objects
    // console.log('our new render function called!')
    // console.log(data.daily)