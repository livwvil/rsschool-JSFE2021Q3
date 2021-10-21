import { t } from "./translator";

const timeContainer: HTMLTimeElement | null = document.querySelector(".time");
const dateContainer: HTMLElement | null = document.querySelector(".date");

export function initDateAndTime() {
  let timeOfDayChangedCallback: ((timeOfDay: string) => void) | undefined;
  let timeoutID: NodeJS.Timeout;
  let previousTimeOfDay: string;

  function getTimeOfDay(date: Date) {
    const hour = date.getHours();
    const times = ["night", "morning", "afternoon", "evening"];
    return times[Math.floor(hour / 6) % 4];
  }

  function showDate(date: Date) {
    if (!dateContainer) {
      return;
    }

    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      month: "long",
      day: "numeric",
    };
    const currentDate = date.toLocaleDateString(
      t("date_and_time.locale"),
      options
    );
    dateContainer.textContent = currentDate;
  }

  function showTime(date: Date) {
    if (!timeContainer) {
      return;
    }

    const currentTime = date.toLocaleTimeString();
    timeContainer.textContent = currentTime;
  }

  function updateTime() {
    const date = new Date();
    showTime(date);
    showDate(date);

    const currentTimeOfDay = getTimeOfDay(date);
    if (timeOfDayChangedCallback && currentTimeOfDay !== previousTimeOfDay) {
      timeOfDayChangedCallback(currentTimeOfDay);
    }
    previousTimeOfDay = currentTimeOfDay;
    timeoutID = setTimeout(updateTime, 1000);
  }

  updateTime();

  return {
    setOnTimeOfDayChanged: (callback: (timeOfDay: string) => void) =>
      (timeOfDayChangedCallback = callback),
    getCurrentTimeOfDay: () => getTimeOfDay(new Date()),
    finalize: () => {
      clearTimeout(timeoutID);
    },
  };
}
