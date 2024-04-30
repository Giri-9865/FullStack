export const isValidMobile = (mobile) => {
  const mobileRegex = /^\d{10}$/;
  return mobileRegex.test(mobile);
};

export const checkPasswordCriteria = (password) => {
  const length = password.length >= 8;
  const uppercase = /[A-Z]/.test(password);
  const lowercase = /[a-z]/.test(password);
  const digit = /\d/.test(password);
  const specialChar = /[!@#$%^&*]/.test(password);
  const criteria = { length, uppercase, lowercase, digit, specialChar };
  return {
    validate: length && uppercase && lowercase && digit && specialChar,
    criteria: criteria,
  };
};
