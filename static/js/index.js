const { getAllCountries, submitCountry } = require("./app");

getAllCountries();

const form = document.querySelector("#new-country-form");

form.addEventListener("submit", submitCountry);
