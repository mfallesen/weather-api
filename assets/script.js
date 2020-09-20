let APIKey = "bb036cc9828bfc98081575922bfed294";
let city = "Denver"
    // Here we are building the URL we need to query the database
    let queryCurrentURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}&units=imperial`;
    let queryForecastURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${APIKey}&units=imperial`;
    let weather;
    let forecast;
    
    $.ajax({
        url: queryCurrentURL,
        method: "GET"
      }).then(function(response){
          weather = response;
        //   console.log(weather);
      })
      console.log(weather);
      $.ajax({
        url: queryForecastURL,
        method: "GET"
      }).then(function(response){
          forecast = response;
          console.log(forecast);
      })