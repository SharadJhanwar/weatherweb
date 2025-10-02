const para = document.createElement("p");
para.classList.add("cust_para");
document.querySelector(".content").append(para);

const api_key = "c3ad88b4b126423e88370242251404"; //Your API
const url = "http://api.weatherapi.com/v1/current.json";
const search_bar = document.getElementById("search");

async function load_data(city_name) {
  const fetch_url = new URL(url);
  console.log(fetch_url)
  var params = { key: api_key, q: city_name, aqi: "yes" };
  fetch_url.search = new URLSearchParams(params).toString();
   console.log(fetch_url)
  try {
    const response = await fetch(fetch_url);
    if (!response.ok) {
      window.alert("City Not Found");
      throw new Error(`Response status:${response.status}`);
    }

    const json = await response.json();
    console.log(json);
    document.querySelector(".city").textContent = json.location.name;
    para.innerHTML = `<p>Current Temperature : ${
      json.current.temp_c
    } °C</p><p>Feels Like : ${json.current.feelslike_c}</p><br>
        <i class="wi wi-${getWeatherIcon(
          json.current.condition.code
        )}" style="font-size:3rem;"><span style="font-size:1rem;"> ${getWeatherIcon(
      json.current.condition.code
    )}<span></i><br>
        <p>Humiidity  : ${json.current.humidity}</p>
        <p>Air Quality : ${
          json.current.air_quality.pm2_5
        } (${getAirQualityLevel(
      json.current.air_quality.pm2_5
    )})<span class="aqi-circle" style="background-color:${getAirQualityColor(
      json.current.air_quality.pm2_5
    )};"></span></p>
        <p>UV : ${json.current.uv}  (${getUvLevel(json.current.uv)}) </p>`;
  } catch (error) {
    window.alert("cant connect to server");
    console.error(error.message);
  }
}
function getCity() {
  var data = search_bar.value;
  // console.log(data);
  if (data) {
    load_data(data);
  } else {
    window.alert("enter the city first😡");
  }
}
function selectedCity(citySelected) {
  load_data(citySelected);
}
function getUvLevel(uv) {
  if (uv <= 2) return "Low";
  if (uv <= 5) return "Moderate";
  if (uv <= 7) return "High";
  if (uv <= 10) return "Very High";
  return "Extreme";
}

function getWeatherIcon(code) {
  const iconMap = {
    1000: "day-sunny",
    1003: "day-cloudy",
    1006: "cloudy",
    1009: "cloudy",
    1030: "fog",
    1063: "rain",
    1066: "snow",
    1069: "sleet",
    1072: "sleet",
    1087: "thunderstorm",
    1114: "snow-wind",
    1117: "snow-wind",
    1135: "fog",
    1147: "fog",
    1150: "rain",
    1153: "rain",
    1168: "rain",
    1171: "rain",
    1180: "rain",
    1183: "rain",
    1186: "rain",
    1189: "rain",
    1192: "rain",
    1195: "rain",
    1198: "rain",
    1201: "rain",
    1204: "sleet",
    1207: "sleet",
    1210: "snow",
    1213: "snow",
    1216: "snow",
    1219: "snow",
    1222: "snow",
    1225: "snow",
    1237: "snow",
    1240: "rain",
    1243: "rain",
    1246: "rain",
    1249: "sleet",
    1252: "sleet",
    1255: "snow",
    1258: "snow",
    1261: "sleet",
    1264: "sleet",
    1273: "thunderstorm",
    1276: "thunderstorm",
    1279: "snow",
    1282: "snow",
  };
  return iconMap[code] || "day-sunny";
}
function getAirQualityLevel(pm2_5) {
  if (pm2_5 <= 12) return "Good";
  if (pm2_5 <= 35.4) return "Moderate";
  if (pm2_5 <= 55.4) return "Unhealthy for Sensitive Groups";
  if (pm2_5 <= 150.4) return "Unhealthy";
  if (pm2_5 <= 250.4) return "Very Unhealthy";
  return "Hazardous";
}
function getAirQualityColor(pm2_5) {
  if (pm2_5 <= 12) return "green";
  if (pm2_5 <= 35.4) return "yellow";
  if (pm2_5 <= 55.4) return "orange";
  if (pm2_5 <= 150.4) return "red";
  if (pm2_5 <= 250.4) return "purple";
  return "maroon";
}

function getUserLocationWeather() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(success, error);
  } else {
    alert("Geolocation is not supported by your browser.");
  }

  function success(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    const location = `${lat},${lon}`; // "18.52,73.85" format
    load_data(location); // Your existing function will work!
  }

  function error() {
    alert("Unable to retrieve your location. Please search manually.");
  }
}
window.onload = function () {
  getUserLocationWeather(); // Auto-detect and show weather
};
