function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

//Creating a function to close the pop-up form
function closeWindow() {
  if (modalbg.style.display === "block") {
    modalbg.style.display = "none";
  }
}

// Form Variables
// receiving the elements selectors
const firstName = document.getElementById("first"),
  lastName = document.getElementById("last"),
  email = document.getElementById("email"),
  birthdate = document.getElementById("birthdate"),
  quantity = document.getElementById("quantity"),
  country = document.getElementsByClassName("location"),
  agreeToTerms = document.getElementById("checkbox1"),
  form = document.getElementById("form"),
  submit = document.getElementById("submit"),
  close_btn = document.getElementById("close-btn"),
  successMsg = document.getElementById("successMsg"),
  errorMsg = document.getElementsByClassName("error");

//Creating a verification object for validation errors
// The verification values must be true to submit the form
const verificationObj = {
  FirstName: false,
  LastName: false,
  Email: false,
  BirthDate: false,
  Quantity: false,
  Location: false,
  Terms: false,
};

// ---------------- Form Validation ----------------
const letters = new RegExp("^[a-zA-Z]+$");

// ---- Creating a function for First Name Validation
const checkFirstName = (id, serial, message) => {
  errorMsg[serial].innerHTML = !(id.value.length > 1 && letters.test(id.value))
    ? message
    : "";
  verificationObj.FirstName = id.value.length > 1;
};

// ---- Creating a function for Last Name Validation
const checkLastName = (id, serial, message) => {
  errorMsg[serial].innerHTML = !(id.value.length > 1 && letters.test(id.value))
    ? message
    : "";
  //Updating the verificationObj value to true or false
  verificationObj.LastName = id.value.length > 1;
};

// ---- Creating a function for Email Validation
const checkEmail = (id, serial, message) => {
  errorMsg[serial].innerHTML =
    id.value.includes("@") && id.value.includes(".") ? "" : message;
  //Updating the verificationObj value to true or false
  verificationObj.Email = id.value.includes("@") && id.value.includes(".");
};

// ---- Creating a function for Birthdate Validation
const checkBirth = (id, serial, message) => {
  //Geting the date
  const date = new Date();
  const day = date.getUTCDate();
  const month = ("0" + (date.getMonth() + 1)).slice(-2);
  const year = date.getFullYear();

  //Creating a date in form of the same input date form
  const nowDate = `${year}-${month}-${day}`;

  errorMsg[serial].innerHTML =
    id.value == "" || id.value >= nowDate ? message : "";
  verificationObj.BirthDate = !(id.value == "");
};

// ---- Quantity Validation
const checkQuantity = (id, serial, message) => {
  errorMsg[serial].innerHTML = id.value == "" ? message : "";
  verificationObj.Quantity = !(id.value == "");
};

// ---- Creating a function for Location Validation
const checkLocation = (serial, message) => {
  //Creating a for loop to check all the radio buttons
  for (let cityNum = 0; cityNum < 6; cityNum++) {
    if (country[cityNum].checked) {
      errorMsg[serial].innerHTML = "";
      //Updating the verificationObj value
      verificationObj.Location = true;

      //Changing the border color of location radio buttons to green when select a city
      for (let checkboxBorder = 0; checkboxBorder < 6; checkboxBorder++) {
        document.getElementsByClassName("checkbox-icon")[
          checkboxBorder
        ].style.borderColor = "green";
      }
      return;
    }
    //The changes when the value is false
    //Updating the verificationObj value
    verificationObj.Location = false;
    errorMsg[serial].innerHTML = message;
    document.getElementsByClassName("checkbox-icon")[
      cityNum
    ].style.borderColor = "red";
  }
};

// ---- Creating a function for agreement validation
const termsAgreement = (serial, message) => {
  errorMsg[serial].innerHTML = agreeToTerms.checked ? "" : message;
  verificationObj.Terms = agreeToTerms.checked;
};

// ---------------- Creating a function for submission ----------------

const handleSubmit = (e) => {
  e.preventDefault();

  checkFirstName(firstName, 0, "Please enter 2+ characters for name field.");
  checkLastName(lastName, 1, "Please enter 2+ characters for name field.");
  checkEmail(email, 2, "Please add a correct email address.");
  checkBirth(birthdate, 3, "You must enter your date of birth.");
  checkQuantity(quantity, 4, "Please add a quantity");
  checkLocation(5, "You must choose one option.");
  termsAgreement(6, "You must check to agree to terms and conditions.");

  //Submission condition
  if (
    //Check verificationObj Values of the form before submitting
    verificationObj.FirstName &&
    verificationObj.LastName &&
    verificationObj.Email &&
    verificationObj.BirthDate &&
    verificationObj.Quantity &&
    verificationObj.Location &&
    verificationObj.Terms
  ) {
    //If verificationObj Values are true, submit
    //Change styles to display submit message
    form.style.display = "none";
    close_btn.style.display = "block";
    successMsg.style.display = "block";
  }
};
