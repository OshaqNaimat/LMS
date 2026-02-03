// Validation rules
export const validationRules = {
  required: (value) => !!value || "This field is required",
  email: (value) => {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(value) || "Invalid email address";
  },
  minLength: (min) => (value) =>
    value.length >= min || `Minimum ${min} characters required`,
  maxLength: (max) => (value) =>
    value.length <= max || `Maximum ${max} characters allowed`,
  phone: (value) => {
    const pattern = /^[\+]?[1-9][\d]{0,15}$/;
    return (
      pattern.test(value.replace(/[\s\-\(\)]/g, "")) || "Invalid phone number"
    );
  },
  password: (value) => {
    const minLength = value.length >= 6;
    const hasUpperCase = /[A-Z]/.test(value);
    const hasLowerCase = /[a-z]/.test(value);
    const hasNumbers = /\d/.test(value);

    if (!minLength) return "Password must be at least 6 characters";
    if (!hasUpperCase) return "Password must contain uppercase letter";
    if (!hasLowerCase) return "Password must contain lowercase letter";
    if (!hasNumbers) return "Password must contain number";
    return true;
  },
  confirmPassword: (password) => (value) =>
    value === password || "Passwords do not match",
  url: (value) => {
    try {
      new URL(value);
      return true;
    } catch {
      return "Invalid URL";
    }
  },
  number: (value) => !isNaN(value) || "Must be a number",
  positiveNumber: (value) => value > 0 || "Must be a positive number",
  date: (value) => {
    const date = new Date(value);
    return !isNaN(date.getTime()) || "Invalid date";
  },
  futureDate: (value) => {
    const date = new Date(value);
    const today = new Date();
    return date > today || "Date must be in the future";
  },
};

// Validate form
export const validateForm = (formData, rules) => {
  const errors = {};

  Object.keys(rules).forEach((field) => {
    const fieldRules = rules[field];
    const value = formData[field];

    fieldRules.forEach((rule) => {
      if (typeof rule === "function") {
        const result = rule(value);
        if (result !== true) {
          errors[field] = errors[field] || [];
          errors[field].push(result);
        }
      }
    });
  });

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

// Validate single field
export const validateField = (value, rules) => {
  const errors = [];

  rules.forEach((rule) => {
    if (typeof rule === "function") {
      const result = rule(value);
      if (result !== true) {
        errors.push(result);
      }
    }
  });

  return {
    isValid: errors.length === 0,
    errors,
  };
};
