async function emailValidator(email) {
  let emailValidation = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g);
  let isValid = emailValidation.test(email);
  if (isValid) {
    return true;
  }
  return false;
}

export { emailValidator };
