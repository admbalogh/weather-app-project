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
liveDate.innerHTML = `${year}.${currentMonth}.${date}. ${currentDay}`;

//Challenge 1

function search(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city");
  let city = document.querySelector("#city-input");
  cityInput.innerHTML = `${city.value} `;

  function showCity(reaction) {
    let temperature = Math.round(reaction.data.main.temp);
    let cityTemperature = document.querySelector("#temperature");
    cityTemperature.innerHTML = `${temperature}˚C`;
    let cityName = reaction.data.name;
    let city = document.querySelector("#city");
    city.innerHTML = cityName;
  }
  let units = "metric";
  let apiKeycity = "c6d9f7aef9ff8091de9eeba09c596035";
  let apiUrlcity = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&appid=${apiKeycity}&units=${units}`;

  axios.get(apiUrlcity).then(showCity);
}
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

//Bonus Challenge 2

//API Seach engine
function showTemp(response) {
  console.log(response);
  let myTemp = Math.round(response.data.main.temp);
  let myPosition = response.data.name;
  let mylocation = document.querySelector("h1");
  mylocation.innerHTML = `${myPosition}`;

  let mylocationTemp = document.querySelector("#temperature");
  mylocationTemp.innerHTML = `${myTemp}˚C`;
}

function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let units = "metric";
  let apiKey = "c6d9f7aef9ff8091de9eeba09c596035";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemp);
}
function getMyPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let locationButton = document.querySelector("#myLocation");
locationButton.addEventListener("click", getMyPosition);

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
