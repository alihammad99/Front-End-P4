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

//Close window
function closeWindow() {
  if (modalbg.style.display === "block") {
    return (modalbg.style.display = "none");
  }
}

// Form Variables

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

let verification = {
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

// ---- First Name Validation
const checkFirstName = (id, serial, message) => {
  errorMsg[serial].innerHTML =
  !(id.value.length > 1 && letters.test(id.value)) ? message : "";
  verification.FirstName =
    id.value === "" || id.value.length < 2 ? false : true;
};

// ---- Last Name Validation
const checkLastName = (id, serial, message) => {
  errorMsg[serial].innerHTML =
  !(id.value.length > 1 && letters.test(id.value)) ? message : "";
  verification.LastName = id.value === "" || id.value.length < 2 ? false : true;
};

// ---- Email Validation
const checkEmail = (id, serial, message) => {
  errorMsg[serial].innerHTML =
    id.value.includes("@") && id.value.includes(".") ? "" : message;
  verification.Email =
    id.value.includes("@") && id.value.includes(".") ? true : false;
};

// ---- Birthdate Validation
const checkBirth = (id, serial, message) => {
  //Geting the date
  const date = new Date()
  const day = date.getUTCDate()
  const month = ("0" + (date.getMonth() + 1)).slice(-2)
  const year = date.getFullYear()
  
  //Creating a date in form of the same input date form
  const nowDate = `${year}-${month}-${day}`

  errorMsg[serial].innerHTML = (id.value === "" || id.value >= nowDate) ? message : "";
  verification.BirthDate = id.value === "" ? false : true;
};

// ---- Quantity Validation
const checkQuantity = (id, serial, message) => {
  errorMsg[serial].innerHTML = id.value === "" ? message : "";
  verification.Quantity = id.value === "" ? false : true;
};

// ---- Location Validation
const checkLocation = (serial, message) => {
  for (let i = 0; i < 6; i++) {
    if (country[i].checked) {
      console.log(country[i].value);
      errorMsg[serial].innerHTML = "";
      verification.Location = true;

      for (let x = 0; x < 6; x++) {
        document.getElementsByClassName("checkbox-icon")[x].style.borderColor =
          "green";
      }

      return;
    }
    verification.Location = false;
    errorMsg[serial].innerHTML = message;
    document.getElementsByClassName("checkbox-icon")[i].style.borderColor =
      "red";
  }
};

// ---- Terms Agreement Validation
const termsAgreement = (serial, message) => {
  errorMsg[serial].innerHTML = agreeToTerms.checked ? "" : message;
  verification.Terms = agreeToTerms.checked ? true : false;
};

// ---------------- Form Submition Function ----------------

const validate = (e) => {
  e.preventDefault();

  checkFirstName(firstName, 0, "Please enter 2+ characters for name field.");
  checkLastName(lastName, 1, "Please enter 2+ characters for name field.");
  checkEmail(email, 2, "Please add a correct email address.");
  checkBirth(birthdate, 3, "You must enter your date of birth.");
  checkQuantity(quantity, 4, "Please add a quantity");
  checkLocation(5, "You must choose one option.");
  termsAgreement(6, "You must check to agree to terms and conditions.");

  if (
    verification.FirstName &&
    verification.LastName &&
    verification.Email &&
    verification.BirthDate &&
    verification.Quantity &&
    verification.Location &&
    verification.Terms
  ) {
    form.style.display = "none";
    close_btn.style.display = "block";
    successMsg.style.display = "block";
  }
  return;
};
