$(document).ready(function () {
  // Use the [OpenWeather API](https://openweathermap.org/api) to retrieve weather data for cities.
  //  Use `localStorage` to store any persistent data.
  let vLon = 0;
  let vLat = 0;

  let browserHistory = JSON.parse(window.localStorage.getItem("history")) || [];
  // function to store cities searched, in an array and set it to local storage
  for (let i = 0; i < browserHistory.length; i++) {
    createButton(browserHistory[i]);
  }

  $(document).on("click", ".citybtn", function (event) {
    searchOpenWeather($(this).val());
  });

  $("#weather-search").on("click", function (event) {
    // Preventing the button from trying to submit the form
    event.preventDefault();
    // Storing the city name
    let weatherCity = $("#weather-input").val().trim();
    console.log(weatherCity);
    $("#weather-input").val("");
    // Running the function(passing in the city as an argument)
    searchOpenWeather(weatherCity);
  });

  $("#weather-input").keypress;

  function createButton(city) {
    let newButton = $("<button>").addClass("btn citybtn").text(city);
    newButton.val(city);
    $(".searchHistory").append(newButton);
  }

  function searchOpenWeather(city) {
    let APIKey = "166a433c57516f51dfab1f7edaed8413";

    // Here we are building the URL we need to query the database
    let queryURL =
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      city +
      "&appid=" +
      APIKey;

    console.log(queryURL);
    // Here we run our AJAX call to the OpenWeatherMap API
    $.ajax({
      url: queryURL,
      method: "GET",
    })
      // We store all of the retrieved data inside of an object called "response"
      .then(function (response) {
        // if statement below prevents duplicate entries before populating the search history
        if (browserHistory.indexOf(city) === -1) {
          browserHistory.push(city);
          window.localStorage.setItem(
            "history",
            JSON.stringify(browserHistory)
          );
          window.location.reload();
        }

        // Log the queryURL
        console.log(queryURL);

        // Log the resulting object
        console.log(response);

        // Transfer content to HTML
        $(".city").html("<h1>" + response.name + "    Weather Details</h1>");
        $(".wind").text("Wind Speed: " + response.wind.speed);
        $(".humidity").text("Humidity: " + response.main.humidity);

        // Convert the temp to fahrenheit
        var tempF = (response.main.temp - 273.15) * 1.8 + 32;

        // add temp content to html
        $(".temp").text("Temperature (K) " + response.main.temp);
        $(".tempF").text("Temperature (F) " + tempF.toFixed(2));

        // Logs the data in the console as well
        console.log("Wind Speed: " + response.wind.speed);
        console.log("Humidity: " + response.main.humidity);
        console.log("Temperature (F): " + tempF);
        vLon = response.coord.lon;
        vLat = response.coord.lat;
        console.log(vLon, vLat);
        searchOpenWeatherForecast(city);
        return vLat, vLon;
      });
  }

  function searchOpenWeatherForecast(city) {
    let APIKey = "166a433c57516f51dfab1f7edaed8413";

    // Here we are building the URL we need to query the database
    let queryURL =
      "https://api.openweathermap.org/data/2.5/forecast?q=" +
      city +
      "&appid=" +
      APIKey;

    console.log(queryURL);
    // Here we run our AJAX call to the OpenWeatherMap API
    $.ajax({
      url: queryURL,
      method: "GET",
    })
      // We store all of the retrieved data inside of an object called "response"
      .then(function (response) {
        // Log the queryURL
        console.log(queryURL);
        // Log the resulting object
        console.log(response);

        // Transfer content to HTML
        $; // Transfer content to HTML
        for (let i = 0; i < 5; i++) {
          console.log([i]);
          $(".date" + [i]).text("Date " + response.list[i].dt_txt);
          $(".wind" + [i]).text("Wind Speed: " + response.list[i].wind.speed);
          $(".humidity" + [i]).text(
            "Humidity: " + response.list[i].main.humidity
          );

          // Convert the temp to fahrenheit
          var tempF = (response.list[0].main.temp - 273.15) * 1.8 + 32;

          // add temp content to html
          $(".temp2" + [i]).text(
            "Temperature (K) " + response.list[i].main.temp
          );
          $(".tempF" + [i]).text("Temperature (F) " + tempF.toFixed(2));
        }
        console.log(vLat, vLon);
        searchOpenWeatherUV();
        // Log the data in the console as well
        console.log("Wind Speed: " + response.list[0].wind.speed);
        console.log("Humidity: " + response.list[0].main.humidity);
        console.log("Temperature (F): " + tempF);
      });
  }
  function searchOpenWeatherUV() {
    let APIKey = "166a433c57516f51dfab1f7edaed8413";

    // Here we are building the URL we need to query the database
    let queryURL =
      "https://api.openweathermap.org/data/2.5/uvi?appid=" +
      APIKey +
      "&lat=" +
      vLat +
      "&lon=" +
      vLon;

    console.log(queryURL);
    // Here we run our AJAX call to the OpenWeatherMap API
    $.ajax({
      url: queryURL,
      method: "GET",
    })
      // We store all of the retrieved data inside of an object called "response"
      .then(function (response) {
          console.log(response)
        // Transfer content to HTML
        $(".uvIndex").text("UV Index:" + response.value);
      });
  }
}); //closes document.ready
