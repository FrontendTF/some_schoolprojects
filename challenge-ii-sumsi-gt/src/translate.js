function googleTranslateElementInit() {
  new google.translate.TranslateElement(
    {
      pageLanguage: "de",
    },
    "google_translate_element"
  );
}

const modal1 = document.getElementById("modal1");
const btn1 = document.getElementById("openModal1");
const span1 = document.getElementById("closeModal1");

btn1.onclick = function () {
  modal1.classList.remove("hidden");
};

span1.onclick = function () {
  modal1.classList.add("hidden");
};

window.onclick = function (event) {
  if (event.target == modal1) {
    modal1.classList.add("hidden");
  }
};
