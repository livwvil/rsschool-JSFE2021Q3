import { t } from "./translator";

const quoteContainer: HTMLElement | null = document.querySelector(".quote");

const authorContainer: HTMLElement | null = document.querySelector(".author");

const changeQuoteButton: HTMLButtonElement | null =
  document.querySelector(".change-quote");

export function initQuotes() {
  if (!quoteContainer || !authorContainer || !changeQuoteButton) {
    return;
  }

  let quoteNumber: number = parseFloat(
    localStorage.getItem("quoteNumber") || "0"
  );

  async function getRandomQuote() {
    if (!quoteContainer || !authorContainer) {
      return;
    }

    const quotes = `public/quotes/quotes.${t("quotes.lang")}.json`;
    try {
      const res = await fetch(quotes);
      const json = await res.json();
      const quotesAmount = json?.length;
      if (json && quotesAmount > 0) {
        {
          let r: number;
          do {
            r = Math.round(Math.random() * (quotesAmount - 1));
          } while (r === quoteNumber);
          quoteNumber = r;
          localStorage.setItem("quoteNumber", String(quoteNumber));
        }
        quoteContainer.innerHTML = json[quoteNumber].text;
        authorContainer.innerHTML = json[quoteNumber].author;
      } else {
        throw new Error();
      }
    } catch (e) {
      quoteContainer.innerHTML = t("quotes.error");
      authorContainer.innerHTML = "";
    }
  }

  changeQuoteButton.addEventListener("click", getRandomQuote);

  getRandomQuote();

  return {
    finalize: () => {
      changeQuoteButton.removeEventListener("click", getRandomQuote);
    },
  };
}
