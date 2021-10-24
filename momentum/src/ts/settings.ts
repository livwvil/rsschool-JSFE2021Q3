import imgSources from "./imageSources";
import { changeLanguage, getAvaliableLanguages, t } from "./translator";

const settingsBtn: HTMLButtonElement | null =
  document.querySelector(".settings-icon");
const settingsModalContainer: HTMLElement | null = document.querySelector(
  ".settings-modal-container"
);
const commonHeading: HTMLHeadingElement | null =
  document.querySelector(".s-sect.common");
const visibilityHeading: HTMLHeadingElement | null =
  document.querySelector(".s-sect.vis");
const visibilityCheckboxes: NodeListOf<HTMLInputElement> | undefined =
  settingsModalContainer?.querySelectorAll("input[type='checkbox']");
const settingsLabels: NodeListOf<HTMLLabelElement> | undefined =
  settingsModalContainer?.querySelectorAll("label");

const languageSelect: HTMLSelectElement | null =
  document.querySelector("#s_lang");
const imageSource: HTMLSelectElement | null =
  document.querySelector("#s_imgsrc");
const imageTags: HTMLInputElement | null = document.querySelector("#s_imgtags");
const cancelBtn: HTMLButtonElement | null =
  document.querySelector(".cancel-btn");
const confirmBtn: HTMLButtonElement | null =
  document.querySelector(".confirm-btn");

export function initSettings() {
  if (
    !settingsBtn ||
    !settingsModalContainer ||
    !cancelBtn ||
    !confirmBtn ||
    !settingsLabels ||
    !visibilityHeading ||
    !commonHeading ||
    !imageTags ||
    !imageSource
  ) {
    return;
  }

  settingsLabels.forEach((label) => {
    label.textContent = t(`settings.${label.htmlFor}`);
  });
  commonHeading.textContent = t("settings.common_sect");
  visibilityHeading.textContent = t("settings.visibility_sect");
  cancelBtn.textContent = t("settings.cancel_btn");
  confirmBtn.textContent = t("settings.confirm_btn");
  imageTags.placeholder = t("settings.imgtags_placeholder");

  let onSettingsChanged: (setting: string) => void = (setting: string) => {};

  function saveSettings() {
    if (
      !visibilityCheckboxes ||
      !languageSelect ||
      !imageSource ||
      !imageTags
    ) {
      return;
    }

    for (const setting of visibilityCheckboxes) {
      localStorage.setItem(setting.id, String(setting.checked));
    }
    localStorage.setItem("app-lang", languageSelect.selectedOptions[0].value);
    localStorage.setItem("img-src", imageSource.selectedOptions[0].value);
    localStorage.setItem("img-src-tags", imageTags.value);
  }

  function imgSrcChanged(e: Event) {
    if (!imageTags) {
      return;
    }

    const select = e.target as HTMLSelectElement;
    const selectedItem = select.selectedOptions[0];
    if (selectedItem) {
      const src = imgSources.find((src) => src.name === selectedItem.value);
      if (src) {
        if (src.tagsAllowed) {
          imageTags.classList.remove("hidden");
        } else {
          imageTags.classList.add("hidden");
          imageTags.value = "";
        }
      }
    }
  }

  function restoreSettings() {
    if (
      !visibilityCheckboxes ||
      !languageSelect ||
      !imageSource ||
      !imageTags
    ) {
      return;
    }

    for (const setting of visibilityCheckboxes) {
      const state: boolean = localStorage.getItem(setting.id) === "true";
      setting.checked = state;
    }

    languageSelect.innerHTML = "";
    for (const lang of getAvaliableLanguages()) {
      const lng = document.createElement("option");
      lng.value = lang;
      lng.selected = lang === localStorage.getItem("app-lang");
      lng.textContent = t(`settings.lang.${lang}`);
      languageSelect.append(lng);
    }

    imageSource.innerHTML = "";
    for (const src of imgSources) {
      const opt = document.createElement("option");
      opt.value = src.name;
      opt.selected = src.name === localStorage.getItem("img-src");
      opt.textContent = t(`settings.imgsrc.${src.name}`);
      imageSource.append(opt);
    }

    imageSource.dispatchEvent(new Event("change"));

    imageTags.value = localStorage.getItem("img-src-tags") || "";
  }

  function applySettings() {
    if (!languageSelect || !visibilityCheckboxes || !cancelBtn) {
      return;
    }

    const prevImageApi = localStorage.getItem("img-src")
    const prevImageTags = localStorage.getItem("img-src-tags")
    
    saveSettings();
    
    const curImageApi = localStorage.getItem("img-src")
    const curImageTags = localStorage.getItem("img-src-tags")

    if(prevImageApi !== curImageApi || prevImageTags !== curImageTags) {
      onSettingsChanged("slider");
    }

    changeLanguage(languageSelect.selectedOptions[0].value);

    for (const checkbox of visibilityCheckboxes) {
      const forHtmlId = checkbox.id.split("_")[1];
      const elem = document.querySelector(`#${forHtmlId}`);
      if (elem) {
        if (checkbox.checked) {
          elem.classList.remove("hidden");
        } else {
          elem.classList.add("hidden");
        }
      }
    }

    cancelBtn.click();
  }

  function toggleModal(e: Event) {
    if (
      !settingsModalContainer ||
      ![settingsModalContainer, settingsBtn, cancelBtn].includes(
        e.target as HTMLElement
      )
    ) {
      return;
    }
    e.stopPropagation();
    settingsModalContainer.classList.toggle("active");
    if (settingsModalContainer.classList.contains("active")) {
      restoreSettings();
    }
  }

  settingsBtn.addEventListener("click", toggleModal);
  settingsModalContainer.addEventListener("click", toggleModal);
  cancelBtn.addEventListener("click", toggleModal);
  confirmBtn.addEventListener("click", applySettings);
  imageSource.addEventListener("change", imgSrcChanged);

  restoreSettings();
  applySettings();
  cancelBtn.click();

  return {
    setOnSettingsChanged: (callback: (setting: string) => void) => {
      onSettingsChanged = callback;
    },
    finalize: () => {
      settingsBtn.removeEventListener("click", toggleModal);
      settingsModalContainer.removeEventListener("click", toggleModal);
      cancelBtn.removeEventListener("click", toggleModal);
      confirmBtn.removeEventListener("click", applySettings);
      imageSource.removeEventListener("change", imgSrcChanged);
    },
  };
}
