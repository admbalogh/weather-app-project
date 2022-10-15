// Digital Clock

setInterval(showTime, 1000);

function showTime() {
  let time = new Date();
  let hour = time.getHours();
  let min = time.getMinutes();
  let sec = time.getSeconds();
  am_pm = "AM";

  if (hour > 12) {
    hour -= 12;
    am_pm = "PM";
  }
  if (hour == 0) {
    hr = 12;
    am_pm = "AM";
  }

  hour = hour < 10 ? "0" + hour : hour;
  min = min < 10 ? "0" + min : min;
  sec = sec < 10 ? "0" + sec : sec;

  let currentTime = `${hour}:${min}:${sec} ${am_pm}⏰`;

  document.getElementById("clock").innerHTML = currentTime;
}
showTime();
// Challenge 1
let now = new Date();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let currentDay = days[now.getDay()];

let month = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

let currentMonth = month[now.getMonth()];

let date = now.getDate();
let year = now.getFullYear();

let hour = now.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}

let minute = now.getMinutes();
if (minute < 10) {
  minute = `0${minute}`;
}

let liveDate = document.querySelector("#live");
liveDate.innerHTML = `${year}.${currentMonth}.${date}.${currentDay}`;

//Final Project Date conversion

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}
//Final Project
function displayWheatherForecast(response, index) {
  console.log(response.data.daily);
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");
  let days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
  let forecastHtml = "";
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHtml += `<div class="col-2">
       <div class="day-control">${formatDay(forecastDay.dt)}</div>
        <img src="http://openweathermap.org/img/wn/${
          forecastDay.weather[0].icon
        }@2x.png" alt="clear" width="100"/>
        <div class="forecast-temperature">
       <span class="forecast-temperature-max">${Math.round(
         forecastDay.temp.max
       )}˚</span>
      <span class="forecast-temperature-min">${Math.round(
        forecastDay.temp.min
      )}˚</span>
     </div>    
    </div>
   </div>`;
    }
  });
  forecastElement.innerHTML = forecastHtml;
}

//Forecast API Call

function getForecastApi(cordinates) {
  let apiKey = "c6d9f7aef9ff8091de9eeba09c596035";
  let apiURl = `https://api.openweathermap.org/data/2.5/onecall?lat=${cordinates.lat}&lon=${cordinates.lon}&appid=${apiKey}&units=metric`;
  console.log(apiURl);
  axios.get(apiURl).then(displayWheatherForecast);
}

//Challenge 1
function displayWeatherConditions(response) {
  console.log(response);
  let cityName = document.querySelector("#city");
  let temperature = document.querySelector("#temperature");
  let humidity = document.querySelector("#humidity");
  let windspeed = document.querySelector("#windspeed");
  let description = document.querySelector("#weather-description");
  let weatherIcon = document.querySelector("#icon");

  celsiusTemp = response.data.main.temp;

  cityName.innerHTML = `${response.data.name},${response.data.sys.country}`;
  temperature.innerHTML = Math.round(celsiusTemp);
  humidity.innerHTML = response.data.main.humidity;
  windspeed.innerHTML = Math.round(response.data.wind.speed);
  description.innerHTML = response.data.weather[0].description;
  weatherIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  getForecastApi(response.data.coord);
}

function searchCity(city) {
  let units = "metric";
  let apiKeycity = "c6d9f7aef9ff8091de9eeba09c596035";
  let apiUrlcity = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKeycity}&units=${units}`;

  axios.get(apiUrlcity).then(displayWeatherConditions);
}

function submitHandle(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", submitHandle);

//Bonus Challenge 2

//API Seach engine

function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let units = "metric";
  let apiKey = "c6d9f7aef9ff8091de9eeba09c596035";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayWeatherConditions);
}
function getMyPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let locationButton = document.querySelector("#myLocation");
locationButton.addEventListener("click", getMyPosition);

searchCity("Budapest");
