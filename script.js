const input = document.getElementById("city-input");
const button = document.getElementById("search-button");
const locationButton = document.getElementById("current-location-button");

const cityName = document.getElementById("city-name");
const cityTime = document.getElementById("city-time");
const cityTemperature = document.getElementById("city-temperature");

const apiKey = "47591c8d159b4478ba6132819231109";

async function getDataByCity(cityName) {
  try {
    const response = await fetch(
      `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${cityName}&aqi=yes`
    );

    if (!response.ok) {
      throw new Error(`Error fetching data. Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`An error occurred: ${error.message}`);
  }
}

async function getDataByLocation(lat, long) {
  try {
    const response = await fetch(
      `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${lat},${long}&aqi=yes`
    );

    if (!response.ok) {
      throw new Error(`Error fetching data. Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`An error occurred: ${error.message}`);
  }
}

async function gotLocation(position) {
  try {
    const result = await getDataByLocation(
      position.coords.latitude,
      position.coords.longitude
    );

    cityName.innerText = `🌆  ${result.location.name}, ${result.location.region} - ${result.location.country}`;
    cityTime.innerText = `🕒  ${result.location.localtime}`;
    cityTemperature.innerText = `🌡️  ${result.current.temp_c}°C`;
  } catch (error) {
    alert(`Error: ${error.message}`);
  }
}

function failedToGet() {
  alert("There was some issue getting your location.");
}

locationButton.addEventListener("click", () => {
  navigator.geolocation.getCurrentPosition(gotLocation, failedToGet);
});

button.addEventListener("click", async () => {
  const value = input.value.trim();

  if (value) {
    try {
      const result = await getDataByCity(value);

      cityName.innerText = `🌆  ${result.location.name}, ${result.location.region} - ${result.location.country}`;
      cityTime.innerText = `🕒  ${result.location.localtime}`;
      cityTemperature.innerText = `🌡️  ${result.current.temp_c}°C`;
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  } else {
    alert("Please enter a city name.");
  }
});
