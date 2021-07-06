function getCityData(city){
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=6796d6e231f36d13c2f70ab9e10e8126`)
    .then(response =>{
        return response.json()
    })
    .then(data =>{
        console.log(data)
        let lat = data.coord.lat
        let lon = data.coord.lon
        var weathercode = data.weather[0].icon
        var icon = document.getElementById("icon")
        icon.setAttribute("src", `http://openweathermap.org/img/wn/${weathercode}@2x.png` )
        fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=6796d6e231f36d13c2f70ab9e10e8126`)
        console.log(lat, lon)
    })
}



getCityData("Dallas")

// 6796d6e231f36d13c2f70ab9e10e8126


// addEventListener

// for ( i = 0; i < 6; i++)
 



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