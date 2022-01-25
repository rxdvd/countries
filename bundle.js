(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const {setCountry,appendCountry} = require('./helpers')


const  getAllCountries= async () => {
    try{
        const response = await fetch('http://localhost:5500/country')

        const data = await response.json()

        setCountry(data)

    } catch (err) {
        console.error(err)
    }
};

const submitCountry = async (e) => {
    e.preventDefault();

    try {
        const countryData = {
            name: e.target.name.value,
            city: e.target.city.value
        };

        const options = { 
            method: 'POST',
            body: JSON.stringify(countryData),
            headers: { "Content-Type": "application/json"}
        };
    

        const response = await fetch('http://localhost:5500/country', options) 
        
        appendCountry(response)
    
    } catch (err) {
        console.error(err)
    }

};


// const deleteCountry = (e) => {
//     e.preventDefault();

//     const countryID = e.target.value
//     console.log(countryID)
//     try {
//         const countryID = e.target.value

//         const options = { 
//             method: 'Delete',
//         };
    

//         const response = await fetch(`http://localhost:5500/country/${countryID}`, options) 
        
        
    
//     } catch (err) {
//         console.error(err)
//     }

// };

module.exports = {getAllCountries, submitCountry}

},{"./helpers":2}],2:[function(require,module,exports){

function setCountry(countries){
    countries.forEach((country) => appendCountry(country));
};

function appendCountry(countryData){
    const newLi = document.createElement('li');
    const deleteButton = document.createElement("button");
    const editButton = document.createElement("button");
    deleteButton.innerText = 'Delete';
    deleteButton.className = 'delete-btn'
    deleteButton.value = countryData.id
    editButton.innerText = 'Edit';
    newLi.textContent = `Name: ${countryData.name} | Capital: ${countryData.city}`
    newLi.appendChild(editButton)
    newLi.appendChild(deleteButton)
    const countryList = document.querySelector('ul');
    countryList.append(newLi);
};



module.exports = {setCountry,appendCountry}

},{}],3:[function(require,module,exports){
const {getAllCountries,submitCountry} = require('./app')

getAllCountries()

const form = document.querySelector('#new-country-form');


form.addEventListener('submit', submitCountry);




// deleteBtn.addEventListener('click', deleteCountry)

},{"./app":1}]},{},[3]);
