function setCountry(countries) {
  countries.forEach((country) => appendCountry(country));
}

function appendCountry(countryData) {
  const newLi = document.createElement("li");
  const delBtn = createBtn("delete", countryData.id);
  delBtn.id = countryData.id;
  const editBtn = createBtn("edit", countryData.id);
  newLi.textContent = `Name: ${countryData.name} | Capital: ${countryData.city}`;
  newLi.appendChild(editBtn);
  newLi.appendChild(delBtn);
  const countryList = document.querySelector("ul");
  countryList.append(newLi);

  delBtn.addEventListener("click", removeCountry);
  editBtn.addEventListener("click", editModal);

}

const removeCountry = async (e) => {
  const countryID = e.target.id;
  try {
    const response = await fetch(`http://localhost:5500/country/${countryID}`, {
      method: "DELETE",
    });

    const reply = await response.json();
    console.log(reply);

    e.target.parentElement.parentElement.removeChild(e.target.parentElement);
  } catch (err) {
    console.log(err);
  }
};

const createBtn = (button, id) => {
  if (button === "delete") {
    const deleteButton = document.createElement("button");
    deleteButton.innerText = "Delete";
    deleteButton.className = "delete-btn";
    deleteButton.id = id;
    deleteButton.type = "button";
    return deleteButton;
  } else {
    const editButton = document.createElement("button");
    editButton.type = "button";
    editButton.id = id;
    editButton.innerText = "Edit";
    editButton.className = "edit-btn";
    return editButton;
  }
};

const editModal = (e) => {
  const modal = document.querySelector(".modal");
  const closeModal = document.querySelector(".close");
  modal.style.display = "block";
  closeModal.addEventListener("click", () => {
    modal.style.display = "none";
  });

  // When the user clicks anywhere outside of the modal, close it
  window.addEventListener("click", (event) => {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  });

  const modalForm = document.querySelector(".edit-form");
  const buttonId = e.target.id;
  modalForm.id = buttonId;
  modalForm.addEventListener("submit", editCountry);
};

const editCountry = async (e) => {
  e.preventDefault();
  const countryID = e.target.id;
  const countryData = {
    name: e.target.editCountry.value,
    city: e.target.editCity.value,
  };

  try {
    const options = {
      method: "POST",
      body: JSON.stringify(countryData),
      headers: { "Content-Type": "application/json" },
    };

    const response = await fetch(
      `http://localhost:5500/country/edit/${countryID}`,
      options
    );

    console.log(response);
    location.reload();
  } catch (err) {
    console.error(err);
  }
};

module.exports = { setCountry, appendCountry };
