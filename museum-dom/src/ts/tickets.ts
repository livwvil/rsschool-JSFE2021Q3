export interface Rate {
  name: string;
  price: number;
}

export const TICKETS_TICKET_TYPE = "ticket-tt";
export const TICKETS_BASIC_AMOUNT = "ticket-basic-amount";
export const TICKETS_SENIOR_AMOUNT = "ticket-senior-amount";

export const BASE_PRICES: Rate[] = [
  {
    name: "permanent",
    price: 20,
  },
  {
    name: "temporary",
    price: 25,
  },
  {
    name: "combined",
    price: 40,
  },
];

export const SENIOR_RATE = 0.5;

const basicInput: HTMLInputElement | null =
  document.querySelector("#tickets-basic");
const seniorInput: HTMLInputElement | null =
  document.querySelector("#tickets-senior");
const total: HTMLSpanElement | null = document.querySelector("#tickets-total");

const calculatePrice = () => {
  const radioButton: HTMLInputElement | null = document.querySelector(
    "#tickets input[type='radio']:checked"
  );

  if (!basicInput || !seniorInput || !radioButton || !total) {
    return;
  }

  const basePrice: Rate | undefined = BASE_PRICES.find(
    (price) => price.name === radioButton.value
  );
  if (!basePrice) {
    return 0;
  }

  const basicAmount = Number.parseFloat(basicInput.value);
  const seniorAmount = Number.parseFloat(seniorInput.value);

  const totalPrice =
    basicAmount * basePrice.price +
    seniorAmount * basePrice.price * SENIOR_RATE;

  total.innerText = totalPrice.toString();

  localStorage.setItem(TICKETS_TICKET_TYPE, basePrice.name);
  localStorage.setItem(TICKETS_BASIC_AMOUNT, basicAmount.toString());
  localStorage.setItem(TICKETS_SENIOR_AMOUNT, seniorAmount.toString());
};

const restoreChoice = () => {
  if (!basicInput || !seniorInput || !total) {
    return;
  }

  const basicAmount = localStorage.getItem(TICKETS_BASIC_AMOUNT) || "0";
  const seniorAmount = localStorage.getItem(TICKETS_SENIOR_AMOUNT) || "0";
  const ticketType = localStorage.getItem(TICKETS_TICKET_TYPE) || "0";

  basicInput.value = basicAmount;
  seniorInput.value = seniorAmount;

  const ticketTypeRadioButtons: NodeListOf<HTMLInputElement> = document.querySelectorAll("#tickets input[type='radio']");
  const storedTicketTypeRadioButton = [...ticketTypeRadioButtons].find(tt => tt.value === ticketType)
  
  if(storedTicketTypeRadioButton) {
    storedTicketTypeRadioButton.checked = true;
  }
};

export function activateTickets() {
  const allInputs: NodeListOf<HTMLInputElement> =
    document.querySelectorAll("#tickets input");
  const allButtons: NodeListOf<HTMLInputElement> = document.querySelectorAll(
    "#tickets .right button"
  );
  
  restoreChoice();

  allInputs.forEach((input) => {
    input.addEventListener("change", calculatePrice);
  });

  allButtons.forEach((button) => {
    button.addEventListener("click", calculatePrice);
  });

  calculatePrice();
}
