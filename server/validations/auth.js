function validateRegister(data) {
  const errors = {};

  // First Name
  if (
    !data.firstName ||
    typeof data.firstName !== "string" ||
    data.firstName.trim().length < 3
  ) {
    errors.firstName = "First name must be at least 3 characters long";
  }

  // Last Name
  if (
    !data.lastName ||
    typeof data.lastName !== "string" ||
    data.lastName.trim().length < 3
  ) {
    errors.lastName = "Last name must be at least 3 characters long";
  }

  // Email
  const emailRegex = /^[\w-]+(?:\.[\w-]+)*@(?:[\w-]+\.)+[a-zA-Z]{2,7}$/;
  if (!data.email || !emailRegex.test(data.email)) {
    errors.email = "Please provide a valid email address";
  }

  // Password
  if (
    !data.password ||
    typeof data.password !== "string" ||
    data.password.length < 6
  ) {
    errors.password = "Password must be at least 6 characters long";
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0,
  };
}

// Validate login
function validateLogin(data) {
  const errors = {};

  if (!data.email || typeof data.email !== "string") {
    errors.email = "Email is required";
  }

  if (!data.password || typeof data.password !== "string") {
    errors.password = "Password is required";
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0,
  };
}

function validateUserProfile({ firstName, lastName, email }) {
  if (!firstName || !lastName || !email) {
    return "All fields are required";
  }

  if (firstName.length < 3 || lastName.length < 3) {
    return "First and last name must be at least 3 characters long";
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return "Invalid email format";
  }

  return null;
}

module.exports = { validateRegister, validateLogin, validateUserProfile };
