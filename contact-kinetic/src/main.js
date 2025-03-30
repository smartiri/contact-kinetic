const nextBtn = document.getElementById("toggle-app");
const timeSelect = document.getElementById("time-section");
const contactForm = document.getElementById("contact-form");
const details = document.getElementById("details");
const form = document.getElementById("personal-details");
let select = document.getElementById("time");
let emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
let phoneRegex = /^\d{10}/;

nextBtn.addEventListener("click", function () {
  if (select.value != "") {
    document.getElementById("select-error").style.display = "none";
    contactForm.classList.toggle("d-none");
    timeSelect.classList.toggle("d-none");
  } else {
    document.getElementById("select-error").style.display = "block";
  }
});

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const errorDiv = document.getElementById("form-error");
  const formData = new FormData(this);
  const formObj = Object.fromEntries(formData.entries());
  const checkbox = document.getElementById("consent");
  if (!emailRegex.test(formObj.email)) {
    const displayError = `
      <span id="select-error" style="font-size: 12px; color: red;">
        Please enter email address!
      </span>
    `;
    errorDiv.innerHTML = displayError;
    return;
  }

  if (!phoneRegex.test(formObj.phone)) {
    const displayError = `
    <span id="select-error" style="font-size: 12px; color: red">
      Phone number must be at least 10 characters long and contain only numbers.
    </span>
  `;
    errorDiv.innerHTML = displayError;
    return;
  }

  if (!checkbox.checked) {
    console.log(checkbox.checked);
    const displayError = `
    <span id="select-error" style="font-size: 12px; color: red">
      Check the checkbox!
    </span>
  `;
    errorDiv.innerHTML = displayError;
    return;
  }

  if (
    formObj.firstname != "" &&
    formObj.lastname != "" &&
    formObj.phone != "" &&
    formObj.email != ""
  ) {
    const displayHtml = `
    <h1 style="font-size: 37px; font-weight: 900; margin-top: 10px">Details</h1>
      <div class="more-details">
        <div class="d-flex details-row">
          <p class="fw-bold">Name</p>
          <p>${formObj.firstname}</p>
        </div>
        <div class="d-flex details-row">
          <p class="fw-bold">Last Name</p>
          <p>${formObj.lastname}</p>
        </div>
        <div class="d-flex details-row">
          <p class="fw-bold">Email</p>
          <p>${formObj.email}</p>
        </div>
        <div class="d-flex details-row">
          <p class="fw-bold">Phone</p>
          <p>${formObj.phone}</p>
        </div>
        <div class="d-flex details-row">
          <p class="fw-bold">Time to meet</p>
          <p>${select.value}</p>
        </div>
      </div>
  `;
    contactForm.classList.toggle("d-none");
    details.innerHTML = displayHtml;
  }
});
