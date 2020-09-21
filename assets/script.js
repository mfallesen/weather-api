$(document).ready(function () {

    let APIKey = "bb036cc9828bfc98081575922bfed294";
    // let city = "Denver"
    // Here we are building the URL we need to query the database

    let weather;
    let forecast;
    //empty array to hold city information
    let cityArr = [];

    $("#searchButton").click(function (event) {
        event.preventDefault();
        let city = $("#cityInput").val()
        console.log(city);
        let queryCurrentURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}&units=imperial`;
        let queryForecastURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${APIKey}&units=imperial`;
       
       //call the API for current Weather
        $.ajax({
            url: queryCurrentURL,
            method: "GET"
        }).then(function (response) {
            weather = response;
            currentWeather(weather);
            console.log(weather);
        })
        //Call the API for 5 day forecast.
        $.ajax({
            url: queryForecastURL,
            method: "GET"
        }).then(function (response) {
            forecast = response;
        })
        addCityShortcut(city);

    });

    function addCityShortcut(city) {
        //generate button and styling dynamically for each city in the array
        let nuCity = $("<button></button>");
        nuCity.attr("class", "form-control btn-outline-info");
        
        nuCity.text(city);
        
        if (cityArr.length < 5) {
            cityArr.push(nuCity);
            $("#cityList").append(nuCity);
        } else {
            cityArr.shift();
            cityArr.push(nuCity);
            $("#cityList").append(nuCity);
        }
        
        
        console.log(cityArr);
        
    };
    console.log(cityArr);
    function currentWeather(weather) {
        let city = weather.name;
        let temp = weather.main.temp;
        let humid = weather.main.humidity;
        let wind = weather.wind.speed;
        let lat = weather.coord.lat;
        let lon = weather.coord.lon;
        let uvIndex;
        let queryUvURL = `https://api.openweathermap.org/data/2.5/uvi?appid=${APIKey}&lat=${lat}&lon=${lon}`;
        
        $.ajax({
            url: queryUvURL,
            method: "GET"
        }).then(function (response) {
             uvIndex = response;
             console.log(uvIndex);
        })

    };





    
    //TODO: store returned information
    //TODO: generate clickable "button" for the returned city that stores the response to localstorage
    //TODO: generate HTML elements to render the City Temperature Humidity Wind SPeed and UV Index on screen
    //TODO: generate HTML elements to display the 5 Day forecast (boostrap cards)

    // end of document.ready function
});