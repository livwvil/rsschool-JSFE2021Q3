import "../sass/style.scss";
import { initAudioplayer } from "./audioplayer";
import { initCustomWidget } from "./customWidget";
import { initDateAndTime } from "./date_and_time";
import { initGreeting } from "./greeteng";
import { initQuotes } from "./quotes";
import { printSelfcheck } from "./self_check";
import { initSettings } from "./settings";
import { initSlider } from "./slider";
import * as translator from "./translator";
import { initWeather } from "./weather";

const finalizeCallbacks: { (): void }[] = [];

function initJs() {
  const dateAndTime = initDateAndTime();
  const currentTimeOfDay = dateAndTime.getCurrentTimeOfDay();

  const slider = initSlider(currentTimeOfDay, 0);
  const greeting = initGreeting(currentTimeOfDay);
  const weather = initWeather();
  const quotes = initQuotes();
  const audioplayer = initAudioplayer();
  const settings = initSettings();
  const custom = initCustomWidget();

  const settingsChanged = (setting: string) => {
    if (setting === "slider") {
      slider && slider.onApiChanged();
    }
    if (setting === "language") {
    }
  };

  settings && settings.setOnSettingsChanged(settingsChanged);

  const timeOfDayChanged = (timeOfDay: string) => {
    greeting && greeting.setGreeting(timeOfDay);
    slider && slider.changeTimeOfDay(timeOfDay);
  };

  dateAndTime.setOnTimeOfDayChanged(timeOfDayChanged);

  dateAndTime && finalizeCallbacks.push(dateAndTime.finalize);
  greeting && finalizeCallbacks.push(greeting.finalize);
  slider && finalizeCallbacks.push(slider.finalize);
  weather && finalizeCallbacks.push(weather.finalize);
  quotes && finalizeCallbacks.push(quotes.finalize);
  audioplayer && finalizeCallbacks.push(audioplayer.finalize);
  settings && finalizeCallbacks.push(settings.finalize);
  custom && finalizeCallbacks.push(custom.finalize);
}

function reInitJs() {
  for (let finalizeCallback of finalizeCallbacks) {
    finalizeCallback();
  }
  finalizeCallbacks.length = 0;

  initJs();
}

document.addEventListener("DOMContentLoaded", async () => {
  await translator.i18nInitPromise;

  translator.onLanguageChanged(() => {
    reInitJs();
  });

  initJs();
  printSelfcheck();

  const appHeight = () => {
    const doc = document.documentElement;
    doc.style.setProperty("--app-height", `${window.innerHeight}px`);
  };
  window.addEventListener("resize", appHeight);
  appHeight();
});
