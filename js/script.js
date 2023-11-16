const adviceElement = document.querySelector(".advice__text");
const adviceBox = document.querySelector(".advice");
const searchInmput = document.querySelector(".search__input");
const searchResults = document.querySelector(".search__results");
var resultAdvicesList = document.querySelectorAll(".search__item");

function fetchRandomAdvice() {
  fetch("https://api.adviceslip.com/advice")
    .then((response) => response.json())
    .then((data) => {
      const adviceId = data.slip.id;
      const adviceText = data.slip.advice;
      adviceElement.setAttribute("cite", `https://api.adviceslip.com/advice/${adviceId}`);
      adviceElement.textContent = adviceText;
    })
    .catch((error) => {
      adviceElement.textContent = "Algo de errado acontenceu e isso não é um conselho! Por favor, tente novamente mais tarde.";
    });
}

window.addEventListener("load", fetchRandomAdvice);

const infoButton = document.querySelector(".info__button");
infoButton.addEventListener("click", () => {
  fetchRandomAdvice();
  adviceBox.classList.remove("advice--hidden");
});

// CONTROLS

function fetchSearchedAdvice(query) {
  fetch(`https://api.adviceslip.com/advice/search/${query}`)
    .then((response) => response.json())
    .then((data) => {
      clearElement(searchResults);
      data.slips.forEach((element) => {
        let adviceListElement = document.createElement("li");
        adviceListElement.classList.add("search__item");
        adviceListElement.setAttribute("data-id", element.id);
        adviceListElement.textContent = `"${element.advice.substring(0, 46)}..."`;
        searchResults.appendChild(adviceListElement);
      });
      resultAdvicesList = null;
      resultAdvicesList = document.querySelectorAll(".search__item");
      console.log(resultAdvicesList);

      resultAdvicesList.forEach((element) => {
        console.log(element);
        element.addEventListener("click", (event) => {

          fetchAdviceById(event.target.getAttribute("data-id"));
          console.log(event.target.getAttribute("data-id"));
          console.log("HERE");

          searchResults.style.display = "none";
          searchResults.style.position = "";

        });
      });
    })
    .catch((error) => {
      adviceListElement.textContent = "Algo de errado acontenceu e isso não é um conselho! Por favor, tente novamente mais tarde.";
    });
}

searchInmput.addEventListener("focus", (event) => {
  searchResults.style.width = `${searchInmput.offsetWidth}px`;
});

searchInmput.addEventListener("input", (event) => {
  setTimeout(() => fetchSearchedAdvice(event.target.value), 500);

  // fetchSearchedAdvice(event.target.value);
});

function clearElement(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

function fetchAdviceById(adviceId) {
  fetch(`https://api.adviceslip.com/advice/${adviceId}`)
    .then((response) => response.json())
    .then((data) => {
      const adviceId = data.slip.id;
      const adviceText = data.slip.advice;
      adviceElement.setAttribute("cite", `https://api.adviceslip.com/advice/${adviceId}`);
      adviceElement.textContent = adviceText;
      adviceBox.classList.remove("advice--hidden");
    })
    .catch((error) => {
      adviceElement.textContent = "Algo de errado acontenceu e isso não é um conselho! Por favor, tente novamente mais tarde.";
    });
}

searchInmput.addEventListener("focusin", (event) => {
  searchResults.style.display = "block";
  searchResults.style.position = "absolute";
});