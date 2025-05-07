function search(event) {
  event.preventDefault();
  let searchInputElement = document.querySelector("#search-input");
  let cityElement = document.querySelector("#current-city");
  cityElement.innerHTML = searchInputElement.value;

  // Fetch weather data when a new city is searched
  fetchWeatherData(searchInputElement.value);
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let day = date.getDay();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (hours < 10) {
    hours = `0${hours}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let formattedDay = days[day];
  return `${formattedDay} ${hours}:${minutes}`;
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

let currentDateElement = document.querySelector("#current-date");
let currentDate = new Date();
currentDateElement.innerHTML = formatDate(currentDate);

// import axios from "axios";
let spanTemp = document.querySelector(".current-temperature-value");
let temIcon = document.querySelector(".current-temperature-icon");

function fetchWeatherData(city) {
  let apiKey = `f0408960e7b774bctoa0a9f43209e1f3`;
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(weatherApp);
}

function weatherApp(response) {
  console.log(response.data);
  let temperature = Math.round(response.data.temperature.current);
  spanTemp.innerHTML = `${temperature}`;
  temIcon.setAttribute("src", response.data.condition.icon_url);
  console.log(response.data.condition.icon_url);
}
