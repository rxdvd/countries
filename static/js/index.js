const {getAllCountries,submitCountry} = require('./app')

getAllCountries()

const form = document.querySelector('#new-country-form');


form.addEventListener('submit', submitCountry);



const delBtn = document.querySelector('.delete-btn');
// deleteBtn.addEventListener('click', deleteCountry)
