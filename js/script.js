function fetchAdvice() {
  fetch("https://api.adviceslip.com/advice")
    .then((response) => response.json())
    .then((data) => {
      const adviceId = data.slip.id;
      const adviceText = data.slip.advice;
      const adviceElement = document.querySelector(".advice__text");
      adviceElement.setAttribute("cite", `https://api.adviceslip.com/advice/${adviceId}`);
      adviceElement.textContent = adviceText;
    })
    .catch((error) => {
        adviceElement.textContent = "Algo de errado acontenceu e isso não é um conselho! Por favor, tente novamente mais tarde.";
    });
}

window.addEventListener("load", fetchAdvice);

const infoButton = document.querySelector(".info__button");
infoButton.addEventListener("click", fetchAdvice);
