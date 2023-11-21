// JENKINS TEST

// ELEMENTS
const adviceElement = document.querySelector(".advice__text");
const adviceBox = document.querySelector(".advice");
const searchInmput = document.querySelector(".search__input");
const searchResults = document.querySelector(".search__results");
var resultAdvicesList = document.querySelectorAll(".search__item");
const urlAdvice = "https://api.adviceslip.com/advice";

window.addEventListener("load", fetchRandomAdvice);

// EVENTS

const infoButton = document.querySelector(".info__button");
infoButton.addEventListener("click", () => {
  fetchRandomAdvice();
  adviceBox.classList.remove("advice--hidden");
});

searchInmput.addEventListener("input", (event) => {
  console.log("input");
  setTimeout(() => fetchSearchedAdvice(event.target.value), 500);
  searchResults.style.width = `${searchInmput.offsetWidth}px`;
  openSearchResults();
});

searchInmput.addEventListener("focusout", (event) => {
  console.log("focusout");
  setTimeout(() => closeSearchResults(), 200);
});


// FUNCTIONS

function fetchRandomAdvice() {
  fetch(urlAdvice)
    .then((response) => response.json())
    .then((data) => {
      const adviceId = data.slip.id;
      const adviceText = data.slip.advice;
      adviceElement.setAttribute("cite", `${urlAdvice}/${adviceId}`);
      adviceElement.textContent = adviceText;
    })
    .catch((error) => {
      adviceElement.textContent = "Algo de errado acontenceu e isso não é um conselho! Por favor, tente novamente mais tarde.";
    });
}

function fetchSearchedAdvice(query) {
  fetch(`${urlAdvice}/search/${query}`)
    .then((response) => response.json())
    .then((data) => {
      clearElement(searchResults);
      data.slips.forEach((element) => {
        searchResults.innerHTML += `<li class="search__item" data-id="${element.id}">"${element.advice.substring(0, 46)}..."</li>`;
      });
      resultAdvicesList = null;
      resultAdvicesList = document.querySelectorAll(".search__item");
      resultAdvicesList.forEach((element) => {
        element.addEventListener("click", (event) => {
          fetchAdviceById(event.target.getAttribute("data-id"));
          setTimeout(() => closeSearchResults(), 100);
        });
      });
    })
    .catch((error) => {
      adviceListElement.textContent = "Algo de errado acontenceu e isso não é um conselho! Por favor, tente novamente mais tarde.";
    });
}

function fetchAdviceById(adviceId) {
  fetch(`${urlAdvice}/${adviceId}`)
    .then((response) => response.json())
    .then((data) => {
      const adviceId = data.slip.id;
      const adviceText = data.slip.advice;
      adviceElement.setAttribute("cite", `${urlAdvice}/${adviceId}`);
      adviceElement.textContent = adviceText;
      adviceBox.classList.remove("advice--hidden");
    })
    .catch((error) => {
      adviceElement.textContent = "Algo de errado acontenceu e isso não é um conselho! Por favor, tente novamente mais tarde.";
    });
}

function openSearchResults() {
  searchResults.style.display = "block";
  searchResults.style.position = "absolute";
}

function clearElement(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

function closeSearchResults() {
  searchResults.style.display = "none";
  searchResults.style.position = "";
}
