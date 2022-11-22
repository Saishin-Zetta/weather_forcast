let weatherKey = "b9daa77b622e6f5493a6d100e8742c5a"






// load in a position at the start of opening the browser

function fiveDayForecast() {
    navigator.geolocation.getCurrentPosition((position) => {
      let lat = position.coords.latitude;
      let long = position.coords.longitude;
      let fiveDayURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&appid=${weatherKey}&units=imperial`;
  
      fetch(fiveDayURL)
        .then((res) => {
          return res.json();
        })
        .then((data) => {
        //   fiveDayWeather(data);
          // localStorage.setItem("response", JSON.stringify(data.city.name));
          console.log(data)
          console.log("Here's the data")
          setForecast(data)
        });
    });
    
}

// getting weather for user's current position
// set event in searchbox
let input = document.querySelector("#searchBox");

// create an event listener to search 
input.addEventListener("keypress", (e) => {
  if (e.key == "Enter") {
    citySearch();
    fiveDayForecast();
    input.value = ""
  }
});

function citySearch() {
  console.log("retreiving weather!")
  let search = input.value; 
  let weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${search}&APPID=${weatherKey}&units=imperial`;
  fetch(weatherUrl)
      .then((res) => {
          return res.json();
      })
      .then((data) => {
          console.log(data)
          console.log("Here is the current weather data.")
          setPage(data)
      })
      .catch(() => {
          alert("You might have the wrong city, please check again!");
      });
  
}

// document slots where output data is going
let date = $("#info1")
let cityName = $("#info2")
let icon = $("#info3")
let temp = $("#info4")
let humid = $("#info5")
let wind = $("#info6")



function setPage(weatherData) {
  // setting the date
  date.text(dayjs().format("dddd, MMMM DD, h:mma"))
  // setting the city name
  cityName.text(weatherData.name)
  // setting temp
  temp.text("Current Temperature: " + weatherData.main.temp + "\u00B0")
  // setting the humidity
  humid.text("Current Humidity: " + weatherData.main.humidity + "%")
  // setting the wind speed
  wind.text("Current Wind Speeds: " + weatherData.wind.speed + " mph")
  // setting the icon
  icon.html(`<img src="http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png" alt="Weather Image" width="40" height="40">`)
}

// defining a for loop to cycle out ONLY the next five days, not including the current day
function setForecast(fiveDayData){
  for (let i = 7; i < 32; i++ ){
    console.log($(`#info${i}`).text())
    if ($(`#info${i}`).text() === "Date"){
      $(`#info${i}`).text(fiveDayData.list[i-6].dt_txt)
    }
    if ($(`#info${i}`).text() === "Temperature"){
      $(`#info${i}`).text("Projected Temperatures: " + fiveDayData.list[i-6].main.temp + "\u00B0")
    }
    
    if ($(`#info${i}`).text() === "Humidity"){
      $(`#info${i}`).text("Projected Humidity: " + fiveDayData.list[i-6].main.humidity + "%")
    }

    if ($(`#info${i}`).text() === "Wind Speed"){
      $(`#info${i}`).text("Projected Wind Speed: " + fiveDayData.list[i-6].wind.speed + "mph")
    }
    if ($(`#info${i}`).text() === "Icon"){
      $(`#info${i}`).html(`<img src="http://openweathermap.org/img/w/${fiveDayData.list[i-6].weather[0].icon}.png" alt="Weather Image" width="40" height="40">`)
    }

    console.log("It's working!")
  }
}
