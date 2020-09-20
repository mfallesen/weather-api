let APIKey = "bb036cc9828bfc98081575922bfed294";
let city = "Denver"
    // Here we are building the URL we need to query the database
    let queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}`;
    $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response){
          console.log(response);
      })