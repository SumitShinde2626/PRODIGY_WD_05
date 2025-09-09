const apiKey = "YOUR_API_KEY"; // Get from https://openweathermap.org/api

const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const locationBtn = document.getElementById("locationBtn");

const weatherCard = document.getElementById("weather");
const cityName = document.getElementById("cityName");
const condition = document.getElementById("condition");
const icon = document.getElementById("icon");
const temp = document.getElementById("temp");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");

// Fetch weather by city name
async function fetchWeather(city) {
  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    const res = await fetch(url);
    if (!res.ok) throw new Error("City not found");
    const data = await res.json();
    displayWeather(data);
  } catch (error) {
    alert(error.message);
  }
}

// Fetch weather by geolocation
function fetchWeatherByLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(async (pos) => {
      const { latitude, longitude } = pos.coords;
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
      const res = await fetch(url);
      const data = await res.json();
      displayWeather(data);
    }, () => {
      alert("Unable to retrieve location");
    });
  } else {
    alert("Geolocation not supported");
  }
}

// Display weather data
function displayWeather(data) {
  cityName.textContent = data.name + ", " + data.sys.country;
  condition.textContent = data.weather[0].description;
  icon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
  temp.textContent = Math.round(data.main.temp);
  humidity.textContent = data.main.humidity;
  wind.textContent = data.wind.speed;
  
  weatherCard.classList.remove("hidden");
}

// Event Listeners
searchBtn.addEventListener("click", () => {
  const city = cityInput.value.trim();
  if (city) fetchWeather(city);
});

locationBtn.addEventListener("click", fetchWeatherByLocation);
