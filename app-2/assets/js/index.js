import { decks, getDeckByID } from "./decks.js";
import { hexToString, removeColorClasses} from "./colors.js";
import { renderCarouselView } from "./carousel.js";

const deckListEl = document.querySelector(".decks__list");
const deckTemplate = document.querySelector("#deck-template");
const homeView = document.querySelector("#home");
const aboutView = document.querySelector("#about");
const notFoundView = document.querySelector("#not-found");
const carouselView = document.querySelector("#carousel");
const mainContent = document.querySelector(".page__main-content");

function createDeckEl(item) {
  const deckEl = deckTemplate.content
    .querySelector(".deck")
    .cloneNode(true);

  deckEl.querySelector(".deck__title").textContent = item.name;

  removeColorClasses(deckEl); 
  
  const colorName = hexToString(item.color);
  deckEl.classList.add(`deck_color_${colorName}`);

  const cardCount = item.cards.length;
  deckEl.querySelector(".deck__count").textContent = `${cardCount} cards`;

  const deckLink = deckEl.querySelector(".deck__link"); 
  deckLink.href = `#carousel/${item.id}`; 

  const deleteBtn = deckEl.querySelector(".deck__delete-btn");
  deleteBtn.addEventListener("click", () => {
    deckEl.remove();
  });

  return deckEl;
}

function renderDeckEl(item) {
  const deckEl = createDeckEl(item);
  deckListEl.prepend(deckEl);
}

decks.forEach(renderDeckEl);

function renderView() {
  const hash = window.location.hash;

  const homeView = document.querySelector("#home");
  const aboutView = document.querySelector("#about");
  const notFoundView = document.querySelector("#not-found");
  const carouselView = document.querySelector("#carousel");
  const mainContent = document.querySelector(".page__main-content");

  homeView.classList.add("hidden");
  aboutView.classList.add("hidden");
  notFoundView.classList.add("hidden");
  carouselView.classList.add("hidden");

  if (hash === "#home" || hash === "") {
    homeView.classList.remove("hidden");
  } else if (hash === "#about") {
    aboutView.classList.remove("hidden");
  } else if (hash.startsWith("#carousel/")) {
    const currentDeckID = hash.split("/")[1];
    const currentDeck = getDeckByID(currentDeckID);

     if (currentDeck) {
      carouselView.classList.remove("hidden");
      mainContent.classList.add("page__main-content_location_carousel");
      renderCarouselView(currentDeck);
    } else {
    notFoundView.classList.remove("hidden");
    }
  }
}

window.addEventListener("hashchange", renderView);

renderView();