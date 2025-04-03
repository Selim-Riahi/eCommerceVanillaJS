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

// Export validation rules directly as an array
export const validateLoginInput = [emailValidation, passwordValidation];
