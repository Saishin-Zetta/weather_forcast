let weatherKey = "b9daa77b622e6f5493a6d100e8742c5a"




// getting weather for user's current position
function getWeather() {
    console.log("retreiving weather!")
    let userCity = JSON.parse((localStorage.getItem("response"))); 
    let weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${userCity}&APPID=${weatherKey}&units=imperial`;
    fetch(weatherUrl)
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            console.log(data)
            console.log("Here is the current weather data.")
            setPage()
        })
        .catch(() => {
            alert("You might have the wrong city, please check again!");
        });
    
}

// load in a position at the start of opening the browser
function load() {
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
          localStorage.setItem("response", JSON.stringify(data.city.name));
          getWeather()
        });
    });
    
}
load()

// document slots where output data is going
let date = $("#info1")
let cityName = $("#info2")
let icon = $("#info3")
let temp = $("#info4")
let humid = $("#info5")
let wind = $("#info6")

function setPage() {
  // setting the date
  date.text(dayjs().format("dddd, MMMM DD, h:mma"))
  // setting the city name
  cityName.text(JSON.parse((localStorage.getItem("response"))))
  
}