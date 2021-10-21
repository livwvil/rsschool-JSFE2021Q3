import { t } from "./translator";

const greeteng: HTMLSpanElement | null = document.querySelector(".greeting");
const name: HTMLInputElement | null = document.querySelector(".name");

export function initGreeting(timeOfDay: string) {
  if (!name) {
    return;
  }

  function setGreeting(timeOfDay: string) {
    if (!greeteng) {
      return;
    }

    const translatedGreeteng = t(`greeting.${timeOfDay}`);
    greeteng.textContent = translatedGreeteng;
  }

  setGreeting(timeOfDay);

  name.placeholder = `[ ${t("greeting.name_placeholder")} ]`;

  const saveUsername = (e: Event) => {
    localStorage.setItem("username", (e.target as HTMLInputElement).value);
  };

  name.addEventListener("input", saveUsername);

  const storedUsername = localStorage.getItem("username");
  name.value = storedUsername ? storedUsername : "";

  return {
    setGreeting: setGreeting,
    finalize: () => {
      name.removeEventListener("input", saveUsername);
    },
  };
}
