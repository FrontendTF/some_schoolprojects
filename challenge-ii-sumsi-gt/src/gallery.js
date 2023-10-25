/* Global variables */

const API_BASE_URL = "https://sumsi.dev.webundsoehne.com";
let AUTH_TOKEN = "";
const AUTH_TOKEN_KEY = "accessToken";
let votes;
let headers = {};

/* gallery */
const galleryPopUp = document.getElementById("gallery-popup");
const descriptionImg = document.getElementById("description-img");
const descriptionAge = document.getElementById("description-age");
const descriptionName = document.getElementById("description-name");
const descriptionVotings = document.getElementById("description-votings");
const closeBtn = document.getElementById("close-btn");
const galleryContainer = document.getElementById("gallery-container");

/* email input */
const sendVoteMail = document.getElementById("send-vote-mail");
const voteMailInput = document.getElementById("vote-email");
let voteMail = "";

/* votes */
const votesById = {};
const votesCountByMail = {};
let votesCount = 0;

let userFeedback = document.getElementById("user-feedback");
let userFeedbackCount = document.getElementById("user-feedback-count");
/* #################### */
/* checking if the token is still valid */
function isTokenValid(decodedToken) {
  return decodedToken ? Date.now() >= decodedToken.exp * 1000 : false;
}

/* decoding token */
function parseJwt(token) {
  var base64Url = token.split(".")[1];
  var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  var jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return JSON.parse(jsonPayload);
}

/* get token and save in localstorage */
async function getAuthToken() {
  const localToken = localStorage.getItem(AUTH_TOKEN_KEY);
  const decodedToken = localToken ? parseJwt(localToken) : null;

  if (!decodedToken && isTokenValid(decodedToken)) {
    AUTH_TOKEN = localStorage.getItem(AUTH_TOKEN_KEY);
  } else {
    await axios
      .post(`${API_BASE_URL}/api/v1/login`, {
        email: "admin@csaw.at",
        password: "pw4sumsiadmin",
      })
      .then(function (response) {
        AUTH_TOKEN = response.data.token;
        localStorage.setItem(AUTH_TOKEN_KEY, AUTH_TOKEN);
      });
  }
}

/* get and load all elements for gallery */
window.addEventListener("load", async () => {
  await getAuthToken();
  headers = {
    Authorization: `Bearer ${AUTH_TOKEN}`,
  };
  createGalleryElements();
});

async function getAllSubmissions() {
  submissions = await axios.get(`${API_BASE_URL}/api/v1/submissions`, {
    headers: headers,
  });
  return submissions;
}

async function createGalleryElements() {
  let submissions = await getAllSubmissions();

  submissions.data.data.forEach((element) => {
    /* creating elements for images */
    let imgURL = element.image.public_location;
    const imgContainer = document.createElement("div");
    const img = document.createElement("img");
    imgContainer.classList.add("img-container");
    img.src = `${API_BASE_URL}${imgURL}`;
    img.loading = "lazy";
    img.alt = "gallery picture";

    galleryContainer.appendChild(imgContainer);
    imgContainer.appendChild(img);

    /* image description */
    const descriptionContainer = document.createElement("div");
    descriptionContainer.classList.add("description-container");

    descriptionNameAge = document.createElement("span");
    votes = document.createElement("span");
    votes.id = `votes-${element.id}`;

    let childName = element.child_firstname;
    let childAge = element.child_age;
    let imgVotes = element.votings.length;

    votesById[element.id] = imgVotes;

    imgContainer.appendChild(descriptionContainer);
    descriptionContainer.appendChild(descriptionNameAge);
    descriptionContainer.appendChild(votes);

    descriptionNameAge.innerHTML = `${childName} (${childAge})`;
    votes.innerHTML = `&#128155; ${imgVotes}`;

    imgContainer.addEventListener("click", () => {
      const voteBtn = document.getElementById("vote-btn");
      voteBtn.addEventListener("click", submitVoteEvent);
      if (galleryPopUp.classList.contains("hidden")) {
        galleryPopUp.classList.remove("hidden");
      } else {
        galleryPopUp.classList.add("hidden");
      }

      function submitVoteEvent() {
        submitVote(element.id);
      }

      descriptionImg.src = `${API_BASE_URL}${imgURL}`;
      descriptionName.innerHTML = `${childName}, `;
      descriptionAge.innerHTML = `${childAge} Jahre`;
      descriptionVotings.innerText = `Aktuellle Stimmen ${
        votesById[element.id]
      }`;

      closeBtn.addEventListener("click", () => {
        galleryPopUp.classList.add("hidden");
        voteBtn.removeEventListener("click", submitVoteEvent);
        userFeedback.classList.add("hidden");
      });
    });
  });
}

function submitVote(id) {
  axios
    .post(
      `${API_BASE_URL}/api/v1/submissions/${id}/votings`,
      { email: voteMail },
      { headers: headers }
    )
    .then((response) => {
      votesCountByMail[voteMail] = votesCount;

      if (response.data.status_code === 200) {
        updateVotes(id);
        userFeedbackCount.innerHTML =
          "Du hast noch " + (4 - votesCount) + " Stimmen übrig!";
        userFeedbackCount.classList.add("bg-green");
        userFeedbackCount.classList.remove("hidden");
        if (Number(votesCountByMail[voteMail]) >= 4) {
          userFeedbackCount.classList.add("hidden");
        }
      } else {
        userFeedback.classList.add("bg-er_red");
        userFeedback.classList.remove("hidden");

        if (Number(votesCountByMail[voteMail]) >= 5) {
          userFeedback.innerHTML =
            "Abstimmen für dieses Bild nicht mehr möglich du hast bereits Fünf mal gestimmt!";
        } else {
          userFeedback.innerHTML =
            "Abstimmen für dieses Bild nicht mehr möglich du hast für dieses Bild bereits gestimmt";
        }
      }
    });
}

function updateVotes(id) {
  descriptionVotings.innerText = "Aktuelle Votes";
  axios
    .get(`${API_BASE_URL}/api/v1/submissions/${id}/votes/count`, {
      headers: headers,
    })
    .then((res) => {
      votesById[id] = res.data.data.votes;
      descriptionVotings.innerText = `Aktuelle Votes ${votesById[id]}`;
      let votesVariable = document.getElementById(`votes-${id}`);
      votesVariable.innerHTML = `&#128155; ${votesById[id]}`;

      votesCountByMail[voteMail] = votesCount++;
    });
}

document.getElementById("mail-form").addEventListener("submit", (event) => {
  event.preventDefault();

  if (voteMailInput.value) {
    voteMail = voteMailInput.value;
    const voteBtn = document.getElementById("vote-btn");
    voteBtn.classList.remove("hidden");
    document.getElementById(
      "mail-input-info"
    ).innerText = `${voteMail}, Bereit fürs Abstimmen! :)`;

    votesCount = 0;
  }
});
