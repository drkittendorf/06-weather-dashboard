$(document).ready(function () {
  // Use the [OpenWeather API](https://openweathermap.org/api) to retrieve weather data for cities.
  // The documentation includes a section called
  // "How to start" that will provide basic setup and usage instructions.
  //  Use `localStorage` to store any persistent data.
  let citySearch = [];

  $("#weather-search").on("click", function (event) {
    // Preventing the button from trying to submit the form
    event.preventDefault();
    // Storing the city name
    let weatherCity = $("#weather-input").val().trim();
    console.log(weatherCity);
    // Running the function(passing in the city as an argument)
    searchOpenWeather(weatherCity);
    storeCitySearch(weatherCity);
    return weatherCity;
  });

  $("#weather-input").keypress;

  function searchOpenWeather(city) {
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
        $(".city").html("<h1>" + response.name + "Weather Details</h1>");
        $(".wind").text("Wind Speed: " + response.wind.speed);
        $(".humidity").text("Humidity: " + response.main.humidity);

        // Convert the temp to fahrenheit
        var tempF = (response.main.temp - 273.15) * 1.8 + 32;

        // add temp content to html
        $(".temp").text("Temperature (K) " + response.main.temp);
        $(".tempF").text("Temperature (F) " + tempF.toFixed(2));

        // Log the data in the console as well
        console.log("Wind Speed: " + response.wind.speed);
        console.log("Humidity: " + response.main.humidity);
        console.log("Temperature (F): " + tempF);

        response.catch((error) => {
          console.error(error);
        });
      });
  }
  // function to store cities searched, in an array and set it to local storage
  function storeCitySearch(city) {
    citySearch.push(city);
    console.log(citySearch);
    localStorage.setItem("cityArray", JSON.stringify(citySearch));
    renderHistory();
  }

  //insert function to replicate history as divs
  function renderHistory() {
    $("#newDivHere").empty();
    let city = localStorage.getItem("cityArray");
    city = "cityArray" ? JSON.parse : [];

    $("#newDivHere").append("<div>" + city + "</div>");
  }
}); //closes document.ready
