const emailRegex = require("email-regex");

export function isEmail(email: string): boolean {
  if (!emailRegex({ exact: true }).test(email)) {
    // eslint-disable-next-line no-throw-literal
    throw {
      name: "InvalidSyntaxEmail",
      message: "invalid email syntax"
    };
  }
  return true;
}

export function isNameLenghtValid(value: string): boolean {
  if (value.length < 2 || value === "") {
    // eslint-disable-next-line no-throw-literal
    throw {
      name: "InvalidLenghtValue",
      message: "must contains two characters at least"
    };
  }
  return true;
}

export function isPasswordStrongEnough(password: string): boolean {
  if (!/[A-Z]/.test(password) && !/\d/.test(password))
    // eslint-disable-next-line no-throw-literal
    throw {
      name: "PasswordNotStrongEnough",
      message: "must contains 8 characters, numbers & uppercases"
    };
  return true;
}

export function areEqualPasswords(
  password: string,
  confirmPassword: string
): boolean {
  if (password !== confirmPassword) {
    // eslint-disable-next-line no-throw-literal
    throw {
      name: "PasswordsNotEqual",
      message: "Passwords not equal"
    };
  }
  return true;
}
