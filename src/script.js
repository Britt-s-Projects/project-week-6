let now = new Date();

let todayDate = document.querySelector("#todayDate");
let todayTime = document.querySelector("#todayTime");
let date = now.getDate();
let minutes = now.getMinutes();
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let month = now.getMonth() + 1;
let year = now.getFullYear();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];

todayDate.innerHTML = `${day}, ${date}/${month}/${year}`;
todayTime.innerHTML = `${hours}:${minutes}`;

function showTemperature(response) {
  console.log(response.data);
  
  let temperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("#temperature");
  let iconElement =  document.querySelector("#icon")
  
  temperatureElement.innerHTML = `${temperature}`;
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#min").innerHTML = Math.round(response.data.main.temp_min);
  document.querySelector("#max").innerHTML = Math.round(response.data.main.temp_max);
  document.querySelector("#description").innerHTML = response.data.weather[0].main;
  document.querySelector("#feels-like").innerHTML = Math.round(response.data.main.feels_like);
  document.querySelector("#humidity").innerHTML =response.data.main.humidity;
  document.querySelector("#wind").innerHTML = response.data.wind.speed;
  iconElement.setAttribute ("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);

  celsiusTemperature = response.data.main.temp;
  celsiusMin = response.data.main.temp_min;
  celsiusMax = response.data.main.temp_max;
  celsiusFeels = response.data.main.feels_like;

}

function searchCity(city) {
  let apiKey = "4dd89d25d72e4d6c413288eb27dfcc72";
  let apiEndpoint = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric`;
  let apiUrl = `${apiEndpoint}&appid=${apiKey}`;
  
  axios.get(`${apiUrl}`).then(showTemperature);

}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}




function searchLocation(position) {
   let apiKey = "4dd89d25d72e4d6c413288eb27dfcc72";
   let apiEndpoint = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric`;
   let apiUrl = `${apiEndpoint}&appid=${apiKey}`;

    axios.get(`${apiUrl}`).then(showTemperature);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation); 
 
  
}

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
   document.querySelector("#temperature").innerHTML = Math.round(fahrenheitTemperature);
   let fahrenheitMin = (celsiusMin * 9) / 5 + 32;
   document.querySelector("#min").innerHTML = Math.round(fahrenheitMin); 
     let fahrenheitMax = (celsiusMax * 9) / 5 + 32;
     document.querySelector("#max").innerHTML = Math.round(fahrenheitMax); 
       let fahrenheitFeels = (celsiusFeels * 9) / 5 + 32;
       document.querySelector("#feels-like").innerHTML = Math.round(fahrenheitFeels); 
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  document.querySelector("#temperature").innerHTML = Math.round(celsiusTemperature);
     document.querySelector("#min").innerHTML = Math.round(celsiusMin);
     document.querySelector("#max").innerHTML = Math.round(celsiusMax);
     document.querySelector("#feels-like").innerHTML = Math.round(celsiusFeels); 
}

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);


let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);


let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

searchCity("London");


let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click",  displayFahrenheitTemperature);