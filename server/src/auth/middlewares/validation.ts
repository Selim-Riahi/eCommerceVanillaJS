// src/validations/authValidations.ts
import { body } from "express-validator";

// Email validation
export const emailValidation = body("email")
  .isEmail()
  .withMessage("Please enter a valid email address")
  .normalizeEmail();

// Password validation
export const passwordValidation = body("password")
  .isLength({ min: 8 })
  .withMessage("Password must be at least 8 characters long");

// Confirm Password validation
export const confirmPasswordValidation = body("confirmpassword")
  .custom((value, { req }) => value === req.body.password)
  .withMessage("Passwords do not match");

// Firstname validation
export const firstNameValidation = body("firstname")
  .notEmpty()
  .withMessage("First name is required")
  .isAlpha()
  .withMessage("First name must contain only letters")
  .trim();

// Lastname validation
export const lastNameValidation = body("lastname")
  .notEmpty()
  .withMessage("Last name is required")
  .isAlpha()
  .withMessage("Last name must contain only letters")
  .trim();

export const selectFieldValidation = (fieldName: string, label?: string) =>
  body(fieldName)
    .notEmpty()
    .withMessage(`${label || fieldName} is required`);
export const authMethodValidation = body("authMethod")
  .notEmpty()
  .withMessage("Authentication method is required")
  .isIn(["email", "google", "oAuth"])
  .withMessage("Invalid authentication method");

export const validateLoginInput = [emailValidation, passwordValidation];

export const validateRegisterInput = [
  firstNameValidation,
  lastNameValidation,
  emailValidation,
  passwordValidation,
  confirmPasswordValidation,
  selectFieldValidation("country", "Country"),
  selectFieldValidation("socials", "Socials"),
  authMethodValidation,
];
