document.getElementById('registrationForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent form submission
    validateForm();
  });
  
  function validateForm() {
    let isValid = true;
  
    // Full Name Validation
    const fullName = document.getElementById('fullName').value.trim();
    const nameError = document.getElementById('nameError');
    if (fullName.length < 5) {
      nameError.textContent = "Name must be at least 5 characters long.";
      isValid = false;
    } else {
      nameError.textContent = "";
    }
  
    // Email Validation
    const email = document.getElementById('email').value.trim();
    const emailError = document.getElementById('emailError');
    if (!email.includes('@')) {
      emailError.textContent = "Enter a valid email address.";
      isValid = false;
    } else {
      emailError.textContent = "";
    }
  
    // Phone Number Validation
    const phone = document.getElementById('phone').value.trim();
    const phoneError = document.getElementById('phoneError');
    if (phone === '123456789' || phone.length !== 10 || isNaN(phone)) {
      phoneError.textContent = "Enter a valid 10-digit phone number.";
      isValid = false;
    } else {
      phoneError.textContent = "";
    }
  
    // Password Validation
    const password = document.getElementById('password').value;
    const passwordError = document.getElementById('passwordError');
    if (password.toLowerCase() === 'password' || password.toLowerCase() === fullName.toLowerCase() || password.length < 8) {
      passwordError.textContent = "Password must be at least 8 characters and not be 'password' or your name.";
      isValid = false;
    } else {
      passwordError.textContent = "";
    }
  
    // Confirm Password Validation
    const confirmPassword = document.getElementById('confirmPassword').value;
    const confirmPasswordError = document.getElementById('confirmPasswordError');
    if (password !== confirmPassword) {
      confirmPasswordError.textContent = "Passwords do not match.";
      isValid = false;
    } else {
      confirmPasswordError.textContent = "";
    }
  
    // Display Success Message
    if (isValid) {
      alert("Form submitted successfully!");
    }
  }
  