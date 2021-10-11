import {
  BASE_PRICES,
  Rate,
  SENIOR_RATE,
  TICKETS_BASIC_AMOUNT,
  TICKETS_SENIOR_AMOUNT,
  TICKETS_TICKET_TYPE,
} from "./tickets";
import { addRule } from "./tools";

const dateInput: HTMLInputElement | null =
  document.querySelector("#modal-date");
const timeInput: HTMLInputElement | null =
  document.querySelector("#modal-time");

const ticketTypeSelect: HTMLSelectElement | null =
  document.querySelector("#modal-buy select");
const basicInput: HTMLInputElement | null =
  document.querySelector("#modal-basic");
const seniorInput: HTMLInputElement | null =
  document.querySelector("#modal-senior");
const buyButton: HTMLButtonElement | null = document.querySelector(".buy-btn");

const overviewDate: HTMLInputElement | null = document.querySelector(
  "#modal-overview-date"
);
const overviewTime: HTMLInputElement | null = document.querySelector(
  "#modal-overview-time"
);

const entryBasicTicketsPrice: HTMLSpanElement | null = document.querySelector(
  "#entry-ticket-basic-price"
);
const entrySeniorTicketsPrice: HTMLSpanElement | null = document.querySelector(
  "#entry-ticket-senior-price"
);

const basicTicketsAmount: HTMLSpanElement | null = document.querySelector(
  "#modal-overview-basic-amount"
);
const overviewBasicTicketsPrice: HTMLSpanElement | null =
  document.querySelector("#modal-overview-basic-price");
const seniorTicketsAmount: HTMLSpanElement | null = document.querySelector(
  "#modal-overview-senior-amount"
);
const overviewSeniorTicketsPrice: HTMLSpanElement | null =
  document.querySelector("#modal-overview-senior-price");

const entryTicketButtons: NodeListOf<HTMLButtonElement> =
  document.querySelectorAll("#modal-buy .amount-wrapper button");

const basicCalculatedPrice: HTMLSpanElement | null = document.querySelector(
  ".price-basic .calculated-price"
);
const seniorCalculatedPrice: HTMLSpanElement | null = document.querySelector(
  ".price-senior .calculated-price"
);
const totalPrice: HTMLSpanElement | null =
  document.querySelector("#total-price");

const restoreChoiceFromBuyTickets = () => {
  if (!basicInput || !seniorInput || !ticketTypeSelect) {
    return;
  }

  const basicAmount = localStorage.getItem(TICKETS_BASIC_AMOUNT) || "0";
  const seniorAmount = localStorage.getItem(TICKETS_SENIOR_AMOUNT) || "0";
  const ticketType = localStorage.getItem(TICKETS_TICKET_TYPE) || "0";

  basicInput.value = basicAmount;
  seniorInput.value = seniorAmount;

  const storedTicketTypeSelectOption = ticketTypeSelect.querySelector(
    `option[value=${ticketType}]`
  );
  if (storedTicketTypeSelectOption) {
    ticketTypeSelect.value = ticketType;
  }
};

const handleDateChange = () => {
  if (!dateInput || !overviewDate) {
    return;
  }

  const pickedDate = dateInput.value;
  const formatOptions: Intl.DateTimeFormatOptions = {
    weekday: "long",
    month: "long",
    day: "numeric",
  };
  const formattedDate = new Date(pickedDate).toLocaleDateString(
    "en-US",
    formatOptions
  );
  overviewDate.innerText = formattedDate;
};

const handleTimeChange = () => {
  if (!timeInput || !overviewTime) {
    return;
  }

  const pickedDate = timeInput.value;
  overviewTime.innerText = pickedDate;
};

const calculateTicketTypePrice = ():
  | { basic: number; senior: number }
  | undefined => {
  if (
    !ticketTypeSelect ||
    !entryBasicTicketsPrice ||
    !entrySeniorTicketsPrice ||
    !overviewBasicTicketsPrice ||
    !overviewSeniorTicketsPrice
  ) {
    return undefined;
  }

  const basePrice: Rate | undefined = BASE_PRICES.find(
    (price) => price.name === ticketTypeSelect.value
  );
  if (!basePrice) {
    return undefined;
  }

  const basic = basePrice.price;
  const senior = basePrice.price * SENIOR_RATE;

  entryBasicTicketsPrice.innerText = basic.toString();
  entrySeniorTicketsPrice.innerText = senior.toString();
  overviewBasicTicketsPrice.innerText = basic.toString();
  overviewSeniorTicketsPrice.innerText = senior.toString();

  return { basic: basic, senior: senior };
};

const calculatePrice = () => {
  const prices = calculateTicketTypePrice();
  if (
    !prices ||
    !basicInput ||
    !seniorInput ||
    !basicTicketsAmount ||
    !seniorTicketsAmount ||
    !basicCalculatedPrice ||
    !seniorCalculatedPrice ||
    !totalPrice
  ) {
    return;
  }
  const { basic, senior } = prices;

  const basicTotal = Number.parseFloat(basicInput.value) * basic;
  const seniorTotal = Number.parseFloat(seniorInput.value) * senior;

  basicTicketsAmount.innerText = basicInput.value;
  seniorTicketsAmount.innerText = seniorInput.value;

  basicCalculatedPrice.innerText = basicTotal.toString();
  seniorCalculatedPrice.innerText = seniorTotal.toString();

  totalPrice.innerText = (basicTotal + seniorTotal).toString();
};

const activateFormValidation = () => {
  const nameInput: HTMLInputElement | null =
    document.querySelector("#modal-name-input");
  const emailInput: HTMLInputElement | null =
    document.querySelector("#modal-email-input");
  const telInput: HTMLInputElement | null =
    document.querySelector("#modal-tel-input");

  telInput?.addEventListener("keyup", () => {
    const tel = telInput;
    const first = /^(\d{1,10})$/.test(tel.value);
    const second = /^((?:[\- ]?\d){0,10})$/.test(tel.value);
    const third = /^(\d{2,3}(?:[\- ]\d{2,3}){0,4})$/.test(tel.value);
    const isValidTel = first || (second && third);
    isValidTel
      ? tel.setCustomValidity("")
      : tel.setCustomValidity("Invalid input");
  });
};

export function activateModalBuy() {
  buyButton?.addEventListener("click", () => {
    restoreChoiceFromBuyTickets();
    calculatePrice();
  });

  var today = new Date().toISOString().split("T")[0];
  dateInput?.setAttribute("min", today);
  dateInput?.addEventListener("change", handleDateChange);

  timeInput?.addEventListener("change", handleTimeChange);

  ticketTypeSelect?.addEventListener("change", calculatePrice);
  entryTicketButtons.forEach((button) => {
    if (button) {
      button.addEventListener("click", calculatePrice);
    }
  });

  activateFormValidation();
}
