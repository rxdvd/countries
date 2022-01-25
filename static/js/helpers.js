
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
