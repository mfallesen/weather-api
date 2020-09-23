$(document).ready(function () {

    let APIKey = "bb036cc9828bfc98081575922bfed294";
    // let city = "Denver"
    // Here we are building the URL we need to query the database

    let nowDate = new Date();
    let month = nowDate.getMonth();
    let day = nowDate.getDate();
    let year = nowDate.getFullYear();
    let date = `${month}/${day}/${year}`;
    // console.log(date);

    let weather;
    let forecast;
    //empty array to hold city information

    let cityArr = JSON.parse(localStorage.getItem("cityWeather")) || [];

    if (cityArr.length) {
        const cityArrCopy =[...cityArr];

        for (var i = 0; i < cityArrCopy.length; i++) {
            console.log(cityArrCopy[i]);
            addCityShortcut(cityArrCopy[i]);
            if (i + 1 === cityArrCopy.length) {
                citySearch(cityArrCopy[i]);
            }
        }
    }


    $("#searchButton").click(function (event) {
        event.preventDefault();
        let city = $("#cityInput").val()
        if (city) {
            citySearch(city);
        }
    });



    function citySearch(city) {

        $("#weatherBox").empty();

        // console.log(city);
        let queryCurrentURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}&units=imperial`;
        let queryForecastURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${APIKey}&units=imperial`;

        //call the API for current Weather
        $.ajax({
            url: queryCurrentURL,
            method: "GET"
        }).then(function (response) {
            weather = response;
            currentWeather(weather);
            // console.log(weather);
        })
        //Call the API for 5 day forecast.
        $.ajax({
            url: queryForecastURL,
            method: "GET"
        }).then(function (response) {
            forecast = response;
        })
        addCityShortcut(city);

        localStorage.setItem("cityWeather", JSON.stringify(cityArr))

    }

    function addCityShortcut(city) {
        const idx = cityArr.indexOf(city);
        if (idx > -1) {
            cityArr.splice(idx, 1);
            $(`#${city}`).remove();
        }

        //generate button and styling dynamically for each city in the array
        let nuCity = $("<button></button>");
        nuCity.attr('id', city);
        nuCity.attr("class", "form-control btn-outline-info shortcutBtn");
        nuCity.attr("data-city", city)

        nuCity.text(city);

        if (cityArr.length < 5) {
            cityArr.push(city);
            $("#buttonContainer").prepend(nuCity);
        } else {
            cityArr.shift();
            //remove the old button from the page
            $("#buttonContainer").children().last().remove();
            cityArr.push(city);
            $("#buttonContainer").prepend(nuCity);
        }

        $(`#${city}`).click(function (event) {
            let city = event.currentTarget.attributes["data-city"].value;
            $(event.currentTarget.attributes["id"]).remove();
            // console.log(city);
            citySearch(city);
        });

        // console.log(cityArr);

    };
    // console.log(cityArr);
    function currentWeather(weatherAt) {
        let city = weatherAt.name;
        let temp = weatherAt.main.temp;
        let humid = weatherAt.main.humidity;
        let wind = weatherAt.wind.speed;
        let icon = weatherAt.weather[0].icon;
        let iconURL = `http://openweathermap.org/img/wn/${icon}.png`
        let lat = weatherAt.coord.lat;
        let lon = weatherAt.coord.lon;
        let uvIndex = '';
        let queryUvURL = `https://api.openweathermap.org/data/2.5/uvi?appid=${APIKey}&lat=${lat}&lon=${lon}`;

        $.ajax({
            url: queryUvURL,
            method: "GET"
        }).then(function (response) {
            uvIndex = response.value;
            // city UV
            console.log(uvIndex);
            cityUV.text(`UV Index: ${uvIndex}`);
        })
        // build the current weather information div

        let currentWeather = $("<div>")
        let cityHead = $("<h2>")
        let cityWeather = $("<img>")
        let cityTemp = $("<p>");
        let cityHumid = $("<p>");
        let cityWind = $("<p>");
        let cityUV = $("<p>");

        currentWeather.attr("style", "");
        //city name date and weather icon
        cityWeather.attr("src", iconURL);
        cityHead.text(`${city} (${date})`);
        cityHead.append(cityWeather)
        currentWeather.append(cityHead);

        // city Temp
        cityTemp.text(`Temperature: ${temp} \xb0F`);
        currentWeather.append(cityTemp);

        //city humidity
        cityHumid.text(`Humidity: ${humid}%`);
        currentWeather.append(cityHumid);

        // city Wind 
        cityWind.text(`Wind Speed: ${wind} MPH`);
        currentWeather.append(cityWind);
        // console.log(uvIndex);

        currentWeather.append(cityUV);

        //print to screen
        $("#weatherBox").append(currentWeather);

    };







    //TODO: store returned information
    //TODO: generate clickable "button" for the returned city that stores the response to localstorage
    //TODO: generate HTML elements to render the City Temperature Humidity Wind SPeed and UV Index on screen
    //TODO: generate HTML elements to display the 5 Day forecast (boostrap cards)

    // end of document.ready function
});