//thomas

//mithilfe Mutation weil es sich sonst im Hovern für den Übersetzter nicht aktualisiert und den deutschen text anzeigen würde trotz gleichsetzung des data-content mit innerthtmltext
function updateDataContent(link) {
  link.setAttribute("data-content", link.textContent);
}

const links = document.querySelectorAll(".color-change-text");
links.forEach(updateDataContent);

let observer = new MutationObserver(function (mutations) {
  mutations.forEach(function (mutation) {
    if (mutation.type === "childList") {
      updateDataContent(mutation.target);
    }
  });
});

links.forEach(function (link) {
  observer.observe(link, { childList: true });
});

//cookie fenster ohne analytics oder funktion, die beim ersten mal bestätigen verschwinden wenn die seite geöffnet wurde
const modal = document.getElementById("modal");
const closeButton = document.getElementById("closeButton");

if (!sessionStorage.getItem("visited")) {
  sessionStorage.setItem("visited", "true");
  modal.classList.remove("hidden");
}

closeButton.addEventListener("click", () => {
  modal.classList.add("hidden");
});

window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.classList.add("hidden");
  }
});

/*burger menu neues styling*/
const menuBtn = document.querySelector(".menu-btn");
const navLinks = document.querySelector("#nav-links");
let menuOpen = false;
menuBtn.addEventListener("click", () => {
  if (!menuOpen) {
    menuBtn.classList.add("open");
    navLinks.classList.remove("hidden");
    menuOpen = true;
  } else {
    menuBtn.classList.remove("open");
    navLinks.classList.add("hidden");
    menuOpen = false;
  }
});
//kontaktformular
window.onload = function () {
  document
    .getElementById("modalSubmitButton")
    .addEventListener("click", function (event) {
      let inputs = document.querySelectorAll("#meinFormular input");
      let isValidForm = true;
      for (let i = 0; i < inputs.length; i++) {
        if (!inputs[i].checkValidity()) {
          isValidForm = false;
          break;
        }
      }

      let checkboxes = document.querySelectorAll(
        "#meinFormular .form-checkbox"
      );
      for (let i = 0; i < checkboxes.length; i++) {
        if (!checkboxes[i].checked) {
          isValidForm = false;
          break;
        }
      }

      if (!isValidForm) {
        document.getElementById("modalSubmit").classList.remove("hidden");
        event.preventDefault();
      }
    });

  document
    .getElementById("closeModalSubmit")
    .addEventListener("click", function (event) {
      document.getElementById("modalSubmit").classList.add("hidden");
    });
};

/* authToken from localStorage */
let authToken = localStorage.getItem("accessToken");

/*api post request/daten posten*/
document
  .getElementById("modalSubmitButton")
  .addEventListener("click", function (event) {
    event.preventDefault();

    document.getElementById("sucessfull").classList.add("hidden");
    document.getElementById("unsucessfull").classList.add("hidden");

    const legalguardian_lastname = document.getElementById(
      "legalguardian_lastname"
    ).value;
    const legalguardian_firstname = document.getElementById(
      "legalguardian_firstname"
    ).value;
    const email = document.getElementById("email").value;
    const child_firstname = document.getElementById("child_firstname").value;
    const child_age = parseInt(document.getElementById("child_age").value, 10);

    if (child_age > 16) {
      document.getElementById("ageControl").classList.remove("hidden");
      return;
    } else {
      document.getElementById("ageControl").classList.add("hidden");
    }

    const approval_privacypolicy = document.getElementById(
      "approval_privacypolicy"
    ).checked;
    const approval_participation = document.getElementById(
      "approval_participation"
    ).checked;
    const approval_mailnotification = document.getElementById(
      "approval_mailnotification"
    ).checked;
    const image = document.getElementById("file-upload").files[0];

    var formData = new FormData();
    formData.append("legalguardian_lastname", legalguardian_lastname);
    formData.append("legalguardian_firstname", legalguardian_firstname);
    formData.append("image", image);
    formData.append("email", email);
    formData.append("child_firstname", child_firstname);
    formData.append("child_age", child_age);
    formData.append(
      "approval_privacypolicy",
      approval_privacypolicy ? "1" : "0"
    );
    formData.append(
      "approval_participation",
      approval_participation ? "1" : "0"
    );
    formData.append(
      "approval_mailnotification",
      approval_mailnotification ? "1" : "0"
    );

    console.log(formData.get("image")); //überprüfung bild

    axios({
      method: "post",
      url: `${API_BASE_URL}/api/v1/submissions`,
      data: formData,
      headers: {
        Authorization: `Bearer ${authToken}`,
        "Content-Type": "multipart/form-data",
      },
    })
      .then((response) => {
        console.log(response.data);
        document.getElementById("sucessfull").classList.remove("hidden");
        document.getElementById("meinFormular").reset();
      })
      .catch((error) => {
        console.log(error);
        if (error.response) {
        }
        console.log(error.config);
        document.getElementById("unsucessfull").classList.remove("hidden");
      });
  });

/*Button zum schließen der Abfrage Meldungen*/
document
  .getElementById("closeUnsucessfull")
  .addEventListener("click", function () {
    document.getElementById("unsucessfull").classList.add("hidden");
  });
document
  .getElementById("closeSucessfull")
  .addEventListener("click", function () {
    document.getElementById("sucessfull").classList.add("hidden");
  });

//gabriel
