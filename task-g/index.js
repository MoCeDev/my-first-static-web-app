// index.js
// Author: Ville Heikkiniemi
// Date: 2025-10-06
// Handles adding new course rows with day marks (✅/❌)

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("dataForm");

  const timestampInput = document.getElementById("timestamp");
  const fullNameInput = document.getElementById("fullName");
  const emailInput = document.getElementById("email");
  const phoneInput = document.getElementById("phone");
  const birthDateInput = document.getElementById("birthDate");
  const termsCheckbox = document.getElementById("terms");

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    clearErrors();

    const timestamp = new Date().toISOString();
    timestampInput.value = timestamp;

    const fullName = fullNameInput.value.trim();
    const email = emailInput.value.trim();
    const phone = phoneInput.value.replace(/\s+/g, "").trim();
    const birthDate = birthDateInput.value;
    const termsAccepted = termsCheckbox.checked;

    let valid = true;

    // Full Name validation
    const nameParts = fullName.split(" ");
    if (
      fullName === "" ||
      nameParts.length < 2 ||
      nameParts.some((part) => part.length < 2)
    ) {
      showError("nameError", "Please enter your full name.");
      valid = false;
    }

    // Email validation
    if (!email.includes("@") || !email.includes(".")) {
      showError("emailError", "Please enter a valid email address.");
      valid = false;
    }

    // Phone validation
    if (!/^\+358\d{7,10}$/.test(phone)) {
      showError("phoneError", "Phone must start with +358 and have 7–10 digits.");
      valid = false;
    }

    // Birth Date validation
    const birth = new Date(birthDate);
    const today = new Date();
    const age = today.getFullYear() - birth.getFullYear();
    if (birth >= today || age < 18) {
      showError("dateError", "You must be at least 18 years old.");
      valid = false;
    }

    if (!termsAccepted) {
      showError("termsError", "You must accept the terms to continue.");
      valid = false;
    }

    if (valid) {
      appendRow(timestamp, fullName, email, phone, birthDate);
      form.reset();
    }
  });
});

function showError(id, message) {
  document.getElementById(id).textContent = message;
}

function clearErrors() {
  document.querySelectorAll(".error").forEach((el) => (el.textContent = ""));
}

function appendRow(timestamp, name, email, phone, birthDate) {
  const tbody = document.getElementById("dataTableBody");
  const row = document.createElement("tr");
  row.innerHTML = `
    <td>${timestamp}</td>
    <td>${name}</td>
    <td>${email}</td>
    <td>${phone}</td>
    <td>${birthDate}</td>
  `;
  tbody.appendChild(row);
}