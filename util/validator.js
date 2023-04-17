async function emailValidator(email) {
  let emailValidation = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");
  if (!emailValidation.test(email)) {
    return false;
  }
  return true;
}

export { emailValidator };
