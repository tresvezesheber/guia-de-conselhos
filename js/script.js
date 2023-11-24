// ELEMENTS

const adviceWrapper = document.querySelector(".advice");
const adviceBox = document.querySelector(".advice");
const searchInput = document.querySelector(".search__input");
const searchResults = document.querySelector(".search__results");
var resultAdvicesList = document.querySelectorAll(".search__item");
const urlAdvice = "https://api.adviceslip.com/advice";
const errorElement = `<q class="advice__text">Algo de errado acontenceu e isso não é um conselho! Por favor, tente novamente mais tarde.</q>`;

// EVENTS

const infoButton = document.querySelector(".info__button");
infoButton.addEventListener("click", () => {
  fetchAdvice(urlAdvice)
    .then((data) => {
      createAdviceElement(data.slip);
      adviceBox.classList.remove("advice--hidden");
    })
    .catch((error) => {
      adviceWrapper.innerHTML = errorElement;
      adviceBox.classList.remove("advice--hidden");
    });
});

searchInput.addEventListener("input", (event) => {
  fetchAdvice(`${urlAdvice}/search/${event.target.value}`)
    .then((data) => {
      clearElement(searchResults);

      if (!data.hasOwnProperty("message")) {
        data.slips.forEach((element) => {
          searchResults.innerHTML += `<li class="search__item" data-id="${element.id}">"${element.advice.substring(0, 46)}..."</li>`;
        });
        resultAdvicesList = null;
        resultAdvicesList = document.querySelectorAll(".search__item");
        resultAdvicesList.forEach((element) => {
          element.addEventListener("click", (event) => {
            fetchAdvice(`${urlAdvice}/${event.target.getAttribute("data-id")}`)
              .then((data) => {
                createAdviceElement(data.slip);
                adviceBox.classList.remove("advice--hidden");
              })
              .catch((error) => {
                adviceWrapper.innerHTML = errorElement;
                adviceBox.classList.remove("advice--hidden");
              });

            setTimeout(() => closeSearchResults(), 100);
          });
        });
      } else {
        searchResults.innerHTML = `<li class="search__item">Nenhum resultado encontrado.</li>`;
      }
    })
    .catch((error) => {
      adviceWrapper.innerHTML = errorElement;
      adviceBox.classList.remove("advice--hidden");
    });

  searchResults.style.width = `${searchInput.offsetWidth}px`;
  openSearchResults();
});

searchInput.addEventListener("focusout", (event) => {
  console.log("focusout");
  setTimeout(() => closeSearchResults(), 200);
});

// FUNCTIONS

function fetchAdvice(url) {
  return fetch(url)
    .then((response) => response.json())
    .catch((error) => {
      throw new Error("Something went wrong while fetching advice.");
    });
}

function createAdviceElement(advice) {
  adviceWrapper.innerHTML = `<q class="advice__text" cite="${urlAdvice}/${advice.id}">${advice.advice}</q>`;
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
