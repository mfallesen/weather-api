$(document).ready(function () {

    let APIKey = "bb036cc9828bfc98081575922bfed294";
    // let city = "Denver"
    // Here we are building the URL we need to query the database

    let weather;
    let forecast;


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
            console.log(weather);
        })
        //Call the API for 5 day forecast.
        $.ajax({
            url: queryForecastURL,
            method: "GET"
        }).then(function (response) {
            forecast = response;
            console.log(forecast);
        })
        addcityShortcut(city);

    });

    function addcityShortcut(city) {
        let cityArr = []
        let nuCity = $("<input></input>");
        nuCity.attr("class", "form-control");
        nuCity.attr("readonly");
        nuCity.val(city);
        cityArr.push(nuCity);
        console.log(cityArr);
        $("#cityList").append(nuCity);
    };

    function currentWeather() {


    };





    //TODO: event handler for making the API calls to include the city name
    //TODO: store returned information
    //TODO: generate clickable "button" for the returned city that stores the response to localstorage
    //TODO: generate HTML elements to render the City Temperature Humidity Wind SPeed and UV Index on screen
    //TODO: generate HTML elements to display the 5 Day forecast (boostrap cards)

    // end of document.ready function
});