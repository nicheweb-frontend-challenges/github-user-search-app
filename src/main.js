// DOM initialization
//funcionalities
const darkTheme = document.querySelector(".dark-theme");
const lightTheme = document.querySelector(".light-theme");
const searchForm = document.querySelector(".search");
const searchInput = document.querySelector(".search input");
const btn = document.querySelector(".search button");

// profile data
const profilePicture = document.querySelector("aside .profile-picture");
const userHeading = document.querySelector("article header .heading");
const userName = document.querySelector("article header .user-name a");
const joinDate = document.querySelector("article header .join-date time");
const bio = document.querySelector(".bio");
const repos = document.querySelector("table tbody td:nth-of-type(1)");
const followers = document.querySelector("table tbody td:nth-of-type(2)");
const following = document.querySelector("table tbody td:nth-of-type(3)");
const location = document.querySelector(".location h4");
const website = document.querySelector(".website h4 a");
const twitter = document.querySelector(".twitter h4 a");
const company = document.querySelector(".company h4 a");

//Endpoint's URL
let userEndpoint = new URL("https://api.github.com/users/");

// function to populate the search results
function publicResult(res) {
  // profile picture
  profilePicture.src = res.avatar_url;

  // name
  userHeading.innerText = res.name ? res.name : res.login;

  // username
  userName.innerText = "@" + res.login;

  // joined Date
  let date = new Date(res.created_at);
  //formatting date's string
  let dateString = new Intl.DateTimeFormat("en-GB", {
    dateStyle: "long",
  }).format(date);
  joinDate.innerText = dateString;
  //updating datetime attribute
  joinDate.setAttribute("datetime", res.created_at);

  //bio
  bio.innerText = res.bio;
  bio.removeAttribute("style");
  if (!res.bio) {
    bio.innerText = "This profile has no bio";
    bio.style.opacity = 0.5;
  }

  // Repos | followers | following
  repos.innerText = res.public_repos;
  followers.innerText = res.followers;
  following.innerText = res.following;

  // location | website | twitter | company
  // location
  location.innerText = res.location;
  location.parentElement.removeAttribute("style");
  if (!res.location) {
    location.innerText = "Not available";
    location.parentElement.style.opacity = 0.5;
  }
  // website
  website.innerText = res.html_url;
  website.href = res.html_url;
  website.removeAttribute("class");
  website.removeAttribute("style");
  website.parentElement.parentElement.removeAttribute("style");
  if (!res.html_url) {
    website.innerText = "Not available";
    website.parentElement.parentElement.style.opacity = 0.5;
    website.href = "javaScript: void(0)";
    website.className = "disable-link-hover";
    website.style.pointerEvents = "none";
  }

  // twitter
  twitter.innerText = res.twitter_username;
  twitter.href = "https://twitter.com/" + res.twitter_username;
  twitter.removeAttribute("class");
  twitter.removeAttribute("style");
  twitter.parentElement.parentElement.removeAttribute("style");
  if (!res.twitter_username) {
    twitter.innerText = "Not available";
    twitter.parentElement.parentElement.style.opacity = 0.5;
    twitter.href = "javaScript: void(0)";
    twitter.className = "disable-link-hover";
    twitter.style.pointerEvents = "none";
  }

  // company
  if (!res.company) {
    company.innerText = "Not available";
    company.parentElement.parentElement.style.opacity = 0.5;
    company.href = "javaScript: void(0)";
    company.className = "disable-link-hover";
    company.style.pointerEvents = "none";
  } else {
    company.innerText =
      res.company.slice(0, 1) === "@" ? res.company.slice(1) : res.company;
    company.href =
      res.login === "octocat"
        ? "https://github.com/"
        : "https://github.com/" + company.innerText;
    company.removeAttribute("class");
    company.removeAttribute("style");
    company.parentElement.parentElement.removeAttribute("style");
  }
  console.log(company);
}

function getUser(username) {
  let userDataUrl = userEndpoint.href + username;
  fetch(userDataUrl)
    .then((response) => {
      if (!response.ok) {
        if (response.status == 404) {
          throw new Error("No results");
        } else {
          throw new Error("Network response was not OK");
        }
      }
      return response.json();
    })
    .then((response) => {
      console.log(response);
      publicResult(response);
    })
    .catch((error) => {
      console.error("There has been a problem with the fetch operation", error);
      searchInput.value = error.message;
      searchInput.style.color = "red";
      searchInput.style.textAlign = "right";
      if (error.message != "No results") {
        searchInput.value = "Network problems";
      }
    });
}
// Events
// On first load
window.onload = function () {
  getUser("octocat");
  searchInput.value = "";
};

// Pressing Search button
btn.addEventListener("click", function () {
  const inputValue = searchInput.value;
  getUser(inputValue);
  searchInput.value = "";
});

// Clicking the input box
searchInput.addEventListener("click", function () {
  searchInput.value = "";
  searchInput.removeAttribute("style");
});
// Missing: Switch between light and dark themes
