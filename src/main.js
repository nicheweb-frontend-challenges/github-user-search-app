// Var initialization
const darkTheme = document.querySelector(".dark-theme");
const lightTheme = document.querySelector(".light-theme");
const searchInput = document.querySelector(".search input");
const btn = document.querySelector(".search button");
const profilePicture = document.querySelector(".profile-picture img");
const userHeading = document.querySelector("article header .heading");
const userName = document.querySelector("article header .user-name");
const joinDate = document.querySelector("article header .join-date time");
const bio = document.querySelector(".bio");
const repos = document.querySelector("table tbody td:nth-of-type(1)");
const followers = document.querySelector("table tbody td:nth-of-type(2)");
const following = document.querySelector("table tbody td:nth-of-type(3)");
const location = document.querySelector(".location h4");
const website = document.querySelector(".website h4 a");
const twitter = document.querySelector(".twitter h4");
const company = document.querySelector(".company h4");
const octoUserEndpoint = "https://api.github.com/users/:";
function getUserData(user) {
  let url = octoUserEndpoint + user;
  fetch(url)
    .then((response) => response.json())
    .then((data) => console.log(data));
}
