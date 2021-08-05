// get add new contact button
const addNewContactBtn = document.querySelector("#add-new-contact");
// add new contact form
const addNewContactForm = document.querySelector("#add-new-contact-form");
// all contacts table
const allContacts = document.querySelector("#all-contacts");
// all contacts button
const viewAllContactBtn = document.querySelector("#view-all-contact-btn");
// form heading
const formHeading = document.querySelector("#form-heading");

// table body
const tableBody = document.querySelector("tbody");

// submit form btn
const submitFormBtn = document.querySelector("#submit-btn");

// select all input fields
const inputFields = document.querySelectorAll(".input-fields");

let isEdit = false;

// function to generate id
const handleGenerateID = () => {
  return contacts.length > 0 ? contacts[contacts.length - 1].id + 1 : 1;
};

// array to store contact information
let contacts = localStorage.getItem("contacts")
  ? JSON.parse(localStorage.getItem("contacts"))
  : [];

// function to delete contact
const handleDeleteContact = (id) => {
  const contactsAfterDelete = contacts.filter((elem) => elem.id !== id);
  console.log(contactsAfterDelete);
  document.querySelector(`#delete-${id}`).parentElement.parentElement.remove();
  contacts = contactsAfterDelete;
  localStorage.setItem("contacts", JSON.stringify(contacts));
};

// function to edit contact
const handleEditContact = (id) => {
  isEdit = true;
  const contactToBeEdit = contacts.filter((elem) => elem.id === id);
  const { name, email, phone, address, id: contactId } = contactToBeEdit[0];

  // set name to the name field
  inputFields[0].value = name;

  // set email to the email field
  inputFields[1].value = phone;

  // set phone to the phone field
  inputFields[2].value = email;

  // set address to the address field
  inputFields[3].value = address;

  // set id to update btn
  submitFormBtn.setAttribute("id", `update-${contactId}`);
  handleDisplayContactForm();
};

// function to update contact
const handleUpdateContact = () => {
  const id = submitFormBtn.getAttribute("id");
  const getId = parseInt(id.split("-")[1]);
  const contactDetails = handleTakeInputs(getId);
  const indexNumb = contacts.findIndex((elem) => elem.id === getId);
  contacts.splice(indexNumb, 1, contactDetails);
  localStorage.setItem("contacts", JSON.stringify(contacts));
  handleRenderContactDetails();
  handleDisplayContactTables();
};

// function to take input values from the fields
const handleTakeInputs = (contactId) => {
  let isError = false;
  let dataObj = {
    id: contactId ? contactId : handleGenerateID(),
  };
  inputFields.forEach((elem) => {
    if (elem.value === "") {
      isError = true;
    }
    dataObj[elem.name] = elem.value;
  });

  if (isError) {
    alert("Fill Out All the Fields");
    return false;
  } else {
    return dataObj;
  }
};

// function to submit data
const handleSubmit = () => {
  const contactDetails = handleTakeInputs();
  console.log("submit");

  if (contactDetails) {
    contacts = [...contacts, contactDetails];
    handleAppendContact(contactDetails);
    handleDisplayContactTables();
    localStorage.setItem("contacts", JSON.stringify(contacts));
  }
};

// function to append html in tablebody

const handleAppendContact = (contactDetail) => {
  const html = ` <tr>
        <td scope="row">${contactDetail.id}</td>
        <td>${contactDetail.name}</td>
        <td>${contactDetail.phone}</td>
        <td>${contactDetail.email}</td>
        <td>${contactDetail.address}</td>
        <td>
          <button type="button" class="btn btn-primary" onClick="handleEditContact(${contactDetail.id})" id="edit-${contactDetail.id}">Edit</button>
          <button type="button" class="btn btn-primary" onClick="handleDeleteContact(${contactDetail.id})" id="delete-${contactDetail.id}">Delete</button>
        </td>
      </tr>`;
  // select tableBody
  tableBody.insertAdjacentHTML("beforeend", html);
};

// function to render the contacts
const handleRenderContactDetails = () => {
  tableBody.innerHTML = "";
  contacts.forEach((elem, key) => {
    const html = ` <tr>
        <td scope="row">${elem.id}</td>
        <td>${elem.name}</td>
        <td>${elem.phone}</td>
        <td>${elem.email}</td>
        <td>${elem.address}</td>
        <td>
          <button type="button" class="btn btn-primary" onClick="handleEditContact(${elem.id})" id="edit-${elem.id}">Edit</button>
          <button type="button" class="btn btn-primary" onClick="handleDeleteContact(${elem.id})" id="delete-${elem.id}">Delete</button>
        </td>
      </tr>`;
    // select tableBody
    tableBody.insertAdjacentHTML("beforeend", html);
  });
};

// function to show add contact form
const handleDisplayContactForm = () => {
  if (isEdit) {
    formHeading.innerHTML = "Edit Contact";
    submitFormBtn.innerHTML = "Update";
  }
  addNewContactForm.classList.remove("d-none");
  allContacts.classList.add("d-none");
};

// function to show contact tables
const handleDisplayContactTables = () => {
  isEdit = false;
  inputFields.forEach((elem) => (elem.value = ""));
  if (!isEdit) {
    formHeading.innerHTML = "Add New Contact";
    submitFormBtn.innerHTML = "Add Contact";
  }
  addNewContactForm.classList.add("d-none");
  allContacts.classList.remove("d-none");
};

const init = () => {
  handleRenderContactDetails();
  addNewContactBtn.addEventListener("click", handleDisplayContactForm);
  submitFormBtn.addEventListener("click", () => {
    if (!isEdit) handleSubmit();
    if (isEdit) {
      handleUpdateContact();
    }
  });
  viewAllContactBtn.addEventListener("click", handleDisplayContactTables);
};

init();
