import { t } from "./translator";
const cityInput: HTMLInputElement | null = document.querySelector(".city");
const weatherIcon: HTMLElement | null = document.querySelector(".weather-icon");
const temperature: HTMLSpanElement | null =
  document.querySelector(".temperature");
const weatherDescription: HTMLSpanElement | null = document.querySelector(
  ".weather-description"
);

const API_TOKEN = "85180df66ab95e81c6d07e4eef472fe8";

export function initWeather() {
  if (!cityInput) {
    return;
  }

  async function getWeatherJson() {
    if (!temperature || !weatherDescription || !weatherIcon || !cityInput) {
      return;
    }

    const cityEncoded = encodeURI(cityInput.value);
    const responseLanguage = t("weather.lang");
    const apiRef = `https://api.openweathermap.org/data/2.5/weather?q=${cityEncoded}&lang=${responseLanguage}&appid=${API_TOKEN}&units=metric`;
    try {
      const response = await fetch(apiRef);
      const json = await response.json();
      weatherIcon.className = "weather-icon owf";
      if (json && json.cod === 200) {
        weatherIcon.classList.add(`owf-${json.weather[0]?.id}`);
        temperature.textContent = `${json.main.temp}°C ${json.weather[0].description}`;
        weatherDescription.innerHTML = `${t("weather.wind")} ${
          json.wind.speed
        } ${t("weather.windSpeedUnit")}<br>${t("weather.humidity")} ${
          json.main.humidity
        }%`;
      } else {
        throw new Error();
      }
    } catch (e) {
      temperature.textContent = "";
      weatherDescription.textContent = t("weather.cityNotFound");
    }
  }

  const saveCity = (e: Event) => {
    localStorage.setItem("city", (e.target as HTMLInputElement).value);
  };

  const changeCity = (e: Event) => {
    getWeatherJson();
  };

  cityInput.addEventListener("input", saveCity);
  cityInput.addEventListener("change", changeCity);

  const storedUsername = localStorage.getItem("city");
  cityInput.value = storedUsername ? storedUsername : "Минск";

  getWeatherJson();

  return {
    finalize: () => {
      cityInput.removeEventListener("input", saveCity);
      cityInput.removeEventListener("change", changeCity);
    },
  };
}
